"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostedMessage = exports.getPostedVaa = exports.derivePostedVaaKey = exports.PostedVaaData = exports.PostedMessageData = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../utils");
const message_1 = require("../message");
class PostedMessageData {
    constructor(message) {
        this.message = message;
    }
    static deserialize(data) {
        return new PostedMessageData(message_1.MessageData.deserialize(data.subarray(3)));
    }
}
exports.PostedMessageData = PostedMessageData;
class PostedVaaData extends PostedMessageData {
}
exports.PostedVaaData = PostedVaaData;
function derivePostedVaaKey(wormholeProgramId, hash) {
    return (0, utils_1.deriveAddress)([Buffer.from('PostedVAA'), hash], wormholeProgramId);
}
exports.derivePostedVaaKey = derivePostedVaaKey;
async function getPostedVaa(connection, wormholeProgramId, hash, commitment) {
    return connection
        .getAccountInfo(derivePostedVaaKey(wormholeProgramId, hash), commitment)
        .then((info) => PostedVaaData.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getPostedVaa = getPostedVaa;
async function getPostedMessage(connection, messageKey, commitment) {
    return connection
        .getAccountInfo(new web3_js_1.PublicKey(messageKey), commitment)
        .then((info) => PostedMessageData.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getPostedMessage = getPostedMessage;
//# sourceMappingURL=postedVaa.js.map