import { PublicKey, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createReadOnlyTokenBridgeProgramInterface } from '../program';
import { getPostMessageCpiAccounts } from '../../wormhole';
import { deriveAuthoritySignerKey, deriveTokenBridgeConfigKey, deriveWrappedMetaKey, deriveWrappedMintKey, } from '../accounts';
export function createTransferWrappedInstruction(connection, tokenBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress, nonce, amount, fee, targetAddress, targetChain) {
    const methods = createReadOnlyTokenBridgeProgramInterface(tokenBridgeProgramId, connection).methods.transferWrapped(nonce, amount, fee, Buffer.from(targetAddress), targetChain);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getTransferWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getTransferWrappedAccounts(tokenBridgeProgramId, wormholeProgramId, payer, message, from, fromOwner, tokenChain, tokenAddress) {
    const mint = deriveWrappedMintKey(tokenBridgeProgramId, tokenChain, tokenAddress);
    const { wormholeBridge, wormholeMessage, wormholeEmitter, wormholeSequence, wormholeFeeCollector, clock, rent, systemProgram, } = getPostMessageCpiAccounts(tokenBridgeProgramId, wormholeProgramId, payer, message);
    return {
        payer: new PublicKey(payer),
        config: deriveTokenBridgeConfigKey(tokenBridgeProgramId),
        from: new PublicKey(from),
        fromOwner: new PublicKey(fromOwner),
        mint: mint,
        wrappedMeta: deriveWrappedMetaKey(tokenBridgeProgramId, mint),
        authoritySigner: deriveAuthoritySignerKey(tokenBridgeProgramId),
        wormholeBridge,
        wormholeMessage: wormholeMessage,
        wormholeEmitter,
        wormholeSequence,
        wormholeFeeCollector,
        clock,
        rent,
        systemProgram,
        wormholeProgram: new PublicKey(wormholeProgramId),
        tokenProgram: TOKEN_PROGRAM_ID,
    };
}
//# sourceMappingURL=transferWrapped.js.map