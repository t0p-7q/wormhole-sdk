import { PublicKey } from '@solana/web3.js';
import { deriveAddress } from './account';
export class BpfLoaderUpgradeable {
    /**
     * @internal
     */
    constructor() { }
}
/**
 * Public key that identifies the SPL Token Metadata program
 */
BpfLoaderUpgradeable.programId = new PublicKey('BPFLoaderUpgradeab1e11111111111111111111111');
export function deriveUpgradeableProgramKey(programId) {
    return deriveAddress([new PublicKey(programId).toBuffer()], BpfLoaderUpgradeable.programId);
}
//# sourceMappingURL=bpfLoaderUpgradeable.js.map