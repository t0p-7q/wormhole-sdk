import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyTokenBridgeProgramInterface } from '../program';
import { deriveClaimKey, derivePostedVaaKey } from '../../wormhole';
import { deriveEndpointKey, deriveMintAuthorityKey, deriveSplTokenMetadataKey, deriveWrappedMetaKey, deriveTokenBridgeConfigKey, deriveWrappedMintKey, } from '../accounts';
import { isBytes, parseAttestMetaVaa, } from '../../../../../vaa';
import { SplTokenMetadataProgram } from '../../utils';
export function createCreateWrappedInstruction(connection, tokenBridgeProgramId, wormholeProgramId, payer, vaa) {
    const methods = createReadOnlyTokenBridgeProgramInterface(tokenBridgeProgramId, connection).methods.createWrapped();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCreateWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getCreateWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa) {
    const parsed = isBytes(vaa) ? parseAttestMetaVaa(vaa) : vaa;
    const mint = deriveWrappedMintKey(tokenBridgeProgramId, parsed.tokenChain, parsed.tokenAddress);
    return {
        payer: new PublicKey(payer),
        config: deriveTokenBridgeConfigKey(tokenBridgeProgramId),
        endpoint: deriveEndpointKey(tokenBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        mint,
        wrappedMeta: deriveWrappedMetaKey(tokenBridgeProgramId, mint),
        splMetadata: deriveSplTokenMetadataKey(mint),
        mintAuthority: deriveMintAuthorityKey(tokenBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        splMetadataProgram: SplTokenMetadataProgram.programId,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
//# sourceMappingURL=createWrapped.js.map