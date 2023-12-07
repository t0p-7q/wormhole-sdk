import { PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { createReadOnlyNftBridgeProgramInterface } from '../program';
import { deriveClaimKey, derivePostedVaaKey } from '../../wormhole';
import { deriveEndpointKey, deriveNftBridgeConfigKey, deriveUpgradeAuthorityKey, } from '../accounts';
import { isBytes, parseNftBridgeRegisterChainVaa, parseNftBridgeUpgradeContractVaa, } from '../../../../../vaa';
import { BpfLoaderUpgradeable, deriveUpgradeableProgramKey } from '../../utils';
export function createRegisterChainInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const methods = createReadOnlyNftBridgeProgramInterface(nftBridgeProgramId, connection).methods.registerChain();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getRegisterChainAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getRegisterChainAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const parsed = isBytes(vaa) ? parseNftBridgeRegisterChainVaa(vaa) : vaa;
    return {
        payer: new PublicKey(payer),
        config: deriveNftBridgeConfigKey(nftBridgeProgramId),
        endpoint: deriveEndpointKey(nftBridgeProgramId, parsed.foreignChain, parsed.foreignAddress),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(nftBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        wormholeProgram: new PublicKey(wormholeProgramId),
    };
}
export function createUpgradeContractInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa, spill) {
    const methods = createReadOnlyNftBridgeProgramInterface(nftBridgeProgramId, connection).methods.upgradeContract();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getUpgradeContractAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, spill),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getUpgradeContractAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, spill) {
    const parsed = isBytes(vaa) ? parseNftBridgeUpgradeContractVaa(vaa) : vaa;
    return {
        payer: new PublicKey(payer),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(nftBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        upgradeAuthority: deriveUpgradeAuthorityKey(nftBridgeProgramId),
        spill: new PublicKey(spill === undefined ? payer : spill),
        implementation: new PublicKey(parsed.newContract),
        programData: deriveUpgradeableProgramKey(nftBridgeProgramId),
        nftBridgeProgram: new PublicKey(nftBridgeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        clock: SYSVAR_CLOCK_PUBKEY,
        bpfLoaderUpgradeable: BpfLoaderUpgradeable.programId,
        systemProgram: SystemProgram.programId,
    };
}
//# sourceMappingURL=governance.js.map