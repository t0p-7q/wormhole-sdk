"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveTokenTransferMessageAddress = void 0;
const utils_1 = require("../../utils");
const web3_js_1 = require("@solana/web3.js");
function deriveTokenTransferMessageAddress(programId, payer, sequence) {
    const sequenceBuf = Buffer.alloc(8);
    sequenceBuf.writeBigUInt64BE(BigInt(sequence.toString()));
    return (0, utils_1.deriveAddress)([Buffer.from('bridged'), new web3_js_1.PublicKey(payer).toBuffer(), sequenceBuf], programId);
}
exports.deriveTokenTransferMessageAddress = deriveTokenTransferMessageAddress;
//# sourceMappingURL=tokenTransferMessage.js.map