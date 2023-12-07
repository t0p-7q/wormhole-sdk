"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosContracts = void 0;
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const contracts_1 = require("../abstracts/contracts");
/**
 * @category Cosmos
 * Cosmos Contracts class. Contains methods for accessing ts interfaces for all available contracts
 */
class CosmosContracts extends contracts_1.ContractsAbstract {
    constructor(context) {
        super();
        this.context = context;
        this._contracts = new Map();
        const chains = (0, utils_1.filterByContext)(context.conf, types_1.Context.COSMOS);
        chains.forEach((c) => {
            this._contracts.set(c.key, c.contracts);
        });
    }
    getContracts(chain) {
        const chainName = this.context.toChainName(chain);
        return this._contracts.get(chainName);
    }
    mustGetContracts(chain) {
        const chainName = this.context.toChainName(chain);
        const contracts = this._contracts.get(chainName);
        if (!contracts)
            throw new Error(`no contracts found for ${chain}`);
        return contracts;
    }
    /**
     * Returns core wormhole address contract for the chain
     *
     * @returns The core contract address, undefined if not found
     */
    getCore(chain) {
        return undefined;
    }
    /**
     * Returns core wormhole address contract for the chain
     *
     * @returns The core contract address, errors if not found
     */
    mustGetCore(chain) {
        const core = this.getCore(chain);
        if (!core)
            throw new Error(`Core contract for domain ${chain} not found`);
        return core;
    }
    /**
     * Returns wormhole bridge address contract for the chain
     *
     * @returns The bridge contract address, undefined if not found
     */
    getBridge(chain) {
        return undefined;
    }
    /**
     * Returns wormhole bridge address contract for the chain
     *
     * @returns The bridge contract address, errors if not found
     */
    mustGetBridge(chain) {
        const bridge = this.getBridge(chain);
        if (!bridge)
            throw new Error(`Bridge contract for domain ${chain} not found`);
        return bridge;
    }
    /**
     * Returns wormhole NFT bridge address contract for the chain
     *
     * @returns The NFT bridge address, undefined if not found
     */
    getNftBridge(chain) {
        return undefined;
    }
    /**
     * Returns wormhole NFT bridge address contract for the chain
     *
     * @returns The NFT bridge address, errors if not found
     */
    mustGetNftBridge(chain) {
        const nftBridge = this.getNftBridge(chain);
        if (!nftBridge)
            throw new Error(`NFT Bridge contract for domain ${chain} not found`);
        return nftBridge;
    }
    /**
     * Returns wormhole Token Bridge Relayer address contract for the chain
     *
     * @returns The Token Bridge Relayer address, undefined if not found
     */
    getTokenBridgeRelayer(chain) {
        return undefined;
    }
    /**
     * Returns wormhole Token Bridge Relayer address contract for the chain
     *
     * @returns The Token Bridge Relayer address, errors if not found
     */
    mustGetTokenBridgeRelayer(chain) {
        const relayer = this.getTokenBridgeRelayer(chain);
        if (!relayer)
            throw new Error(`Token Bridge Relayer contract for domain ${chain} not found`);
        return relayer;
    }
    /**
     * Returns wormhole CCTP relayer contract for the chain
     *
     * @returns An interface for the Wormhole CCTP relayer contract, undefined if not found
     */
    getWormholeCircleRelayer(chain) {
        return undefined;
    }
    /**
     * Returns wormhole CCTP relayer contract for the chain
     *
     * @returns An interface for the Wormhole CCTP relayer contract, errors if not found
     */
    mustGetWormholeCircleRelayer(chain) {
        throw new Error(`Wormhole circle relayer contract for domain ${chain} not found`);
    }
}
exports.CosmosContracts = CosmosContracts;
//# sourceMappingURL=contracts.js.map