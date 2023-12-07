"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBridgeAccountsCoder = void 0;
const anchor_1 = require("../../anchor");
class TokenBridgeAccountsCoder {
    constructor(idl) {
        this.idl = idl;
    }
    async encode(accountName, account) {
        switch (accountName) {
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    decode(accountName, ix) {
        return this.decodeUnchecked(accountName, ix);
    }
    decodeUnchecked(accountName, ix) {
        switch (accountName) {
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    memcmp(accountName, _appendData) {
        switch (accountName) {
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    size(idlAccount) {
        return (0, anchor_1.accountSize)(this.idl, idlAccount) ?? 0;
    }
}
exports.TokenBridgeAccountsCoder = TokenBridgeAccountsCoder;
//# sourceMappingURL=accounts.js.map