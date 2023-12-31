import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ParsedNftTransferVaa, SignedVaa } from '../../../../../vaa';
export declare function createCompleteWrappedMetaInstruction(connection: Connection, nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftTransferVaa): TransactionInstruction;
export interface CompleteWrappedMetaAccounts {
    payer: PublicKey;
    config: PublicKey;
    vaa: PublicKey;
    endpoint: PublicKey;
    mint: PublicKey;
    wrappedMeta: PublicKey;
    splMetadata: PublicKey;
    mintAuthority: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    splMetadataProgram: PublicKey;
    wormholeProgram: PublicKey;
}
export declare function getCompleteWrappedMetaAccounts(nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedNftTransferVaa): CompleteWrappedMetaAccounts;
//# sourceMappingURL=completeWrappedMeta.d.ts.map