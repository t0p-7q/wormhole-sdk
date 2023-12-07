/// <reference types="bn.js" />
import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
export interface SignerSequence {
    value: BN;
}
export declare function deriveSignerSequenceAddress(programId: PublicKeyInitData, payerKey: PublicKeyInitData): PublicKey;
//# sourceMappingURL=signerSequence.d.ts.map