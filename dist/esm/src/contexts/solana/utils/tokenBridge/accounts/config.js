import { PublicKey, } from '@solana/web3.js';
import { deriveAddress, getAccountData } from '../../utils';
export function deriveTokenBridgeConfigKey(tokenBridgeProgramId) {
    return deriveAddress([Buffer.from('config')], tokenBridgeProgramId);
}
export async function getTokenBridgeConfig(connection, tokenBridgeProgramId, commitment) {
    return connection
        .getAccountInfo(deriveTokenBridgeConfigKey(tokenBridgeProgramId), commitment)
        .then((info) => TokenBridgeConfig.deserialize(getAccountData(info)));
}
export class TokenBridgeConfig {
    constructor(wormholeProgramId) {
        this.wormhole = new PublicKey(wormholeProgramId);
    }
    static deserialize(data) {
        if (data.length != 32) {
            throw new Error('data.length != 32');
        }
        const wormholeProgramId = data.subarray(0, 32);
        return new TokenBridgeConfig(wormholeProgramId);
    }
}
//# sourceMappingURL=config.js.map