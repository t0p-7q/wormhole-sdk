import { PublicKey, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyNftBridgeProgramInterface } from '../program';
import { getPostMessageAccounts } from '../../wormhole';
import { deriveAuthoritySignerKey, deriveCustodySignerKey, deriveNftBridgeConfigKey, deriveCustodyKey, } from '../accounts';
import { deriveSplTokenMetadataKey, SplTokenMetadataProgram, } from '../../utils';
export function createTransferNativeInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, message, from, mint, nonce, targetAddress, targetChain) {
    const methods = createReadOnlyNftBridgeProgramInterface(nftBridgeProgramId, connection).methods.transferNative(nonce, Buffer.from(targetAddress), targetChain);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, mint),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getTransferNativeAccounts(nftBridgeProgramId, wormholeProgramId, payer, message, from, mint) {
    const { bridge: wormholeBridge, message: wormholeMessage, emitter: wormholeEmitter, sequence: wormholeSequence, feeCollector: wormholeFeeCollector, clock, rent, systemProgram, } = getPostMessageAccounts(wormholeProgramId, payer, nftBridgeProgramId, message);
    return {
        payer: new PublicKey(payer),
        config: deriveNftBridgeConfigKey(nftBridgeProgramId),
        from: new PublicKey(from),
        mint: new PublicKey(mint),
        splMetadata: deriveSplTokenMetadataKey(mint),
        custody: deriveCustodyKey(nftBridgeProgramId, mint),
        authoritySigner: deriveAuthoritySignerKey(nftBridgeProgramId),
        custodySigner: deriveCustodySignerKey(nftBridgeProgramId),
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
//# sourceMappingURL=transferNative.js.map