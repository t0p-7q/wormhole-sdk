"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceTracker = exports.getSequenceTracker = exports.deriveEmitterSequenceKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../utils");
function deriveEmitterSequenceKey(emitter, wormholeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('Sequence'), new web3_js_1.PublicKey(emitter).toBytes()], wormholeProgramId);
}
exports.deriveEmitterSequenceKey = deriveEmitterSequenceKey;
async function getSequenceTracker(connection, emitter, wormholeProgramId, commitment) {
    return connection
        .getAccountInfo(deriveEmitterSequenceKey(emitter, wormholeProgramId), commitment)
        .then((info) => SequenceTracker.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getSequenceTracker = getSequenceTracker;
class SequenceTracker {
    constructor(sequence) {
        this.sequence = sequence;
    }
    static deserialize(data) {
        if (data.length != 8) {
            throw new Error('data.length != 8');
        }
        return new SequenceTracker(data.readBigUInt64LE(0));
    }
    value() {
        return this.sequence;
    }
}
exports.SequenceTracker = SequenceTracker;
//# sourceMappingURL=sequence.js.map