import { deriveAddress } from '../../utils';
import { deriveEmitterSequenceKey, getSequenceTracker, } from './sequence';
export function deriveWormholeEmitterKey(emitterProgramId) {
    return deriveAddress([Buffer.from('emitter')], emitterProgramId);
}
export function getEmitterKeys(emitterProgramId, wormholeProgramId) {
    const emitter = deriveWormholeEmitterKey(emitterProgramId);
    return {
        emitter,
        sequence: deriveEmitterSequenceKey(emitter, wormholeProgramId),
    };
}
export async function getProgramSequenceTracker(connection, emitterProgramId, wormholeProgramId, commitment) {
    return getSequenceTracker(connection, deriveWormholeEmitterKey(emitterProgramId), wormholeProgramId, commitment);
}
//# sourceMappingURL=emitter.js.map