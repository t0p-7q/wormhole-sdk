/// <reference types="node" />
export { isBytes } from 'ethers/lib/utils';
export interface GuardianSignature {
    index: number;
    signature: Buffer;
}
export interface ParsedVaa {
    version: number;
    guardianSetIndex: number;
    guardianSignatures: GuardianSignature[];
    timestamp: number;
    nonce: number;
    emitterChain: number;
    emitterAddress: Buffer;
    sequence: bigint;
    consistencyLevel: number;
    payload: Buffer;
    hash: Buffer;
}
export type SignedVaa = Uint8Array | Buffer;
export declare function parseVaa(vaa: SignedVaa): ParsedVaa;
//# sourceMappingURL=wormhole.d.ts.map