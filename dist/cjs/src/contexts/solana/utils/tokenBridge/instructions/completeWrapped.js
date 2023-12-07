"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteTransferWrappedAccounts = exports.createCompleteTransferWrappedInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const vaa_1 = require("../../../../../vaa");
function createCompleteTransferWrappedInstruction(connection, tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient) {
    const methods = (0, program_1.createReadOnlyTokenBridgeProgramInterface)(tokenBridgeProgramId, connection).methods.completeWrapped();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteTransferWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createCompleteTransferWrappedInstruction = createCompleteTransferWrappedInstruction;
function getCompleteTransferWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseTokenTransferVaa)(vaa) : vaa;
    const mint = (0, accounts_1.deriveWrappedMintKey)(tokenBridgeProgramId, parsed.tokenChain, parsed.tokenAddress);
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveTokenBridgeConfigKey)(tokenBridgeProgramId),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, wormhole_1.deriveClaimKey)(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        endpoint: (0, accounts_1.deriveEndpointKey)(tokenBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        to: new web3_js_1.PublicKey(parsed.to),
        toFees: new web3_js_1.PublicKey(feeRecipient === undefined ? parsed.to : feeRecipient),
        mint,
        wrappedMeta: (0, accounts_1.deriveWrappedMetaKey)(tokenBridgeProgramId, mint),
        mintAuthority: (0, accounts_1.deriveMintAuthorityKey)(tokenBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getCompleteTransferWrappedAccounts = getCompleteTransferWrappedAccounts;
//# sourceMappingURL=completeWrapped.js.map