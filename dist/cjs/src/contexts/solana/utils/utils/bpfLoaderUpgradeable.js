"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveUpgradeableProgramKey = exports.BpfLoaderUpgradeable = void 0;
const web3_js_1 = require("@solana/web3.js");
const account_1 = require("./account");
class BpfLoaderUpgradeable {
    /**
     * @internal
     */
    constructor() { }
}
exports.BpfLoaderUpgradeable = BpfLoaderUpgradeable;
/**
 * Public key that identifies the SPL Token Metadata program
 */
BpfLoaderUpgradeable.programId = new web3_js_1.PublicKey('BPFLoaderUpgradeab1e11111111111111111111111');
function deriveUpgradeableProgramKey(programId) {
    return (0, account_1.deriveAddress)([new web3_js_1.PublicKey(programId).toBuffer()], BpfLoaderUpgradeable.programId);
}
exports.deriveUpgradeableProgramKey = deriveUpgradeableProgramKey;
//# sourceMappingURL=bpfLoaderUpgradeable.js.map