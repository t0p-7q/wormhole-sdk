import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ParsedNftBridgeRegisterChainVaa, ParsedNftBridgeUpgradeContractVaa, SignedVaa } from '../../../../../vaa';
export declare function createRegisterChainInstruction(connection: Connection, nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftBridgeRegisterChainVaa): TransactionInstruction;
export interface RegisterChainAccounts {
    payer: PublicKey;
    config: PublicKey;
    endpoint: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
    wormholeProgram: PublicKey;
}
export declare function getRegisterChainAccounts(nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftBridgeRegisterChainVaa): RegisterChainAccounts;
export declare function createUpgradeContractInstruction(connection: Connection, nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftBridgeUpgradeContractVaa, spill?: PublicKeyInitData): TransactionInstruction;
export interface UpgradeContractAccounts {
    payer: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    upgradeAuthority: PublicKey;
    spill: PublicKey;
    implementation: PublicKey;
    programData: PublicKey;
    nftBridgeProgram: PublicKey;
    rent: PublicKey;
    clock: PublicKey;
    bpfLoaderUpgradeable: PublicKey;
    systemProgram: PublicKey;
}
export declare function getUpgradeContractAccounts(nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftBridgeUpgradeContractVaa, spill?: PublicKeyInitData): UpgradeContractAccounts;
//# sourceMappingURL=governance.d.ts.map