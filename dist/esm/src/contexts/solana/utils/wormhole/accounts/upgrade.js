import { deriveAddress } from '../../utils';
export function deriveUpgradeAuthorityKey(wormholeProgramId) {
    return deriveAddress([Buffer.from('upgrade')], wormholeProgramId);
}
//# sourceMappingURL=upgrade.js.map