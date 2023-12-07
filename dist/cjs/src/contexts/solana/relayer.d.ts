import { Connection, PublicKey, PublicKeyInitData } from '@solana/web3.js';
import { ChainId } from 'types';
export interface SwapEvent {
    recipient: string;
    relayer: string;
    token: string;
    tokenAmount: string;
    nativeAmount: string;
}
export declare class SolanaRelayer {
    private connection;
    private program;
    constructor(programId: PublicKeyInitData, connection: Connection);
    isAcceptedToken(mint: string): Promise<boolean>;
    calculateRelayerFee(targetChain: ChainId, mint: PublicKey, decimals: number): Promise<bigint>;
    calculateMaxSwapAmountIn(mint: PublicKey, decimals: number): Promise<bigint>;
    calculateNativeSwapAmountOut(mint: PublicKey, toNativeAmount: bigint, decimals: number): Promise<bigint>;
    fetchSwapEvent(signature: string): Promise<SwapEvent | null>;
    private calculateNativeSwapRate;
    private getForeignContract;
    private getRegisteredToken;
    private getRedeemerConfig;
}
//# sourceMappingURL=relayer.d.ts.map