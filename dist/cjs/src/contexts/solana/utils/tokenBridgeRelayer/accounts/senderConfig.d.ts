import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
export interface SenderConfig {
    owner: PublicKey;
    bump: number;
    tokenBridge: any;
    relayerFeePrecision: number;
    paused: boolean;
}
export declare function deriveSenderConfigAddress(programId: PublicKeyInitData): PublicKey;
//# sourceMappingURL=senderConfig.d.ts.map