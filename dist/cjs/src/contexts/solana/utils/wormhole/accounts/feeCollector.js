"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveFeeCollectorKey = void 0;
const utils_1 = require("../../utils");
function deriveFeeCollectorKey(wormholeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('fee_collector')], wormholeProgramId);
}
exports.deriveFeeCollectorKey = deriveFeeCollectorKey;
//# sourceMappingURL=feeCollector.js.map