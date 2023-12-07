import { PublicKey, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyNftBridgeProgramInterface } from '../program';
import { getPostMessageAccounts } from '../../wormhole';
import { deriveAuthoritySignerKey, deriveNftBridgeConfigKey, deriveWrappedMetaKey, deriveWrappedMintKey, } from '../accounts';
import { deriveSplTokenMetadataKey, SplTokenMetadataProgram, } from '../../utils';
export function createTransferWrappedInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress, tokenId, nonce, targetAddress, targetChain) {
    const methods = createReadOnlyNftBridgeProgramInterface(nftBridgeProgramId, connection).methods.transferWrapped(nonce, Buffer.from(targetAddress), targetChain);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getTransferWrappedAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress, tokenId),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getTransferWrappedAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress, tokenId) {
    const mint = deriveWrappedMintKey(nftBridgeProgramId, tokenChain, tokenAddress, tokenId);
    const { bridge: wormholeBridge, message: wormholeMessage, emitter: wormholeEmitter, sequence: wormholeSequence, feeCollector: wormholeFeeCollector, clock, rent, systemProgram, } = getPostMessageAccounts(wormholeProgramId, payer, nftBridgeProgramId, message);
    return {
        payer: new PublicKey(payer),
        config: deriveNftBridgeConfigKey(nftBridgeProgramId),
        from: new PublicKey(from),
        fromOwner: new PublicKey(fromOwner),
        mint,
        wrappedMeta: deriveWrappedMetaKey(nftBridgeProgramId, mint),
        splMetadata: deriveSplTokenMetadataKey(mint),
        authoritySigner: deriveAuthoritySignerKey(nftBridgeProgramId),
        wormholeBridge,
        wormholeMessage,
        wormholeEmitter,
        wormholeSequence,
        wormholeFeeCollector,
        clock,
        rent,
        systemProgram,
        tokenProgram: TOKEN_PROGRAM_ID,
        splMetadataProgram: SplTokenMetadataProgram.programId,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
//# sourceMappingURL=transferWrapped.js.map