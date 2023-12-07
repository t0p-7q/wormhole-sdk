/// <reference types="node" />
import { BigNumber } from 'ethers';
import { TokenId, ParsedRelayerMessage, ChainName, ChainId, NATIVE, ParsedMessage, Context, ParsedRelayerPayload } from '../../types';
import { WormholeContext } from '../../wormhole';
import { TokenBridgeAbstract } from '../abstracts/tokenBridge';
import { AptosContracts } from './contracts';
import { AptosClient, CoinClient, Types } from 'aptos';
import { ForeignAssetCache } from '../../utils';
export declare const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
export type CurrentCoinBalancesResponse = {
    data: {
        current_coin_balances: CoinBalance[];
    };
};
export type CoinBalance = {
    coin_type: string;
    amount: number;
};
export declare class AptosContext<T extends WormholeContext> extends TokenBridgeAbstract<Types.EntryFunctionPayload> {
    readonly type = Context.APTOS;
    protected contracts: AptosContracts<T>;
    readonly context: T;
    readonly aptosClient: AptosClient;
    readonly coinClient: CoinClient;
    private foreignAssetCache;
    constructor(context: T, foreignAssetCache: ForeignAssetCache);
    protected getTxGasFee(txId: string, chain: ChainName | ChainId): Promise<BigNumber | undefined>;
    send(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee?: string): Promise<Types.EntryFunctionPayload>;
    sendWithPayload(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, payload: Uint8Array): Promise<Types.EntryFunctionPayload>;
    estimateSendGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string): Promise<BigNumber>;
    estimateClaimGas(destChain: ChainName | ChainId, VAA: Uint8Array): Promise<BigNumber>;
    private innerSend;
    formatAddress(address: string): Uint8Array;
    parseAddress(address: string): string;
    formatAssetAddress(address: string): Promise<Uint8Array>;
    parseAssetAddress(address: string): Promise<string>;
    getForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string | null>;
    mustGetForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string>;
    fetchTokenDecimals(tokenAddr: string, chain: ChainName | ChainId): Promise<number>;
    getMessage(tx: string, chain: ChainName | ChainId, parseRelayerPayload?: boolean): Promise<ParsedMessage | ParsedRelayerMessage>;
    getNativeBalance(walletAddress: string, chain: ChainName | ChainId): Promise<BigNumber>;
    getTokenBalance(walletAddress: string, tokenId: TokenId, chain: ChainName | ChainId): Promise<BigNumber | null>;
    getTokenBalances(walletAddress: string, tokenIds: TokenId[], chain: ChainName | ChainId): Promise<(BigNumber | null)[]>;
    checkBalance(walletAddress: string, coinType: string): Promise<BigNumber>;
    fetchCurrentCoins(ownerAddress: string, offset: number, limit: number): Promise<CurrentCoinBalancesResponse>;
    redeem(destChain: ChainName | ChainId, signedVAA: Uint8Array, overrides: any, payerAddr?: any): Promise<Types.EntryFunctionPayload>;
    isTransferCompleted(destChain: ChainName | ChainId, signedVaa: string): Promise<boolean>;
    getTxIdFromReceipt(hash: Types.HexEncodedBytes): string;
    parseRelayerPayload(payload: Buffer): ParsedRelayerPayload;
    getCurrentBlock(): Promise<number>;
    getWrappedNativeTokenId(chain: ChainName | ChainId): Promise<TokenId>;
}
//# sourceMappingURL=context.d.ts.map