import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ParsedGovernanceVaa, SignedVaa } from '../../../../../vaa';
export declare function createSetFeesInstruction(connection: Connection, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa): TransactionInstruction;
export interface SetFeesAccounts {
    payer: PublicKey;
    bridge: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    systemProgram: PublicKey;
}
export declare function getSetFeesAccounts(wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa): SetFeesAccounts;
export declare function createTransferFeesInstruction(connection: Connection, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, recipient: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa): TransactionInstruction;
export interface TransferFeesAccounts {
    payer: PublicKey;
    bridge: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    feeCollector: PublicKey;
    recipient: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
}
export declare function getTransferFeesAccounts(wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, recipient: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa): TransferFeesAccounts;
export declare function createUpgradeGuardianSetInstruction(connection: Connection, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa): TransactionInstruction;
export interface UpgradeGuardianSetAccounts {
    payer: PublicKey;
    bridge: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    guardianSetOld: PublicKey;
    guardianSetNew: PublicKey;
    systemProgram: PublicKey;
}
export declare function getUpgradeGuardianSetAccounts(wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa): UpgradeGuardianSetAccounts;
export declare function createUpgradeContractInstruction(connection: Connection, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa): TransactionInstruction;
export interface UpgradeContractAccounts {
    payer: PublicKey;
    bridge: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    upgradeAuthority: PublicKey;
    spill: PublicKey;
    implementation: PublicKey;
    programData: PublicKey;
    wormholeProgram: PublicKey;
    rent: PublicKey;
    clock: PublicKey;
    bpfLoaderUpgradeable: PublicKey;
    systemProgram: PublicKey;
}
export declare function getUpgradeContractAccounts(wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedGovernanceVaa, spill?: PublicKeyInitData): UpgradeContractAccounts;
//# sourceMappingURL=governance.d.ts.map