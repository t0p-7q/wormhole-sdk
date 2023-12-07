import { deriveAddress } from '../../utils';
export function deriveSenderAccountKey(cpiProgramId) {
    return deriveAddress([Buffer.from('sender')], cpiProgramId);
}
export function deriveRedeemerAccountKey(cpiProgramId) {
    return deriveAddress([Buffer.from('redeemer')], cpiProgramId);
}
//# sourceMappingURL=transferWithPayload.js.map