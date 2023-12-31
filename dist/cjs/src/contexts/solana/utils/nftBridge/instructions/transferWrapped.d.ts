/// <reference types="node" />
import { Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
export declare function createTransferWrappedInstruction(connection: Connection, nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, message: PublicKeyInitData, from: PublicKeyInitData, fromOwner: PublicKeyInitData, tokenChain: number, tokenAddress: Buffer | Uint8Array, tokenId: bigint | number, nonce: number, targetAddress: Buffer | Uint8Array, targetChain: number): TransactionInstruction;
export interface TransferWrappedAccounts {
    payer: PublicKey;
    config: PublicKey;
    from: PublicKey;
    fromOwner: PublicKey;
    mint: PublicKey;
    wrappedMeta: PublicKey;
    splMetadata: PublicKey;
    authoritySigner: PublicKey;
    wormholeBridge: PublicKey;
    wormholeMessage: PublicKey;
    wormholeEmitter: PublicKey;
    wormholeSequence: PublicKey;
    wormholeFeeCollector: PublicKey;
    clock: PublicKey;
    rent: PublicKey;
    systemProgram: PublicKey;
    tokenProgram: PublicKey;
    splMetadataProgram: PublicKey;
    wormholeProgram: PublicKey;
}
export declare function getTransferWrappedAccounts(nftBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, message: PublicKeyInitData, from: PublicKeyInitData, fromOwner: PublicKeyInitData, tokenChain: number, tokenAddress: Buffer | Uint8Array, tokenId: bigint | number): TransferWrappedAccounts;
//# sourceMappingURL=transferWrapped.d.ts.map