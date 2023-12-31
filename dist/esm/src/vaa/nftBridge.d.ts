/// <reference types="node" />
import { ParsedGovernanceVaa } from './governance';
import { TokenBridgeRegisterChain, TokenBridgeUpgradeContract } from './tokenBridge';
import { ParsedVaa, SignedVaa } from './wormhole';
export declare enum NftBridgePayload {
    Transfer = 1
}
export declare enum NftBridgeGovernanceAction {
    RegisterChain = 1,
    UpgradeContract = 2
}
export interface NftTransfer {
    payloadType: NftBridgePayload.Transfer;
    tokenAddress: Buffer;
    tokenChain: number;
    symbol: string;
    name: string;
    tokenId: bigint;
    uri: string;
    to: Buffer;
    toChain: number;
}
export declare function parseNftTransferPayload(payload: Buffer): NftTransfer;
export interface ParsedNftTransferVaa extends ParsedVaa, NftTransfer {
}
export declare function parseNftTransferVaa(vaa: SignedVaa): ParsedNftTransferVaa;
export interface NftRegisterChain extends TokenBridgeRegisterChain {
}
export interface ParsedNftBridgeRegisterChainVaa extends ParsedGovernanceVaa, NftRegisterChain {
}
export declare function parseNftBridgeRegisterChainGovernancePayload(payload: Buffer): NftRegisterChain;
export declare function parseNftBridgeRegisterChainVaa(vaa: SignedVaa): ParsedNftBridgeRegisterChainVaa;
export interface NftBridgeUpgradeContract extends TokenBridgeUpgradeContract {
}
export declare function parseNftBridgeUpgradeContractGovernancePayload(payload: Buffer): NftBridgeUpgradeContract;
export interface ParsedNftBridgeUpgradeContractVaa extends ParsedGovernanceVaa, NftBridgeUpgradeContract {
}
export declare function parseNftBridgeUpgradeContractVaa(vaa: SignedVaa): ParsedNftBridgeUpgradeContractVaa;
//# sourceMappingURL=nftBridge.d.ts.map