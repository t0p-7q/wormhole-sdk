"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WormholeContext = void 0;
const multi_provider_1 = require("@nomad-xyz/multi-provider");
const MAINNET_1 = __importStar(require("./config/MAINNET"));
const TESTNET_1 = __importStar(require("./config/TESTNET"));
const aptos_1 = require("./contexts/aptos");
const eth_1 = require("./contexts/eth");
const context_1 = require("./contexts/solana/context");
const sui_1 = require("./contexts/sui");
const types_1 = require("./types");
const sei_1 = require("./contexts/sei");
const DEVNET_1 = __importStar(require("./config/DEVNET"));
const cosmos_1 = require("./contexts/cosmos");
const utils_1 = require("./utils");
/**
 * The WormholeContext manages connections to Wormhole Core, Bridge and NFT Bridge contracts.
 * It inherits from the {@link MultiProvider}, and ensures that its contracts
 * always use the latest registered providers and signers.
 *
 * For convenience, we've pre-constructed contexts for mainnet, testnet and devnet
 * deployments. These can be imported directly from the wormhole sdk.
 *
 * @example
 * // Set up mainnet and then access contracts as below:
 * const context = new WormholeContext('MAINNET');
 * let bridge = context.mustGetBridge('ethereum');
 *
 * // interact easily with any chain!
 * // supports EVM, Solana, Terra, etc
 * const tokenId = {
 *   chain: 'ethereum',
 *   address: '0x123...',
 * }
 * const receipt = context.send(
 *   tokenId,
 *   '10', // amount
 *   'ethereum', // sending chain
 *   '0x789...', // sender address
 *   'moonbeam', // destination chain
 *   '0x789..., // recipient address on destination chain
 * )
 */
