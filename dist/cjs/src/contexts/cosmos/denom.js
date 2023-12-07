"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNativeDenom = exports.getPrefix = exports.getNativeDenom = void 0;
const MAINNET_NATIVE_DENOMS = {
    osmosis: 'uosmo',
    wormchain: 'uworm',
    terra2: 'uluna',
    cosmoshub: 'uatom',
    evmos: 'aevmos',
    kujira: 'ukuji',
};
const TESTNET_NATIVE_DENOMS = {
    ...MAINNET_NATIVE_DENOMS,
    evmos: 'atevmos',
};
const PREFIXES = {
    osmosis: 'osmo',
    wormchain: 'wormhole',
    terra2: 'terra',
    cosmoshub: 'cosmos',
    evmos: 'evmos',
    sei: 'sei',
    kujira: 'kujira',
};
function getNativeDenom(chain, env = 'MAINNET') {
    const denom = env === 'TESTNET'
        ? TESTNET_NATIVE_DENOMS[chain]
        : MAINNET_NATIVE_DENOMS[chain];
    if (!denom)
        throw new Error(`Native denomination not found for chain ${chain}`);
    return denom;
}
exports.getNativeDenom = getNativeDenom;
function getPrefix(chain) {
    const prefix = PREFIXES[chain];
    if (!prefix)
        throw new Error(`Prefix not found for chain ${chain}`);
    return prefix;
}
exports.getPrefix = getPrefix;
function isNativeDenom(denom, chain) {
    try {
        const nativeDenom = getNativeDenom(chain);
        return denom === nativeDenom;
    }
    catch {
        return false;
    }
}
exports.isNativeDenom = isNativeDenom;
//# sourceMappingURL=denom.js.map