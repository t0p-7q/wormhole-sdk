"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBridgeConfig = exports.getTokenBridgeConfig = exports.deriveTokenBridgeConfigKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../utils");
function deriveTokenBridgeConfigKey(tokenBridgeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('config')], tokenBridgeProgramId);
}
exports.deriveTokenBridgeConfigKey = deriveTokenBridgeConfigKey;
async function getTokenBridgeConfig(connection, tokenBridgeProgramId, commitment) {
    return connection
        .getAccountInfo(deriveTokenBridgeConfigKey(tokenBridgeProgramId), commitment)
        .then((info) => TokenBridgeConfig.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getTokenBridgeConfig = getTokenBridgeConfig;
class TokenBridgeConfig {
    constructor(wormholeProgramId) {
        this.wormhole = new web3_js_1.PublicKey(wormholeProgramId);
    }
    static deserialize(data) {
        if (data.length != 32) {
            throw new Error('data.length != 32');
        }
        const wormholeProgramId = data.subarray(0, 32);
        return new TokenBridgeConfig(wormholeProgramId);
    }
}
exports.TokenBridgeConfig = TokenBridgeConfig;
//# sourceMappingURL=config.js.map