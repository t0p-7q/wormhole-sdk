import { BigNumber, BigNumberish, ContractReceipt, ethers, Overrides, PayableOverrides, PopulatedTransaction } from 'ethers';
import { TokenId, ChainName, ChainId, NATIVE, ParsedRelayerMessage, ParsedMessage, Context } from '../../types';
import { WormholeContext } from '../../wormhole';
import { EthContracts } from './contracts';
import { RelayerAbstract } from '../abstracts/relayer';
import { ForeignAssetCache } from '../../utils';
export declare const NO_VAA_FOUND = "No message publish found in logs";
export declare const INSUFFICIENT_ALLOWANCE = "Insufficient token allowance";
export declare class EthContext<T extends WormholeContext> extends RelayerAbstract<ethers.ContractReceipt> {
    readonly type = Context.ETH;
    readonly contracts: EthContracts<T>;
    readonly context: T;
    private foreignAssetCache;
    constructor(context: T, foreignAssetCache: ForeignAssetCache);
    getTxGasFee(txId: string, chain: ChainName | ChainId): Promise<BigNumber | undefined>;
    getForeignAssetPartiallyUnresolved(tokenId: TokenId, chain: ChainName | ChainId, provider?: ethers.providers.Provider): Promise<string | (() => Promise<string | null>)>;
    getForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string | null>;
    mustGetForeignAsset(tokenId: TokenId, chain: ChainName | ChainId): Promise<string>;
    fetchTokenDecimals(tokenAddr: string, chain: ChainName | ChainId): Promise<number>;
    getNativeBalance(walletAddr: string, chain: ChainName | ChainId): Promise<BigNumber>;
    getTokenBalance(walletAddr: string, tokenId: TokenId, chain: ChainName | ChainId): Promise<BigNumber | null>;
    getTokenBalances(walletAddr: string, tokenIds: TokenId[], chain: ChainName | ChainId): Promise<(BigNumber | null)[]>;
    /**
     * Approves amount for bridge transfer. If no amount is specified, the max amount is approved
     *
     * @param token The tokenId (chain and address) of the token being sent
     * @param Amount The amount to approve. If absent, will approve the maximum amount
     * @throws If unable to get the signer or contracts
     */
    approve(chain: ChainName | ChainId, contractAddress: string, token: string, amount?: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ethers.ContractReceipt | void>;
    prepareSend(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee?: ethers.BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ethers.PopulatedTransaction>;
    send(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee?: ethers.BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ethers.ContractReceipt>;
    sendWithPayload(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, payload: Uint8Array, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ethers.ContractReceipt>;
    prepareSendWithRelay(token: TokenId | 'native', amount: string, toNativeToken: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ethers.PopulatedTransaction>;
    sendWithRelay(token: TokenId | 'native', amount: string, toNativeToken: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ethers.ContractReceipt>;
    prepareRedeem(destChain: ChainName | ChainId, signedVAA: Uint8Array, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<PopulatedTransaction>;
    redeem(destChain: ChainName | ChainId, signedVAA: Uint8Array, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractReceipt>;
    estimateSendGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string): Promise<BigNumber>;
    estimateClaimGas(destChain: ChainName | ChainId, VAA: Uint8Array): Promise<BigNumber>;
    estimateSendWithRelayGas(token: TokenId | typeof NATIVE, amount: string, sendingChain: ChainName | ChainId, senderAddress: string, recipientChain: ChainName | ChainId, recipientAddress: string, relayerFee: any, toNativeToken: string): Promise<BigNumber>;
    calculateMaxSwapAmount(destChain: ChainName | ChainId, tokenId: TokenId, walletAddress: string): Promise<BigNumber>;
    calculateNativeTokenAmt(destChain: ChainName | ChainId, tokenId: TokenId, amount: BigNumberish, walletAddress: string): Promise<BigNumber>;
    getReceipt(tx: string, chain: ChainName | ChainId): Promise<ContractReceipt>;
    getMessage(tx: string, chain: ChainName | ChainId, parseRelayerPayload?: boolean): Promise<ParsedMessage | ParsedRelayerMessage>;
    getRelayerFee(sourceChain: ChainName | ChainId, destChain: ChainName | ChainId, tokenId: TokenId): Promise<BigNumber>;
    isTransferCompleted(destChain: ChainName | ChainId, signedVaa: string): Promise<boolean>;
    formatAddress(address: string): Uint8Array;
    parseAddress(address: ethers.utils.BytesLike): string;
    formatAssetAddress(address: string): Promise<Uint8Array>;
    parseAssetAddress(address: string): Promise<string>;
    getCurrentBlock(chain: ChainName | ChainId): Promise<number>;
    getWrappedNativeTokenId(chain: ChainName | ChainId): Promise<TokenId>;
}
//# sourceMappingURL=context.d.ts.map