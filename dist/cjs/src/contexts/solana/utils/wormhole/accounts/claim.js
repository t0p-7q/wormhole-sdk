"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClaim = exports.deriveClaimKey = void 0;
const utils_1 = require("../../utils");
function deriveClaimKey(programId, emitterAddress, emitterChain, sequence) {
    const address = typeof emitterAddress == 'string'
        ? Buffer.from(emitterAddress, 'hex')
        : Buffer.from(emitterAddress);
    if (address.length != 32) {
        throw Error('address.length != 32');
    }
    const sequenceSerialized = Buffer.alloc(8);
    sequenceSerialized.writeBigUInt64BE(typeof sequence == 'number' ? BigInt(sequence) : sequence);
    return (0, utils_1.deriveAddress)([
        address,
        (() => {
            const buf = Buffer.alloc(2);
            buf.writeUInt16BE(emitterChain);
            return buf;
        })(),
        sequenceSerialized,
    ], programId);
}
exports.deriveClaimKey = deriveClaimKey;
async function getClaim(connection, programId, emitterAddress, emitterChain, sequence, commitment) {
    return connection
        .getAccountInfo(deriveClaimKey(programId, emitterAddress, emitterChain, sequence), commitment)
        .then((info) => !!(0, utils_1.getAccountData)(info)[0]);
}
exports.getClaim = getClaim;
//# sourceMappingURL=claim.js.map