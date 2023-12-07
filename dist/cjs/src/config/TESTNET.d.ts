import { WormholeConfig, Contracts } from '../types';
/**
 * Testnet chain name to chain id mapping
 */
export declare const TESTNET_CHAINS: {
    readonly solana: 1;
    readonly goerli: 2;
    readonly bsc: 4;
    readonly mumbai: 5;
    readonly fuji: 6;
    readonly fantom: 10;
    readonly alfajores: 14;
    readonly moonbasealpha: 16;
    readonly sui: 21;
    readonly aptos: 22;
    readonly arbitrumgoerli: 23;
    readonly optimismgoerli: 24;
    readonly basegoerli: 30;
    readonly sei: 32;
    readonly wormchain: 3104;
    readonly osmosis: 20;
    readonly cosmoshub: 4000;
    readonly evmos: 4001;
    readonly kujira: 4002;
};
/**
 * testnet chain name type
 */
export type TestnetChainName = keyof typeof TESTNET_CHAINS;
/**
 * testnet chain id type
 */
export type TestnetChainId = (typeof TESTNET_CHAINS)[TestnetChainName];
/**
 * chain name to contracts mapping
 */
export type ChainContracts = {
    [chain in TestnetChainName]: Contracts;
};
/**
 * default testnet chain config
 */
declare const TESTNET_CONFIG: WormholeConfig;
export default TESTNET_CONFIG;
//# sourceMappingURL=TESTNET.d.ts.map