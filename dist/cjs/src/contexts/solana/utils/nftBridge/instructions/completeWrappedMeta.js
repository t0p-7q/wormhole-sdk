"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteWrappedMetaAccounts = exports.createCompleteWrappedMetaInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const vaa_1 = require("../../../../../vaa");
const utils_1 = require("../../utils");
function createCompleteWrappedMetaInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId).methods.completeWrappedMeta();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteWrappedMetaAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createCompleteWrappedMetaInstruction = createCompleteWrappedMetaInstruction;
function getCompleteWrappedMetaAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseNftTransferVaa)(vaa) : vaa;
    const mint = (0, accounts_1.deriveWrappedMintKey)(nftBridgeProgramId, parsed.tokenChain, parsed.tokenAddress, parsed.tokenId);
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveNftBridgeConfigKey)(nftBridgeProgramId),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        endpoint: (0, accounts_1.deriveEndpointKey)(nftBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        mint,
        wrappedMeta: (0, accounts_1.deriveWrappedMetaKey)(nftBridgeProgramId, mint),
        splMetadata: (0, utils_1.deriveSplTokenMetadataKey)(mint),
        mintAuthority: (0, accounts_1.deriveMintAuthorityKey)(nftBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        splMetadataProgram: utils_1.SplTokenMetadataProgram.programId,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getCompleteWrappedMetaAccounts = getCompleteWrappedMetaAccounts;
//# sourceMappingURL=completeWrappedMeta.js.map