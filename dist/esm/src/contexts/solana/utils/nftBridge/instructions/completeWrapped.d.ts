import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ParsedNftTransferVaa, SignedVaa } from '../../../../../vaa';
export declare function createCompleteTransferWrappedInstruction(connection: Connection, nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftTransferVaa, toAuthority?: PublicKeyInitData): TransactionInstruction;
export interface CompleteTransferWrappedAccounts {
    payer: PublicKey;
    config: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
    endpoint: PublicKey;
    to: PublicKey;
    toAuthority: PublicKey;
    mint: PublicKey;
    wrappedMeta: PublicKey;
    mintAuthority: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    splMetadataProgram: PublicKey;
    associatedTokenProgram: PublicKey;
    wormholeProgram: PublicKey;
}
export declare function getCompleteTransferWrappedAccounts(nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftTransferVaa, toAuthority?: PublicKeyInitData): CompleteTransferWrappedAccounts;
//# sourceMappingURL=completeWrapped.d.ts.map