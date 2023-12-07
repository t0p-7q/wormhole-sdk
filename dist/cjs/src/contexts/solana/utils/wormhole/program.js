"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coder = exports.createReadOnlyWormholeProgramInterface = exports.createWormholeProgramInterface = void 0;
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@project-serum/anchor");
const utils_1 = require("../utils");
const coder_1 = require("./coder");
const wormhole_json_1 = __importDefault(require("../../../../anchor-idl/wormhole.json"));
function createWormholeProgramInterface(programId, provider) {
    return new anchor_1.Program(wormhole_json_1.default, new web3_js_1.PublicKey(programId), provider === undefined ? { connection: null } : provider, coder());
}
exports.createWormholeProgramInterface = createWormholeProgramInterface;
function createReadOnlyWormholeProgramInterface(programId, connection) {
    return createWormholeProgramInterface(programId, (0, utils_1.createReadOnlyProvider)(connection));
}
exports.createReadOnlyWormholeProgramInterface = createReadOnlyWormholeProgramInterface;
function coder() {
    return new coder_1.WormholeCoder(wormhole_json_1.default);
}
exports.coder = coder;
//# sourceMappingURL=program.js.map