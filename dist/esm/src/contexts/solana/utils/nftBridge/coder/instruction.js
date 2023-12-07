import { PublicKey } from '@solana/web3.js';
export class NftBridgeInstructionCoder {
    constructor(_) { }
    encode(ixName, ix) {
        switch (ixName) {
            case 'initialize': {
                return encodeInitialize(ix);
            }
            case 'completeNative': {
                return encodeCompleteNative(ix);
            }
            case 'completeWrapped': {
                return encodeCompleteWrapped(ix);
            }
            case 'completeWrappedMeta': {
                return encodeCompleteWrappedMeta(ix);
            }
            case 'transferWrapped': {
                return encodeTransferWrapped(ix);
            }
            case 'transferNative': {
                return encodeTransferNative(ix);
            }
            case 'registerChain': {
                return encodeRegisterChain(ix);
            }
            case 'upgradeContract': {
                return encodeUpgradeContract(ix);
            }
            default: {
                throw new Error(`Invalid instruction: ${ixName}`);
            }
        }
    }
    encodeState(_ixName, _ix) {
        throw new Error('NFT Bridge program does not have state');
    }
}
/** Solitaire enum of existing the NFT Bridge's instructions.
 *
 * https://github.com/certusone/wormhole/blob/main/solana/modules/nft_bridge/program/src/lib.rs#L74
 */
export var NftBridgeInstruction;
(function (NftBridgeInstruction) {
    NftBridgeInstruction[NftBridgeInstruction["Initialize"] = 0] = "Initialize";
    NftBridgeInstruction[NftBridgeInstruction["CompleteNative"] = 1] = "CompleteNative";
    NftBridgeInstruction[NftBridgeInstruction["CompleteWrapped"] = 2] = "CompleteWrapped";
    NftBridgeInstruction[NftBridgeInstruction["CompleteWrappedMeta"] = 3] = "CompleteWrappedMeta";
    NftBridgeInstruction[NftBridgeInstruction["TransferWrapped"] = 4] = "TransferWrapped";
    NftBridgeInstruction[NftBridgeInstruction["TransferNative"] = 5] = "TransferNative";
    NftBridgeInstruction[NftBridgeInstruction["RegisterChain"] = 6] = "RegisterChain";
    NftBridgeInstruction[NftBridgeInstruction["UpgradeContract"] = 7] = "UpgradeContract";
})(NftBridgeInstruction || (NftBridgeInstruction = {}));
function encodeNftBridgeInstructionData(instructionType, data) {
    const dataLen = data === undefined ? 0 : data.length;
    const instructionData = Buffer.alloc(1 + dataLen);
    instructionData.writeUInt8(instructionType, 0);
    if (dataLen > 0) {
        instructionData.write(data.toString('hex'), 1, 'hex');
    }
    return instructionData;
}
function encodeInitialize({ wormhole }) {
    const serialized = Buffer.alloc(32);
    serialized.write(new PublicKey(wormhole).toBuffer().toString('hex'), 0, 'hex');
    return encodeNftBridgeInstructionData(NftBridgeInstruction.Initialize, serialized);
}
function encodeCompleteNative({}) {
    return encodeNftBridgeInstructionData(NftBridgeInstruction.CompleteNative);
}
function encodeCompleteWrapped({}) {
    return encodeNftBridgeInstructionData(NftBridgeInstruction.CompleteWrapped);
}
function encodeCompleteWrappedMeta({}) {
    return encodeNftBridgeInstructionData(NftBridgeInstruction.CompleteWrappedMeta);
}
function encodeTransferData({ nonce, targetAddress, targetChain }) {
    if (!Buffer.isBuffer(targetAddress)) {
        throw new Error('targetAddress must be Buffer');
    }
    const serialized = Buffer.alloc(38);
    serialized.writeUInt32LE(nonce, 0);
    serialized.write(targetAddress.toString('hex'), 4, 'hex');
    serialized.writeUInt16LE(targetChain, 36);
    return serialized;
}
function encodeTransferWrapped({ nonce, targetAddress, targetChain }) {
    return encodeNftBridgeInstructionData(NftBridgeInstruction.TransferWrapped, encodeTransferData({ nonce, targetAddress, targetChain }));
}
function encodeTransferNative({ nonce, targetAddress, targetChain }) {
    return encodeNftBridgeInstructionData(NftBridgeInstruction.TransferNative, encodeTransferData({ nonce, targetAddress, targetChain }));
}
function encodeRegisterChain({}) {
    return encodeNftBridgeInstructionData(NftBridgeInstruction.RegisterChain);
}
function encodeUpgradeContract({}) {
    return encodeNftBridgeInstructionData(NftBridgeInstruction.UpgradeContract);
}
//# sourceMappingURL=instruction.js.map