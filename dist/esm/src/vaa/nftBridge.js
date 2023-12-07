import { BN } from '@project-serum/anchor';
import { parseGovernanceVaa } from './governance';
import { parseTokenBridgeRegisterChainGovernancePayload, parseTokenBridgeUpgradeContractGovernancePayload, } from './tokenBridge';
import { parseVaa } from './wormhole';
export var NftBridgePayload;
(function (NftBridgePayload) {
    NftBridgePayload[NftBridgePayload["Transfer"] = 1] = "Transfer";
})(NftBridgePayload || (NftBridgePayload = {}));
export var NftBridgeGovernanceAction;
(function (NftBridgeGovernanceAction) {
    NftBridgeGovernanceAction[NftBridgeGovernanceAction["RegisterChain"] = 1] = "RegisterChain";
    NftBridgeGovernanceAction[NftBridgeGovernanceAction["UpgradeContract"] = 2] = "UpgradeContract";
})(NftBridgeGovernanceAction || (NftBridgeGovernanceAction = {}));
export function parseNftTransferPayload(payload) {
    const payloadType = payload.readUInt8(0);
    if (payloadType != NftBridgePayload.Transfer) {
        throw new Error('not nft bridge transfer VAA');
    }
    const tokenAddress = payload.subarray(1, 33);
    const tokenChain = payload.readUInt16BE(33);
    const symbol = payload.subarray(35, 67).toString().replace(/\0/g, '');
    const name = payload.subarray(67, 99).toString().replace(/\0/g, '');
    const tokenId = BigInt(new BN(payload.subarray(99, 131)).toString());
    const uriLen = payload.readUInt8(131);
    const uri = payload.subarray(132, 132 + uriLen).toString();
    const uriEnd = 132 + uriLen;
    const to = payload.subarray(uriEnd, uriEnd + 32);
    const toChain = payload.readUInt16BE(uriEnd + 32);
    return {
        payloadType,
        tokenAddress,
        tokenChain,
        name,
        symbol,
        tokenId,
        uri,
        to,
        toChain,
    };
}
export function parseNftTransferVaa(vaa) {
    const parsed = parseVaa(vaa);
    return {
        ...parsed,
        ...parseNftTransferPayload(parsed.payload),
    };
}
export function parseNftBridgeRegisterChainGovernancePayload(payload) {
    return parseTokenBridgeRegisterChainGovernancePayload(payload);
}
export function parseNftBridgeRegisterChainVaa(vaa) {
    const parsed = parseGovernanceVaa(vaa);
    if (parsed.action != NftBridgeGovernanceAction.RegisterChain) {
        throw new Error('parsed.action != NftBridgeGovernanceAction.RegisterChain');
    }
    return {
        ...parsed,
        ...parseNftBridgeRegisterChainGovernancePayload(parsed.orderPayload),
    };
}
export function parseNftBridgeUpgradeContractGovernancePayload(payload) {
    return parseTokenBridgeUpgradeContractGovernancePayload(payload);
}
export function parseNftBridgeUpgradeContractVaa(vaa) {
    const parsed = parseGovernanceVaa(vaa);
    if (parsed.action != NftBridgeGovernanceAction.UpgradeContract) {
        throw new Error('parsed.action != NftBridgeGovernanceAction.UpgradeContract');
    }
    return {
        ...parsed,
        ...parseNftBridgeUpgradeContractGovernancePayload(parsed.orderPayload),
    };
}
//# sourceMappingURL=nftBridge.js.map