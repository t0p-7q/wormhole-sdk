import { Context } from '../../types';
import { ContractsAbstract } from '../abstracts/contracts';
import { filterByContext } from '../../utils';
/**
 * @category Aptos
 */
export class AptosContracts extends ContractsAbstract {
    constructor(context, client) {
        super();
        this.context = context;
        this.client = client;
        this._contracts = new Map();
        const chains = filterByContext(context.conf, Context.APTOS);
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
            throw new Error(`no Aptos contracts found for ${chain}`);
        return contracts;
    }
    getCore(chain) {
        return this.getContracts(chain)?.core;
    }
    mustGetCore(chain) {
        const core = this.getCore(chain);
        if (!core)
            throw new Error(`Core contract for domain ${chain} not found`);
        return core;
    }
    getBridge(chain) {
        return this.getContracts(chain)?.token_bridge;
    }
    mustGetBridge(chain) {
        const bridge = this.getBridge(chain);
        if (!bridge)
            throw new Error(`Bridge contract for domain ${chain} not found`);
        return bridge;
    }
    getNftBridge(chain) {
        return this.getContracts(chain)?.nft_bridge;
    }
    mustGetNftBridge(chain) {
        const nftBridge = this.getNftBridge(chain);
        if (!nftBridge)
            throw new Error(`NFT Bridge contract for domain ${chain} not found`);
        return nftBridge;
    }
    getTokenBridgeRelayer(chain) {
        return undefined;
    }
    mustGetTokenBridgeRelayer(chain) {
        throw new Error('relayer not deployed on Aptos');
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
//# sourceMappingURL=contracts.js.map