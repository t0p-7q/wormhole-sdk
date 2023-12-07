import { CHAIN_ID_COSMOSHUB, CHAIN_ID_EVMOS, CHAIN_ID_KUJIRA, CHAIN_ID_OSMOSIS, CHAIN_ID_WORMCHAIN, } from '@certusone/wormhole-sdk';
/**
 * Search for a specific piece of information emitted by the contracts during the transaction
 * For example: to retrieve the bridge transfer recipient, we would have to look
 * for the "transfer.recipient" under the "wasm" event
 */
export const searchCosmosLogs = (key, logs) => {
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
const GATEWAY_CHAINS = [
    CHAIN_ID_COSMOSHUB,
    CHAIN_ID_EVMOS,
    CHAIN_ID_OSMOSIS,
    CHAIN_ID_WORMCHAIN,
    CHAIN_ID_KUJIRA,
];
export function isGatewayChain(chainId) {
    return GATEWAY_CHAINS.includes(chainId);
}
//# sourceMappingURL=utils.js.map