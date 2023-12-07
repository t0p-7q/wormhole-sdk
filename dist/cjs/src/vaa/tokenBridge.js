"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTokenBridgeUpgradeContractVaa = exports.parseTokenBridgeUpgradeContractGovernancePayload = exports.parseTokenBridgeRegisterChainVaa = exports.parseTokenBridgeRegisterChainGovernancePayload = exports.parseAttestMetaVaa = exports.parseAttestMetaPayload = exports.parseTokenTransferVaa = exports.parseTokenTransferPayload = exports.TokenBridgeGovernanceAction = exports.TokenBridgePayload = void 0;
const anchor_1 = require("@project-serum/anchor");
const governance_1 = require("./governance");
const wormhole_1 = require("./wormhole");
var TokenBridgePayload;
(function (TokenBridgePayload) {
    TokenBridgePayload[TokenBridgePayload["Transfer"] = 1] = "Transfer";
    TokenBridgePayload[TokenBridgePayload["AttestMeta"] = 2] = "AttestMeta";
    TokenBridgePayload[TokenBridgePayload["TransferWithPayload"] = 3] = "TransferWithPayload";
})(TokenBridgePayload = exports.TokenBridgePayload || (exports.TokenBridgePayload = {}));
var TokenBridgeGovernanceAction;
(function (TokenBridgeGovernanceAction) {
    TokenBridgeGovernanceAction[TokenBridgeGovernanceAction["RegisterChain"] = 1] = "RegisterChain";
    TokenBridgeGovernanceAction[TokenBridgeGovernanceAction["UpgradeContract"] = 2] = "UpgradeContract";
})(TokenBridgeGovernanceAction = exports.TokenBridgeGovernanceAction || (exports.TokenBridgeGovernanceAction = {}));
function parseTokenTransferPayload(payload) {
    const payloadType = payload.readUInt8(0);
    if (payloadType != TokenBridgePayload.Transfer &&
        payloadType != TokenBridgePayload.TransferWithPayload) {
        throw new Error('not token bridge transfer VAA');
    }
    const amount = BigInt(new anchor_1.BN(payload.subarray(1, 33)).toString());
    const tokenAddress = payload.subarray(33, 65);
    const tokenChain = payload.readUInt16BE(65);
    const to = payload.subarray(67, 99);
    const toChain = payload.readUInt16BE(99);
    const fee = payloadType == 1
        ? BigInt(new anchor_1.BN(payload.subarray(101, 133)).toString())
        : null;
    const fromAddress = payloadType == 3 ? payload.subarray(101, 133) : null;
    const tokenTransferPayload = payload.subarray(133);
    return {
        payloadType,
        amount,
        tokenAddress,
        tokenChain,
        to,
        toChain,
        fee,
        fromAddress,
        tokenTransferPayload,
    };
}
exports.parseTokenTransferPayload = parseTokenTransferPayload;
function parseTokenTransferVaa(vaa) {
    const parsed = (0, wormhole_1.parseVaa)(vaa);
    return {
        ...parsed,
        ...parseTokenTransferPayload(parsed.payload),
    };
}
exports.parseTokenTransferVaa = parseTokenTransferVaa;
function parseAttestMetaPayload(payload) {
    const payloadType = payload.readUInt8(0);
    if (payloadType != TokenBridgePayload.AttestMeta) {
        throw new Error('not token bridge attest meta VAA');
    }
    const tokenAddress = payload.subarray(1, 33);
    const tokenChain = payload.readUInt16BE(33);
    const decimals = payload.readUInt8(35);
    const symbol = payload.subarray(36, 68).toString().replace(/\0/g, '');
    const name = payload.subarray(68, 100).toString().replace(/\0/g, '');
    return {
        payloadType,
        tokenAddress,
        tokenChain,
        decimals,
        symbol,
        name,
    };
}
exports.parseAttestMetaPayload = parseAttestMetaPayload;
function parseAttestMetaVaa(vaa) {
    const parsed = (0, wormhole_1.parseVaa)(vaa);
    return {
        ...parsed,
        ...parseAttestMetaPayload(parsed.payload),
    };
}
exports.parseAttestMetaVaa = parseAttestMetaVaa;
function parseTokenBridgeRegisterChainGovernancePayload(payload) {
    const foreignChain = payload.readUInt16BE(0);
    const foreignAddress = payload.subarray(2, 34);
    return {
        foreignChain,
        foreignAddress,
    };
}
exports.parseTokenBridgeRegisterChainGovernancePayload = parseTokenBridgeRegisterChainGovernancePayload;
function parseTokenBridgeRegisterChainVaa(vaa) {
    const parsed = (0, governance_1.parseGovernanceVaa)(vaa);
    if (parsed.action != TokenBridgeGovernanceAction.RegisterChain) {
        throw new Error('parsed.action != TokenBridgeGovernanceAction.RegisterChain');
    }
    return {
        ...parsed,
        ...parseTokenBridgeRegisterChainGovernancePayload(parsed.orderPayload),
    };
}
exports.parseTokenBridgeRegisterChainVaa = parseTokenBridgeRegisterChainVaa;
function parseTokenBridgeUpgradeContractGovernancePayload(payload) {
    const newContract = payload.subarray(0, 32);
    return {
        newContract,
    };
}
exports.parseTokenBridgeUpgradeContractGovernancePayload = parseTokenBridgeUpgradeContractGovernancePayload;
function parseTokenBridgeUpgradeContractVaa(vaa) {
    const parsed = (0, governance_1.parseGovernanceVaa)(vaa);
    if (parsed.action != TokenBridgeGovernanceAction.UpgradeContract) {
        throw new Error('parsed.action != TokenBridgeGovernanceAction.UpgradeContract');
    }
    return {
        ...parsed,
        ...parseTokenBridgeUpgradeContractGovernancePayload(parsed.orderPayload),
    };
}
exports.parseTokenBridgeUpgradeContractVaa = parseTokenBridgeUpgradeContractVaa;
//# sourceMappingURL=tokenBridge.js.map