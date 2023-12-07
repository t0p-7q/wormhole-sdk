/// <reference types="node" />
import { Account } from '@solana/spl-token';
import { Commitment, Connection, PublicKey, PublicKeyInitData, Transaction } from '@solana/web3.js';
import { BigNumber, BigNumberish } from 'ethers';
import { TokenId, ChainName, ChainId, NATIVE, ParsedMessage, Context, ParsedRelayerMessage } from '../../types';
import { SolContracts } from './contracts';
import { WormholeContext } from '../../wormhole';
import { ForeignAssetCache } from '../../utils';
import { RelayerAbstract } from '../abstracts/relayer';
/**
 * @category Solana
 */
export declare class SolanaContext<T extends WormholeContext> extends RelayerAbstract<Transaction> {
    readonly type = Context.SOLANA;
    readonly contracts: SolContracts<T>;
    readonly context: T;
    connection: Connection | undefined;
    private foreignAssetCache;
    constructor(context: T, foreignAssetCache: ForeignAssetCache);
    getTxGasFee(txId: string, chain: ChainName | ChainId): Promise<BigNumber | undefined>;
    /**
     * Sets the Connection
     *
     * @param connection The Solana Connection
     */
    setConnection(connection: Connection): Promise<void>;
    fetchTokenDecimals(tokenAddr: string, chain?: ChainName | ChainId): Promise<number>;
    /**
     * Gets the owner address of an Associated Token Account
     *
     * @param accountAddr The associated token account address
     * @returns The owner address
     */
    getTokenAccountOwner(tokenAddr: string): Promise<string>;
    getNativeBalance(walletAddress: string, chain: ChainName | ChainId): Promise<BigNumber>;
    getTokenBalance(walletAddress: string, tokenId: TokenId, chain: ChainName | ChainId): Promise<BigNumber | null>;
    getTokenBalances(walletAddress: string, tokenIds: TokenId[], chain: ChainName | ChainId): Promise<(BigNumber | null)[]>;
    /**
     * Gets the Associate Token Address
     *
     * @param token The token id (home chain/address)
     * @param account The wallet address
     * @returns The associated token address
     */
    getAssociatedTokenAddress(token: TokenId, account: PublicKeyInitData): Promise<PublicKey>;
    getAssociatedTokenAccount(token: TokenId, account: PublicKeyInitData): Promise<Account | null>;
    /**
     * Creates the Associated Token Account for a given wallet address. This must exist before a user can send a token bridge transfer, also it is the recipient address when sending the transfer.
     *
     * @param token The token id (home chain/address)
     * @param account The wallet address
     * @param commitment The commitment level
     * @returns The transaction for creating the Associated Token Account
     */
    createAssociatedTokenAccount(token: TokenId, account: PublicKeyInitData, commitment?: Commitment): Promise<Transaction | void>;
    /**
     * Prepare the transfer instructions for a native token bridge transfer from Solana
     *
     * @dev This _must_ be claimed on the destination chain, see {@link WormholeContext#redeem | redeem}
     *
     * @param senderAddress The address of the sender
     * @param amount The token amount to be sent
     * @param recipientChain The destination chain name or id
     * @param recipientAddress The associated token address where funds will be sent
     * @param relayerFee The fee that would be paid to a relayer
     * @param payload Arbitrary bytes that can contain any addition information about a given transfer
     * @param commitment The commitment level
     * @returns The transaction for sending Native SOL from Solana
     */
    private transferNativeSol;
    /**
     * Prepare the transfer instructions for a token bridge transfer from Solana
     *
     * @dev This _must_ be claimed on the destination chain, see {@link WormholeContext#redeem | redeem}
     *
     * @param senderAddress The address of the sender
     * @param amount The token amount to be sent
     * @param recipientChain The destination chain name or id
     * @param recipientAddress The associated token address where funds will be sent
     * @param fromAddress The token account pubkey, owned by fromOwner address
     * @param tokenChainId The id of the token's chain
     * @param mintAddress The token address on the destination
     * @param fromOwnerAddress If not specified, will default to the sender address
     * @param relayerFee The fee that would be paid to a relayer
     * @param payload Arbitrary bytes that can contain any addition information about a given transfer
     * @param commitment The commitment level
     * @returns The transaction for sending tokens from Solana
     */
    private transferFromSolana;
    send(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee?: string, commitment?: Commitment): Promise<Transaction>;
    sendWithPayload(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, payload: Uint8Array | Buffer, commitment?: Commitment): Promise<Transaction>;
    estimateSendGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string): Promise<BigNumber>;
    estimateClaimGas(destChain: ChainName | ChainId, VAA: Uint8Array): Promise<BigNumber>;
    formatAddress(address: PublicKeyInitData): Uint8Array;
    estimateSendWithRelayGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee: any, toNativeToken: string): Promise<BigNumber>;
    parseAddress(address: PublicKeyInitData): string;
    formatAssetAddress(address: string): Promise<Uint8Array>;
    parseAssetAddress(address: string): Promise<string>;
    getForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string | null>;
    mustGetForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string>;
    getMessage(tx: string, chain: ChainName | ChainId, parseRelayerPayload?: boolean): Promise<ParsedMessage | ParsedRelayerMessage>;
    redeem(destChain: ChainName | ChainId, signedVAA: Uint8Array, overrides: any, payerAddr?: PublicKeyInitData): Promise<Transaction>;
    isTransferCompleted(destChain: ChainName | ChainId, signedVaa: string): Promise<boolean>;
    fetchRedeemedSignature(emitterChainId: ChainId, emitterAddress: string, sequence: string): Promise<string | null>;
    getCurrentBlock(): Promise<number>;
    sendWithRelay(token: TokenId | 'native', amount: string, toNativeToken: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, overrides?: any): Promise<Transaction>;
    calculateNativeTokenAmt(destChain: ChainName | ChainId, tokenId: TokenId, amount: BigNumberish, walletAddress: string): Promise<BigNumber>;
    calculateMaxSwapAmount(destChain: ChainName | ChainId, tokenId: TokenId, walletAddress: string): Promise<BigNumber>;
    getRelayerFee(sourceChain: ChainName | ChainId, destChain: ChainName | ChainId, tokenId: TokenId): Promise<BigNumber>;
    getWrappedNativeTokenId(chain: ChainName | ChainId): Promise<TokenId>;
}
//# sourceMappingURL=context.d.ts.map