class WormholeContext extends multi_provider_1.MultiProvider {
    constructor(env, conf, foreignAssetCache) {
        super();
        if (conf) {
            this.conf = conf;
        }
        else {
            this.conf = WormholeContext.getConfig(env);
        }
        this.foreignAssetCache = foreignAssetCache || new utils_1.ForeignAssetCache();
        this.registerProviders();
    }
    get environment() {
        return this.conf.env;
    }
    /**
     * Registers evm providers
     */
    registerProviders() {
        for (const network of Object.keys(this.conf.rpcs)) {
            const n = network;
            const chains = this.conf.env === 'MAINNET'
                ? MAINNET_1.MAINNET_CHAINS
                : this.conf.env === 'DEVNET'
                    ? DEVNET_1.DEVNET_CHAINS
                    : TESTNET_1.TESTNET_CHAINS;
            const chainConfig = chains[n];
            if (!chainConfig)
                throw new Error(`invalid network name ${n}`);
            // register domain
            this.registerDomain({
                // @ts-ignore
                domain: chainConfig,
                name: network,
            });
            // register RPC provider
            if (this.conf.rpcs[n]) {
                if (this.conf.chains[n]?.context === types_1.Context.ETH) {
                    this.registerRpcProvider(network, this.conf.rpcs[n]);
                }
            }
        }
    }
    /**
     * Converts to chain id
     * @param nameOrId the chain name or chain id
     * @returns the chain id
     */
    toChainId(nameOrId) {
        return super.resolveDomain(nameOrId);
    }
    /**
     * Converts to chain name
     * @param nameOrId the chain name or chain id
     * @returns the chain name
     */
    toChainName(nameOrId) {
        return super.resolveDomainName(nameOrId);
    }
    /**
     * Gets the contract addresses for a given chain
     * @param chain the chain name or chain id
     * @returns the contract addresses
     */
    getContracts(chain) {
        const chainName = this.toChainName(chain);
        return this.conf.chains[chainName]?.contracts;
    }
    /**
     * Gets the contract addresses for a given chain
     * @param chain the chain name or chain id
     * @returns the contract addresses
     * @throws Errors if contracts are not found
     */
    mustGetContracts(chain) {
        const contracts = this.getContracts(chain);
        if (!contracts)
            throw new Error(`no contracts found for ${chain}`);
        return contracts;
    }
    /**
     * Returns the chain "context", i.e. the class with chain-specific logic and methods
     * @param chain the chain name or chain id
     * @returns the chain context class
     * @throws Errors if context is not found
     */
    getContext(chain) {
        const chainName = this.toChainName(chain);
        const { context } = this.conf.chains[chainName];
        switch (context) {
            case types_1.Context.ETH: {
                return new eth_1.EthContext(this, this.foreignAssetCache);
            }
            case types_1.Context.SOLANA: {
                return new context_1.SolanaContext(this, this.foreignAssetCache);
            }
            case types_1.Context.SUI: {
                return new sui_1.SuiContext(this, this.foreignAssetCache);
            }
            case types_1.Context.APTOS: {
                return new aptos_1.AptosContext(this, this.foreignAssetCache);
            }
            case types_1.Context.SEI: {
                return new sei_1.SeiContext(this, this.foreignAssetCache);
            }
            case types_1.Context.COSMOS: {
                return new cosmos_1.CosmosContext(this, chainName, this.foreignAssetCache);
            }
            default: {
                throw new Error('Not able to retrieve context');
            }
        }
    }
    /**
     * Fetches the address for a token representation on any chain (These are the Wormhole token addresses, not necessarily the canonical version of that token)
     *
     * @param tokenId The Token ID (chain/address)
     * @param chain The chain name or id
     * @returns The Wormhole address on the given chain, null if it does not exist
     */
    async getForeignAsset(tokenId, chain) {
        const context = this.getContext(chain);
        return await context.getForeignAsset(tokenId, chain);
    }
    /**
     * Fetches the address for a token representation on any chain (These are the Wormhole token addresses, not necessarily the canonical version of that token)
     *
     * @param tokenId The Token ID (chain/address)
     * @param chain The chain name or id
     * @returns The Wormhole address on the given chain
     * @throws Throws if the token does not exist
     */
    async mustGetForeignAsset(tokenId, chain) {
        const context = this.getContext(chain);
        return await context.mustGetForeignAsset(tokenId, chain);
    }
    /**
     * Fetches the number of decimals for a token on a given chain
     *
     * @param tokenId The Token ID (home chain/address)
     * @param chain The chain name or id of the token/representation
     * @returns The number of decimals
     */
    async fetchTokenDecimals(tokenId, chain) {
        const context = this.getContext(chain);
        const repr = await context.mustGetForeignAsset(tokenId, chain);
        return await context.fetchTokenDecimals(repr, chain);
    }
    /**
     * Fetches the native token balance for a wallet
     *
     * @param walletAddress The wallet address
     * @param chain The chain name or id
     * @returns The native balance as a BigNumber
     */
    async getNativeBalance(walletAddress, chain, asset) {
        const context = this.getContext(chain);
        return await context.getNativeBalance(walletAddress, chain, asset);
    }
    /**
     * Fetches the balance of a given token for a wallet
     *
     * @param walletAddress The wallet address
     * @param tokenId The token ID (its home chain and address on the home chain)
     * @param chain The chain name or id
     * @returns The token balance of the wormhole asset as a BigNumber
     */
    async getTokenBalance(walletAddress, tokenId, chain) {
        const context = this.getContext(chain);
        return await context.getTokenBalance(walletAddress, tokenId, chain);
    }
    /**
     * Fetches the balance of the given tokens for a wallet
     *
     * @param walletAddress The wallet address
     * @param tokenIds The token IDs (their home chain and address on the home chain)
     * @param chain The chain name or id
     * @returns The token balance of the wormhole asset as a BigNumber
     */
    async getTokenBalances(walletAddress, tokenIds, chain) {
        const context = this.getContext(chain);
        return await context.getTokenBalances(walletAddress, tokenIds, chain);
    }
    /**
     * Send a Token Bridge transfer
     *
     * @dev This _must_ be claimed on the destination chain, see {@link WormholeContext#redeem | redeem}
     *
     * @param token The Token Identifier (chain/address) or `'native'` if sending the native token
     * @param amount The token amount to be sent, as a string
     * @param sendingChain The source chain name or id
     * @param senderAddress The address that is dispatching the transfer
     * @param recipientChain The destination chain name or id
     * @param recipientAddress The wallet address where funds will be sent (On solana, this is the associated token account)
     * @param relayerFee A fee that would go to a relayer, if any
     * @param payload Extra bytes that can be passed along with the transfer
     * @returns The transaction receipt
     * @throws If unable to get the signer or contracts, or if there is a problem executing the transaction
     */
    async send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee, payload) {
        const context = this.getContext(sendingChain);
        if (recipientChain === 'sei') {
            if (payload)
                throw new Error('Custom payload is not supported for Sei');
            const { payload: seiPayload, receiver } = await this.getContext('sei').buildSendPayload(token, recipientAddress);
            recipientAddress = receiver || recipientAddress;
            payload = seiPayload || payload;
        }
        if (payload) {
            return context.sendWithPayload(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, payload);
        }
        return context.send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee);
    }
    async getTxGasFee(chain, txId) {
        const context = this.getContext(chain);
        return await context.getTxGasFee(txId, chain);
    }
    async estimateSendGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress) {
        const context = this.getContext(sendingChain);
        const gas = await context.estimateSendGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress);
        return gas;
    }
    async estimateSendWithRelayGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee, toNativeToken) {
        const context = this.getContext(sendingChain);
        const gas = await context.estimateSendWithRelayGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress);
        return gas;
    }
    async estimateClaimGas(destChain, VAA) {
        if (!VAA)
            throw new Error('Cannot estimate claim without signed VAA');
        const context = this.getContext(destChain);
        const gas = await context.estimateClaimGas(destChain, VAA);
        return gas;
    }
    /**
     * Check whether a chain supports automatic relaying
     * @param chain the chain name or chain id
     * @returns boolean representing if automatic relay is available
     */
    supportsSendWithRelay(chain) {
        return !!(this.getContracts(chain)?.relayer &&
            'sendWithRelay' in this.getContext(chain));
    }
    /**
     * Sends transaction to the bridge using the relayer
     *
     * @param token The tokenId (chain and address) of the token being sent. Pass in 'native' to send native token
     * @param amount The amount to bridge
     * @param sendingChain The chain name or chain id of the source chain
     * @param senderAddress The address executing the transaction
     * @param recipientChain The chain name or chain id of the destination chain
     * @param recipientAddress The address which will receive funds on the destination chain
     * @param toNativeToken The amount of bridged funds that will be converted to the native gas token on the destination chain
     * @throws If unable to get the signer or contracts, or if there is a problem executing the transaction
     */
    async sendWithRelay(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, toNativeToken, relayerFee) {
        if (!this.supportsSendWithRelay(sendingChain)) {
            throw new Error(`Relayer is not supported on ${this.toChainName(sendingChain)}`);
        }
        const context = this.getContext(sendingChain);
        if (!('sendWithRelay' in context)) {
            throw new Error('sendWithRelay function not found');
        }
        return context.sendWithRelay(token, amount, toNativeToken, sendingChain, senderAddress, recipientChain, recipientAddress);
    }
    /**
     * Redeems funds for a token bridge transfer on the destination chain
     *
     * @param destChain The destination chain name or id
     * @param signedVAA The Signed VAA bytes
     * @param overrides Optional overrides, varies between chains
     * @param payerAddr Optional. The address that pays for the redeem transaction, defaults to the sender address if not specified
     * @returns The transaction receipt
     */
    async redeem(destChain, signedVAA, overrides, receivingAddr) {
        const context = this.getContext(destChain);
        return await context.redeem(destChain, signedVAA, overrides, receivingAddr);
    }
    /**
     * Checks if a transfer has been completed or not
     *
     * @param destChain The destination chain name or id
     * @param signedVAA The Signed VAA bytes
     * @returns True if the transfer has been completed, otherwise false
     */
    async isTransferCompleted(destChain, signedVaa) {
        const context = this.getContext(destChain);
        return await context.isTransferCompleted(destChain, signedVaa);
    }
    /**
     * Format an address to a 32-byte universal address, which can be utilized by the Wormhole contracts
     *
     * @param address The address as a string
     * @returns The address as a 32-byte Wormhole address
     */
    formatAddress(address, chain) {
        const context = this.getContext(chain);
        return context.formatAddress(address);
    }
    /**
     * Parse an address from a 32-byte universal address to a canonical address
     *
     * @param address The 32-byte wormhole address
     * @returns The address in the blockchain specific format
     */
    parseAddress(address, chain) {
        const context = this.getContext(chain);
        return context.parseAddress(address);
    }
    async getMessage(tx, chain, parseRelayerPayload = true) {
        const context = this.getContext(chain);
        return await context.getMessage(tx, chain, parseRelayerPayload);
    }
    /**
     * Fetches the wrapped native token ID for a given chain
     *
     * @param chain The chain name or id
     * @returns The native token ID
     */
    async getWrappedNativeTokenId(chain) {
        const context = this.getContext(chain);
        return await context.getWrappedNativeTokenId(chain);
    }
    /**
     * Get the default config for Mainnet or Testnet
     *
     * @param environment 'MAINNET' or 'TESTNET'
     * @returns A Wormhole Config
     */
    static getConfig(env) {
        return env === 'MAINNET'
            ? MAINNET_1.default
            : env === 'DEVNET'
                ? DEVNET_1.default
                : TESTNET_1.default;
    }
}
exports.WormholeContext = WormholeContext;
//# sourceMappingURL=wormhole.js.map