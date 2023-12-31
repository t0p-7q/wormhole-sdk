/// <reference types="node" />
import { Connection, PublicKey, PublicKeyInitData } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { NftBridgeCoder } from './coder';
import { NftBridge } from '../types/nftBridge';
export declare const NFT_TRANSFER_NATIVE_TOKEN_ADDRESS: Buffer;
export declare function createNftBridgeProgramInterface(programId: PublicKeyInitData, provider?: Provider): Program<NftBridge>;
export declare function createReadOnlyNftBridgeProgramInterface(programId: PublicKeyInitData, connection?: Connection): Program<NftBridge>;
export declare function coder(): NftBridgeCoder;
export declare function tokenIdToMint(tokenId: bigint): PublicKey;
export declare function mintToTokenId(mint: PublicKeyInitData): bigint;
//# sourceMappingURL=program.d.ts.map