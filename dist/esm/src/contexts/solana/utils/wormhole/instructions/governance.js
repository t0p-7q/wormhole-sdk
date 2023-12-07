import { PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, } from '@solana/web3.js';
import { isBytes, parseGovernanceVaa, } from '../../../../../vaa';
import { createReadOnlyWormholeProgramInterface } from '../program';
import { deriveWormholeBridgeDataKey, deriveClaimKey, deriveFeeCollectorKey, deriveGuardianSetKey, derivePostedVaaKey, deriveUpgradeAuthorityKey, } from '../accounts';
import { BpfLoaderUpgradeable, deriveUpgradeableProgramKey } from '../../utils';
export function createSetFeesInstruction(connection, wormholeProgramId, payer, vaa) {
    const methods = createReadOnlyWormholeProgramInterface(wormholeProgramId, connection).methods.setFees();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getSetFeesAccounts(wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getSetFeesAccounts(wormholeProgramId, payer, vaa) {
    const parsed = isBytes(vaa) ? parseGovernanceVaa(vaa) : vaa;
    return {
        payer: new PublicKey(payer),
        bridge: deriveWormholeBridgeDataKey(wormholeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        systemProgram: SystemProgram.programId,
    };
}
export function createTransferFeesInstruction(connection, wormholeProgramId, payer, recipient, vaa) {
    const methods = createReadOnlyWormholeProgramInterface(wormholeProgramId, connection).methods.transferFees();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getTransferFeesAccounts(wormholeProgramId, payer, recipient, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getTransferFeesAccounts(wormholeProgramId, payer, recipient, vaa) {
    const parsed = isBytes(vaa) ? parseGovernanceVaa(vaa) : vaa;
    return {
        payer: new PublicKey(payer),
        bridge: deriveWormholeBridgeDataKey(wormholeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        feeCollector: deriveFeeCollectorKey(wormholeProgramId),
        recipient: new PublicKey(recipient),
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
    };
}
export function createUpgradeGuardianSetInstruction(connection, wormholeProgramId, payer, vaa) {
    const methods = createReadOnlyWormholeProgramInterface(wormholeProgramId, connection).methods.upgradeGuardianSet();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getUpgradeGuardianSetAccounts(wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getUpgradeGuardianSetAccounts(wormholeProgramId, payer, vaa) {
    const parsed = isBytes(vaa) ? parseGovernanceVaa(vaa) : vaa;
    return {
        payer: new PublicKey(payer),
        bridge: deriveWormholeBridgeDataKey(wormholeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        guardianSetOld: deriveGuardianSetKey(wormholeProgramId, parsed.guardianSetIndex),
        guardianSetNew: deriveGuardianSetKey(wormholeProgramId, parsed.guardianSetIndex + 1),
        systemProgram: SystemProgram.programId,
    };
}
export function createUpgradeContractInstruction(connection, wormholeProgramId, payer, vaa) {
    const methods = createReadOnlyWormholeProgramInterface(wormholeProgramId, connection).methods.upgradeContract();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getUpgradeContractAccounts(wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
export function getUpgradeContractAccounts(wormholeProgramId, payer, vaa, spill) {
    const parsed = isBytes(vaa) ? parseGovernanceVaa(vaa) : vaa;
    const implementation = parsed.orderPayload;
    if (implementation.length != 32) {
        throw new Error('implementation.length != 32');
    }
    return {
        payer: new PublicKey(payer),
        bridge: deriveWormholeBridgeDataKey(wormholeProgramId),
        vaa: derivePostedVaaKey(wormholeProgramId, parsed.hash),
        claim: deriveClaimKey(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        upgradeAuthority: deriveUpgradeAuthorityKey(wormholeProgramId),
        spill: new PublicKey(spill === undefined ? payer : spill),
        implementation: new PublicKey(implementation),
        programData: deriveUpgradeableProgramKey(wormholeProgramId),
        wormholeProgram: new PublicKey(wormholeProgramId),
        rent: SYSVAR_RENT_PUBKEY,
        clock: SYSVAR_CLOCK_PUBKEY,
        bpfLoaderUpgradeable: BpfLoaderUpgradeable.programId,
        systemProgram: SystemProgram.programId,
    };
}
//# sourceMappingURL=governance.js.map