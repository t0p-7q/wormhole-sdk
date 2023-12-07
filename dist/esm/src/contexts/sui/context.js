import { Connection, JsonRpcProvider, SUI_CLOCK_OBJECT_ID, SUI_TYPE_ARG, TransactionBlock, getTotalGasUsed, getTransactionSender, isValidSuiAddress, } from '@mysten/sui.js';
import { BigNumber } from 'ethers';
import { ensureHexPrefix, getForeignAssetSui, getIsTransferCompletedSui, getOriginalAssetSui, redeemOnSui, transferFromSui, } from '@certusone/wormhole-sdk';
import { getFieldsFromObjectResponse, getObjectFields, getPackageId, getTableKeyType, trimSuiType, } from '@certusone/wormhole-sdk/lib/esm/sui';
import { arrayify, hexlify } from 'ethers/lib/utils';
import { Context, NATIVE, } from '../../types';
import { parseTokenTransferPayload } from '../../vaa';
import { RelayerAbstract } from '../abstracts/relayer';
import { SuiContracts } from './contracts';
export class SuiContext extends RelayerAbstract {
    constructor(context, foreignAssetCache) {
        super();
        this.type = Context.SUI;
        this.context = context;
        const connection = context.conf.rpcs.sui;
        if (connection === undefined)
            throw new Error('no connection');
        this.provider = new JsonRpcProvider(new Connection({ fullnode: connection }));
        this.contracts = new SuiContracts(context, this.provider);
        this.foreignAssetCache = foreignAssetCache;
    }
    async getTxGasFee(txId, chain) {
        const txBlock = await this.provider.getTransactionBlock({
            digest: txId,
            options: { showEvents: true, showEffects: true, showInput: true },
        });
        return BigNumber.from(getTotalGasUsed(txBlock) || 0);
    }
    async getCoins(coinType, owner) {
        let coins = [];
        let cursor = null;
        do {
            const result = await this.provider.getCoins({
                owner,
                coinType,
                cursor,
            });
            coins = [...coins, ...result.data];
            cursor = result.hasNextPage ? result.nextCursor : null;
        } while (cursor);
        return coins;
    }
    async innerSend(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee, payload) {
        const destContext = this.context.getContext(recipientChain);
        const recipientChainId = this.context.toChainId(recipientChain);
        const relayerFeeBigInt = relayerFee ? BigInt(relayerFee) : undefined;
        const amountBigInt = BigNumber.from(amount).toBigInt();
        const formattedRecipientAccount = arrayify(destContext.formatAddress(recipientAddress));
        let coinType;
        if (token === NATIVE) {
            coinType = SUI_TYPE_ARG;
        }
        else {
            coinType = await this.mustGetForeignAsset(token, sendingChain);
        }
        const coins = await this.getCoins(coinType, senderAddress);
        const { core, token_bridge } = this.context.mustGetContracts('sui');
        if (!core || !token_bridge)
            throw new Error('contracts not found');
        const tx = await transferFromSui(this.provider, core, token_bridge, coins, coinType, amountBigInt, recipientChainId, formattedRecipientAccount, BigInt(0), // TODO: wormhole fee
        relayerFeeBigInt, payload, undefined, undefined, payload ? senderAddress : undefined);
        return tx;
    }
    async send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee) {
        return this.innerSend(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee);
    }
    async sendWithPayload(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, payload) {
        return this.innerSend(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, undefined, payload);
    }
    async estimateSendGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress) {
        const provider = this.provider;
        if (!provider)
            throw new Error('no provider');
        const tx = await this.send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, undefined);
        tx.setSenderIfNotSet(senderAddress);
        const dryRunTxBytes = await tx.build({
            provider,
        });
        const response = await provider.dryRunTransactionBlock({
            transactionBlock: dryRunTxBytes,
        });
        const gasFee = getTotalGasUsed(response.effects);
        if (!gasFee)
            throw new Error('cannot estimate gas fee');
        return BigNumber.from(gasFee);
    }
    async estimateClaimGas(destChain) {
        throw new Error('not implemented');
    }
    async estimateSendWithRelayGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee, toNativeToken) {
        const provider = this.provider;
        if (!provider)
            throw new Error('no provider');
        const tx = await this.sendWithRelay(token, amount.toString(), // must be > min amount to succeed
        toNativeToken, sendingChain, senderAddress, recipientChain, recipientAddress);
        tx.setSenderIfNotSet(senderAddress);
        const dryRunTxBytes = await tx.build({
            provider,
        });
        const response = await provider.dryRunTransactionBlock({
            transactionBlock: dryRunTxBytes,
        });
        const gasFee = getTotalGasUsed(response.effects);
        if (!gasFee)
            throw new Error('cannot estimate gas fee');
        return BigNumber.from(gasFee);
    }
    formatAddress(address) {
        if (!isValidSuiAddress(address)) {
            throw new Error(`can't format an invalid sui address: ${address}`);
        }
        // valid sui addresses are already 32 bytes, hex prefixed
        return arrayify(address);
    }
    parseAddress(address) {
        if (!isValidSuiAddress(address)) {
            throw new Error(`can't parse an invalid sui address: ${address}`);
        }
        // valid sui addresses are already 32 bytes, hex prefixed
        return address;
    }
    /**
     * @param address The asset's address (the Sui `CoinType`)
     * @returns The external address associated with the asset address
     */
    async formatAssetAddress(address) {
        try {
            const { token_bridge } = this.contracts.mustGetContracts('sui');
            if (!token_bridge)
                throw new Error('token bridge contract not found');
            // this will throw if the asset hasn't been attested
            const { assetAddress } = await getOriginalAssetSui(this.provider, token_bridge, address);
            return assetAddress;
        }
        catch (e) {
            console.error(`formatAssetAddress - error: ${e}`);
            throw e;
        }
    }
    /**
     * @param address The asset's external address
     * @returns The asset's address (the Sui `CoinType`) associated with the external address
     */
    async parseAssetAddress(address) {
        try {
            const { token_bridge } = this.contracts.mustGetContracts('sui');
            if (!token_bridge)
                throw new Error('token bridge contract not found');
            const coinType = await getForeignAssetSui(this.provider, token_bridge, this.context.toChainId('sui'), arrayify(address));
            if (coinType === null) {
                throw new Error('coinType is null');
            }
            return coinType;
        }
        catch (e) {
            console.error(`parseAssetAddress - error: ${e}`);
            throw e;
        }
    }
    async getForeignAsset(tokenId, chain, tokenBridgeStateFields) {
        const chainName = this.context.toChainName(chain);
        if (this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName)) {
            return this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName);
        }
        try {
            const chainId = this.context.toChainId(tokenId.chain);
            const toChainId = this.context.toChainId(chain);
            if (toChainId === chainId)
                return tokenId.address;
            const { token_bridge } = this.contracts.mustGetContracts('sui');
            if (!token_bridge)
                throw new Error('token bridge contract not found');
            const tokenContext = this.context.getContext(tokenId.chain);
            const formattedAddr = await tokenContext.formatAssetAddress(tokenId.address);
            const coinType = await this.getForeignAssetSui(this.provider, token_bridge, chainId, arrayify(formattedAddr), tokenBridgeStateFields);
            if (!coinType)
                return null;
            this.foreignAssetCache.set(tokenId.chain, tokenId.address, chainName, coinType);
            return coinType;
        }
        catch (e) {
            console.log(`getForeignAsset - error: ${e}`);
            throw e;
        }
    }
    async mustGetForeignAsset(tokenId, chain) {
        const coinType = await this.getForeignAsset(tokenId, chain);
        if (!coinType)
            throw new Error('token not registered');
        return coinType;
    }
    async fetchTokenDecimals(tokenAddr, chain) {
        const metadata = await this.provider.getCoinMetadata({
            coinType: tokenAddr,
        });
        if (metadata === null) {
            throw new Error(`Can't fetch decimals for token ${tokenAddr}`);
        }
        return metadata.decimals;
    }
    async getMessage(tx, chain, parseRelayerPayload = true) {
        const txBlock = await this.provider.getTransactionBlock({
            digest: tx,
            options: { showEvents: true, showEffects: true, showInput: true },
        });
        const message = txBlock.events?.find((event) => event.type.endsWith('WormholeMessage'));
        if (!message || !message.parsedJson) {
            throw new Error('WormholeMessage not found');
        }
        const { payload, sender: emitterAddress, sequence } = message.parsedJson;
        const parsed = parseTokenTransferPayload(Buffer.from(payload));
        const tokenContext = this.context.getContext(parsed.tokenChain);
        const destContext = this.context.getContext(parsed.toChain);
        const tokenAddress = await tokenContext.parseAssetAddress(hexlify(parsed.tokenAddress));
        const tokenChain = this.context.toChainName(parsed.tokenChain);
        const gasFee = getTotalGasUsed(txBlock);
        const to = destContext.parseAddress(hexlify(parsed.to));
        const parsedMessage = {
            sendTx: txBlock.digest,
            sender: getTransactionSender(txBlock) || '',
            amount: BigNumber.from(parsed.amount),
            payloadID: parsed.payloadType,
            recipient: to,
            toChain: this.context.toChainName(parsed.toChain),
            fromChain: this.context.toChainName(chain),
            tokenAddress,
            tokenChain,
            tokenId: {
                chain: tokenChain,
                address: tokenAddress,
            },
            sequence: BigNumber.from(sequence),
            emitterAddress: hexlify(emitterAddress),
            block: Number(txBlock.checkpoint || ''),
            gasFee: gasFee ? BigNumber.from(gasFee) : undefined,
            payload: parsed.tokenTransferPayload.length
                ? hexlify(parsed.tokenTransferPayload)
                : undefined,
        };
        if (parseRelayerPayload && parsed.payloadType === 3) {
            const relayerPayload = destContext.parseRelayerPayload(Buffer.from(parsed.tokenTransferPayload));
            const relayerMessage = {
                ...parsedMessage,
                relayerFee: relayerPayload.relayerFee,
                relayerPayloadId: parsed.payloadType,
                to,
                recipient: destContext.parseAddress(hexlify(relayerPayload.to)),
                toNativeTokenAmount: relayerPayload.toNativeTokenAmount,
            };
            return relayerMessage;
        }
        return parsedMessage;
    }
    async getNativeBalance(walletAddress, chain) {
        const { totalBalance } = await this.provider.getBalance({
            owner: walletAddress,
        });
        return BigNumber.from(totalBalance);
    }
    async getTokenBalance(walletAddress, tokenId, chain) {
        const coinType = await this.getForeignAsset(tokenId, chain);
        if (!coinType)
            return null;
        const { totalBalance } = await this.provider.getBalance({
            owner: walletAddress,
            coinType,
        });
        return BigNumber.from(totalBalance);
    }
    async getTokenBalances(walletAddr, tokenIds, chain) {
        const { token_bridge } = this.contracts.mustGetContracts('sui');
        if (!token_bridge)
            throw new Error('token bridge contract not found');
        const tokenBridgeStateFields = await getObjectFields(this.provider, token_bridge);
        if (!tokenBridgeStateFields) {
            throw new Error('Unable to fetch object fields from token bridge state');
        }
        // making all the potential requests at once may not
        // be the best idea, but it was happening before
        // and is n/2 with pre-fetching `tokenBridgeStateFields`
        const coinTypes = await Promise.all(tokenIds.map((tokenId) => this.getForeignAsset(tokenId, chain, tokenBridgeStateFields)));
        const tokenBalances = await this.provider.getAllBalances({
            owner: walletAddr,
        });
        return coinTypes.map((coinType) => !coinType
            ? null
            : BigNumber.from(tokenBalances.find((b) => b.coinType === coinType)?.totalBalance ||
                '0'));
    }
    async redeem(destChain, signedVAA, overrides, payerAddr) {
        const { core, token_bridge } = this.contracts.mustGetContracts('sui');
        if (!core || !token_bridge)
            throw new Error('contracts not found');
        const tx = await redeemOnSui(this.provider, core, token_bridge, signedVAA);
        return tx;
    }
    async isTransferCompleted(destChain, signedVaa) {
        const { token_bridge } = this.contracts.mustGetContracts('sui');
        if (!token_bridge)
            throw new Error('token bridge contract not found');
        return await getIsTransferCompletedSui(this.provider, token_bridge, arrayify(signedVaa, { allowMissingPrefix: true }));
    }
    async sendWithRelay(token, amount, toNativeToken, sendingChain, senderAddress, recipientChain, recipientAddress, overrides) {
        const destContext = this.context.getContext(recipientChain);
        const recipientChainId = this.context.toChainId(recipientChain);
        const amountBigInt = BigNumber.from(amount).toBigInt();
        const toNativeTokenBigInt = BigNumber.from(toNativeToken).toBigInt();
        const formattedRecipientAccount = `0x${Buffer.from(arrayify(destContext.formatAddress(recipientAddress))).toString('hex')}`;
        let coinType;
        if (token === NATIVE) {
            coinType = SUI_TYPE_ARG;
        }
        else {
            coinType = await this.mustGetForeignAsset(token, sendingChain);
        }
        const coins = await this.getCoins(coinType, senderAddress);
        const [primaryCoin, ...mergeCoins] = coins.filter((coin) => coin.coinType === coinType);
        if (primaryCoin === undefined) {
            throw new Error(`Coins array doesn't contain any coins of type ${coinType}`);
        }
        const { core, token_bridge, relayer, suiRelayerPackageId } = this.context.mustGetContracts('sui');
        if (!core || !token_bridge || !relayer || !suiRelayerPackageId)
            throw new Error('contracts not found');
        const coreBridgePackageId = await getPackageId(this.provider, core);
        if (!coreBridgePackageId)
            throw new Error('unable to get core bridge package id');
        const tokenBridgePackageId = await getPackageId(this.provider, token_bridge);
        if (!tokenBridgePackageId)
            throw new Error('unable to get token bridge package id');
        const tx = new TransactionBlock();
        const feeAmount = BigInt(0); // TODO: wormhole fee
        const [feeCoin] = tx.splitCoins(tx.gas, [tx.pure(feeAmount)]);
        const [transferCoin] = (() => {
            if (coinType === SUI_TYPE_ARG) {
                return tx.splitCoins(tx.gas, [tx.pure(amountBigInt)]);
            }
            else {
                const primaryCoinInput = tx.object(primaryCoin.coinObjectId);
                if (mergeCoins.length) {
                    tx.mergeCoins(primaryCoinInput, mergeCoins.map((coin) => tx.object(coin.coinObjectId)));
                }
                return tx.splitCoins(primaryCoinInput, [tx.pure(amountBigInt)]);
            }
        })();
        const [assetInfo] = tx.moveCall({
            target: `${tokenBridgePackageId}::state::verified_asset`,
            arguments: [tx.object(token_bridge)],
            typeArguments: [coinType],
        });
        const [transferTicket] = tx.moveCall({
            target: `${suiRelayerPackageId}::transfer::transfer_tokens_with_relay`,
            arguments: [
                tx.object(relayer),
                transferCoin,
                assetInfo,
                tx.pure(toNativeTokenBigInt),
                tx.pure(recipientChainId),
                tx.pure(formattedRecipientAccount),
                tx.pure(117),
            ],
            typeArguments: [coinType],
        });
        const [messageTicket] = tx.moveCall({
            target: `${tokenBridgePackageId}::transfer_tokens_with_payload::transfer_tokens_with_payload`,
            arguments: [tx.object(token_bridge), transferTicket],
            typeArguments: [coinType],
        });
        tx.moveCall({
            target: `${coreBridgePackageId}::publish_message::publish_message`,
            arguments: [
                tx.object(core),
                feeCoin,
                messageTicket,
                tx.object(SUI_CLOCK_OBJECT_ID),
            ],
        });
        return tx;
    }
    async calculateNativeTokenAmt(destChain, tokenId, amount, walletAddress) {
        const relayer = this.contracts.mustGetTokenBridgeRelayer('sui');
        const coinType = await this.mustGetForeignAsset(tokenId, destChain);
        const nativeTokenAmount = await relayer.calculateNativeSwapAmountOut(walletAddress, coinType, amount);
        return nativeTokenAmount;
    }
    async calculateMaxSwapAmount(destChain, tokenId, walletAddress) {
        const relayer = this.contracts.mustGetTokenBridgeRelayer('sui');
        const coinType = await this.mustGetForeignAsset(tokenId, destChain);
        const maxSwap = await relayer.calculateMaxSwapAmountIn(walletAddress, coinType);
        return maxSwap;
    }
    async getRelayerFee(sourceChain, destChain, tokenId) {
        const relayer = this.contracts.mustGetTokenBridgeRelayer('sui');
        const address = await this.mustGetForeignAsset(tokenId, sourceChain);
        const decimals = await this.fetchTokenDecimals(address, sourceChain);
        const destChainId = this.context.toChainId(destChain);
        const fee = await relayer.calculateRelayerFee(destChainId, address, decimals);
        return fee;
    }
    async getCurrentBlock() {
        if (!this.provider)
            throw new Error('no provider');
        const sequence = await this.provider.getLatestCheckpointSequenceNumber();
        return Number(sequence);
    }
    // MODIFIED FROM @certusone/wormhole-sdk
    // These differ in that they include an additional parameter to allow for caching of the `tokenBridgeStateFields`
    async getTokenCoinType(provider, tokenBridgeStateObjectId, tokenAddress, tokenChain, tokenBridgeStateFields) {
        tokenBridgeStateFields =
            tokenBridgeStateFields ||
                (await getObjectFields(provider, tokenBridgeStateObjectId));
        if (!tokenBridgeStateFields) {
            throw new Error('Unable to fetch object fields from token bridge state');
        }
        const coinTypes = tokenBridgeStateFields?.token_registry?.fields?.coin_types;
        const coinTypesObjectId = coinTypes?.fields?.id?.id;
        if (!coinTypesObjectId) {
            throw new Error('Unable to fetch coin types');
        }
        const keyType = getTableKeyType(coinTypes?.type);
        if (!keyType) {
            throw new Error('Unable to get key type');
        }
        const response = await provider.getDynamicFieldObject({
            parentId: coinTypesObjectId,
            name: {
                type: keyType,
                value: {
                    addr: [...tokenAddress],
                    chain: tokenChain,
                },
            },
        });
        if (response.error) {
            if (response.error.code === 'dynamicFieldNotFound') {
                return null;
            }
            throw new Error(`Unexpected getDynamicFieldObject response ${response.error}`);
        }
        const fields = getFieldsFromObjectResponse(response);
        return fields?.value ? trimSuiType(ensureHexPrefix(fields.value)) : null;
    }
    async getForeignAssetSui(provider, tokenBridgeStateObjectId, originChainId, originAddress, tokenBridgeStateFields) {
        return this.getTokenCoinType(provider, tokenBridgeStateObjectId, originAddress, originChainId, tokenBridgeStateFields);
    }
    async getWrappedNativeTokenId(chain) {
        return {
            address: SUI_TYPE_ARG,
            chain: 'sui',
        };
    }
}
//# sourceMappingURL=context.js.map