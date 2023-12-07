import { ChainName, ChainId, Contracts } from '../../types';
import { WormholeContext } from '../../wormhole';
import { ContractsAbstract } from '../abstracts/contracts';
export declare class SeiContracts<T extends WormholeContext> extends ContractsAbstract<T> {
    protected _contracts: Map<ChainName, any>;
    protected context: T;
    constructor(context: T);
    getContracts(chain: ChainName | ChainId): Contracts | undefined;
    mustGetContracts(chain: ChainName | ChainId): Contracts;
    getCore(chain: ChainName | ChainId): undefined;
    mustGetCore(chain: ChainName | ChainId): void;
    getBridge(chain: ChainName | ChainId): undefined;
    mustGetBridge(chain: ChainName | ChainId): void;
    getNftBridge(chain: ChainName | ChainId): undefined;
    mustGetNftBridge(chain: ChainName | ChainId): void;
    getTokenBridgeRelayer(chain: ChainName | ChainId): undefined;
    mustGetTokenBridgeRelayer(chain: ChainName | ChainId): void;
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