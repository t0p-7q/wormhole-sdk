"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureSetData = exports.getSignatureSetData = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../utils");
async function getSignatureSetData(connection, signatureSet, commitment) {
    return connection
        .getAccountInfo(new web3_js_1.PublicKey(signatureSet), commitment)
        .then((info) => SignatureSetData.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getSignatureSetData = getSignatureSetData;
class SignatureSetData {
    constructor(signatures, hash, guardianSetIndex) {
        this.signatures = signatures;
        this.hash = hash;
        this.guardianSetIndex = guardianSetIndex;
    }
    static deserialize(data) {
        const numSignatures = data.readUInt32LE(0);
        const signatures = [...data.subarray(4, 4 + numSignatures)].map((x) => x != 0);
        const hashIndex = 4 + numSignatures;
        const hash = data.subarray(hashIndex, hashIndex + 32);
        const guardianSetIndex = data.readUInt32LE(hashIndex + 32);
        return new SignatureSetData(signatures, hash, guardianSetIndex);
    }
}
exports.SignatureSetData = SignatureSetData;
//# sourceMappingURL=signatureSet.js.map