import { ChainName, Context, WormholeConfig } from './types';
export declare function filterByContext(config: WormholeConfig, context: Context): import("./types").ChainConfig[];
export declare function stripHexPrefix(val: string): string;
export declare function chunkArray<T>(arr: T[], size: number): T[][];
export declare class ForeignAssetCache {
    private cache;
    constructor();
    get(assetChain: ChainName, assetAddress: string, foreignChain: ChainName): string | undefined;
    set(assetChain: ChainName, assetAddress: string, foreignChain: ChainName, address: string): void;
}
export declare const waitFor: (condition: () => Promise<boolean>, ms?: number, tries?: number) => Promise<void>;
//# sourceMappingURL=utils.d.ts.map