"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointRegistration = exports.getEndpointRegistration = exports.deriveEndpointKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const MAINNET_1 = require("../../../../../config/MAINNET");
const utils_1 = require("../../utils");
const wormhole_sdk_1 = require("@certusone/wormhole-sdk");
function deriveEndpointKey(tokenBridgeProgramId, emitterChain, emitterAddress) {
    if (emitterChain == MAINNET_1.MAINNET_CHAINS.solana) {
        throw new Error('emitterChain == CHAIN_ID_SOLANA cannot exist as foreign token bridge emitter');
    }
    if (typeof emitterAddress == 'string') {
        emitterAddress = (0, wormhole_sdk_1.tryNativeToUint8Array)(emitterAddress, emitterChain);
    }
    return (0, utils_1.deriveAddress)([
        (() => {
            const buf = Buffer.alloc(2);
            buf.writeUInt16BE(emitterChain);
            return buf;
        })(),
        emitterAddress,
    ], tokenBridgeProgramId);
}
exports.deriveEndpointKey = deriveEndpointKey;
async function getEndpointRegistration(connection, endpointKey, commitment) {
    return connection
        .getAccountInfo(new web3_js_1.PublicKey(endpointKey), commitment)
        .then((info) => EndpointRegistration.deserialize((0, utils_1.getAccountData)(info)));
}
exports.getEndpointRegistration = getEndpointRegistration;
class EndpointRegistration {
    constructor(chain, contract) {
        this.chain = chain;
        this.contract = contract;
    }
    static deserialize(data) {
        if (data.length != 34) {
            throw new Error('data.length != 34');
        }
        const chain = data.readUInt16LE(0);
        const contract = data.subarray(2, 34);
        return new EndpointRegistration(chain, contract);
    }
}
exports.EndpointRegistration = EndpointRegistration;
//# sourceMappingURL=endpoint.js.map