import { parseVaa } from './wormhole';
export function parseGovernanceVaa(vaa) {
    const parsed = parseVaa(vaa);
    return {
        ...parsed,
        ...parseGovernancePayload(parsed.payload),
    };
}
export function parseGovernancePayload(payload) {
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
//# sourceMappingURL=governance.js.map