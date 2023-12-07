"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedMeta = exports.getWrappedMeta = exports.deriveWrappedMintKey = exports.deriveWrappedMetaKey = void 0;
const wormhole_sdk_1 = require("@certusone/wormhole-sdk");
const anchor_1 = require("@project-serum/anchor");
const utils_1 = require("../../utils");
const tokenBridge_1 = require("../../tokenBridge");
const MAINNET_1 = require("../../../../../config/MAINNET");
var tokenBridge_2 = require("../../tokenBridge");
Object.defineProperty(exports, "deriveWrappedMetaKey", { enumerable: true, get: function () { return tokenBridge_2.deriveWrappedMetaKey; } });
function deriveWrappedMintKey(tokenBridgeProgramId, tokenChain, tokenAddress, tokenId) {
    if (tokenChain == MAINNET_1.MAINNET_CHAINS.solana) {
        throw new Error('tokenChain == CHAIN_ID_SOLANA does not have wrapped mint key');
    }
    if (typeof tokenAddress == 'string') {
        tokenAddress = (0, wormhole_sdk_1.tryNativeToUint8Array)(tokenAddress, tokenChain);
    }
    return (0, utils_1.deriveAddress)([
        Buffer.from('wrapped'),
        (() => {
            const buf = Buffer.alloc(2);
            buf.writeUInt16BE(tokenChain);
            return buf;
        })(),
        tokenAddress,
        new anchor_1.BN(tokenId.toString()).toArrayLike(Buffer, 'be', 32),
    ], tokenBridgeProgramId);
}
exports.deriveWrappedMintKey = deriveWrappedMintKey;
async function getWrappedMeta(connection, tokenBridgeProgramId, mint, commitment) {
    return connection
        .getAccountInfo((0, tokenBridge_1.deriveWrappedMetaKey)(tokenBridgeProgramId, mint), commitment)
        .then((info) => WrappedMeta.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getWrappedMeta = getWrappedMeta;
class WrappedMeta {
    constructor(chain, tokenAddress, tokenId) {
        this.chain = chain;
        this.tokenAddress = tokenAddress;
        this.tokenId = tokenId;
    }
    static deserialize(data) {
        if (data.length != 66) {
            throw new Error('data.length != 66');
        }
        const chain = data.readUInt16LE(0);
        const tokenAddress = data.subarray(2, 34);
        const tokenId = BigInt(new anchor_1.BN(data.subarray(34, 66), undefined, 'le').toString());
        return new WrappedMeta(chain, tokenAddress, tokenId);
    }
}
exports.WrappedMeta = WrappedMeta;
//# sourceMappingURL=wrapped.js.map