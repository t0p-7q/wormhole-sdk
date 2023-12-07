import { Context } from '../../types';
import { ContractsAbstract } from '../abstracts/contracts';
import { filterByContext } from '../../utils';
import { SuiRelayer } from './relayer';
/**
 * @category Sui
 */
export class SuiContracts extends ContractsAbstract {
    constructor(context, provider) {
        super();
        this.context = context;
        this.provider = provider;
        this._contracts = new Map();
        const chains = filterByContext(context.conf, Context.SUI);
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
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, undefined if not found
     */
    getCore(chain) {
        return undefined;
    }
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, errors if not found
     */
    mustGetCore(chain) {
        throw new Error('not implemented');
    }
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, undefined if not found
     */
    getBridge(chain) {
        return undefined;
    }
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, errors if not found
     */
    mustGetBridge(chain) {
        throw new Error('not implemented');
    }
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, undefined if not found
     */
    getNftBridge(chain) {
        return undefined;
    }
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, errors if not found
     */
    mustGetNftBridge(chain) {
        throw new Error('not implemented');
    }
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, undefined if not found
     */
    getTokenBridgeRelayer(chain) {
        const { relayer: suiRelayerObjectId, suiRelayerPackageId } = this.mustGetContracts(chain);
        if (!suiRelayerObjectId || !suiRelayerPackageId)
            return undefined;
        return new SuiRelayer(this.provider, suiRelayerObjectId, suiRelayerPackageId);
    }
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, errors if not found
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
//# sourceMappingURL=contracts.js.map