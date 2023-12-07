"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintToTokenId = exports.tokenIdToMint = exports.coder = exports.createReadOnlyNftBridgeProgramInterface = exports.createNftBridgeProgramInterface = exports.NFT_TRANSFER_NATIVE_TOKEN_ADDRESS = void 0;
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@project-serum/anchor");
const utils_1 = require("../utils");
const coder_1 = require("./coder");
const nft_bridge_json_1 = __importDefault(require("../../../../anchor-idl/nft_bridge.json"));
exports.NFT_TRANSFER_NATIVE_TOKEN_ADDRESS = Buffer.alloc(32, 1);
function createNftBridgeProgramInterface(programId, provider) {
    return new anchor_1.Program(nft_bridge_json_1.default, new web3_js_1.PublicKey(programId), provider === undefined ? { connection: null } : provider, coder());
}
exports.createNftBridgeProgramInterface = createNftBridgeProgramInterface;
function createReadOnlyNftBridgeProgramInterface(programId, connection) {
    return createNftBridgeProgramInterface(programId, (0, utils_1.createReadOnlyProvider)(connection));
}
exports.createReadOnlyNftBridgeProgramInterface = createReadOnlyNftBridgeProgramInterface;
function coder() {
    return new coder_1.NftBridgeCoder(nft_bridge_json_1.default);
}
exports.coder = coder;
function tokenIdToMint(tokenId) {
    return new web3_js_1.PublicKey(new anchor_1.BN(tokenId.toString()).toArrayLike(Buffer));
}
exports.tokenIdToMint = tokenIdToMint;
function mintToTokenId(mint) {
    return BigInt(new anchor_1.BN(new web3_js_1.PublicKey(mint).toBuffer()).toString());
}
exports.mintToTokenId = mintToTokenId;
//# sourceMappingURL=program.js.map