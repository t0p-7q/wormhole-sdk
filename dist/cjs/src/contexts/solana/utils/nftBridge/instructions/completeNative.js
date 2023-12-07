"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteTransferNativeAccounts = exports.createCompleteTransferNativeInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const vaa_1 = require("../../../../../vaa");
function createCompleteTransferNativeInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId, connection).methods.completeNative();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createCompleteTransferNativeInstruction = createCompleteTransferNativeInstruction;
function getCompleteTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseNftTransferVaa)(vaa) : vaa;
    // the mint key is encoded in the tokenId when it was transferred out
    const mint = (0, program_1.tokenIdToMint)(parsed.tokenId);
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveNftBridgeConfigKey)(nftBridgeProgramId),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, wormhole_1.deriveClaimKey)(nftBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        endpoint: (0, accounts_1.deriveEndpointKey)(nftBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        to: new web3_js_1.PublicKey(parsed.to),
        toAuthority: new web3_js_1.PublicKey(toAuthority === undefined ? payer : toAuthority),
        custody: (0, accounts_1.deriveCustodyKey)(nftBridgeProgramId, mint),
        mint,
        custodySigner: (0, accounts_1.deriveCustodySignerKey)(nftBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getCompleteTransferNativeAccounts = getCompleteTransferNativeAccounts;
//# sourceMappingURL=completeNative.js.map