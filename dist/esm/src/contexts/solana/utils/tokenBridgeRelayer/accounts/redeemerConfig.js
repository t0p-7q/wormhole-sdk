import { deriveAddress } from '../../utils';
export function deriveRedeemerConfigAddress(programId) {
    return deriveAddress([Buffer.from('redeemer')], programId);
}
//# sourceMappingURL=redeemerConfig.js.map