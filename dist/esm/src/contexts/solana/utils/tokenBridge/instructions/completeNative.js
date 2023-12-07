import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyTokenBridgeProgramInterface } from '../program';
import { deriveClaimKey, derivePostedVaaKey } from '../../wormhole';
import { deriveEndpointKey, deriveTokenBridgeConfigKey, deriveCustodyKey, deriveCustodySignerKey, } from '../accounts';
import { isBytes, parseTokenTransferVaa, } from '../../../../../vaa';
export function createCompleteTransferNativeInstruction(connection, tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient) {
    const methods = createReadOnlyTokenBridgeProgramInterface(tokenBridgeProgramId, connection).methods.completeNative();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteTransferNativeAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getCompleteTransferNativeAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, feeRecipient) {
    const parsed = isBytes(vaa) ? parseTokenTransferVaa(vaa) : vaa;
    const mint = new PublicKey(parsed.tokenAddress);
    return {
        payer: new PublicKey(payer),
        config: deriveTokenBridgeConfigKey(tokenBridgeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        endpoint: deriveEndpointKey(tokenBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        to: new PublicKey(parsed.to),
        toFees: new PublicKey(feeRecipient === undefined ? parsed.to : feeRecipient),
        custody: deriveCustodyKey(tokenBridgeProgramId, mint),
        mint,
        custodySigner: deriveCustodySignerKey(tokenBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
//# sourceMappingURL=completeNative.js.map