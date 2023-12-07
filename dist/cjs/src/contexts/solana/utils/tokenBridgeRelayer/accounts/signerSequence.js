"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveSignerSequenceAddress = void 0;
const utils_1 = require("../../utils");
const web3_js_1 = require("@solana/web3.js");
function deriveSignerSequenceAddress(programId, payerKey) {
    return (0, utils_1.deriveAddress)([Buffer.from('seq'), new web3_js_1.PublicKey(payerKey).toBuffer()], programId);
}
exports.deriveSignerSequenceAddress = deriveSignerSequenceAddress;
//# sourceMappingURL=signerSequence.js.map