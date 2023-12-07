import { PublicKey, } from '@solana/web3.js';
import { deriveAddress, getAccountData } from '../../utils';
import { MessageData } from '../message';
export class PostedMessageData {
    constructor(message) {
        this.message = message;
    }
    static deserialize(data) {
        return new PostedMessageData(MessageData.deserialize(data.subarray(3)));
    }
}
export class PostedVaaData extends PostedMessageData {
}
export function derivePostedVaaKey(wormholeProgramId, hash) {
    return deriveAddress([Buffer.from('PostedVAA'), hash], wormholeProgramId);
}
export async function getPostedVaa(connection, wormholeProgramId, hash, commitment) {
    return connection
        .getAccountInfo(derivePostedVaaKey(wormholeProgramId, hash), commitment)
        .then((info) => PostedVaaData.deserialize(getAccountData(info)));
}
export async function getPostedMessage(connection, messageKey, commitment) {
    return connection
        .getAccountInfo(new PublicKey(messageKey), commitment)
        .then((info) => PostedMessageData.deserialize(getAccountData(info)));
}
//# sourceMappingURL=postedVaa.js.map