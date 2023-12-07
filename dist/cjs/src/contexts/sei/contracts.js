"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeiContracts = void 0;
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const contracts_1 = require("../abstracts/contracts");
class SeiContracts extends contracts_1.ContractsAbstract {
    constructor(context) {
        super();
        this.context = context;
        this._contracts = new Map();
        const chains = (0, utils_1.filterByContext)(context.conf, types_1.Context.SEI);
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
            throw new Error(`no Sui contracts found for ${chain}`);
        return contracts;
    }
    getCore(chain) {
        return undefined;
    }
    mustGetCore(chain) {
        throw new Error('Method not implemented.');
    }
    getBridge(chain) {
        return undefined;
    }
    mustGetBridge(chain) {
        throw new Error('Method not implemented.');
    }
    getNftBridge(chain) {
        return undefined;
    }
    mustGetNftBridge(chain) {
        throw new Error('Method not implemented.');
    }
    getTokenBridgeRelayer(chain) {
        return undefined;
    }
    mustGetTokenBridgeRelayer(chain) {
        throw new Error('Method not implemented.');
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
exports.SeiContracts = SeiContracts;
//# sourceMappingURL=contracts.js.map