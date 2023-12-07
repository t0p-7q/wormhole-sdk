"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveTmpTokenAccountAddress = void 0;
const utils_1 = require("../../utils");
const web3_js_1 = require("@solana/web3.js");
function deriveTmpTokenAccountAddress(programId, mint) {
    return (0, utils_1.deriveAddress)([Buffer.from('tmp'), new web3_js_1.PublicKey(mint).toBuffer()], programId);
}
exports.deriveTmpTokenAccountAddress = deriveTmpTokenAccountAddress;
//# sourceMappingURL=tmpTokenAccount.js.map