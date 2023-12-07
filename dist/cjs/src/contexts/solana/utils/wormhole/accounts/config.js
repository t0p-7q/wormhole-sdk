"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeData = exports.BridgeConfig = exports.getWormholeBridgeData = exports.deriveWormholeBridgeDataKey = void 0;
const utils_1 = require("../../utils");
function deriveWormholeBridgeDataKey(wormholeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('Bridge')], wormholeProgramId);
}
exports.deriveWormholeBridgeDataKey = deriveWormholeBridgeDataKey;
async function getWormholeBridgeData(connection, wormholeProgramId, commitment) {
    return connection
        .getAccountInfo(deriveWormholeBridgeDataKey(wormholeProgramId), commitment)
        .then((info) => BridgeData.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getWormholeBridgeData = getWormholeBridgeData;
class BridgeConfig {
    constructor(guardianSetExpirationTime, fee) {
        this.guardianSetExpirationTime = guardianSetExpirationTime;
        this.fee = fee;
    }
    static deserialize(data) {
        if (data.length != 12) {
            throw new Error('data.length != 12');
        }
        const guardianSetExpirationTime = data.readUInt32LE(0);
        const fee = data.readBigUInt64LE(4);
        return new BridgeConfig(guardianSetExpirationTime, fee);
    }
}
exports.BridgeConfig = BridgeConfig;
class BridgeData {
    constructor(guardianSetIndex, lastLamports, config) {
        this.guardianSetIndex = guardianSetIndex;
        this.lastLamports = lastLamports;
        this.config = config;
    }
    static deserialize(data) {
        if (data.length != 24) {
            throw new Error('data.length != 24');
        }
        const guardianSetIndex = data.readUInt32LE(0);
        const lastLamports = data.readBigUInt64LE(4);
        const config = BridgeConfig.deserialize(data.subarray(12));
        return new BridgeData(guardianSetIndex, lastLamports, config);
    }
}
exports.BridgeData = BridgeData;
//# sourceMappingURL=config.js.map