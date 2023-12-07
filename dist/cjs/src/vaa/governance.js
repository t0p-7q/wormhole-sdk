"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGovernancePayload = exports.parseGovernanceVaa = void 0;
const wormhole_1 = require("./wormhole");
function parseGovernanceVaa(vaa) {
    const parsed = (0, wormhole_1.parseVaa)(vaa);
    return {
        ...parsed,
        ...parseGovernancePayload(parsed.payload),
    };
}
exports.parseGovernanceVaa = parseGovernanceVaa;
function parseGovernancePayload(payload) {
    const module = payload.subarray(0, 32).toString().replace(/\0/g, '');
    const action = payload.readUInt8(32);
    const chain = payload.readUInt16BE(33);
    const orderPayload = payload.subarray(35);
    return {
        module,
        action,
        chain,
        orderPayload,
    };
}
exports.parseGovernancePayload = parseGovernancePayload;
//# sourceMappingURL=governance.js.map