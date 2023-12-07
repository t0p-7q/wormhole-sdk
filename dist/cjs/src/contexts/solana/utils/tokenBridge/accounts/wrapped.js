"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedMeta = exports.getWrappedMeta = exports.deriveWrappedMetaKey = exports.deriveWrappedMintKey = exports.deriveSplTokenMetadataKey = void 0;
const wormhole_sdk_1 = require("@certusone/wormhole-sdk");
const web3_js_1 = require("@solana/web3.js");
const MAINNET_1 = require("../../../../../config/MAINNET");
const utils_1 = require("../../utils");
var splMetadata_1 = require("../../utils/splMetadata");
Object.defineProperty(exports, "deriveSplTokenMetadataKey", { enumerable: true, get: function () { return splMetadata_1.deriveSplTokenMetadataKey; } });
function deriveWrappedMintKey(tokenBridgeProgramId, tokenChain, tokenAddress) {
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
    ], tokenBridgeProgramId);
}
exports.deriveWrappedMintKey = deriveWrappedMintKey;
function deriveWrappedMetaKey(tokenBridgeProgramId, mint) {
    return (0, utils_1.deriveAddress)([Buffer.from('meta'), new web3_js_1.PublicKey(mint).toBuffer()], tokenBridgeProgramId);
}
exports.deriveWrappedMetaKey = deriveWrappedMetaKey;
async function getWrappedMeta(connection, tokenBridgeProgramId, mint, commitment) {
    return connection
        .getAccountInfo(deriveWrappedMetaKey(tokenBridgeProgramId, mint), commitment)
        .then((info) => WrappedMeta.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getWrappedMeta = getWrappedMeta;
class WrappedMeta {
    constructor(chain, tokenAddress, originalDecimals) {
        this.chain = chain;
        this.tokenAddress = tokenAddress;
        this.originalDecimals = originalDecimals;
    }
    static deserialize(data) {
        if (data.length != 35) {
            throw new Error('data.length != 35');
        }
        const chain = data.readUInt16LE(0);
        const tokenAddress = data.subarray(2, 34);
        const originalDecimals = data.readUInt8(34);
        return new WrappedMeta(chain, tokenAddress, originalDecimals);
    }
}
exports.WrappedMeta = WrappedMeta;
//# sourceMappingURL=wrapped.js.map