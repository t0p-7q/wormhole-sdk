"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = exports.ForeignAssetCache = exports.chunkArray = exports.stripHexPrefix = exports.filterByContext = void 0;
function filterByContext(config, context) {
    return Object.values(config.chains).filter((c) => c.context === context);
}
exports.filterByContext = filterByContext;
function stripHexPrefix(val) {
    return val.startsWith('0x') ? val.slice(2) : val;
}
exports.stripHexPrefix = stripHexPrefix;
function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}
exports.chunkArray = chunkArray;
class ForeignAssetCache {
    constructor() {
        this.cache = {};
    }
    get(assetChain, assetAddress, foreignChain) {
        return this.cache[assetChain]?.[assetAddress]?.[foreignChain];
    }
    set(assetChain, assetAddress, foreignChain, address) {
        if (!this.cache[assetChain]) {
            this.cache[assetChain] = {};
        }
        if (!this.cache[assetChain][assetAddress]) {
            this.cache[assetChain][assetAddress] = {};
        }
        this.cache[assetChain][assetAddress][foreignChain] = address;
    }
}
exports.ForeignAssetCache = ForeignAssetCache;
const waitFor = (condition, ms = 1000, tries = 100) => {
    let count = 0;
    return new Promise((resolve) => {
        const interval = setInterval(async () => {
            try {
                if ((await condition()) || tries <= count) {
                    clearInterval(interval);
                    resolve();
                }
            }
            catch (e) { }
            count++;
        }, ms);
    });
};
exports.waitFor = waitFor;
//# sourceMappingURL=utils.js.map