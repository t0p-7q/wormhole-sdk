import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyNftBridgeProgramInterface } from '../program';
import { derivePostedVaaKey } from '../../wormhole';
import { deriveEndpointKey, deriveNftBridgeConfigKey, deriveWrappedMintKey, deriveWrappedMetaKey, deriveMintAuthorityKey, } from '../accounts';
import { isBytes, parseNftTransferVaa, } from '../../../../../vaa';
import { deriveSplTokenMetadataKey, SplTokenMetadataProgram, } from '../../utils';
export function createCompleteWrappedMetaInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const methods = createReadOnlyNftBridgeProgramInterface(nftBridgeProgramId).methods.completeWrappedMeta();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getCompleteWrappedMetaAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getCompleteWrappedMetaAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const parsed = isBytes(vaa) ? parseNftTransferVaa(vaa) : vaa;
    const mint = deriveWrappedMintKey(nftBridgeProgramId, parsed.tokenChain, parsed.tokenAddress, parsed.tokenId);
    return {
        payer: new PublicKey(payer),
        config: deriveNftBridgeConfigKey(nftBridgeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        endpoint: deriveEndpointKey(nftBridgeProgramId, parsed.emitterChain, parsed.emitterAddress),
        mint,
        wrappedMeta: deriveWrappedMetaKey(nftBridgeProgramId, mint),
        splMetadata: deriveSplTokenMetadataKey(mint),
        mintAuthority: deriveMintAuthorityKey(nftBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        splMetadataProgram: SplTokenMetadataProgram.programId,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
//# sourceMappingURL=completeWrappedMeta.js.map