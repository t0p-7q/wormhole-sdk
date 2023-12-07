"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteTransferWrappedWithPayloadCpiAccounts = exports.getCompleteTransferNativeWithPayloadCpiAccounts = exports.getTransferWrappedWithPayloadCpiAccounts = exports.getTransferNativeWithPayloadCpiAccounts = exports.getTokenBridgeDerivedAccounts = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const vaa_1 = require("../../../../vaa");
const wormhole_1 = require("../wormhole");
const accounts_1 = require("./accounts");
const instructions_1 = require("./instructions");
/**
 * Generate Token Bridge PDAs.
 *
 * @param cpiProgramId
 * @param tokenBridgeProgramId
 * @param wormholeProgramId
 * @returns
 */
function getTokenBridgeDerivedAccounts(cpiProgramId, tokenBridgeProgramId, wormholeProgramId) {
    const { wormholeEmitter: tokenBridgeEmitter, wormholeBridge, wormholeFeeCollector, wormholeSequence: tokenBridgeSequence, } = (0, wormhole_1.getWormholeDerivedAccounts)(tokenBridgeProgramId, wormholeProgramId);
    return {
        tokenBridgeConfig: (0, accounts_1.deriveTokenBridgeConfigKey)(tokenBridgeProgramId),
        tokenBridgeAuthoritySigner: (0, accounts_1.deriveAuthoritySignerKey)(tokenBridgeProgramId),
        tokenBridgeCustodySigner: (0, accounts_1.deriveCustodySignerKey)(tokenBridgeProgramId),
        tokenBridgeMintAuthority: (0, accounts_1.deriveMintAuthorityKey)(tokenBridgeProgramId),
        tokenBridgeSender: (0, accounts_1.deriveSenderAccountKey)(cpiProgramId),
        tokenBridgeRedeemer: (0, accounts_1.deriveRedeemerAccountKey)(cpiProgramId),
        wormholeBridge,
        tokenBridgeEmitter,
        wormholeFeeCollector,
        tokenBridgeSequence,
    };
}
exports.getTokenBridgeDerivedAccounts = getTokenBridgeDerivedAccounts;
/**
 * Generate accounts needed to perform `transfer_wrapped_with_payload` instruction
 * as cross-program invocation.
 *
 * @param cpiProgramId
 * @param tokenBridgeProgramId
 * @param wormholeProgramId
 * @param payer
 * @param message
 * @param fromTokenAccount
 * @param mint
 * @returns
 */
function getTransferNativeWithPayloadCpiAccounts(cpiProgramId, tokenBridgeProgramId, wormholeProgramId, payer, message, fromTokenAccount, mint) {
    const accounts = (0, instructions_1.getTransferNativeWithPayloadAccounts)(tokenBridgeProgramId, wormholeProgramId, payer, message, fromTokenAccount, mint, cpiProgramId);
    return {
        payer: accounts.payer,
        tokenBridgeConfig: accounts.config,
        fromTokenAccount: accounts.from,
        mint: accounts.mint,
        tokenBridgeCustody: accounts.custody,
        tokenBridgeAuthoritySigner: accounts.authoritySigner,
        tokenBridgeCustodySigner: accounts.custodySigner,
        wormholeBridge: accounts.wormholeBridge,
        wormholeMessage: accounts.wormholeMessage,
        tokenBridgeEmitter: accounts.wormholeEmitter,
        tokenBridgeSequence: accounts.wormholeSequence,
        wormholeFeeCollector: accounts.wormholeFeeCollector,
        clock: accounts.clock,
        tokenBridgeSender: accounts.sender,
        rent: accounts.rent,
        systemProgram: accounts.systemProgram,
        tokenProgram: accounts.tokenProgram,
        wormholeProgram: accounts.wormholeProgram,
    };
}
exports.getTransferNativeWithPayloadCpiAccounts = getTransferNativeWithPayloadCpiAccounts;
/**
 * Generate accounts needed to perform `transfer_wrapped_with_payload` instruction
 * as cross-program invocation.
 *
 * @param cpiProgramId
 * @param tokenBridgeProgramId
 * @param wormholeProgramId
 * @param payer
 * @param message
 * @param fromTokenAccount
 * @param tokenChain
 * @param tokenAddress
 * @param [fromTokenAccountOwner]
 * @returns
 */
