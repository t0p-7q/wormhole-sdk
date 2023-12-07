"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostVaaAccounts = exports.createPostVaaInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const program_1 = require("../program");
const accounts_1 = require("../accounts");
const vaa_1 = require("../../../../../vaa");
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * Make {@link TransactionInstruction} for `post_vaa` instruction.
 *
 * This is used in {@link createPostSignedVaaTransactions}'s last transaction.
 * `signatureSet` is a {@link web3.Keypair} generated outside of this method, which was used
 * to write signatures and the message hash to.
 *
 * https://github.com/certusone/wormhole/blob/main/solana/bridge/program/src/api/post_vaa.rs
 *
 * @param {PublicKeyInitData} wormholeProgramId - wormhole program address
 * @param {PublicKeyInitData} payer - transaction signer address
 * @param {SignedVaa | ParsedVaa} vaa - either signed VAA bytes or parsed VAA (use {@link parseVaa} on signed VAA)
 * @param {PublicKeyInitData} signatureSet - key for signature set account
 */
function createPostVaaInstruction(connection, wormholeProgramId, payer, vaa, signatureSet) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseVaa)(vaa) : vaa;
    const methods = (0, program_1.createReadOnlyWormholeProgramInterface)(wormholeProgramId, connection).methods.postVaa(parsed.version, parsed.guardianSetIndex, parsed.timestamp, parsed.nonce, parsed.emitterChain, [...parsed.emitterAddress], new bn_js_1.default(parsed.sequence.toString()), parsed.consistencyLevel, parsed.payload);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getPostVaaAccounts(wormholeProgramId, payer, signatureSet, parsed),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createPostVaaInstruction = createPostVaaInstruction;
function getPostVaaAccounts(wormholeProgramId, payer, signatureSet, vaa) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseVaa)(vaa) : vaa;
    return {
        guardianSet: (0, accounts_1.deriveGuardianSetKey)(wormholeProgramId, parsed.guardianSetIndex),
        bridge: (0, accounts_1.deriveWormholeBridgeDataKey)(wormholeProgramId),
        signatureSet: new web3_js_1.PublicKey(signatureSet),
        vaa: (0, accounts_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        payer: new web3_js_1.PublicKey(payer),
        clock: web3_js_1.SYSVAR_CLOCK_PUBKEY,
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
    };
}
exports.getPostVaaAccounts = getPostVaaAccounts;
//# sourceMappingURL=postVaa.js.map