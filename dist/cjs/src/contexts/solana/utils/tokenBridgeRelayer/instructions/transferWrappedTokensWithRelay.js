"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransferWrappedTokensWithRelayInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const cpi_1 = require("../../tokenBridge/cpi");
const program_1 = require("../program");
const accounts_1 = require("../accounts");
const spl_token_1 = require("@solana/spl-token");
const tokenBridge_1 = require("../../tokenBridge");
const anchor_1 = require("@project-serum/anchor");
const signerSequence_1 = require("../accounts/signerSequence");
async function createTransferWrappedTokensWithRelayInstruction(connection, programId, payer, tokenBridgeProgramId, wormholeProgramId, mint, amount, toNativeTokenAmount, recipientAddress, recipientChain, batchId) {
    const { methods: { transferWrappedTokensWithRelay }, account: { signerSequence }, } = (0, program_1.createTokenBridgeRelayerProgramInterface)(programId, connection);
    const signerSequenceAddress = (0, signerSequence_1.deriveSignerSequenceAddress)(programId, payer);
    const sequence = await signerSequence
        .fetch(signerSequenceAddress)
        .then(({ value }) => value)
        .catch((e) => {
        if (e.message?.includes('Account does not exist')) {
            // first time transferring
            return new anchor_1.BN(0);
        }
        throw e;
    });
    const message = (0, accounts_1.deriveTokenTransferMessageAddress)(programId, payer, sequence);
    const fromTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(new web3_js_1.PublicKey(mint), new web3_js_1.PublicKey(payer));
    const { chain, tokenAddress } = await (0, tokenBridge_1.getWrappedMeta)(connection, tokenBridgeProgramId, mint);
    const tmpTokenAccount = (0, accounts_1.deriveTmpTokenAccountAddress)(programId, mint);
    const tokenBridgeAccounts = (0, cpi_1.getTransferWrappedWithPayloadCpiAccounts)(programId, tokenBridgeProgramId, wormholeProgramId, payer, message, fromTokenAccount, chain, tokenAddress);
    return transferWrappedTokensWithRelay(new anchor_1.BN(amount.toString()), new anchor_1.BN(toNativeTokenAmount.toString()), recipientChain, [...recipientAddress], batchId)
        .accounts({
        config: (0, accounts_1.deriveSenderConfigAddress)(programId),
        payerSequence: signerSequenceAddress,
        foreignContract: (0, accounts_1.deriveForeignContractAddress)(programId, recipientChain),
        registeredToken: (0, accounts_1.deriveRegisteredTokenAddress)(programId, new web3_js_1.PublicKey(mint)),
        tmpTokenAccount,
        tokenBridgeProgram: new web3_js_1.PublicKey(tokenBridgeProgramId),
        ...tokenBridgeAccounts,
    })
        .instruction();
}
exports.createTransferWrappedTokensWithRelayInstruction = createTransferWrappedTokensWithRelayInstruction;
//# sourceMappingURL=transferWrappedTokensWithRelay.js.map