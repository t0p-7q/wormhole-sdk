import { PublicKey, } from '@solana/web3.js';
import { getTransferWrappedWithPayloadCpiAccounts } from '../../tokenBridge/cpi';
import { createTokenBridgeRelayerProgramInterface } from '../program';
import { deriveForeignContractAddress, deriveSenderConfigAddress, deriveTokenTransferMessageAddress, deriveTmpTokenAccountAddress, deriveRegisteredTokenAddress, } from '../accounts';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { getWrappedMeta } from '../../tokenBridge';
import { BN } from '@project-serum/anchor';
import { deriveSignerSequenceAddress } from '../accounts/signerSequence';
export async function createTransferWrappedTokensWithRelayInstruction(connection, programId, payer, tokenBridgeProgramId, wormholeProgramId, mint, amount, toNativeTokenAmount, recipientAddress, recipientChain, batchId) {
    const { methods: { transferWrappedTokensWithRelay }, account: { signerSequence }, } = createTokenBridgeRelayerProgramInterface(programId, connection);
    const signerSequenceAddress = deriveSignerSequenceAddress(programId, payer);
    const sequence = await signerSequence
        .fetch(signerSequenceAddress)
        .then(({ value }) => value)
        .catch((e) => {
        if (e.message?.includes('Account does not exist')) {
            // first time transferring
            return new BN(0);
        }
        throw e;
    });
    const message = deriveTokenTransferMessageAddress(programId, payer, sequence);
    const fromTokenAccount = getAssociatedTokenAddressSync(new PublicKey(mint), new PublicKey(payer));
    const { chain, tokenAddress } = await getWrappedMeta(connection, tokenBridgeProgramId, mint);
    const tmpTokenAccount = deriveTmpTokenAccountAddress(programId, mint);
    const tokenBridgeAccounts = getTransferWrappedWithPayloadCpiAccounts(programId, tokenBridgeProgramId, wormholeProgramId, payer, message, fromTokenAccount, chain, tokenAddress);
    return transferWrappedTokensWithRelay(new BN(amount.toString()), new BN(toNativeTokenAmount.toString()), recipientChain, [...recipientAddress], batchId)
        .accounts({
        config: deriveSenderConfigAddress(programId),
        payerSequence: signerSequenceAddress,
        foreignContract: deriveForeignContractAddress(programId, recipientChain),
        registeredToken: deriveRegisteredTokenAddress(programId, new PublicKey(mint)),
        tmpTokenAccount,
        tokenBridgeProgram: new PublicKey(tokenBridgeProgramId),
        ...tokenBridgeAccounts,
    })
        .instruction();
}
//# sourceMappingURL=transferWrappedTokensWithRelay.js.map