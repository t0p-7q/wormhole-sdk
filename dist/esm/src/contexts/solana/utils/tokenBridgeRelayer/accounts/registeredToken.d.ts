/// <reference types="bn.js" />
import { BN } from '@project-serum/anchor';
import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
export interface RegisteredToken {
    swapRate: BN;
    maxNativeSwapAmount: BN;
}
export declare function deriveRegisteredTokenAddress(programId: PublicKeyInitData, mint: PublicKeyInitData): PublicKey;
//# sourceMappingURL=registeredToken.d.ts.map