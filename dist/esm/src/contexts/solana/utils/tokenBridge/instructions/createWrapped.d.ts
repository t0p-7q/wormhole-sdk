import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ParsedAttestMetaVaa, SignedVaa } from '../../../../../vaa';
export declare function createCreateWrappedInstruction(connection: Connection, tokenBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedAttestMetaVaa): TransactionInstruction;
export interface CreateWrappedAccounts {
    payer: PublicKey;
    config: PublicKey;
    endpoint: PublicKey;
    vaa: PublicKey;
    claim: PublicKey;
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
export declare function getCreateWrappedAccounts(tokenBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedAttestMetaVaa): CreateWrappedAccounts;
//# sourceMappingURL=createWrapped.d.ts.map