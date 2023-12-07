import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyNftBridgeProgramInterface, tokenIdToMint, } from '../program';
import { deriveClaimKey, derivePostedVaaKey } from '../../wormhole';
import { deriveEndpointKey, deriveNftBridgeConfigKey, deriveCustodyKey, deriveCustodySignerKey, } from '../accounts';
import { isBytes, parseNftTransferVaa, } from '../../../../../vaa';
export function createCompleteTransferNativeInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority) {
    const methods = createReadOnlyNftBridgeProgramInterface(nftBridgeProgramId, connection).methods.completeNative();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getCompleteTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, toAuthority) {
    const parsed = isBytes(vaa) ? parseNftTransferVaa(vaa) : vaa;
    // the mint key is encoded in the tokenId when it was transferred out
    const mint = tokenIdToMint(parsed.tokenId);
    return {
        payer: new PublicKey(payer),
        config: deriveNftBridgeConfigKey(nftBridgeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(nftBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        endpoint: deriveEndpointKey(nftBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        to: new PublicKey(parsed.to),
        toAuthority: new PublicKey(toAuthority === undefined ? payer : toAuthority),
        custody: deriveCustodyKey(nftBridgeProgramId, mint),
        mint,
        custodySigner: deriveCustodySignerKey(nftBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
//# sourceMappingURL=completeNative.js.map