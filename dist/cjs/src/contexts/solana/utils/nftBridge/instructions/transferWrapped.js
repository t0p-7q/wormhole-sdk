"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferWrappedAccounts = exports.createTransferWrappedInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const utils_1 = require("../../utils");
function createTransferWrappedInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress, tokenId, nonce, targetAddress, targetChain) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId, connection).methods.transferWrapped(nonce, Buffer.from(targetAddress), targetChain);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getTransferWrappedAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress, tokenId),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createTransferWrappedInstruction = createTransferWrappedInstruction;
function getTransferWrappedAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress, tokenId) {
    const mint = (0, accounts_1.deriveWrappedMintKey)(nftBridgeProgramId, tokenChain, tokenAddress, tokenId);
    const { bridge: wormholeBridge, message: wormholeMessage, emitter: wormholeEmitter, sequence: wormholeSequence, feeCollector: wormholeFeeCollector, clock, rent, systemProgram, } = (0, wormhole_1.getPostMessageAccounts)(wormholeProgramId, payer, nftBridgeProgramId, message);
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveNftBridgeConfigKey)(nftBridgeProgramId),
        from: new web3_js_1.PublicKey(from),
        fromOwner: new web3_js_1.PublicKey(fromOwner),
        mint,
        wrappedMeta: (0, accounts_1.deriveWrappedMetaKey)(nftBridgeProgramId, mint),
        splMetadata: (0, utils_1.deriveSplTokenMetadataKey)(mint),
        authoritySigner: (0, accounts_1.deriveAuthoritySignerKey)(nftBridgeProgramId),
        wormholeBridge,
        wormholeMessage,
        wormholeEmitter,
        wormholeSequence,
        wormholeFeeCollector,
        clock,
        rent,
        systemProgram,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        splMetadataProgram: utils_1.SplTokenMetadataProgram.programId,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getTransferWrappedAccounts = getTransferWrappedAccounts;
//# sourceMappingURL=transferWrapped.js.map