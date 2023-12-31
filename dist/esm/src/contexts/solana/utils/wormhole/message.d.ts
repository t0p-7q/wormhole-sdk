/// <reference types="node" />
import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
export declare class MessageData {
    vaaVersion: number;
    consistencyLevel: number;
    vaaTime: number;
    vaaSignatureAccount: PublicKey;
    submissionTime: number;
    nonce: number;
    sequence: bigint;
    emitterChain: number;
    emitterAddress: Buffer;
    payload: Buffer;
    constructor(vaaVersion: number, consistencyLevel: number, vaaTime: number, vaaSignatureAccount: PublicKeyInitData, submissionTime: number, nonce: number, sequence: bigint, emitterChain: number, emitterAddress: Buffer, payload: Buffer);
    static deserialize(data: Buffer): MessageData;
}
//# sourceMappingURL=message.d.ts.map