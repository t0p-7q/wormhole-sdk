"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNftBridgeUpgradeContractVaa = exports.parseNftBridgeUpgradeContractGovernancePayload = exports.parseNftBridgeRegisterChainVaa = exports.parseNftBridgeRegisterChainGovernancePayload = exports.parseNftTransferVaa = exports.parseNftTransferPayload = exports.NftBridgeGovernanceAction = exports.NftBridgePayload = void 0;
const anchor_1 = require("@project-serum/anchor");
const governance_1 = require("./governance");
const tokenBridge_1 = require("./tokenBridge");
const wormhole_1 = require("./wormhole");
var NftBridgePayload;
(function (NftBridgePayload) {
    NftBridgePayload[NftBridgePayload["Transfer"] = 1] = "Transfer";
})(NftBridgePayload = exports.NftBridgePayload || (exports.NftBridgePayload = {}));
var NftBridgeGovernanceAction;
(function (NftBridgeGovernanceAction) {
    NftBridgeGovernanceAction[NftBridgeGovernanceAction["RegisterChain"] = 1] = "RegisterChain";
    NftBridgeGovernanceAction[NftBridgeGovernanceAction["UpgradeContract"] = 2] = "UpgradeContract";
})(NftBridgeGovernanceAction = exports.NftBridgeGovernanceAction || (exports.NftBridgeGovernanceAction = {}));
function parseNftTransferPayload(payload) {
    const payloadType = payload.readUInt8(0);
    if (payloadType != NftBridgePayload.Transfer) {
        throw new Error('not nft bridge transfer VAA');
    }
    const tokenAddress = payload.subarray(1, 33);
    const tokenChain = payload.readUInt16BE(33);
    const symbol = payload.subarray(35, 67).toString().replace(/\0/g, '');
    const name = payload.subarray(67, 99).toString().replace(/\0/g, '');
    const tokenId = BigInt(new anchor_1.BN(payload.subarray(99, 131)).toString());
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
exports.parseNftTransferPayload = parseNftTransferPayload;
function parseNftTransferVaa(vaa) {
    const parsed = (0, wormhole_1.parseVaa)(vaa);
    return {
        ...parsed,
        ...parseNftTransferPayload(parsed.payload),
    };
}
exports.parseNftTransferVaa = parseNftTransferVaa;
function parseNftBridgeRegisterChainGovernancePayload(payload) {
    return (0, tokenBridge_1.parseTokenBridgeRegisterChainGovernancePayload)(payload);
}
exports.parseNftBridgeRegisterChainGovernancePayload = parseNftBridgeRegisterChainGovernancePayload;
function parseNftBridgeRegisterChainVaa(vaa) {
    const parsed = (0, governance_1.parseGovernanceVaa)(vaa);
    if (parsed.action != NftBridgeGovernanceAction.RegisterChain) {
        throw new Error('parsed.action != NftBridgeGovernanceAction.RegisterChain');
    }
    return {
        ...parsed,
        ...parseNftBridgeRegisterChainGovernancePayload(parsed.orderPayload),
    };
}
exports.parseNftBridgeRegisterChainVaa = parseNftBridgeRegisterChainVaa;
function parseNftBridgeUpgradeContractGovernancePayload(payload) {
    return (0, tokenBridge_1.parseTokenBridgeUpgradeContractGovernancePayload)(payload);
}
exports.parseNftBridgeUpgradeContractGovernancePayload = parseNftBridgeUpgradeContractGovernancePayload;
function parseNftBridgeUpgradeContractVaa(vaa) {
    const parsed = (0, governance_1.parseGovernanceVaa)(vaa);
    if (parsed.action != NftBridgeGovernanceAction.UpgradeContract) {
        throw new Error('parsed.action != NftBridgeGovernanceAction.UpgradeContract');
    }
    return {
        ...parsed,
        ...parseNftBridgeUpgradeContractGovernancePayload(parsed.orderPayload),
    };
}
exports.parseNftBridgeUpgradeContractVaa = parseNftBridgeUpgradeContractVaa;
//# sourceMappingURL=nftBridge.js.map