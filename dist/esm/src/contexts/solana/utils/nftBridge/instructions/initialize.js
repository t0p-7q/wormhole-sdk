import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { createReadOnlyNftBridgeProgramInterface } from '../program';
import { deriveNftBridgeConfigKey } from '../accounts';
export function createInitializeInstruction(connection, nftBridgeProgramId, payer, wormholeProgramId) {
    const methods = createReadOnlyNftBridgeProgramInterface(nftBridgeProgramId).methods.initialize(wormholeProgramId);
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getInitializeAccounts(nftBridgeProgramId, payer),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getInitializeAccounts(nftBridgeProgramId, payer) {
    return {
        payer: new PublicKey(payer),
        config: deriveNftBridgeConfigKey(nftBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
    };
}
//# sourceMappingURL=initialize.js.map