import { WormholeConfig, Contracts } from '../types';
/**
 * Mainnet chain name to chain id mapping
 */
export declare const MAINNET_CHAINS: {
    readonly solana: 1;
    readonly ethereum: 2;
    readonly bsc: 4;
    readonly polygon: 5;
    readonly avalanche: 6;
    readonly fantom: 10;
    readonly celo: 14;
    readonly moonbeam: 16;
    readonly sui: 21;
    readonly aptos: 22;
    readonly arbitrum: 23;
    readonly optimism: 24;
    readonly base: 30;
    readonly sei: 32;
    readonly wormchain: 3104;
    readonly osmosis: 20;
    readonly cosmoshub: 4000;
    readonly evmos: 4001;
    readonly kujira: 4002;
};
/**
 * mainnet chain name type
 */
export type MainnetChainName = keyof typeof MAINNET_CHAINS;
/**
 * mainnet chain id type
 */
export type MainnetChainId = (typeof MAINNET_CHAINS)[MainnetChainName];
/**
 * chain name to contracts mapping
 */
export type ChainContracts = {
    [chain in MainnetChainName]: Contracts;
};
/**
 * default mainnet chain config
 */
declare const MAINNET_CONFIG: WormholeConfig;
export default MAINNET_CONFIG;
//# sourceMappingURL=MAINNET.d.ts.map