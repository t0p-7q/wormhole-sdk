import { Connection, Commitment, PublicKeyInitData } from '@solana/web3.js';
import { deriveTokenBridgeConfigKey, TokenBridgeConfig } from '../../tokenBridge';
export declare const deriveNftBridgeConfigKey: typeof deriveTokenBridgeConfigKey;
export declare function getNftBridgeConfig(connection: Connection, nftBridgeProgramId: PublicKeyInitData, commitment?: Commitment): Promise<NftBridgeConfig>;
export declare class NftBridgeConfig extends TokenBridgeConfig {
}
//# sourceMappingURL=config.d.ts.map