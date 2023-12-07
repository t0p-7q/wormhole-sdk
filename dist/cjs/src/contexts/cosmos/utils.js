"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGatewayChain = exports.searchCosmosLogs = void 0;
const wormhole_sdk_1 = require("@certusone/wormhole-sdk");
/**
 * Search for a specific piece of information emitted by the contracts during the transaction
 * For example: to retrieve the bridge transfer recipient, we would have to look
 * for the "transfer.recipient" under the "wasm" event
 */
const searchCosmosLogs = (key, logs) => {
    const parts = key.split('.');
    // if event, search for the first attribute with the given key
    const [event, attribute] = parts.length > 1
        ? [parts[0], parts.slice(1).join('.')]
        : [undefined, parts[0]];
    for (const log of logs) {
        for (const ev of log.events) {
            if (event && ev.type !== event)
                continue;
            for (const attr of ev.attributes) {
                if (attr.key === attribute) {
                    return attr.value;
                }
            }
        }
    }
    return null;
};
exports.searchCosmosLogs = searchCosmosLogs;
const GATEWAY_CHAINS = [
    wormhole_sdk_1.CHAIN_ID_COSMOSHUB,
    wormhole_sdk_1.CHAIN_ID_EVMOS,
    wormhole_sdk_1.CHAIN_ID_OSMOSIS,
    wormhole_sdk_1.CHAIN_ID_WORMCHAIN,
    wormhole_sdk_1.CHAIN_ID_KUJIRA,
];
function isGatewayChain(chainId) {
    return GATEWAY_CHAINS.includes(chainId);
}
exports.isGatewayChain = isGatewayChain;
//# sourceMappingURL=utils.js.map