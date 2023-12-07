import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyTokenBridgeProgramInterface } from '../program';
import { deriveClaimKey, derivePostedVaaKey } from '../../wormhole';
import { deriveEndpointKey, deriveTokenBridgeConfigKey, deriveWrappedMintKey, deriveWrappedMetaKey, deriveMintAuthorityKey, } from '../accounts';
import { isBytes, parseTokenTransferVaa, } from '../../../../../vaa';
export function createCompleteTransferWrappedInstruction(connection, tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient) {
    const methods = createReadOnlyTokenBridgeProgramInterface(tokenBridgeProgramId, connection).methods.completeWrapped();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteTransferWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getCompleteTransferWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient) {
    const parsed = isBytes(vaa) ? parseTokenTransferVaa(vaa) : vaa;
    const mint = deriveWrappedMintKey(tokenBridgeProgramId, parsed.tokenChain, parsed.tokenAddress);
    return {
        payer: new PublicKey(payer),
        config: deriveTokenBridgeConfigKey(tokenBridgeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        endpoint: deriveEndpointKey(tokenBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        to: new PublicKey(parsed.to),
        toFees: new PublicKey(feeRecipient === undefined ? parsed.to : feeRecipient),
        mint,
        wrappedMeta: deriveWrappedMetaKey(tokenBridgeProgramId, mint),
        mintAuthority: deriveMintAuthorityKey(tokenBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
//# sourceMappingURL=completeWrapped.js.map