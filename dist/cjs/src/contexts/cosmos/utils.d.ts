import { logs as cosmosLogs } from '@cosmjs/stargate';
import { ChainId } from '../../types';
/**
 * Search for a specific piece of information emitted by the contracts during the transaction
 * For example: to retrieve the bridge transfer recipient, we would have to look
 * for the "transfer.recipient" under the "wasm" event
 */
export declare const searchCosmosLogs: (key: string, logs: readonly cosmosLogs.Log[]) => string | null;
export declare function isGatewayChain(chainId: ChainId): boolean;
//# sourceMappingURL=utils.d.ts.map