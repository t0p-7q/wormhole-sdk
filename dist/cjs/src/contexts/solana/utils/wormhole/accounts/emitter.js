"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgramSequenceTracker = exports.getEmitterKeys = exports.deriveWormholeEmitterKey = void 0;
const utils_1 = require("../../utils");
const sequence_1 = require("./sequence");
function deriveWormholeEmitterKey(emitterProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('emitter')], emitterProgramId);
}
exports.deriveWormholeEmitterKey = deriveWormholeEmitterKey;
function getEmitterKeys(emitterProgramId, wormholeProgramId) {
    const emitter = deriveWormholeEmitterKey(emitterProgramId);
    return {
        emitter,
        sequence: (0, sequence_1.deriveEmitterSequenceKey)(emitter, wormholeProgramId),
    };
}
exports.getEmitterKeys = getEmitterKeys;
async function getProgramSequenceTracker(connection, emitterProgramId, wormholeProgramId, commitment) {
    return (0, sequence_1.getSequenceTracker)(connection, deriveWormholeEmitterKey(emitterProgramId), wormholeProgramId, commitment);
}
exports.getProgramSequenceTracker = getProgramSequenceTracker;
//# sourceMappingURL=emitter.js.map