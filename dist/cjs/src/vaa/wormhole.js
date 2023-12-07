"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVaa = exports.isBytes = void 0;
const wormhole_sdk_1 = require("@certusone/wormhole-sdk");
var utils_1 = require("ethers/lib/utils");
Object.defineProperty(exports, "isBytes", { enumerable: true, get: function () { return utils_1.isBytes; } });
function parseVaa(vaa) {
    const signedVaa = Buffer.isBuffer(vaa) ? vaa : Buffer.from(vaa);
    const sigStart = 6;
    const numSigners = signedVaa[5];
    const sigLength = 66;
    const guardianSignatures = [];
    for (let i = 0; i < numSigners; ++i) {
        const start = sigStart + i * sigLength;
        guardianSignatures.push({
            index: signedVaa[start],
            signature: signedVaa.subarray(start + 1, start + 66),
        });
    }
    const body = signedVaa.subarray(sigStart + sigLength * numSigners);
    return {
        version: signedVaa[0],
        guardianSetIndex: signedVaa.readUInt32BE(1),
        guardianSignatures,
        timestamp: body.readUInt32BE(0),
        nonce: body.readUInt32BE(4),
        emitterChain: body.readUInt16BE(8),
        emitterAddress: body.subarray(10, 42),
        sequence: body.readBigUInt64BE(42),
        consistencyLevel: body[50],
        payload: body.subarray(51),
        hash: (0, wormhole_sdk_1.keccak256)(body),
    };
}
exports.parseVaa = parseVaa;
//# sourceMappingURL=wormhole.js.map