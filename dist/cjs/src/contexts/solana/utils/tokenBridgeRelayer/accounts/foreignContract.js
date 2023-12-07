"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveForeignContractAddress = void 0;
const utils_1 = require("../../utils");
function deriveForeignContractAddress(programId, chainId) {
    const chainIdBuf = Buffer.alloc(2);
    chainIdBuf.writeUInt16BE(chainId);
    return (0, utils_1.deriveAddress)([Buffer.from('foreign_contract'), chainIdBuf], programId);
}
exports.deriveForeignContractAddress = deriveForeignContractAddress;
//# sourceMappingURL=foreignContract.js.map