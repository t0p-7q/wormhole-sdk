import { JsonRpcProvider } from '@mysten/sui.js';
import { BigNumber, BigNumberish } from 'ethers';
export interface TokenInfo {
    max_native_swap_amount: string;
    swap_enabled: boolean;
    swap_rate: string;
}
/**
 * @category Sui
 */
export declare class SuiRelayer {
    private provider;
    private objectId;
    private packageId;
    private fields;
    constructor(provider: JsonRpcProvider, objectId: string, packageId: string);
    getFields(): Promise<Record<string, any>>;
    getTokenInfo(coinType: string): Promise<TokenInfo | null>;
    isAcceptedToken(token: string): Promise<boolean>;
    calculateRelayerFee(targetChainId: BigNumberish, coinType: string, decimals: BigNumberish): Promise<BigNumber>;
    calculateMaxSwapAmountIn(senderAddress: string, coinType: string): Promise<BigNumber>;
    calculateNativeSwapAmountOut(senderAddress: string, coinType: string, toNativeAmount: BigNumberish): Promise<BigNumber>;
}
//# sourceMappingURL=relayer.d.ts.map