"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeiContext = void 0;
const wormhole_sdk_1 = require("@certusone/wormhole-sdk");
const cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const axios_1 = __importDefault(require("axios"));
const bs58_1 = __importDefault(require("bs58"));
const tx_1 = require("cosmjs-types/cosmwasm/wasm/v1/tx");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const types_1 = require("../../types");
const utils_2 = require("../../utils");
const tokenBridge_1 = require("../abstracts/tokenBridge");
const contracts_1 = require("./contracts");
const MSG_EXECUTE_CONTRACT_TYPE_URL = '/cosmwasm.wasm.v1.MsgExecuteContract';
const buildExecuteMsg = (sender, contract, msg, funds) => ({
    typeUrl: MSG_EXECUTE_CONTRACT_TYPE_URL,
    value: tx_1.MsgExecuteContract.fromPartial({
        sender: sender,
        contract: contract,
        msg: Buffer.from(JSON.stringify(msg)),
        funds,
    }),
});
/**
 * Implements token bridge transfers to and from Sei
 *
 * The Sei blockchain provides a feature through its `tokenfactory`
 * ([docs](https://github.com/sei-protocol/sei-chain/tree/master/x/tokenfactory))
 * module that allows the creation of native denominations through
 * a special message.
 *
 * In order to take leverage this feature to provide a native
 * counterpart to bridged assets, a special relayer contract called
 * "token translator" is deployed on Sei
 * (refer [here](https://github.com/wormhole-foundation/example-sei-token-translator/)
 * for the reference implementation)
 *
 * The translator contract works the same
 * way as relayers on other chains, although it uses a different payload
 * structure than the others and has no native drop off features.
 *
 * As an additional step to the bridge process, the translator contract receives
 * the tokens and locks them, minting to the actual recipient an equivalent
 * amount of the native denomination created through the tokenfactory module.
 * In order to transfer the tokens out of Sei, the user can then use the
 * `convert_and_transfer` message of the token translator contract, which will burn
 * the native denomination and send the locked CW20 tokens through the usual bridge process
 * The contract also offers a message that allows burning the native denomination
 * and receive the CW20 tokens back on a sei account, without going through
 * the bridging process, but such message is not implemented on WH Connect.
 *
 * A mayor drawback of this implementation is that the translator contract does not support
 * transferring native Sei assets (usei denom or cw20 tokens) in or out. For these cases,
 * the traditional token bridge process is used
 */
