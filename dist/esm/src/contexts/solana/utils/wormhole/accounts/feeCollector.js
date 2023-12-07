import { deriveAddress } from '../../utils';
export function deriveFeeCollectorKey(wormholeProgramId) {
    return deriveAddress([Buffer.from('fee_collector')], wormholeProgramId);
}
//# sourceMappingURL=feeCollector.js.map