"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApproveAuthoritySignerInstruction = void 0;
const tokenBridge_1 = require("../../tokenBridge");
function createApproveAuthoritySignerInstruction(nftBridgeProgramId, tokenAccount, owner) {
    return (0, tokenBridge_1.createApproveAuthoritySignerInstruction)(nftBridgeProgramId, tokenAccount, owner, 1);
}
exports.createApproveAuthoritySignerInstruction = createApproveAuthoritySignerInstruction;
//# sourceMappingURL=approve.js.map