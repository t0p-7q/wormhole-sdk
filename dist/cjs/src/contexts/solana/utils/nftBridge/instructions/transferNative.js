"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferNativeAccounts = exports.createTransferNativeInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const utils_1 = require("../../utils");
function createTransferNativeInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, message, from, mint, nonce, targetAddress, targetChain) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId, connection).methods.transferNative(nonce, Buffer.from(targetAddress), targetChain);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, mint),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createTransferNativeInstruction = createTransferNativeInstruction;
function getTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, mint) {
    const { bridge: wormholeBridge, message: wormholeMessage, emitter: wormholeEmitter, sequence: wormholeSequence, feeCollector: wormholeFeeCollector, clock, rent, systemProgram, } = (0, wormhole_1.getPostMessageAccounts)(wormholeProgramId, payer, nftBridgeProgramId, message);
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveNftBridgeConfigKey)(nftBridgeProgramId),
        from: new web3_js_1.PublicKey(from),
        mint: new web3_js_1.PublicKey(mint),
        splMetadata: (0, utils_1.deriveSplTokenMetadataKey)(mint),
        custody: (0, accounts_1.deriveCustodyKey)(nftBridgeProgramId, mint),
        authoritySigner: (0, accounts_1.deriveAuthoritySignerKey)(nftBridgeProgramId),
        custodySigner: (0, accounts_1.deriveCustodySignerKey)(nftBridgeProgramId),
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
exports.getTransferNativeAccounts = getTransferNativeAccounts;
//# sourceMappingURL=transferNative.js.map