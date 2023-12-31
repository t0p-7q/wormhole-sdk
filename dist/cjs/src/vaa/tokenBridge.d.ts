/// <reference types="node" />
import { ParsedGovernanceVaa } from './governance';
import { ParsedVaa, SignedVaa } from './wormhole';
export declare enum TokenBridgePayload {
    Transfer = 1,
    AttestMeta = 2,
    TransferWithPayload = 3
}
export declare enum TokenBridgeGovernanceAction {
    RegisterChain = 1,
    UpgradeContract = 2
}
export interface TokenTransfer {
    payloadType: TokenBridgePayload.Transfer | TokenBridgePayload.TransferWithPayload;
    amount: bigint;
    tokenAddress: Buffer;
    tokenChain: number;
    to: Buffer;
    toChain: number;
    fee: bigint | null;
    fromAddress: Buffer | null;
    tokenTransferPayload: Buffer;
}
export declare function parseTokenTransferPayload(payload: Buffer): TokenTransfer;
export interface ParsedTokenTransferVaa extends ParsedVaa, TokenTransfer {
}
export declare function parseTokenTransferVaa(vaa: SignedVaa): ParsedTokenTransferVaa;
export interface AssetMeta {
    payloadType: TokenBridgePayload.AttestMeta;
    tokenAddress: Buffer;
    tokenChain: number;
    decimals: number;
    symbol: string;
    name: string;
}
export declare function parseAttestMetaPayload(payload: Buffer): AssetMeta;
export interface ParsedAssetMetaVaa extends ParsedVaa, AssetMeta {
}
export type ParsedAttestMetaVaa = ParsedAssetMetaVaa;
export declare function parseAttestMetaVaa(vaa: SignedVaa): ParsedAssetMetaVaa;
export interface TokenBridgeRegisterChain {
    foreignChain: number;
    foreignAddress: Buffer;
}
export declare function parseTokenBridgeRegisterChainGovernancePayload(payload: Buffer): TokenBridgeRegisterChain;
export interface ParsedTokenBridgeRegisterChainVaa extends ParsedGovernanceVaa, TokenBridgeRegisterChain {
}
export declare function parseTokenBridgeRegisterChainVaa(vaa: SignedVaa): ParsedTokenBridgeRegisterChainVaa;
export interface TokenBridgeUpgradeContract {
    newContract: Buffer;
}
export declare function parseTokenBridgeUpgradeContractGovernancePayload(payload: Buffer): TokenBridgeUpgradeContract;
export interface ParsedTokenBridgeUpgradeContractVaa extends ParsedGovernanceVaa, TokenBridgeUpgradeContract {
}
export declare function parseTokenBridgeUpgradeContractVaa(vaa: SignedVaa): ParsedTokenBridgeUpgradeContractVaa;
//# sourceMappingURL=tokenBridge.d.ts.map