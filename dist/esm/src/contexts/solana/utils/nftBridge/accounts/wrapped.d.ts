/// <reference types="node" />
import { Connection, PublicKey, Commitment, PublicKeyInitData } from '@solana/web3.js';
import { ChainId } from '../../../../../types';
export { deriveWrappedMetaKey } from '../../tokenBridge';
export declare function deriveWrappedMintKey(tokenBridgeProgramId: PublicKeyInitData, tokenChain: number | ChainId, tokenAddress: Buffer | Uint8Array | string, tokenId: bigint | number): PublicKey;
export declare function getWrappedMeta(connection: Connection, tokenBridgeProgramId: PublicKeyInitData, mint: PublicKeyInitData, commitment?: Commitment): Promise<WrappedMeta>;
export declare class WrappedMeta {
    chain: number;
    tokenAddress: Buffer;
    tokenId: bigint;
    constructor(chain: number, tokenAddress: Buffer, tokenId: bigint);
    static deserialize(data: Buffer): WrappedMeta;
}
//# sourceMappingURL=wrapped.d.ts.map