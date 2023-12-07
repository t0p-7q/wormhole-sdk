/// <reference types="node" />
import { WormholeWrappedInfo } from '@certusone/wormhole-sdk';
import { EncodeObject } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { BigNumber, BigNumberish } from 'ethers';
import { ChainId, ChainName, Context, NATIVE, ParsedMessage, ParsedRelayerMessage, ParsedRelayerPayload, TokenId } from '../../types';
import { ForeignAssetCache } from '../../utils';
import { WormholeContext } from '../../wormhole';
import { TokenBridgeAbstract } from '../abstracts/tokenBridge';
import { SeiContracts } from './contracts';
export interface CosmosAssetInfo {
    isNative: boolean;
    isDenom: boolean;
    address: string;
}
export interface SeiTransaction {
    fee: StdFee | 'auto' | 'number';
    msgs: EncodeObject[];
    memo: string;
}
interface SeiTranslatorTransferPayload {
    receiver?: string;
    payload?: Uint8Array;
}
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
export declare class SeiContext<T extends WormholeContext> extends TokenBridgeAbstract<SeiTransaction> {
    protected readonly context: T;
    readonly type = Context.SEI;
    readonly contracts: SeiContracts<T>;
    private foreignAssetCache;
    private wasmClient?;
    private readonly NATIVE_DENOM;
    private readonly CHAIN;
    private readonly REDEEM_EVENT_DEFAULT_MAX_BLOCKS;
    constructor(context: T, foreignAssetCache: ForeignAssetCache);
    protected getTxGasFee(txId: string, chain: ChainName | ChainId): Promise<BigNumber | undefined>;
    send(token: TokenId | 'native', amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee?: string | undefined): Promise<SeiTransaction>;
    estimateSendGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string): Promise<BigNumber>;
    estimateClaimGas(destChain: ChainName | ChainId, VAA: Uint8Array): Promise<BigNumber>;
    /**
     * @param tokenAddress The cw20 token address
     * @returns Whether there exists a native denomination created by the translator contract for the given token
     */
    isTranslatedToken(tokenAddress: string): Promise<boolean>;
    private createInitiateNativeTransferMessages;
    private createInitiateTokenTransferMessages;
    private createConvertAndTransferMessage;
    getTranslatorAddress(): string;
    getTokenBridgeAddress(): string;
    parseRelayerPayload(payload: Buffer): ParsedRelayerPayload;
    sendWithRelay(token: TokenId | 'native', amount: string, toNativeToken: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee?: string): Promise<any>;
    sendWithPayload(token: TokenId | 'native', amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, payload: any): Promise<any>;
    formatAddress(address: string): Uint8Array;
    parseAddress(address: any): string;
    /**
     * @param addressOrDenom CW20 token address or bank denomination
     * @returns The external address associated with the asset address
     */
    formatAssetAddress(addressOrDenom: string): Promise<Uint8Array>;
    private buildNativeId;
    /**
     * Builds the information required to send the tokens through the translator
     * contract relay process in order to receive a native denomination on the Sei chain
     *
     * @param token The token or native coin to send
     * @param recipient The final recipient address
     * @returns The receiver and payload necessary to send
     * the tokens through the translator contract relay
     */
    buildSendPayload(token: TokenId | 'native', recipient: string): Promise<SeiTranslatorTransferPayload>;
    /**
     * @param externalId The asset's external id
     * @returns The asset's CW20 token address or the bank denomination associated with the external address
     */
    parseAssetAddress(externalId: string): Promise<string>;
    /**
     * @param externalId An external id representing an asset
     * @returns Information about the asset including its address/denom and whether it is native to this chain
     */
    queryExternalId(externalId: string): Promise<CosmosAssetInfo | null>;
    getOriginalAssetSei(wrappedAddress: string): Promise<WormholeWrappedInfo>;
    getForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string | null>;
    mustGetForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string>;
    /**
     * Search for a specific piece of information emitted by the contracts during the transaction
     * For example: to retrieve the bridge transfer recipient, we would have to look
     * for the "transfer.recipient" under the "wasm" event
     */
    private searchLogs;
    getMessage(id: string, chain: ChainName | ChainId, parseRelayerPayload?: boolean): Promise<ParsedMessage | ParsedRelayerMessage>;
    getNativeBalance(walletAddress: string, chain: ChainName | ChainId): Promise<BigNumber>;
    getTokenBalance(walletAddress: string, tokenId: TokenId, chain: ChainName | ChainId): Promise<BigNumber | null>;
    getTokenBalances(walletAddr: string, tokenIds: TokenId[], chain: ChainName | ChainId): Promise<(BigNumber | null)[]>;
    getDenomBalance(walletAddress: string, denom: string): Promise<BigNumber>;
    private CW20AddressToFactory;
    private factoryToCW20;
    redeem(destChain: ChainName | ChainId, signedVAA: Uint8Array, overrides: any, payerAddr?: any): Promise<SeiTransaction>;
    fetchRedeemedEvent(emitterChainId: ChainId, emitterAddress: string, sequence: string): Promise<string | null>;
    private fetchRedeemedEventInner;
    isTransferCompleted(destChain: ChainName | ChainId, signedVaa: string): Promise<boolean>;
    fetchTokenDecimals(tokenAddr: string, chain: ChainName | ChainId): Promise<number>;
    private getCosmWasmClient;
    calculateNativeTokenAmt(destChain: ChainName | ChainId, tokenId: TokenId, amount: BigNumberish, walletAddress: string): Promise<BigNumber>;
    getCurrentBlock(): Promise<number>;
    getWrappedNativeTokenId(chain: ChainName | ChainId): Promise<TokenId>;
}
export {};
//# sourceMappingURL=context.d.ts.map