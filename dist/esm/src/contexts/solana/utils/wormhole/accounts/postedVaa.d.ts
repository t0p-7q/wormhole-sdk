/// <reference types="node" />
import { Commitment, Connection, PublicKey, PublicKeyInitData } from '@solana/web3.js';
import { MessageData } from '../message';
export declare class PostedMessageData {
    message: MessageData;
    constructor(message: MessageData);
    static deserialize(data: Buffer): PostedMessageData;
}
export declare class PostedVaaData extends PostedMessageData {
}
export declare function derivePostedVaaKey(wormholeProgramId: PublicKeyInitData, hash: Buffer): PublicKey;
export declare function getPostedVaa(connection: Connection, wormholeProgramId: PublicKeyInitData, hash: Buffer, commitment?: Commitment): Promise<PostedVaaData>;
export declare function getPostedMessage(connection: Connection, messageKey: PublicKeyInitData, commitment?: Commitment): Promise<PostedMessageData>;
//# sourceMappingURL=postedVaa.d.ts.map