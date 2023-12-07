"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageData = void 0;
const web3_js_1 = require("@solana/web3.js");
class MessageData {
    constructor(vaaVersion, consistencyLevel, vaaTime, vaaSignatureAccount, submissionTime, nonce, sequence, emitterChain, emitterAddress, payload) {
        this.vaaVersion = vaaVersion;
        this.consistencyLevel = consistencyLevel;
        this.vaaTime = vaaTime;
        this.vaaSignatureAccount = new web3_js_1.PublicKey(vaaSignatureAccount);
        this.submissionTime = submissionTime;
        this.nonce = nonce;
        this.sequence = sequence;
        this.emitterChain = emitterChain;
        this.emitterAddress = emitterAddress;
        this.payload = payload;
    }
    static deserialize(data) {
        const vaaVersion = data.readUInt8(0);
        const consistencyLevel = data.readUInt8(1);
        const vaaTime = data.readUInt32LE(2);
        const vaaSignatureAccount = new web3_js_1.PublicKey(data.subarray(6, 38));
        const submissionTime = data.readUInt32LE(38);
        const nonce = data.readUInt32LE(42);
        const sequence = data.readBigUInt64LE(46);
        const emitterChain = data.readUInt16LE(54);
        const emitterAddress = data.subarray(56, 88);
        // unnecessary to get Vec<u8> length, but being explicit in borsh deserialization
        const payloadLen = data.readUInt32LE(88);
        const payload = data.subarray(92, 92 + payloadLen);
        return new MessageData(vaaVersion, consistencyLevel, vaaTime, vaaSignatureAccount, submissionTime, nonce, sequence, emitterChain, emitterAddress, payload);
    }
}
exports.MessageData = MessageData;
//# sourceMappingURL=message.js.map