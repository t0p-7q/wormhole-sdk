"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveRedeemerAccountKey = exports.deriveSenderAccountKey = void 0;
const utils_1 = require("../../utils");
function deriveSenderAccountKey(cpiProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('sender')], cpiProgramId);
}
exports.deriveSenderAccountKey = deriveSenderAccountKey;
function deriveRedeemerAccountKey(cpiProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('redeemer')], cpiProgramId);
}
exports.deriveRedeemerAccountKey = deriveRedeemerAccountKey;
//# sourceMappingURL=transferWithPayload.js.map