"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenBridgeRelayerProgramInterface = void 0;
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@project-serum/anchor");
const tokenBridgeRelayer_1 = require("../types/tokenBridgeRelayer");
function createTokenBridgeRelayerProgramInterface(programId, connection) {
    return new anchor_1.Program(tokenBridgeRelayer_1.IDL, new web3_js_1.PublicKey(programId), { connection });
}
exports.createTokenBridgeRelayerProgramInterface = createTokenBridgeRelayerProgramInterface;
//# sourceMappingURL=program.js.map