class SeiContext extends tokenBridge_1.TokenBridgeAbstract {
    constructor(context, foreignAssetCache) {
        super();
        this.context = context;
        this.type = types_1.Context.SEI;
        this.NATIVE_DENOM = 'usei';
        this.CHAIN = 'sei';
        this.REDEEM_EVENT_DEFAULT_MAX_BLOCKS = 2000;
        this.contracts = new contracts_1.SeiContracts(context);
        this.foreignAssetCache = foreignAssetCache;
    }
    async getTxGasFee(txId, chain) {
        throw new Error('not implemented');
    }
    async send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee = '0') {
        if (token === 'native')
            throw new Error('Native token not supported');
        const destContext = this.context.getContext(recipientChain);
        const targetChain = this.context.toChainId(recipientChain);
        const targetAddress = Buffer.from(destContext.formatAddress(recipientAddress)).toString('base64');
        const wrappedAssetAddress = await this.mustGetForeignAsset(token, sendingChain);
        const isNative = token.address === this.NATIVE_DENOM;
        let msgs = [];
        if (isNative) {
            msgs = this.createInitiateNativeTransferMessages(senderAddress, targetChain, targetAddress, relayerFee, amount);
        }
        else {
            const isTranslated = await this.isTranslatedToken(wrappedAssetAddress);
            msgs = isTranslated
                ? this.createConvertAndTransferMessage(senderAddress, targetChain, targetAddress, relayerFee, { denom: this.CW20AddressToFactory(wrappedAssetAddress), amount })
                : this.createInitiateTokenTransferMessages(senderAddress, targetChain, targetAddress, relayerFee, wrappedAssetAddress, amount);
        }
        // TODO: find a way to simulate
        const fee = (0, stargate_1.calculateFee)(1000000, '0.1usei');
        return {
            msgs,
            fee,
            memo: 'Wormhole - Initiate Transfer',
        };
    }
    async estimateSendGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress) {
        throw new Error('not implemented');
    }
    async estimateClaimGas(destChain, VAA) {
        throw new Error('not implemented');
    }
    /**
     * @param tokenAddress The cw20 token address
     * @returns Whether there exists a native denomination created by the translator contract for the given token
     */
    async isTranslatedToken(tokenAddress) {
        if (!this.context.conf.rest.sei)
            throw new Error('Sei rest not configured');
        const resp = await axios_1.default.get(`${new URL(this.context.conf.rest.sei)}sei-protocol/seichain/tokenfactory/denoms_from_creator/${this.getTranslatorAddress()}`);
        const denoms = resp.data.denoms || [];
        const encoded = this.CW20AddressToFactory(tokenAddress);
        return !!denoms.find((d) => d === encoded);
    }
    createInitiateNativeTransferMessages(senderAddress, targetChain, targetAddress, relayerFee, amount) {
        const tokenBridge = this.getTokenBridgeAddress();
        const nonce = Math.round(Math.random() * 100000);
        return [
            buildExecuteMsg(senderAddress, tokenBridge, {
                deposit_tokens: {},
            }, [{ denom: this.NATIVE_DENOM, amount }]),
            buildExecuteMsg(senderAddress, tokenBridge, {
                initiate_transfer: {
                    asset: {
                        amount,
                        info: { native_token: { denom: this.NATIVE_DENOM } },
                    },
                    recipient_chain: targetChain,
                    recipient: targetAddress,
                    fee: relayerFee,
                    nonce,
                },
            }),
        ];
    }
    createInitiateTokenTransferMessages(senderAddress, targetChain, targetAddress, relayerFee, tokenAddress, amount) {
        const tokenBridge = this.getTokenBridgeAddress();
        const nonce = Math.round(Math.random() * 1000000);
        return [
            buildExecuteMsg(senderAddress, tokenAddress, {
                increase_allowance: {
                    spender: tokenBridge,
                    amount,
                    expires: {
                        never: {},
                    },
                },
            }),
            buildExecuteMsg(senderAddress, tokenBridge, {
                initiate_transfer: {
                    asset: {
                        amount,
                        info: { token: { contract_addr: tokenAddress } },
                    },
                    recipient_chain: targetChain,
                    recipient: targetAddress,
                    fee: relayerFee,
                    nonce,
                },
            }),
        ];
    }
    createConvertAndTransferMessage(senderAddress, targetChain, targetAddress, relayerFee, coin) {
        return [
            buildExecuteMsg(senderAddress, this.getTranslatorAddress(), {
                convert_and_transfer: {
                    recipient_chain: targetChain,
                    recipient: targetAddress,
                    fee: relayerFee,
                },
            }, [coin]),
        ];
    }
    getTranslatorAddress() {
        const { seiTokenTranslator: translatorAddress } = this.contracts.mustGetContracts('sei');
        if (!translatorAddress)
            throw new Error('no translator address found');
        return translatorAddress;
    }
    getTokenBridgeAddress() {
        const { token_bridge: tokenBridge } = this.contracts.mustGetContracts('sei');
        if (!tokenBridge)
            throw new Error('no token bridge found');
        return tokenBridge;
    }
    parseRelayerPayload(payload) {
        const body = JSON.parse(payload.toString());
        const recipientAddress = Buffer.from(body.basic_recipient.recipient, 'base64').toString();
        return {
            relayerPayloadId: 0,
            to: (0, utils_1.hexlify)(this.formatAddress(recipientAddress)),
            relayerFee: ethers_1.BigNumber.from(0),
            toNativeTokenAmount: ethers_1.BigNumber.from(0),
        };
    }
    async sendWithRelay(token, amount, toNativeToken, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee) {
        throw new Error('Method not implemented.');
    }
    sendWithPayload(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, payload) {
        throw new Error('Method not implemented.');
    }
    formatAddress(address) {
        return (0, utils_1.arrayify)((0, utils_1.zeroPad)(wormhole_sdk_1.cosmos.canonicalAddress(address), 32));
    }
    parseAddress(address) {
        const addr = typeof address === 'string' && address.startsWith('0x')
            ? Buffer.from((0, utils_1.hexStripZeros)(address).substring(2), 'hex')
            : address;
        return wormhole_sdk_1.cosmos.humanAddress('sei', addr);
    }
    /**
     * @param addressOrDenom CW20 token address or bank denomination
     * @returns The external address associated with the asset address
     */
    async formatAssetAddress(addressOrDenom) {
        if (addressOrDenom === this.NATIVE_DENOM) {
            return Buffer.from(this.buildNativeId(), 'hex');
        }
        // TODO: I think this is not how the external id is calculated
        // see getOriginalAsset for other cosmos chains in the sdk
        const cw20Address = addressOrDenom.startsWith('factory')
            ? this.factoryToCW20(addressOrDenom)
            : addressOrDenom;
        return (0, utils_1.zeroPad)(wormhole_sdk_1.cosmos.canonicalAddress(cw20Address), 32);
    }
    buildNativeId() {
        return ('01' + (0, utils_1.keccak256)(Buffer.from(this.NATIVE_DENOM, 'utf-8')).substring(4));
    }
    /**
     * Builds the information required to send the tokens through the translator
     * contract relay process in order to receive a native denomination on the Sei chain
     *
     * @param token The token or native coin to send
     * @param recipient The final recipient address
     * @returns The receiver and payload necessary to send
     * the tokens through the translator contract relay
     */
    async buildSendPayload(token, recipient) {
        // if the token is originally from sei (e.g. native denom or cw20 token)
        // then it has to go through the token bridge and not the translator contract
        if (token !== 'native' && token.chain === 'sei') {
            return {};
        }
        return {
            receiver: this.getTranslatorAddress(),
            payload: new Uint8Array(Buffer.from(JSON.stringify({
                basic_recipient: {
                    recipient: Buffer.from(recipient).toString('base64'),
                },
            }))),
        };
    }
    /**
     * @param externalId The asset's external id
     * @returns The asset's CW20 token address or the bank denomination associated with the external address
     */
    async parseAssetAddress(externalId) {
        const info = await this.queryExternalId(externalId);
        if (!info)
            throw new Error('Asset not found');
        const { address, isDenom } = info;
        if (isDenom)
            return address;
        const isTranslated = await this.isTranslatedToken(address);
        return isTranslated
            ? this.CW20AddressToFactory(address)
            : this.parseAddress(address);
    }
    /**
     * @param externalId An external id representing an asset
     * @returns Information about the asset including its address/denom and whether it is native to this chain
     */
    async queryExternalId(externalId) {
        const wasmClient = await this.getCosmWasmClient();
        const { token_bridge: tokenBridgeAddress } = await this.contracts.mustGetContracts(this.CHAIN);
        if (!tokenBridgeAddress)
            throw new Error('Token bridge contract not found');
        try {
            const response = await wasmClient.queryContractSmart(tokenBridgeAddress, {
                external_id: {
                    external_id: Buffer.from((0, utils_2.stripHexPrefix)(externalId), 'hex').toString('base64'),
                },
            });
            if (response.token_id.Bank) {
                return {
                    isNative: true,
                    isDenom: true,
                    address: response.token_id.Bank.denom,
                };
            }
            if (response.token_id.Contract?.NativeCW20) {
                return {
                    isNative: true,
                    isDenom: false,
                    address: response.token_id.Contract.NativeCW20.contract_address,
                };
            }
            if (response.token_id.Contract?.ForeignToken) {
                return {
                    isNative: false,
                    isDenom: false,
                    address: response.token_id.Contract.ForeignToken.foreign_address,
                };
            }
            return null;
        }
        catch {
            return null;
        }
    }
    async getOriginalAssetSei(wrappedAddress) {
        const chainId = wormhole_sdk_1.CHAIN_ID_SEI;
        if ((0, wormhole_sdk_1.isNativeCosmWasmDenom)(chainId, wrappedAddress)) {
            return {
                isWrapped: false,
                chainId,
                assetAddress: (0, wormhole_sdk_1.hexToUint8Array)((0, wormhole_sdk_1.buildTokenId)(chainId, wrappedAddress)),
            };
        }
        try {
            const client = await this.getCosmWasmClient();
            const response = await client.queryContractSmart(wrappedAddress, {
                wrapped_asset_info: {},
            });
            return {
                isWrapped: true,
                chainId: response.asset_chain,
                assetAddress: new Uint8Array(Buffer.from(response.asset_address, 'base64')),
            };
        }
        catch { }
        return {
            isWrapped: false,
            chainId: chainId,
            assetAddress: (0, wormhole_sdk_1.hexToUint8Array)((0, wormhole_sdk_1.buildTokenId)(chainId, wrappedAddress)),
        };
    }
    async getForeignAsset(tokenId, chain) {
        const chainName = this.context.toChainName(chain);
        if (this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName)) {
            return this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName);
        }
        const toChainId = this.context.toChainId(chain);
        const chainId = this.context.toChainId(tokenId.chain);
        if (toChainId === chainId)
            return tokenId.address;
        const wasmClient = await this.getCosmWasmClient();
        const { token_bridge: tokenBridgeAddress } = await this.contracts.mustGetContracts(this.CHAIN);
        if (!tokenBridgeAddress)
            throw new Error('Token bridge contract not found');
        const sourceContext = this.context.getContext(tokenId.chain);
        const tokenAddr = await sourceContext.formatAssetAddress(tokenId.address);
        const base64Addr = Buffer.from(tokenAddr).toString('base64');
        try {
            const { address } = await wasmClient.queryContractSmart(tokenBridgeAddress, {
                wrapped_registry: {
                    chain: chainId,
                    address: base64Addr,
                },
            });
            this.foreignAssetCache.set(tokenId.chain, tokenId.address, chainName, address);
            return address;
        }
        catch (e) {
            return null;
        }
    }
    async mustGetForeignAsset(tokenId, chain) {
        const assetAdddress = await this.getForeignAsset(tokenId, chain);
        if (!assetAdddress)
            throw new Error('token not registered');
        return assetAdddress;
    }
    /**
     * Search for a specific piece of information emitted by the contracts during the transaction
     * For example: to retrieve the bridge transfer recipient, we would have to look
     * for the "transfer.recipient" under the "wasm" event
     */
    searchLogs(key, logs) {
        for (const log of logs) {
            for (const ev of log.events) {
                for (const attr of ev.attributes) {
                    if (attr.key === key) {
                        return attr.value;
                    }
                }
            }
        }
        return null;
    }
    async getMessage(id, chain, parseRelayerPayload = true) {
        const client = await this.getCosmWasmClient();
        const tx = await client.getTx(id);
        if (!tx)
            throw new Error('tx not found');
        // parse logs emitted for the tx execution
        const logs = stargate_1.logs.parseRawLog(tx.rawLog);
        // extract information wormhole contract logs
        // - message.message: the vaa payload (i.e. the transfer information)
        // - message.sequence: the vaa's sequence number
        // - message.sender: the vaa's emitter address
        const tokenTransferPayload = this.searchLogs('message.message', logs);
        if (!tokenTransferPayload)
            throw new Error('message/transfer payload not found');
        const sequence = this.searchLogs('message.sequence', logs);
        if (!sequence)
            throw new Error('sequence not found');
        const emitterAddress = this.searchLogs('message.sender', logs);
        if (!emitterAddress)
            throw new Error('emitter not found');
        const parsed = (0, wormhole_sdk_1.parseTokenTransferPayload)(Buffer.from(tokenTransferPayload, 'hex'));
        const decoded = (0, proto_signing_1.decodeTxRaw)(tx.tx);
        const { sender } = tx_1.MsgExecuteContract.decode(decoded.body.messages[0].value);
        const destContext = this.context.getContext(parsed.toChain);
        const tokenContext = this.context.getContext(parsed.tokenChain);
        const tokenAddress = await tokenContext.parseAssetAddress((0, utils_1.hexlify)(parsed.tokenAddress));
        const tokenChain = this.context.toChainName(parsed.tokenChain);
        return {
            sendTx: tx.hash,
            sender,
            amount: ethers_1.BigNumber.from(parsed.amount),
            payloadID: parsed.payloadType,
            recipient: destContext.parseAddress((0, utils_1.hexlify)(parsed.to)),
            toChain: this.context.toChainName(parsed.toChain),
            fromChain: this.context.toChainName(chain),
            tokenAddress,
            tokenChain,
            tokenId: {
                address: tokenAddress,
                chain: tokenChain,
            },
            sequence: ethers_1.BigNumber.from(sequence),
            emitterAddress,
            block: tx.height,
            gasFee: ethers_1.BigNumber.from(tx.gasUsed),
            payload: parsed.tokenTransferPayload.length
                ? (0, utils_1.hexlify)(parsed.tokenTransferPayload)
                : undefined,
        };
    }
    async getNativeBalance(walletAddress, chain) {
        return this.getDenomBalance(walletAddress, this.NATIVE_DENOM);
    }
    async getTokenBalance(walletAddress, tokenId, chain) {
        const assetAddress = await this.getForeignAsset(tokenId, chain);
        if (!assetAddress)
            return null;
        if (assetAddress === this.NATIVE_DENOM) {
            return this.getNativeBalance(walletAddress, chain);
        }
        const isTranslated = await this.isTranslatedToken(assetAddress);
        if (isTranslated) {
            return this.getDenomBalance(walletAddress, this.CW20AddressToFactory(assetAddress));
        }
        const client = await this.getCosmWasmClient();
        const { balance } = await client.queryContractSmart(assetAddress, {
            balance: { address: walletAddress },
        });
        return ethers_1.BigNumber.from(balance);
    }
    async getTokenBalances(walletAddr, tokenIds, chain) {
        return await Promise.all(tokenIds.map((tokenId) => this.getTokenBalance(walletAddr, tokenId, chain)));
    }
    async getDenomBalance(walletAddress, denom) {
        const client = await this.getCosmWasmClient();
        const { amount } = await client.getBalance(walletAddress, denom);
        return ethers_1.BigNumber.from(amount);
    }
    CW20AddressToFactory(address) {
        const encodedAddress = bs58_1.default.encode(wormhole_sdk_1.cosmos.canonicalAddress(address));
        return `factory/${this.getTranslatorAddress()}/${encodedAddress}`;
    }
    factoryToCW20(denom) {
        if (!denom.startsWith('factory/'))
            return '';
        const encoded = denom.split('/')[2];
        if (!encoded)
            return '';
        return wormhole_sdk_1.cosmos.humanAddress('sei', bs58_1.default.decode(encoded));
    }
    async redeem(destChain, signedVAA, overrides, payerAddr) {
        const vaa = (0, wormhole_sdk_1.parseVaa)(signedVAA);
        const transfer = (0, wormhole_sdk_1.parseTokenTransferPayload)(vaa.payload);
        // transfer to comes as a 32 byte array, but cosmos addresses are 20 bytes
        const recipient = wormhole_sdk_1.cosmos.humanAddress('sei', transfer.to.slice(12));
        const msgs = recipient === this.getTranslatorAddress()
            ? [
                buildExecuteMsg(payerAddr || recipient, this.getTranslatorAddress(), {
                    complete_transfer_and_convert: {
                        vaa: utils_1.base64.encode(signedVAA),
                    },
                }),
            ]
            : [
                buildExecuteMsg(payerAddr || recipient, this.getTokenBridgeAddress(), {
                    submit_vaa: {
                        data: utils_1.base64.encode(signedVAA),
                    },
                }),
            ];
        const fee = (0, stargate_1.calculateFee)(1000000, '0.1usei');
        return {
            msgs,
            fee,
            memo: 'Wormhole - Complete Transfer',
        };
    }
    async fetchRedeemedEvent(emitterChainId, emitterAddress, sequence) {
        // search a max of blocks backwards, amplify the search only if nothing was found
        let res = await this.fetchRedeemedEventInner(emitterChainId, emitterAddress, sequence, this.REDEEM_EVENT_DEFAULT_MAX_BLOCKS);
        if (!res) {
            res = await this.fetchRedeemedEventInner(emitterChainId, emitterAddress, sequence);
        }
        return res;
    }
    async fetchRedeemedEventInner(emitterChainId, emitterAddress, sequence, maxBlocks) {
        const client = await this.getCosmWasmClient();
        // there is no direct way to find the transaction through the chain/emitter/sequence identificator
        // so we need to search for all the transactions that completed a transfer
        // and pick out the one which has a VAA parameter that matches the chain/emitter/sequence we need
        const txs = await client.searchTx([
            {
                key: 'wasm.action',
                value: 'complete_transfer_wrapped',
            },
        ]);
        for (const tx of txs) {
            const decoded = (0, proto_signing_1.decodeTxRaw)(tx.tx);
            for (const msg of decoded.body.messages) {
                if (msg.typeUrl === MSG_EXECUTE_CONTRACT_TYPE_URL) {
                    const parsed = tx_1.MsgExecuteContract.decode(msg.value);
                    const instruction = JSON.parse(Buffer.from(parsed.msg).toString());
                    const base64Vaa = instruction?.complete_transfer_and_convert?.vaa;
                    if (base64Vaa) {
                        const vaa = (0, wormhole_sdk_1.parseVaa)(utils_1.base64.decode(base64Vaa));
                        if (vaa.emitterChain === emitterChainId &&
                            (0, utils_1.hexlify)(vaa.emitterAddress) === emitterAddress &&
                            vaa.sequence === BigInt(sequence)) {
                            return tx.hash;
                        }
                    }
                }
            }
        }
        return null;
    }
    async isTransferCompleted(destChain, signedVaa) {
        const { token_bridge: tokenBridgeAddress } = this.contracts.mustGetContracts(this.CHAIN);
        if (!tokenBridgeAddress)
            throw new Error('Token bridge contract not found');
        const client = await this.getCosmWasmClient();
        const result = await client.queryContractSmart(tokenBridgeAddress, {
            is_vaa_redeemed: {
                vaa: utils_1.base64.encode((0, utils_1.arrayify)(signedVaa)),
            },
        });
        return result.is_redeemed;
    }
    async fetchTokenDecimals(tokenAddr, chain) {
        if (tokenAddr === this.NATIVE_DENOM)
            return 6;
        const client = await this.getCosmWasmClient();
        const { decimals } = await client.queryContractSmart(tokenAddr, {
            token_info: {},
        });
        return decimals;
    }
    async getCosmWasmClient() {
        if (!this.wasmClient) {
            if (!this.context.conf.rpcs.sei)
                throw new Error('Sei RPC not configured');
            this.wasmClient = await cosmwasm_stargate_1.CosmWasmClient.connect(this.context.conf.rpcs.sei);
        }
        return this.wasmClient;
    }
    async calculateNativeTokenAmt(destChain, tokenId, amount, walletAddress) {
        return ethers_1.BigNumber.from(0);
    }
    async getCurrentBlock() {
        const client = await this.getCosmWasmClient();
        return client.getHeight();
    }
    async getWrappedNativeTokenId(chain) {
        throw new Error('not implemented');
    }
}
exports.SeiContext = SeiContext;
//# sourceMappingURL=context.js.map