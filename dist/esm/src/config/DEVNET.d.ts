import { Contracts, WormholeConfig } from '../types';
/**
 * devnet chain name to chain id mapping
 */
export declare const DEVNET_CHAINS: {
    readonly ethereum: 2;
    readonly terra2: 18;
    readonly osmosis: 20;
    readonly wormchain: 3104;
};
/**
 * devnet chain name type
 */
export type DevnetChainName = keyof typeof DEVNET_CHAINS;
/**
 * devnet chain id type
 */
export type DevnetChainId = (typeof DEVNET_CHAINS)[DevnetChainName];
/**
 * chain name to contracts mapping
 */
export type ChainContracts = {
    [chain in DevnetChainName]: Contracts;
};
/**
 * default devnet chain config
 */
declare const DEVNET_CONFIG: WormholeConfig;
export default DEVNET_CONFIG;
//# sourceMappingURL=DEVNET.d.ts.map