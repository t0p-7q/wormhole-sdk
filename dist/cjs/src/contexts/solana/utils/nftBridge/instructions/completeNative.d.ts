import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ParsedNftTransferVaa, SignedVaa } from '../../../../../vaa';
export declare function createCompleteTransferNativeInstruction(connection: Connection, nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftTransferVaa, toAuthority?: PublicKeyInitData): TransactionInstruction;
export interface CompleteTransferNativeAccounts {
    payer: PublicKey;
    config: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    endpoint: PublicKey;
    to: PublicKey;
    toAuthority: PublicKey;
    custody: PublicKey;
    mint: PublicKey;
    custodySigner: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    wormholeProgram: PublicKey;
}
export declare function getCompleteTransferNativeAccounts(nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftTransferVaa, toAuthority?: PublicKeyInitData): CompleteTransferNativeAccounts;
//# sourceMappingURL=completeNative.d.ts.map