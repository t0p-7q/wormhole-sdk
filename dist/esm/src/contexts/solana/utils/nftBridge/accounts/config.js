import { deriveTokenBridgeConfigKey, getTokenBridgeConfig, TokenBridgeConfig, } from '../../tokenBridge';
export const deriveNftBridgeConfigKey = deriveTokenBridgeConfigKey;
export async function getNftBridgeConfig(connection, nftBridgeProgramId, commitment) {
    return getTokenBridgeConfig(connection, nftBridgeProgramId, commitment);
}
export class NftBridgeConfig extends TokenBridgeConfig {
}
//# sourceMappingURL=config.js.map