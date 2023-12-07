"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveRegisteredTokenAddress = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../utils");
function deriveRegisteredTokenAddress(programId, mint) {
    return (0, utils_1.deriveAddress)([Buffer.from('mint'), new web3_js_1.PublicKey(mint).toBuffer()], programId);
}
exports.deriveRegisteredTokenAddress = deriveRegisteredTokenAddress;
//# sourceMappingURL=registeredToken.js.map