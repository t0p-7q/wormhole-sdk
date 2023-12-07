"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveRedeemerConfigAddress = void 0;
const utils_1 = require("../../utils");
function deriveRedeemerConfigAddress(programId) {
    return (0, utils_1.deriveAddress)([Buffer.from('redeemer')], programId);
}
exports.deriveRedeemerConfigAddress = deriveRedeemerConfigAddress;
//# sourceMappingURL=redeemerConfig.js.map