function getTransferWrappedWithPayloadCpiAccounts(cpiProgramId, tokenBridgeProgramId, wormholeProgramId, payer, message, fromTokenAccount, tokenChain, tokenAddress, fromTokenAccountOwner) {
    const accounts = (0, instructions_1.getTransferWrappedWithPayloadAccounts)(tokenBridgeProgramId, wormholeProgramId, payer, message, fromTokenAccount, fromTokenAccountOwner === undefined ? cpiProgramId : fromTokenAccountOwner, tokenChain, tokenAddress, cpiProgramId);
    return {
        payer: accounts.payer,
        tokenBridgeConfig: accounts.config,
        fromTokenAccount: accounts.from,
        fromTokenAccountOwner: accounts.fromOwner,
        tokenBridgeWrappedMint: accounts.mint,
        tokenBridgeWrappedMeta: accounts.wrappedMeta,
        tokenBridgeAuthoritySigner: accounts.authoritySigner,
        wormholeBridge: accounts.wormholeBridge,
        wormholeMessage: accounts.wormholeMessage,
        tokenBridgeEmitter: accounts.wormholeEmitter,
        tokenBridgeSequence: accounts.wormholeSequence,
        wormholeFeeCollector: accounts.wormholeFeeCollector,
        clock: accounts.clock,
        tokenBridgeSender: accounts.sender,
        rent: accounts.rent,
        systemProgram: accounts.systemProgram,
        tokenProgram: accounts.tokenProgram,
        wormholeProgram: accounts.wormholeProgram,
    };
}
exports.getTransferWrappedWithPayloadCpiAccounts = getTransferWrappedWithPayloadCpiAccounts;
/**
 * Generate accounts needed to perform `complete_native_with_payload` instruction
 * as cross-program invocation.
 *
 * Note: `toFeesTokenAccount` is the same as `toTokenAccount`. For your program,
 * you only need to pass your `toTokenAccount` into the complete transfer
 * instruction for the `toFeesTokenAccount`.
 *
 * @param tokenBridgeProgramId
 * @param wormholeProgramId
 * @param payer
 * @param vaa
 * @param toTokenAccount
 * @returns
 */
function getCompleteTransferNativeWithPayloadCpiAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, toTokenAccount) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseTokenTransferVaa)(vaa) : vaa;
    const mint = new web3_js_1.PublicKey(parsed.tokenAddress);
    const cpiProgramId = new web3_js_1.PublicKey(parsed.to);
    return {
        payer: new web3_js_1.PublicKey(payer),
        tokenBridgeConfig: (0, accounts_1.deriveTokenBridgeConfigKey)(tokenBridgeProgramId),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        tokenBridgeClaim: (0, wormhole_1.deriveClaimKey)(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        tokenBridgeForeignEndpoint: (0, accounts_1.deriveEndpointKey)(tokenBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        toTokenAccount: new web3_js_1.PublicKey(toTokenAccount),
        tokenBridgeRedeemer: (0, accounts_1.deriveRedeemerAccountKey)(cpiProgramId),
        toFeesTokenAccount: new web3_js_1.PublicKey(toTokenAccount),
        tokenBridgeCustody: (0, accounts_1.deriveCustodyKey)(tokenBridgeProgramId, mint),
        mint,
        tokenBridgeCustodySigner: (0, accounts_1.deriveCustodySignerKey)(tokenBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getCompleteTransferNativeWithPayloadCpiAccounts = getCompleteTransferNativeWithPayloadCpiAccounts;
/**
 * Generate accounts needed to perform `complete_wrapped_with_payload` instruction
 * as cross-program invocation.
 *
 * Note: `toFeesTokenAccount` is the same as `toTokenAccount`. For your program,
 * you only need to pass your `toTokenAccount` into the complete transfer
 * instruction for the `toFeesTokenAccount`.
 *
 * @param cpiProgramId
 * @param tokenBridgeProgramId
 * @param wormholeProgramId
 * @param payer
 * @param vaa
 * @returns
 */
function getCompleteTransferWrappedWithPayloadCpiAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, toTokenAccount) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseTokenTransferVaa)(vaa) : vaa;
    const mint = (0, accounts_1.deriveWrappedMintKey)(tokenBridgeProgramId, parsed.tokenChain, parsed.tokenAddress);
    const cpiProgramId = new web3_js_1.PublicKey(parsed.to);
    return {
        payer: new web3_js_1.PublicKey(payer),
        tokenBridgeConfig: (0, accounts_1.deriveTokenBridgeConfigKey)(tokenBridgeProgramId),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        tokenBridgeClaim: (0, wormhole_1.deriveClaimKey)(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        tokenBridgeForeignEndpoint: (0, accounts_1.deriveEndpointKey)(tokenBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        toTokenAccount: new web3_js_1.PublicKey(toTokenAccount),
        tokenBridgeRedeemer: (0, accounts_1.deriveRedeemerAccountKey)(cpiProgramId),
        toFeesTokenAccount: new web3_js_1.PublicKey(toTokenAccount),
        tokenBridgeWrappedMint: mint,
        tokenBridgeWrappedMeta: (0, accounts_1.deriveWrappedMetaKey)(tokenBridgeProgramId, mint),
        tokenBridgeMintAuthority: (0, accounts_1.deriveMintAuthorityKey)(tokenBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getCompleteTransferWrappedWithPayloadCpiAccounts = getCompleteTransferWrappedWithPayloadCpiAccounts;
//# sourceMappingURL=cpi.js.map