"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteTransferWrappedAccounts = exports.createCompleteTransferWrappedInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const vaa_1 = require("../../../../../vaa");
const utils_1 = require("../../utils");
function createCompleteTransferWrappedInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId).methods.completeWrapped();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteTransferWrappedAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createCompleteTransferWrappedInstruction = createCompleteTransferWrappedInstruction;
function getCompleteTransferWrappedAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseNftTransferVaa)(vaa) : vaa;
    const mint = (0, accounts_1.deriveWrappedMintKey)(nftBridgeProgramId, parsed.tokenChain, parsed.tokenAddress, parsed.tokenId);
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveNftBridgeConfigKey)(nftBridgeProgramId),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, wormhole_1.deriveClaimKey)(nftBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        endpoint: (0, accounts_1.deriveEndpointKey)(nftBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        to: new web3_js_1.PublicKey(parsed.to),
        toAuthority: new web3_js_1.PublicKey(toAuthority === undefined ? payer : toAuthority),
        mint,
        wrappedMeta: (0, accounts_1.deriveWrappedMetaKey)(nftBridgeProgramId, mint),
        mintAuthority: (0, accounts_1.deriveMintAuthorityKey)(nftBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        splMetadataProgram: utils_1.SplTokenMetadataProgram.programId,
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getCompleteTransferWrappedAccounts = getCompleteTransferWrappedAccounts;
//# sourceMappingURL=completeWrapped.js.map