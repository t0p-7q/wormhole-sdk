"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveUpgradeAuthorityKey = void 0;
const utils_1 = require("../../utils");
function deriveUpgradeAuthorityKey(wormholeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('upgrade')], wormholeProgramId);
}
exports.deriveUpgradeAuthorityKey = deriveUpgradeAuthorityKey;
//# sourceMappingURL=upgrade.js.map