"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianSetData = exports.getGuardianSet = exports.deriveGuardianSetKey = void 0;
const utils_1 = require("../../utils");
function deriveGuardianSetKey(wormholeProgramId, index) {
    return (0, utils_1.deriveAddress)([
        Buffer.from('GuardianSet'),
        (() => {
            const buf = Buffer.alloc(4);
            buf.writeUInt32BE(index);
            return buf;
        })(),
    ], wormholeProgramId);
}
exports.deriveGuardianSetKey = deriveGuardianSetKey;
async function getGuardianSet(connection, wormholeProgramId, index, commitment) {
    return connection
        .getAccountInfo(deriveGuardianSetKey(wormholeProgramId, index), commitment)
        .then((info) => GuardianSetData.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getGuardianSet = getGuardianSet;
class GuardianSetData {
    constructor(index, keys, creationTime, expirationTime) {
        this.index = index;
        this.keys = keys;
        this.creationTime = creationTime;
        this.expirationTime = expirationTime;
    }
    static deserialize(data) {
        const index = data.readUInt32LE(0);
        const keysLen = data.readUInt32LE(4);
        const keysEnd = 8 + keysLen * utils_1.ETHEREUM_KEY_LENGTH;
        const creationTime = data.readUInt32LE(keysEnd);
        const expirationTime = data.readUInt32LE(4 + keysEnd);
        const keys = [];
        for (let i = 0; i < keysLen; ++i) {
            const start = 8 + i * utils_1.ETHEREUM_KEY_LENGTH;
            keys.push(data.subarray(start, start + utils_1.ETHEREUM_KEY_LENGTH));
        }
        return new GuardianSetData(index, keys, creationTime, expirationTime);
    }
}
exports.GuardianSetData = GuardianSetData;
//# sourceMappingURL=guardianSet.js.map