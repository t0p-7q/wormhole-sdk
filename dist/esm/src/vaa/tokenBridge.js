import { BN } from '@project-serum/anchor';
import { parseGovernanceVaa } from './governance';
import { parseVaa } from './wormhole';
export var TokenBridgePayload;
(function (TokenBridgePayload) {
    TokenBridgePayload[TokenBridgePayload["Transfer"] = 1] = "Transfer";
    TokenBridgePayload[TokenBridgePayload["AttestMeta"] = 2] = "AttestMeta";
    TokenBridgePayload[TokenBridgePayload["TransferWithPayload"] = 3] = "TransferWithPayload";
})(TokenBridgePayload || (TokenBridgePayload = {}));
export var TokenBridgeGovernanceAction;
(function (TokenBridgeGovernanceAction) {
    TokenBridgeGovernanceAction[TokenBridgeGovernanceAction["RegisterChain"] = 1] = "RegisterChain";
    TokenBridgeGovernanceAction[TokenBridgeGovernanceAction["UpgradeContract"] = 2] = "UpgradeContract";
})(TokenBridgeGovernanceAction || (TokenBridgeGovernanceAction = {}));
export function parseTokenTransferPayload(payload) {
    const payloadType = payload.readUInt8(0);
    if (payloadType != TokenBridgePayload.Transfer &&
        payloadType != TokenBridgePayload.TransferWithPayload) {
        throw new Error('not token bridge transfer VAA');
    }
    const amount = BigInt(new BN(payload.subarray(1, 33)).toString());
    const tokenAddress = payload.subarray(33, 65);
    const tokenChain = payload.readUInt16BE(65);
    const to = payload.subarray(67, 99);
    const toChain = payload.readUInt16BE(99);
    const fee = payloadType == 1
        ? BigInt(new BN(payload.subarray(101, 133)).toString())
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
export function parseTokenTransferVaa(vaa) {
    const parsed = parseVaa(vaa);
    return {
        ...parsed,
        ...parseTokenTransferPayload(parsed.payload),
    };
}
export function parseAttestMetaPayload(payload) {
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
export function parseAttestMetaVaa(vaa) {
    const parsed = parseVaa(vaa);
    return {
        ...parsed,
        ...parseAttestMetaPayload(parsed.payload),
    };
}
export function parseTokenBridgeRegisterChainGovernancePayload(payload) {
    const foreignChain = payload.readUInt16BE(0);
    const foreignAddress = payload.subarray(2, 34);
    return {
        foreignChain,
        foreignAddress,
    };
}
export function parseTokenBridgeRegisterChainVaa(vaa) {
    const parsed = parseGovernanceVaa(vaa);
    if (parsed.action != TokenBridgeGovernanceAction.RegisterChain) {
        throw new Error('parsed.action != TokenBridgeGovernanceAction.RegisterChain');
    }
    return {
        ...parsed,
        ...parseTokenBridgeRegisterChainGovernancePayload(parsed.orderPayload),
    };
}
export function parseTokenBridgeUpgradeContractGovernancePayload(payload) {
    const newContract = payload.subarray(0, 32);
    return {
        newContract,
    };
}
export function parseTokenBridgeUpgradeContractVaa(vaa) {
    const parsed = parseGovernanceVaa(vaa);
    if (parsed.action != TokenBridgeGovernanceAction.UpgradeContract) {
        throw new Error('parsed.action != TokenBridgeGovernanceAction.UpgradeContract');
    }
    return {
        ...parsed,
        ...parseTokenBridgeUpgradeContractGovernancePayload(parsed.orderPayload),
    };
}
//# sourceMappingURL=tokenBridge.js.map