"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftBridgeConfig = exports.getNftBridgeConfig = exports.deriveNftBridgeConfigKey = void 0;
const tokenBridge_1 = require("../../tokenBridge");
exports.deriveNftBridgeConfigKey = tokenBridge_1.deriveTokenBridgeConfigKey;
async function getNftBridgeConfig(connection, nftBridgeProgramId, commitment) {
    return (0, tokenBridge_1.getTokenBridgeConfig)(connection, nftBridgeProgramId, commitment);
}
exports.getNftBridgeConfig = getNftBridgeConfig;
class NftBridgeConfig extends tokenBridge_1.TokenBridgeConfig {
}
exports.NftBridgeConfig = NftBridgeConfig;
//# sourceMappingURL=config.js.map