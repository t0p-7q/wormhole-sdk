/// <reference types="node" />
export interface Signature {
    guardianSetIndex: number;
    signature: string;
}
export interface VAA<T> {
    version: number;
    guardianSetIndex: number;
    signatures: Signature[];
    timestamp: number;
    nonce: number;
    emitterChain: number;
    emitterAddress: string;
    sequence: bigint;
    consistencyLevel: number;
    payload: T;
}
export interface Other {
    type: 'Other';
    hex: string;
    ascii?: string;
}
export type Payload = GuardianSetUpgrade | CoreContractUpgrade | PortalContractUpgrade<'TokenBridge'> | PortalContractUpgrade<'NFTBridge'> | PortalRegisterChain<'TokenBridge'> | PortalRegisterChain<'NFTBridge'> | TokenBridgeTransfer | TokenBridgeTransferWithPayload | TokenBridgeAttestMeta | NFTBridgeTransfer;
export type ContractUpgrade = CoreContractUpgrade | PortalContractUpgrade<'TokenBridge'> | PortalContractUpgrade<'NFTBridge'>;
export declare function parse(buffer: Buffer): VAA<Payload | Other>;
export declare function assertKnownPayload(vaa: VAA<Payload | Other>): asserts vaa is VAA<Payload>;
export declare function parseEnvelope(buffer: Buffer): VAA<Buffer>;
export declare function serialiseVAA(vaa: VAA<Payload>): string;
export declare function vaaDigest(vaa: VAA<Payload | Other>): string;
/** @category VAA */
export declare function sign(signers: string[], vaa: VAA<Payload>): Signature[];
export interface GuardianSetUpgrade {
    module: 'Core';
    type: 'GuardianSetUpgrade';
    chain: number;
    newGuardianSetIndex: number;
    newGuardianSetLength: number;
    newGuardianSet: string[];
}
export interface CoreContractUpgrade {
    module: 'Core';
    type: 'ContractUpgrade';
    chain: number;
    address: string;
}
export interface PortalContractUpgrade<Module extends 'NFTBridge' | 'TokenBridge'> {
    module: Module;
    type: 'ContractUpgrade';
    chain: number;
    address: string;
}
export interface PortalRegisterChain<Module extends 'NFTBridge' | 'TokenBridge'> {
    module: Module;
    type: 'RegisterChain';
    chain: number;
    emitterChain: number;
    emitterAddress: string;
}
export interface TokenBridgeTransfer {
    module: 'TokenBridge';
    type: 'Transfer';
    amount: bigint;
    tokenAddress: string;
    tokenChain: number;
    toAddress: string;
    chain: number;
    fee: bigint;
}
export interface TokenBridgeAttestMeta {
    module: 'TokenBridge';
    type: 'AttestMeta';
    chain: 0;
    tokenAddress: string;
    tokenChain: number;
    decimals: number;
    symbol: string;
    name: string;
}
export interface TokenBridgeTransferWithPayload {
    module: 'TokenBridge';
    type: 'TransferWithPayload';
    amount: bigint;
    tokenAddress: string;
    tokenChain: number;
    toAddress: string;
    chain: number;
    fromAddress: string;
    payload: string;
}
export interface NFTBridgeTransfer {
    module: 'NFTBridge';
    type: 'Transfer';
    tokenAddress: string;
    tokenChain: number;
    tokenSymbol: string;
    tokenName: string;
    tokenId: bigint;
    tokenURI: string;
    toAddress: string;
    chain: number;
}
export declare function impossible(a: never): any;
export type Encoding = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'bytes32' | 'address';
export declare function typeWidth(type: Encoding): number;
export declare function encode(type: Encoding, val: any): string;
export declare function encodeString(str: string): Buffer;
//# sourceMappingURL=generic.d.ts.map