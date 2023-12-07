import { ChainName, ChainId, Contracts } from '../../types';
import { ContractsAbstract } from '../abstracts/contracts';
import { WormholeContext } from '../../wormhole';
import { JsonRpcProvider } from '@mysten/sui.js';
/**
 * @category Sui
 */
export declare class SuiContracts<T extends WormholeContext> extends ContractsAbstract<T> {
    protected _contracts: Map<ChainName, any>;
    readonly context: T;
    readonly provider: JsonRpcProvider;
    constructor(context: T, provider: JsonRpcProvider);
    getContracts(chain: ChainName | ChainId): Contracts | undefined;
    mustGetContracts(chain: ChainName | ChainId): Contracts;
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, undefined if not found
     */
    getCore(chain: ChainName | ChainId): undefined;
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, errors if not found
     */
    mustGetCore(chain: ChainName | ChainId): void;
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, undefined if not found
     */
    getBridge(chain: ChainName | ChainId): undefined;
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, errors if not found
     */
    mustGetBridge(chain: ChainName | ChainId): void;
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, undefined if not found
     */
    getNftBridge(chain: ChainName | ChainId): undefined;
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, errors if not found
     */
    mustGetNftBridge(chain: ChainName | ChainId): void;
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, undefined if not found
     */
    getTokenBridgeRelayer(chain: ChainName | ChainId): any;
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, errors if not found
     */
    mustGetTokenBridgeRelayer(chain: ChainName | ChainId): any;
    /**
     * Returns wormhole CCTP relayer contract for the chain
     *
     * @returns An interface for the Wormhole CCTP relayer contract, undefined if not found
     */
    getWormholeCircleRelayer(chain: ChainName | ChainId): any;
    /**
     * Returns wormhole CCTP relayer contract for the chain
     *
     * @returns An interface for the Wormhole CCTP relayer contract, errors if not found
     */
    mustGetWormholeCircleRelayer(chain: ChainName | ChainId): any;
}
//# sourceMappingURL=contracts.d.ts.map