"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveCustodyKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../utils");
function deriveCustodyKey(tokenBridgeProgramId, mint) {
    return (0, utils_1.deriveAddress)([new web3_js_1.PublicKey(mint).toBuffer()], tokenBridgeProgramId);
}
exports.deriveCustodyKey = deriveCustodyKey;
//# sourceMappingURL=custody.js.map