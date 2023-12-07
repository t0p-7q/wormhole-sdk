import { ChainName, ChainId, Contracts } from '../../types';
import { ContractsAbstract } from '../abstracts/contracts';
import { WormholeContext } from '../../wormhole';
import { AptosClient } from 'aptos';
/**
 * @category Aptos
 */
export declare class AptosContracts<T extends WormholeContext> extends ContractsAbstract<T> {
    protected _contracts: Map<ChainName, any>;
    readonly context: T;
    readonly client: AptosClient;
    constructor(context: T, client: AptosClient);
    getContracts(chain: ChainName | ChainId): Contracts | undefined;
    mustGetContracts(chain: ChainName | ChainId): Contracts;
    getCore(chain: ChainName | ChainId): string | undefined;
    mustGetCore(chain: ChainName | ChainId): string;
    getBridge(chain: ChainName | ChainId): string | undefined;
    mustGetBridge(chain: ChainName | ChainId): string;
    getNftBridge(chain: ChainName | ChainId): string | undefined;
    mustGetNftBridge(chain: ChainName | ChainId): string;
    getTokenBridgeRelayer(chain: ChainName | ChainId): string | undefined;
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