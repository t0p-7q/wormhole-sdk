import { BigNumber } from 'ethers';
import { NATIVE, Context, } from '../../types';
import { TokenBridgeAbstract } from '../abstracts/tokenBridge';
import { AptosContracts } from './contracts';
import { AptosClient, CoinClient, Types } from 'aptos';
import { getForeignAssetAptos, getIsTransferCompletedAptos, getTypeFromExternalAddress, hexToUint8Array, isValidAptosType, parseTokenTransferPayload, redeemOnAptos, transferFromAptos, } from '@certusone/wormhole-sdk';
import { arrayify, hexlify, stripZeros, zeroPad } from 'ethers/lib/utils';
import { sha3_256 } from 'js-sha3';
import axios from 'axios';
export const APTOS_COIN = '0x1::aptos_coin::AptosCoin';
export class AptosContext extends TokenBridgeAbstract {
    constructor(context, foreignAssetCache) {
        super();
        this.type = Context.APTOS;
        this.context = context;
        const rpc = context.conf.rpcs.aptos;
        if (rpc === undefined)
            throw new Error('No Aptos rpc configured');
        this.aptosClient = new AptosClient(rpc);
        this.coinClient = new CoinClient(this.aptosClient);
        this.contracts = new AptosContracts(context, this.aptosClient);
        this.foreignAssetCache = foreignAssetCache;
    }
    async getTxGasFee(txId, chain) {
        const txn = await this.aptosClient.getTransactionByHash(txId);
        if (txn.type === 'user_transaction') {
            const userTxn = txn;
            return BigNumber.from(userTxn.gas_used).mul(userTxn.gas_unit_price);
        }
    }
    async send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee = '0') {
        return this.innerSend(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee, undefined);
    }
    async sendWithPayload(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, payload) {
        return this.innerSend(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, undefined, payload);
    }
    async estimateSendGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress) {
        // TODO: the account's public key is needed for AptosClient.simulateTransaction
        // throw error so it goes to the fallback value
        throw new Error('not implemented');
    }
    async estimateClaimGas(destChain, VAA) {
        // TODO: the account's public key is needed for AptosClient.simulateTransaction
        // throw error so it goes to the fallback value
        throw new Error('not implemented');
    }
    async innerSend(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee = '0', payload) {
        const destContext = this.context.getContext(recipientChain);
        const recipientChainId = this.context.toChainId(recipientChain);
        const formattedRecipientAccount = arrayify(destContext.formatAddress(recipientAddress));
        let coinType;
        if (token === NATIVE) {
            coinType = APTOS_COIN;
        }
        else {
            coinType = await this.mustGetForeignAsset(token, sendingChain);
        }
        const tx = transferFromAptos(this.contracts.mustGetBridge(sendingChain), coinType, amount, recipientChainId, formattedRecipientAccount, relayerFee, payload);
        return tx;
    }
    formatAddress(address) {
        return arrayify(zeroPad(address, 32));
    }
    parseAddress(address) {
        return hexlify(stripZeros(address));
    }
    async formatAssetAddress(address) {
        if (!isValidAptosType(address)) {
            throw new Error(`Unable to format Aptos asset address: ${address}`);
        }
        return hexToUint8Array(sha3_256(address));
    }
    async parseAssetAddress(address) {
        const bridge = this.contracts.mustGetBridge('aptos');
        const assetType = await getTypeFromExternalAddress(this.aptosClient, bridge, address);
        if (!assetType)
            throw new Error(`Unable to parse Aptos asset address: ${address}`);
        return assetType;
    }
    async getForeignAsset(tokenId, chain) {
        const chainName = this.context.toChainName(chain);
        if (this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName)) {
            return this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName);
        }
        const chainId = this.context.toChainId(tokenId.chain);
        const toChainId = this.context.toChainId(chain);
        if (toChainId === chainId)
            return tokenId.address;
        const { token_bridge } = this.context.mustGetContracts(chain);
        if (!token_bridge)
            throw new Error('token bridge contract not found');
        const tokenContext = this.context.getContext(tokenId.chain);
        const formattedAddr = await tokenContext.formatAssetAddress(tokenId.address);
        const asset = await getForeignAssetAptos(this.aptosClient, token_bridge, chainId, hexlify(formattedAddr));
        if (!asset)
            return null;
        this.foreignAssetCache.set(tokenId.chain, tokenId.address, chainName, asset);
        return asset;
    }
    async mustGetForeignAsset(tokenId, chain) {
        const addr = await this.getForeignAsset(tokenId, chain);
        if (!addr)
            throw new Error('token not registered');
        return addr;
    }
    async fetchTokenDecimals(tokenAddr, chain) {
        const coinType = `0x1::coin::CoinInfo<${tokenAddr}>`;
        const decimals = (await this.aptosClient.getAccountResource(tokenAddr.split('::')[0], coinType)).data.decimals;
        return decimals;
    }
    async getMessage(tx, chain, parseRelayerPayload = true) {
        const transaction = await this.aptosClient.getTransactionByHash(tx);
        if (transaction.type !== 'user_transaction') {
            throw new Error(`${tx} is not a user_transaction`);
        }
        const userTransaction = transaction;
        const message = userTransaction.events.find((event) => event.type.endsWith('WormholeMessage'));
        if (!message || !message.data) {
            throw new Error(`WormholeMessage not found for ${tx}`);
        }
        const { payload, sender, sequence } = message.data;
        const parsed = parseTokenTransferPayload(Buffer.from(payload.slice(2), 'hex'));
        const tokenContext = this.context.getContext(parsed.tokenChain);
        const destContext = this.context.getContext(parsed.toChain);
        const tokenAddress = await tokenContext.parseAssetAddress(hexlify(parsed.tokenAddress));
        const tokenChain = this.context.toChainName(parsed.tokenChain);
        // make sender address even-length
        const emitter = hexlify(sender, {
            allowMissingPrefix: true,
            hexPad: 'left',
        });
        const parsedMessage = {
            sendTx: userTransaction.hash,
            sender: userTransaction.sender,
            amount: BigNumber.from(parsed.amount),
            payloadID: Number(parsed.payloadType),
            recipient: destContext.parseAddress(hexlify(parsed.to)),
            toChain: this.context.toChainName(parsed.toChain),
            fromChain: this.context.toChainName(chain),
            tokenAddress,
            tokenChain,
            tokenId: {
                chain: tokenChain,
                address: tokenAddress,
            },
            sequence: BigNumber.from(sequence),
            emitterAddress: hexlify(this.formatAddress(emitter)),
            block: Number(userTransaction.version),
            gasFee: BigNumber.from(userTransaction.gas_used).mul(userTransaction.gas_unit_price),
            payload: parsed.tokenTransferPayload.length
                ? hexlify(parsed.tokenTransferPayload)
                : undefined,
        };
        return parsedMessage;
    }
    async getNativeBalance(walletAddress, chain) {
        return await this.checkBalance(walletAddress, APTOS_COIN);
    }
    async getTokenBalance(walletAddress, tokenId, chain) {
        const address = await this.getForeignAsset(tokenId, chain);
        if (!address)
            return null;
        const balance = await this.checkBalance(walletAddress, address);
        return balance ? BigNumber.from(balance) : null;
    }
    async getTokenBalances(walletAddress, tokenIds, chain) {
        const addresses = await Promise.all(tokenIds.map((tokenId) => this.getForeignAsset(tokenId, chain)));
        let coinBalances = [];
        let offset = 0;
        const limit = 100;
        while (true) {
            const result = await this.fetchCurrentCoins(walletAddress, offset, limit);
            coinBalances = [...coinBalances, ...result.data.current_coin_balances];
            if (result.data.current_coin_balances.length < limit) {
                break;
            }
            offset += result.data.current_coin_balances.length;
        }
        return addresses.map((address) => !address
            ? null
            : BigNumber.from(coinBalances.find((bal) => bal.coin_type === address)?.amount || 0));
    }
    async checkBalance(walletAddress, coinType) {
        try {
            const balance = await this.coinClient.checkBalance(walletAddress, {
                coinType,
            });
            return BigNumber.from(balance);
        }
        catch (e) {
            if ((e instanceof Types.ApiError || e.errorCode === 'resource_not_found') &&
                e.status === 404) {
                return BigNumber.from(0);
            }
            throw e;
        }
    }
    async fetchCurrentCoins(ownerAddress, offset, limit) {
        if (!this.context.conf.graphql.aptos)
            throw new Error('Aptos graphql not configured');
        const response = await axios.post(this.context.conf.graphql.aptos, {
            query: `query CurrentCoinBalances($owner_address: String, $offset: Int, $limit: Int) {
        current_coin_balances(
          where: {owner_address: {_eq: $owner_address}} 
          offset: $offset
          limit: $limit
        ) {
          coin_type
          amount
        }
      }`,
            variables: { owner_address: ownerAddress, offset, limit },
        });
        return response.data;
    }
    async redeem(destChain, signedVAA, overrides, payerAddr) {
        const payload = await redeemOnAptos(this.aptosClient, this.contracts.mustGetBridge(destChain), signedVAA);
        return payload;
    }
    async isTransferCompleted(destChain, signedVaa) {
        return await getIsTransferCompletedAptos(this.aptosClient, this.contracts.mustGetBridge(destChain), arrayify(signedVaa, { allowMissingPrefix: true }));
    }
    getTxIdFromReceipt(hash) {
        return hash;
    }
    parseRelayerPayload(payload) {
        throw new Error('relaying is not supported on aptos');
    }
    async getCurrentBlock() {
        throw new Error('Aptos getCurrentBlock not implemented');
    }
    async getWrappedNativeTokenId(chain) {
        return {
            address: APTOS_COIN,
            chain: 'aptos',
        };
    }
}
//# sourceMappingURL=context.js.map