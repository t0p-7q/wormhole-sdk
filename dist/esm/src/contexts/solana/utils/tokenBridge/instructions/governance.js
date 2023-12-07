import { PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { createReadOnlyTokenBridgeProgramInterface } from '../program';
import { deriveClaimKey, derivePostedVaaKey } from '../../wormhole';
import { deriveEndpointKey, deriveTokenBridgeConfigKey, deriveUpgradeAuthorityKey, } from '../accounts';
import { isBytes, parseTokenBridgeRegisterChainVaa, parseTokenBridgeUpgradeContractVaa, } from '../../../../../vaa';
import { BpfLoaderUpgradeable, deriveUpgradeableProgramKey } from '../../utils';
export function createRegisterChainInstruction(tokenBridgeProgramId, wormholeProgramId, payer, vaa) {
    const methods = createReadOnlyTokenBridgeProgramInterface(tokenBridgeProgramId).methods.registerChain();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getRegisterChainAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getRegisterChainAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa) {
    const parsed = isBytes(vaa) ? parseTokenBridgeRegisterChainVaa(vaa) : vaa;
    return {
        payer: new PublicKey(payer),
        config: deriveTokenBridgeConfigKey(tokenBridgeProgramId),
        endpoint: deriveEndpointKey(tokenBridgeProgramId, parsed.foreignChain, parsed.foreignAddress),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
export function createUpgradeContractInstruction(tokenBridgeProgramId, wormholeProgramId, payer, vaa, spill) {
    const methods = createReadOnlyTokenBridgeProgramInterface(tokenBridgeProgramId).methods.upgradeContract();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getUpgradeContractAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, spill),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getUpgradeContractAccounts(tokenBridgeProgramId, wormholeProgramId, payer, vaa, spill) {
    const parsed = isBytes(vaa) ? parseTokenBridgeUpgradeContractVaa(vaa) : vaa;
    return {
        payer: new PublicKey(payer),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(tokenBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        upgradeAuthority: deriveUpgradeAuthorityKey(tokenBridgeProgramId),
        spill: new PublicKey(spill === undefined ? payer : spill),
        implementation: new PublicKey(parsed.newContract),
        programData: deriveUpgradeableProgramKey(tokenBridgeProgramId),
        tokenBridgeProgram: new PublicKey(tokenBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        clock: SYSVAR_CLOCK_PUBKEY,
        bpfLoaderUpgradeable: BpfLoaderUpgradeable.programId,
        systemProgram: SystemProgram.programId,
    };
}
//# sourceMappingURL=governance.js.map