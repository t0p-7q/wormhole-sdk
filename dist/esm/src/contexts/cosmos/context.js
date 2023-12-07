import { CHAIN_ID_WORMCHAIN, cosmos, hexToUint8Array, isNativeCosmWasmDenom, parseTokenTransferPayload, parseVaa, } from '@certusone/wormhole-sdk';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { QueryClient, calculateFee, setupBankExtension, setupIbcExtension, } from '@cosmjs/stargate';
import { Tendermint34Client, Tendermint37Client, } from '@cosmjs/tendermint-rpc';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { BigNumber, utils } from 'ethers';
import { arrayify, base58, base64, hexStripZeros, keccak256, zeroPad, } from 'ethers/lib/utils';
import { Context, } from '../../types';
import { waitFor } from '../../utils';
import { TokenBridgeAbstract } from '../abstracts/tokenBridge';
import { CosmosContracts } from './contracts';
import { getNativeDenom, getPrefix, isNativeDenom } from './denom';
import { isGatewayChain } from './utils';
const MSG_EXECUTE_CONTRACT_TYPE_URL = '/cosmwasm.wasm.v1.MsgExecuteContract';
const buildExecuteMsg = (sender, contract, msg, funds) => ({
    typeUrl: MSG_EXECUTE_CONTRACT_TYPE_URL,
    value: MsgExecuteContract.fromPartial({
        sender: sender,
        contract: contract,
        msg: Buffer.from(JSON.stringify(msg)),
        funds,
    }),
});
const IBC_PORT = 'transfer';
export class CosmosContext extends TokenBridgeAbstract {
    constructor(context, chain, foreignAssetCache) {
        super();
        this.type = Context.COSMOS;
        this.context = context;
        this.contracts = new CosmosContracts(context);
        this.chain = chain;
        this.foreignAssetCache = foreignAssetCache;
    }
    async getTxGasFee(txId, chain) {
        const client = await this.getCosmWasmClient(chain);
        const transaction = await client.getTx(txId);
        return BigNumber.from(transaction?.gasUsed || 0);
    }
    send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee) {
        throw new Error('Method not implemented.');
    }
    sendWithPayload(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, payload) {
        throw new Error('Method not implemented.');
    }
    async estimateSendGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress) {
        throw new Error('not implemented');
    }
    async estimateClaimGas(destChain, VAA) {
        throw new Error('not implemented');
    }
    formatAddress(address) {
        return arrayify(zeroPad(cosmos.canonicalAddress(address), 32));
    }
    parseAddress(address) {
        const prefix = getPrefix(this.chain);
        const addr = typeof address === 'string' && address.startsWith('0x')
            ? Buffer.from(hexStripZeros(address).substring(2), 'hex')
            : address;
        return cosmos.humanAddress(prefix, addr);
    }
    async formatAssetAddress(address) {
        return Buffer.from(this.buildTokenId(address), 'hex');
    }
    buildTokenId(asset) {
        const chainId = this.context.toChainId(this.chain);
        const isNative = isNativeCosmWasmDenom(chainId, asset);
        return ((isNative ? '01' : '00') +
            keccak256(Buffer.from(asset, 'utf-8')).substring(4));
    }
    async parseAssetAddress(address) {
        const prefix = getPrefix(this.chain);
        const addr = typeof address === 'string' && address.startsWith('0x')
            ? Buffer.from(hexStripZeros(address).substring(2), 'hex')
            : address;
        return cosmos.humanAddress(prefix, addr);
    }
    async getForeignAsset(tokenId, chain) {
        const chainName = this.context.toChainName(chain);
        if (this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName)) {
            return this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName);
        }
        const address = this.context.toChainId(chain) === CHAIN_ID_WORMCHAIN
            ? await this.getWhForeignAsset(tokenId, chain)
            : await this.getGatewayForeignAsset(tokenId, chain);
        if (!address)
            return null;
        this.foreignAssetCache.set(tokenId.chain, tokenId.address, chainName, address);
        return address;
    }
    async getGatewayForeignAsset(tokenId, chain) {
        // add check here in case the token is a native cosmos denom
        // in such cases there's no need to look for in the wormchain network
        if (tokenId.chain === chain)
            return tokenId.address;
        const wrappedAsset = await this.getWhForeignAsset(tokenId, CHAIN_ID_WORMCHAIN);
        if (!wrappedAsset)
            return null;
        return this.isNativeDenom(wrappedAsset, chain)
            ? wrappedAsset
            : this.deriveIBCDenom(this.CW20AddressToFactory(wrappedAsset), chain);
    }
    CW20AddressToFactory(address) {
        const encodedAddress = base58.encode(cosmos.canonicalAddress(address));
        return `factory/${this.getTranslatorAddress()}/${encodedAddress}`;
    }
    getTranslatorAddress() {
        const addr = this.context.conf.chains['wormchain']?.contracts.ibcShimContract;
        if (!addr)
            throw new Error('IBC Shim contract not configured');
        return addr;
    }
    async deriveIBCDenom(denom, chain) {
        const channel = await this.getIbcDestinationChannel(chain);
        const hashData = utils.hexlify(Buffer.from(`transfer/${channel}/${denom}`));
        const hash = utils.sha256(hashData).substring(2);
        return `ibc/${hash.toUpperCase()}`;
    }
    async getIbcDestinationChannel(chain) {
        const sourceChannel = await this.getIbcSourceChannel(chain);
        const queryClient = await this.getQueryClient(CHAIN_ID_WORMCHAIN);
        const conn = await queryClient.ibc.channel.channel(IBC_PORT, sourceChannel);
        const destChannel = conn.channel?.counterparty?.channelId;
        if (!destChannel) {
            throw new Error(`No destination channel found on chain ${chain}`);
        }
        return destChannel;
    }
    async getIbcSourceChannel(chain) {
        const id = this.context.toChainId(chain);
        if (!isGatewayChain(id))
            throw new Error(`Chain ${chain} is not a gateway chain`);
        const client = await this.getCosmWasmClient(CHAIN_ID_WORMCHAIN);
        const { channel } = await client.queryContractSmart(this.getTranslatorAddress(), {
            ibc_channel: {
                chain_id: id,
            },
        });
        return channel;
    }
    isNativeDenom(denom, chain) {
        const chainName = this.context.toChainName(chain);
        return isNativeDenom(denom, chainName);
    }
    async getWhForeignAsset(tokenId, chain) {
        const toChainId = this.context.toChainId(chain);
        const chainId = this.context.toChainId(tokenId.chain);
        if (toChainId === chainId)
            return tokenId.address;
        const wasmClient = await this.getCosmWasmClient(chain);
        const { token_bridge: tokenBridgeAddress } = await this.contracts.mustGetContracts(chain);
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
    async getNativeBalance(walletAddress, chain, asset) {
        const name = this.context.toChainName(chain);
        const client = await this.getCosmWasmClient(name);
        const { amount } = await client.getBalance(walletAddress, asset || getNativeDenom(name, this.context.conf.env));
        return BigNumber.from(amount);
    }
    async getTokenBalance(walletAddress, tokenId, chain) {
        const assetAddress = await this.getForeignAsset(tokenId, chain);
        if (!assetAddress)
            return null;
        return this.getNativeBalance(walletAddress, chain, assetAddress);
    }
    async getTokenBalances(walletAddress, tokenIds, chain) {
        const assetAddresses = await Promise.all(tokenIds.map((tokenId) => this.getForeignAsset(tokenId, chain)));
        const client = await this.getQueryClient(chain);
        const balances = await client.bank.allBalances(walletAddress);
        return assetAddresses.map((assetAddress) => {
            const balance = balances.find((balance) => balance.denom === assetAddress);
            return balance ? BigNumber.from(balance.amount) : null;
        });
    }
    async redeem(destChain, signedVAA, overrides, payerAddr) {
        const chainName = this.context.toChainName(destChain);
        const vaa = parseVaa(signedVAA);
        const transfer = parseTokenTransferPayload(vaa.payload);
        const denom = getNativeDenom(chainName, this.context.conf.env);
        const prefix = getPrefix(chainName);
        // transfer to comes as a 32 byte array, but cosmos addresses are 20 bytes
        const recipient = cosmos.humanAddress(prefix, transfer.to.slice(12));
        const msgs = [
            buildExecuteMsg(payerAddr || recipient, this.getTokenBridgeAddress(chainName), {
                submit_vaa: {
                    data: base64.encode(signedVAA),
                },
            }),
        ];
        const fee = calculateFee(1000000, `0.1${denom}`);
        return {
            msgs,
            fee,
            memo: 'Wormhole - Complete Transfer',
        };
    }
    async isTransferCompleted(destChain, signedVaa) {
        const { token_bridge: tokenBridgeAddress } = this.contracts.mustGetContracts(this.chain);
        if (!tokenBridgeAddress)
            throw new Error('Token bridge contract not found');
        const client = await this.getCosmWasmClient(destChain);
        const result = await client.queryContractSmart(tokenBridgeAddress, {
            is_vaa_redeemed: {
                vaa: base64.encode(arrayify(signedVaa)),
            },
        });
        return result.is_redeemed;
    }
    async fetchTokenDecimals(tokenAddr, chain) {
        const name = this.context.toChainName(chain);
        if (tokenAddr === getNativeDenom(name, this.context.conf.env)) {
            const config = this.context.conf.chains[name];
            if (!config)
                throw new Error(`Config not found for chain ${chain}`);
            return config.nativeTokenDecimals;
        }
        // extract the cw20 from the ibc denom if the target chain is not wormchain
        const cw20 = name === 'wormchain'
            ? tokenAddr
            : await this.ibcDenomToCW20(tokenAddr, chain);
        const client = await this.getCosmWasmClient(CHAIN_ID_WORMCHAIN);
        const { decimals } = await client.queryContractSmart(cw20, {
            token_info: {},
        });
        return decimals;
    }
    async ibcDenomToCW20(denom, chain) {
        const client = await this.getQueryClient(chain);
        let res;
        try {
            res = await client.ibc.transfer.denomTrace(denom);
        }
        catch (e) {
            if (e.message.includes('denomination trace not found')) {
                throw new Error(`denom trace for ${denom} not found`);
            }
            throw e;
        }
        if (!res.denomTrace)
            throw new Error(`denom trace for ${denom} not found`);
        const { baseDenom } = res.denomTrace;
        const parts = baseDenom.split('/');
        if (parts.length !== 3)
            throw new Error(`Can't convert ${denom} to cw20 address`);
        const [, , address] = parts;
        return cosmos.humanAddress('wormhole', base58.decode(address));
    }
    async getMessage(id, chain, parseRelayerPayload = true) {
        // see the gateway route for the implementation
        // we might not have all information available in the parameters
        // to do it here
        throw new Error('Not implemented. Something went wrong, this method implementation should never be called');
    }
    parseRelayerPayload(payload) {
        return {
            relayerPayloadId: 0,
            to: '',
            relayerFee: BigNumber.from(0),
            toNativeTokenAmount: BigNumber.from(0),
        };
    }
    async getQueryClient(chain) {
        const tmClient = await this.getTmClient(chain);
        return QueryClient.withExtensions(tmClient, setupBankExtension, setupIbcExtension);
    }
    async getTmClient(chain) {
        await waitFor(async () => CosmosContext.FETCHING_TM_CLIENT === false);
        const name = this.context.toChainName(chain);
        if (CosmosContext.CLIENT_MAP[name]) {
            return CosmosContext.CLIENT_MAP[name];
        }
        const rpc = this.context.conf.rpcs[name];
        if (!rpc)
            throw new Error(`${chain} RPC not configured`);
        CosmosContext.FETCHING_TM_CLIENT = true;
        // from cosmjs: https://github.com/cosmos/cosmjs/blob/358260bff71c9d3e7ad6644fcf64dc00325cdfb9/packages/stargate/src/stargateclient.ts#L218
        let tmClient;
        const tm37Client = await Tendermint37Client.connect(rpc);
        const version = (await tm37Client.status()).nodeInfo.version;
        if (version.startsWith('0.37.')) {
            tmClient = tm37Client;
        }
        else {
            tm37Client.disconnect();
            tmClient = await Tendermint34Client.connect(rpc);
        }
        CosmosContext.CLIENT_MAP[name] = tmClient;
        CosmosContext.FETCHING_TM_CLIENT = false;
        return tmClient;
    }
    async getCosmWasmClient(chain) {
        const tmClient = await this.getTmClient(chain);
        return CosmWasmClient.create(tmClient);
    }
    getTokenBridgeAddress(chain) {
        const { token_bridge: tokenBridge } = this.contracts.mustGetContracts(chain);
        if (!tokenBridge)
            throw new Error(`No token bridge found for chain ${chain}`);
        return tokenBridge;
    }
    async getCurrentBlock() {
        const client = await this.getCosmWasmClient(this.chain);
        return client.getHeight();
    }
    async getOriginalAsset(chain, wrappedAddress) {
        const chainId = this.context.toChainId(chain);
        // need to cast to ChainId since Terra (chain id 3) is not on wh connect
        if (!isGatewayChain(chainId)) {
            throw new Error(`${chain} is not a cosmos chain`);
        }
        if (isNativeCosmWasmDenom(chainId, wrappedAddress)) {
            return {
                isWrapped: false,
                chainId,
                assetAddress: hexToUint8Array(this.buildTokenId(wrappedAddress)),
            };
        }
        try {
            const client = await this.getCosmWasmClient(chain);
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
            assetAddress: hexToUint8Array(this.buildTokenId(wrappedAddress)),
        };
    }
    async getWrappedNativeTokenId(chain) {
        throw new Error('Method not implemented.');
    }
}
CosmosContext.FETCHING_TM_CLIENT = false;
CosmosContext.CLIENT_MAP = {};
//# sourceMappingURL=context.js.map