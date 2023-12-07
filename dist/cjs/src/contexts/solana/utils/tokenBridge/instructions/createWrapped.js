"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreateWrappedAccounts = exports.createCreateWrappedInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const vaa_1 = require("../../../../../vaa");
const utils_1 = require("../../utils");
function createCreateWrappedInstruction(connection, tokenBridgeProgramId, wormholeProgramId, payer, vaa) {
    const methods = (0, program_1.createReadOnlyTokenBridgeProgramInterface)(tokenBridgeProgramId, connection).methods.createWrapped();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCreateWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createCreateWrappedInstruction = createCreateWrappedInstruction;
function getCreateWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseAttestMetaVaa)(vaa) : vaa;
    const mint = (0, accounts_1.deriveWrappedMintKey)(tokenBridgeProgramId, parsed.tokenChain, parsed.tokenAddress);
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveTokenBridgeConfigKey)(tokenBridgeProgramId),
        endpoint: (0, accounts_1.deriveEndpointKey)(tokenBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, wormhole_1.deriveClaimKey)(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        mint,
        wrappedMeta: (0, accounts_1.deriveWrappedMetaKey)(tokenBridgeProgramId, mint),
        splMetadata: (0, accounts_1.deriveSplTokenMetadataKey)(mint),
        mintAuthority: (0, accounts_1.deriveMintAuthorityKey)(tokenBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        splMetadataProgram: utils_1.SplTokenMetadataProgram.programId,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getCreateWrappedAccounts = getCreateWrappedAccounts;
//# sourceMappingURL=createWrapped.js.map