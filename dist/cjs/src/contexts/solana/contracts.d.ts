import { Connection } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import { TokenBridge } from '@certusone/wormhole-sdk/lib/esm/solana/types/tokenBridge';
import { NftBridge } from '@certusone/wormhole-sdk/lib/esm/solana/types/nftBridge';
import { Wormhole } from '@certusone/wormhole-sdk/lib/esm/solana/types/wormhole';
import { ChainName, ChainId, Contracts } from '../../types';
import { ContractsAbstract } from '../abstracts/contracts';
import { WormholeContext } from '../../wormhole';
import { SolanaRelayer } from './relayer';
/**
 * @category Solana
 */
export declare class SolContracts<T extends WormholeContext> extends ContractsAbstract<T> {
    connection: Connection | undefined;
    protected _contracts: Map<ChainName, any>;
    readonly context: T;
    constructor(context: T);
    getContracts(chain: ChainName | ChainId): Contracts | undefined;
    mustGetContracts(chain: ChainName | ChainId): Contracts;
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, undefined if not found
     */
    getCore(chain?: ChainName | ChainId): Program<Wormhole> | undefined;
    /**
     * Returns core wormhole contract for the chain
     *
     * @returns An interface for the core contract, errors if not found
     */
    mustGetCore(chain?: ChainName | ChainId): Program<Wormhole>;
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, undefined if not found
     */
    getBridge(chain?: ChainName | ChainId): Program<TokenBridge> | undefined;
    /**
     * Returns wormhole bridge contract for the chain
     *
     * @returns An interface for the bridge contract, errors if not found
     */
    mustGetBridge(chain?: ChainName | ChainId): Program<TokenBridge>;
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, undefined if not found
     */
    getNftBridge(chain?: ChainName | ChainId): Program<NftBridge> | undefined;
    /**
     * Returns wormhole NFT bridge contract for the chain
     *
     * @returns An interface for the NFT bridge contract, errors if not found
     */
    mustGetNftBridge(chain: ChainName | ChainId): Program<NftBridge>;
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, undefined if not found
     */
    getTokenBridgeRelayer(chain?: ChainName | ChainId): SolanaRelayer | undefined;
    /**
     * Returns wormhole Token Bridge Relayer contract for the chain
     *
     * @returns An interface for the Token Bridge Relayer contract, errors if not found
     */
    mustGetTokenBridgeRelayer(chain: ChainName | ChainId): SolanaRelayer;
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