"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveMintAuthorityKey = exports.deriveCustodySignerKey = exports.deriveAuthoritySignerKey = void 0;
const utils_1 = require("../../utils");
function deriveAuthoritySignerKey(tokenBridgeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('authority_signer')], tokenBridgeProgramId);
}
exports.deriveAuthoritySignerKey = deriveAuthoritySignerKey;
function deriveCustodySignerKey(tokenBridgeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('custody_signer')], tokenBridgeProgramId);
}
exports.deriveCustodySignerKey = deriveCustodySignerKey;
function deriveMintAuthorityKey(tokenBridgeProgramId) {
    return (0, utils_1.deriveAddress)([Buffer.from('mint_signer')], tokenBridgeProgramId);
}
exports.deriveMintAuthorityKey = deriveMintAuthorityKey;
//# sourceMappingURL=signer.js.map