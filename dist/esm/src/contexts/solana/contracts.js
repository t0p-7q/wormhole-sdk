import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Context } from '../../types';
import { ContractsAbstract } from '../abstracts/contracts';
import { filterByContext } from '../../utils';
import { createReadOnlyWormholeProgramInterface } from './utils/wormhole';
import { createReadOnlyTokenBridgeProgramInterface } from './utils/tokenBridge';
import { createReadOnlyNftBridgeProgramInterface } from './utils/nftBridge';
import { SolanaRelayer } from './relayer';
/**
 * @category Solana
 */
export class SolContracts extends ContractsAbstract {
    constructor(context) {
        super();
        this.context = context;
        const tag = context.environment === 'MAINNET' ? 'mainnet-beta' : 'devnet';
        this.connection = new Connection(clusterApiUrl(tag));
        this._contracts = new Map();
        const chains = filterByContext(context.conf, Context.SOLANA);
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
            throw new Error(`no Solana contracts found for ${chain}`);
        return contracts;
    }
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, undefined if not found
     */
    getCore(chain) {
        const context = this.context.getContext('solana');
        const connection = context.connection;
        if (!connection)
            throw new Error('no connection');
        const contracts = this.context.mustGetContracts('solana');
        if (!contracts.core)
            return;
        return createReadOnlyWormholeProgramInterface(contracts.core, this.connection);
    }
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, errors if not found
     */
    mustGetCore(chain) {
        const core = this.getCore(chain);
        if (!core)
            throw new Error(`Core contract for domain ${chain} not found`);
        return core;
    }
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, undefined if not found
     */
    getBridge(chain) {
        const context = this.context.getContext('solana');
        const connection = context.connection;
        if (!connection)
            throw new Error('no connection');
        const contracts = this.context.mustGetContracts('solana');
        if (!contracts.token_bridge)
            return;
        return createReadOnlyTokenBridgeProgramInterface(contracts.token_bridge, connection);
    }
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, errors if not found
     */
    mustGetBridge(chain) {
        const bridge = this.getBridge(chain);
        if (!bridge)
            throw new Error(`Bridge contract for domain ${chain} not found`);
        return bridge;
    }
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, undefined if not found
     */
    getNftBridge(chain) {
        const context = this.context.getContext('solana');
        const connection = context.connection;
        if (!connection)
            throw new Error('no connection');
        const contracts = this.context.mustGetContracts('solana');
        if (!contracts.nft_bridge)
            return;
        return createReadOnlyNftBridgeProgramInterface(contracts.nft_bridge, connection);
    }
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, errors if not found
     */
    mustGetNftBridge(chain) {
        const nftBridge = this.getNftBridge(chain);
        if (!nftBridge)
            throw new Error(`NFT Bridge contract for domain ${chain} not found`);
        return nftBridge;
    }
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, undefined if not found
     */
    getTokenBridgeRelayer(chain) {
        const context = this.context.getContext('solana');
        const connection = context.connection;
        if (!connection)
            throw new Error('no connection');
        const contracts = this.context.mustGetContracts('solana');
        if (!contracts.relayer)
            return undefined;
        return new SolanaRelayer(contracts.relayer, connection);
    }
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, errors if not found
     */
    mustGetTokenBridgeRelayer(chain) {
        const relayer = this.getTokenBridgeRelayer(chain);
        if (!relayer)
            throw new Error(`Relayer contract for domain ${chain} not found`);
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