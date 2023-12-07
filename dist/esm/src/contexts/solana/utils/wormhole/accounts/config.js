import { deriveAddress, getAccountData } from '../../utils';
export function deriveWormholeBridgeDataKey(wormholeProgramId) {
    return deriveAddress([Buffer.from('Bridge')], wormholeProgramId);
}
export async function getWormholeBridgeData(connection, wormholeProgramId, commitment) {
    return connection
        .getAccountInfo(deriveWormholeBridgeDataKey(wormholeProgramId), commitment)
        .then((info) => BridgeData.deserialize(getAccountData(info)));
}
export class BridgeConfig {
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
export class BridgeData {
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
//# sourceMappingURL=config.js.map