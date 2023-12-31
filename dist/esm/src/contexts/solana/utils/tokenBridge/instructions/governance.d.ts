import { PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ParsedTokenBridgeRegisterChainVaa, ParsedTokenBridgeUpgradeContractVaa, SignedVaa } from '../../../../../vaa';
export declare function createRegisterChainInstruction(tokenBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedTokenBridgeRegisterChainVaa): TransactionInstruction;
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
export declare function getRegisterChainAccounts(tokenBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedTokenBridgeRegisterChainVaa): RegisterChainAccounts;
export declare function createUpgradeContractInstruction(tokenBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedTokenBridgeUpgradeContractVaa, spill?: PublicKeyInitData): TransactionInstruction;
export interface UpgradeContractAccounts {
    payer: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    upgradeAuthority: PublicKey;
    spill: PublicKey;
    implementation: PublicKey;
    programData: PublicKey;
    tokenBridgeProgram: PublicKey;
    rent: PublicKey;
    clock: PublicKey;
    bpfLoaderUpgradeable: PublicKey;
    systemProgram: PublicKey;
}
export declare function getUpgradeContractAccounts(tokenBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedTokenBridgeUpgradeContractVaa, spill?: PublicKeyInitData): UpgradeContractAccounts;
//# sourceMappingURL=governance.d.ts.map