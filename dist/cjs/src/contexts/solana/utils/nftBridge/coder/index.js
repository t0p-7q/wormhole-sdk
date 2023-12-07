"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftBridgeCoder = exports.NftBridgeInstruction = void 0;
const accounts_1 = require("./accounts");
const events_1 = require("./events");
const instruction_1 = require("./instruction");
const state_1 = require("./state");
const types_1 = require("./types");
var instruction_2 = require("./instruction");
Object.defineProperty(exports, "NftBridgeInstruction", { enumerable: true, get: function () { return instruction_2.NftBridgeInstruction; } });
class NftBridgeCoder {
    constructor(idl) {
        this.instruction = new instruction_1.NftBridgeInstructionCoder(idl);
        this.accounts = new accounts_1.NftBridgeAccountsCoder(idl);
        this.state = new state_1.NftBridgeStateCoder(idl);
        this.events = new events_1.NftBridgeEventsCoder(idl);
        this.types = new types_1.NftBridgeTypesCoder(idl);
    }
}
exports.NftBridgeCoder = NftBridgeCoder;
//# sourceMappingURL=index.js.map