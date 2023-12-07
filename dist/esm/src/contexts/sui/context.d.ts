import { JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';
import { BigNumber, BigNumberish } from 'ethers';
import { ChainId, ChainName, Context, NATIVE, ParsedMessage, ParsedRelayerMessage, TokenId } from '../../types';
import { WormholeContext } from '../../wormhole';
import { RelayerAbstract } from '../abstracts/relayer';
import { SuiContracts } from './contracts';
import { ForeignAssetCache } from '../../utils';
export declare class SuiContext<T extends WormholeContext> extends RelayerAbstract<TransactionBlock> {
    readonly type = Context.SUI;
    protected contracts: SuiContracts<T>;
    readonly context: T;
    readonly provider: JsonRpcProvider;
    private foreignAssetCache;
    constructor(context: T, foreignAssetCache: ForeignAssetCache);
    getTxGasFee(txId: string, chain: ChainName | ChainId): Promise<BigNumber | undefined>;
    getCoins(coinType: string, owner: string): Promise<{
        coinType: string;
        coinObjectId: string;
    }[]>;
    innerSend(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee: any, payload?: Uint8Array | undefined): Promise<TransactionBlock>;
    send(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee: any): Promise<TransactionBlock>;
    sendWithPayload(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, payload: Uint8Array | undefined): Promise<TransactionBlock>;
    estimateSendGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string): Promise<BigNumber>;
    estimateClaimGas(destChain: ChainName | ChainId): Promise<BigNumber>;
    estimateSendWithRelayGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee: any, toNativeToken: string): Promise<BigNumber>;
    formatAddress(address: string): Uint8Array;
    parseAddress(address: string): string;
    /**
     * @param address The asset's address (the Sui `CoinType`)
     * @returns The external address associated with the asset address
     */
    formatAssetAddress(address: string): Promise<Uint8Array>;
    /**
     * @param address The asset's external address
     * @returns The asset's address (the Sui `CoinType`) associated with the external address
     */
    parseAssetAddress(address: string): Promise<string>;
    getForeignAsset(tokenId: TokenId, chain: ChainName | ChainId, tokenBridgeStateFields?: Record<string, any> | null): Promise<string | null>;
    mustGetForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string>;
    fetchTokenDecimals(tokenAddr: string, chain: ChainName | ChainId): Promise<number>;
    getMessage(tx: string, chain: ChainName | ChainId, parseRelayerPayload?: boolean): Promise<ParsedMessage | ParsedRelayerMessage>;
    getNativeBalance(walletAddress: string, chain: ChainName | ChainId): Promise<BigNumber>;
    getTokenBalance(walletAddress: string, tokenId: TokenId, chain: ChainName | ChainId): Promise<BigNumber | null>;
    getTokenBalances(walletAddr: string, tokenIds: TokenId[], chain: ChainName | ChainId): Promise<(BigNumber | null)[]>;
    redeem(destChain: ChainName | ChainId, signedVAA: Uint8Array, overrides: any, payerAddr?: any): Promise<TransactionBlock>;
    isTransferCompleted(destChain: ChainName | ChainId, signedVaa: string): Promise<boolean>;
    sendWithRelay(token: TokenId | 'native', amount: string, toNativeToken: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, overrides?: any): Promise<TransactionBlock>;
    calculateNativeTokenAmt(destChain: ChainName | ChainId, tokenId: TokenId, amount: BigNumberish, walletAddress: string): Promise<BigNumber>;
    calculateMaxSwapAmount(destChain: ChainName | ChainId, tokenId: TokenId, walletAddress: string): Promise<BigNumber>;
    getRelayerFee(sourceChain: ChainName | ChainId, destChain: ChainName | ChainId, tokenId: TokenId): Promise<BigNumber>;
    getCurrentBlock(): Promise<number>;
    getTokenCoinType(provider: JsonRpcProvider, tokenBridgeStateObjectId: string, tokenAddress: Uint8Array, tokenChain: number, tokenBridgeStateFields?: Record<string, any> | null): Promise<string | null>;
    getForeignAssetSui(provider: JsonRpcProvider, tokenBridgeStateObjectId: string, originChainId: ChainId, originAddress: Uint8Array, tokenBridgeStateFields?: Record<string, any> | null): Promise<string | null>;
    getWrappedNativeTokenId(chain: ChainName | ChainId): Promise<TokenId>;
}
//# sourceMappingURL=context.d.ts.map