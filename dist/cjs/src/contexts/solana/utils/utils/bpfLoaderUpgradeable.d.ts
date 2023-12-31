import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
export declare class BpfLoaderUpgradeable {
    /**
     * @internal
     */
    constructor();
    /**
     * Public key that identifies the SPL Token Metadata program
     */
    static programId: PublicKey;
}
export declare function deriveUpgradeableProgramKey(programId: PublicKeyInitData): PublicKey;
//# sourceMappingURL=bpfLoaderUpgradeable.d.ts.map