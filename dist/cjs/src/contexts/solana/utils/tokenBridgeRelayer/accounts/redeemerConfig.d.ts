import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
export interface RedeemerConfig {
    owner: PublicKey;
    bump: number;
    relayerFeePrecision: number;
    feeRecipient: PublicKey;
}
export declare function deriveRedeemerConfigAddress(programId: PublicKeyInitData): PublicKey;
//# sourceMappingURL=redeemerConfig.d.ts.map