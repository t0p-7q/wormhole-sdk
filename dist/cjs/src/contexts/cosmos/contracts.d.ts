import { ChainId, ChainName, Contracts } from '../../types';
import { WormholeContext } from '../../wormhole';
import { ContractsAbstract } from '../abstracts/contracts';
/**
 * @category Cosmos
 * Cosmos Contracts class. Contains methods for accessing ts interfaces for all available contracts
 */
export declare class CosmosContracts<T extends WormholeContext> extends ContractsAbstract<T> {
    protected _contracts: Map<ChainName, any>;
    readonly context: T;
    constructor(context: T);
    getContracts(chain: ChainName | ChainId): Contracts | undefined;
    mustGetContracts(chain: ChainName | ChainId): Contracts;
    /**
     * Returns core wormhole address contract for the chain
     *
     * @returns The core contract address, undefined if not found
     */
    getCore(chain: ChainName | ChainId): any | undefined;
    /**
     * Returns core wormhole address contract for the chain
     *
     * @returns The core contract address, errors if not found
     */
    mustGetCore(chain: ChainName | ChainId): any;
    /**
     * Returns wormhole bridge address contract for the chain
     *
     * @returns The bridge contract address, undefined if not found
     */
    getBridge(chain: ChainName | ChainId): any | undefined;
    /**
     * Returns wormhole bridge address contract for the chain
     *
     * @returns The bridge contract address, errors if not found
     */
    mustGetBridge(chain: ChainName | ChainId): any;
    /**
     * Returns wormhole NFT bridge address contract for the chain
     *
     * @returns The NFT bridge address, undefined if not found
     */
    getNftBridge(chain: ChainName | ChainId): any | undefined;
    /**
     * Returns wormhole NFT bridge address contract for the chain
     *
     * @returns The NFT bridge address, errors if not found
     */
    mustGetNftBridge(chain: ChainName | ChainId): any;
    /**
     * Returns wormhole Token Bridge Relayer address contract for the chain
     *
     * @returns The Token Bridge Relayer address, undefined if not found
     */
    getTokenBridgeRelayer(chain: ChainName | ChainId): any | undefined;
    /**
     * Returns wormhole Token Bridge Relayer address contract for the chain
     *
     * @returns The Token Bridge Relayer address, errors if not found
     */
    mustGetTokenBridgeRelayer(chain: ChainName | ChainId): any;
    /**
     * Returns wormhole CCTP relayer contract for the chain
     *
     * @returns An interface for the Wormhole CCTP relayer contract, undefined if not found
     */
    getWormholeCircleRelayer(chain: ChainName | ChainId): undefined;
    /**
     * Returns wormhole CCTP relayer contract for the chain
     *
     * @returns An interface for the Wormhole CCTP relayer contract, errors if not found
     */
    mustGetWormholeCircleRelayer(chain: ChainName | ChainId): void;
}
//# sourceMappingURL=contracts.d.ts.map