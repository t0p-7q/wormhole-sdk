"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitializeAccounts = exports.createInitializeInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const program_1 = require("../program");
const accounts_1 = require("../accounts");
function createInitializeInstruction(connection, nftBridgeProgramId, payer, wormholeProgramId) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId).methods.initialize(wormholeProgramId);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getInitializeAccounts(nftBridgeProgramId, payer),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createInitializeInstruction = createInitializeInstruction;
function getInitializeAccounts(nftBridgeProgramId, payer) {
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveNftBridgeConfigKey)(nftBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
    };
}
exports.getInitializeAccounts = getInitializeAccounts;
//# sourceMappingURL=initialize.js.map