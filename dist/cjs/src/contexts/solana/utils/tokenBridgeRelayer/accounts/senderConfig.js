"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveSenderConfigAddress = void 0;
const utils_1 = require("../../utils");
function deriveSenderConfigAddress(programId) {
    return (0, utils_1.deriveAddress)([Buffer.from('sender')], programId);
}
exports.deriveSenderConfigAddress = deriveSenderConfigAddress;
//# sourceMappingURL=senderConfig.js.map