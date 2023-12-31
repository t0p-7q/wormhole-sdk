/// <reference types="node" />
import { Idl, InstructionCoder } from '@project-serum/anchor';
export declare class NftBridgeInstructionCoder implements InstructionCoder {
    constructor(_: Idl);
    encode(ixName: string, ix: any): Buffer;
    encodeState(_ixName: string, _ix: any): Buffer;
}
/** Solitaire enum of existing the NFT Bridge's instructions.
 *
 * https://github.com/certusone/wormhole/blob/main/solana/modules/nft_bridge/program/src/lib.rs#L74
 */
export declare enum NftBridgeInstruction {
    Initialize = 0,
    CompleteNative = 1,
    CompleteWrapped = 2,
    CompleteWrappedMeta = 3,
    TransferWrapped = 4,
    TransferNative = 5,
    RegisterChain = 6,
    UpgradeContract = 7
}
//# sourceMappingURL=instruction.d.ts.map