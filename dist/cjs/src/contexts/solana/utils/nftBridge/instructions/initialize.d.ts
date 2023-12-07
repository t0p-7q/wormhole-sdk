import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
export declare function createInitializeInstruction(connection: Connection, nftBridgeProgramId: PublicKeyInitData, payer: PublicKeyInitData, wormholeProgramId: PublicKeyInitData): TransactionInstruction;
export interface InitializeAccounts {
    payer: PublicKey;
    config: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
}
export declare function getInitializeAccounts(nftBridgeProgramId: PublicKeyInitData, payer: PublicKeyInitData): InitializeAccounts;
//# sourceMappingURL=initialize.d.ts.map