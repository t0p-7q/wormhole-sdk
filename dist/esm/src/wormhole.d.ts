import { Network as Environment } from '@certusone/wormhole-sdk';
import { Domain, MultiProvider } from '@nomad-xyz/multi-provider';
import { BigNumber } from 'ethers';
import { AnyContext, ChainId, ChainName, Contracts, NATIVE, ParsedMessage, ParsedRelayerMessage, RedeemResult, SendResult, TokenId, WormholeConfig } from './types';
import { ForeignAssetCache } from './utils';
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
export declare class WormholeContext extends MultiProvider<Domain> {
    private foreignAssetCache;
    readonly conf: WormholeConfig;
    constructor(env: Environment, conf?: WormholeConfig, foreignAssetCache?: ForeignAssetCache);
    get environment(): string;
    /**
     * Registers evm providers
     */
    registerProviders(): void;
    /**
     * Converts to chain id
     * @param nameOrId the chain name or chain id
     * @returns the chain id
     */
    toChainId(nameOrId: string | number): ChainId;
    /**
     * Converts to chain name
     * @param nameOrId the chain name or chain id
     * @returns the chain name
     */
    toChainName(nameOrId: string | number): ChainName;
    /**
     * Gets the contract addresses for a given chain
     * @param chain the chain name or chain id
     * @returns the contract addresses
     */
    getContracts(chain: ChainName | ChainId): Contracts | undefined;
    /**
     * Gets the contract addresses for a given chain
     * @param chain the chain name or chain id
     * @returns the contract addresses
     * @throws Errors if contracts are not found
     */
    mustGetContracts(chain: ChainName | ChainId): Contracts;
    /**
     * Returns the chain "context", i.e. the class with chain-specific logic and methods
     * @param chain the chain name or chain id
     * @returns the chain context class
     * @throws Errors if context is not found
     */
    getContext(chain: ChainName | ChainId): AnyContext;
    /**
     * Fetches the address for a token representation on any chain (These are the Wormhole token addresses, not necessarily the canonical version of that token)
     *
     * @param tokenId The Token ID (chain/address)
     * @param chain The chain name or id
     * @returns The Wormhole address on the given chain, null if it does not exist
     */
    getForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string | null>;
    /**
     * Fetches the address for a token representation on any chain (These are the Wormhole token addresses, not necessarily the canonical version of that token)
     *
     * @param tokenId The Token ID (chain/address)
     * @param chain The chain name or id
     * @returns The Wormhole address on the given chain
     * @throws Throws if the token does not exist
     */
    mustGetForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string>;
    /**
     * Fetches the number of decimals for a token on a given chain
     *
     * @param tokenId The Token ID (home chain/address)
     * @param chain The chain name or id of the token/representation
     * @returns The number of decimals
     */
    fetchTokenDecimals(tokenId: TokenId, chain: ChainName | ChainId): Promise<number>;
    /**
     * Fetches the native token balance for a wallet
     *
     * @param walletAddress The wallet address
     * @param chain The chain name or id
     * @returns The native balance as a BigNumber
     */
    getNativeBalance(walletAddress: string, chain: ChainName | ChainId, asset?: string): Promise<BigNumber>;
    /**
     * Fetches the balance of a given token for a wallet
     *
     * @param walletAddress The wallet address
     * @param tokenId The token ID (its home chain and address on the home chain)
     * @param chain The chain name or id
     * @returns The token balance of the wormhole asset as a BigNumber
     */
    getTokenBalance(walletAddress: string, tokenId: TokenId, chain: ChainName | ChainId): Promise<BigNumber | null>;
    /**
     * Fetches the balance of the given tokens for a wallet
     *
     * @param walletAddress The wallet address
     * @param tokenIds The token IDs (their home chain and address on the home chain)
     * @param chain The chain name or id
     * @returns The token balance of the wormhole asset as a BigNumber
     */
    getTokenBalances(walletAddress: string, tokenIds: TokenId[], chain: ChainName | ChainId): Promise<(BigNumber | null)[]>;
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
    send(token: TokenId | 'native', amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee?: string, payload?: Uint8Array): Promise<SendResult>;
    getTxGasFee(chain: ChainName | ChainId, txId: string): Promise<BigNumber | undefined>;
    estimateSendGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string): Promise<BigNumber>;
    estimateSendWithRelayGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee: any, toNativeToken: string): Promise<BigNumber>;
    estimateClaimGas(destChain: ChainName | ChainId, VAA?: Uint8Array): Promise<BigNumber>;
    /**
     * Check whether a chain supports automatic relaying
     * @param chain the chain name or chain id
     * @returns boolean representing if automatic relay is available
     */
    supportsSendWithRelay(chain: ChainName | ChainId): boolean;
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
    sendWithRelay(token: TokenId | 'native', amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, toNativeToken: string, relayerFee?: string): Promise<SendResult>;
    /**
     * Redeems funds for a token bridge transfer on the destination chain
     *
     * @param destChain The destination chain name or id
     * @param signedVAA The Signed VAA bytes
     * @param overrides Optional overrides, varies between chains
     * @param payerAddr Optional. The address that pays for the redeem transaction, defaults to the sender address if not specified
     * @returns The transaction receipt
     */
    redeem(destChain: ChainName | ChainId, signedVAA: Uint8Array, overrides: any, receivingAddr?: string): Promise<RedeemResult>;
    /**
     * Checks if a transfer has been completed or not
     *
     * @param destChain The destination chain name or id
     * @param signedVAA The Signed VAA bytes
     * @returns True if the transfer has been completed, otherwise false
     */
    isTransferCompleted(destChain: ChainName | ChainId, signedVaa: string): Promise<boolean>;
    /**
     * Format an address to a 32-byte universal address, which can be utilized by the Wormhole contracts
     *
     * @param address The address as a string
     * @returns The address as a 32-byte Wormhole address
     */
    formatAddress(address: string, chain: ChainName | ChainId): any;
    /**
     * Parse an address from a 32-byte universal address to a canonical address
     *
     * @param address The 32-byte wormhole address
     * @returns The address in the blockchain specific format
     */
    parseAddress(address: any, chain: ChainName | ChainId): string;
    getMessage(tx: string, chain: ChainName | ChainId, parseRelayerPayload?: boolean): Promise<ParsedMessage | ParsedRelayerMessage>;
    /**
     * Fetches the wrapped native token ID for a given chain
     *
     * @param chain The chain name or id
     * @returns The native token ID
     */
    getWrappedNativeTokenId(chain: ChainName | ChainId): Promise<TokenId>;
    /**
     * Get the default config for Mainnet or Testnet
     *
     * @param environment 'MAINNET' or 'TESTNET'
     * @returns A Wormhole Config
     */
    static getConfig(env: Environment): WormholeConfig;
}
//# sourceMappingURL=wormhole.d.ts.map