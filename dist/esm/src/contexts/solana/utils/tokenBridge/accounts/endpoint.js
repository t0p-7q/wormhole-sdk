import { PublicKey, } from '@solana/web3.js';
import { MAINNET_CHAINS } from '../../../../../config/MAINNET';
import { deriveAddress, getAccountData } from '../../utils';
import { tryNativeToUint8Array } from '@certusone/wormhole-sdk';
export function deriveEndpointKey(tokenBridgeProgramId, emitterChain, emitterAddress) {
    if (emitterChain == MAINNET_CHAINS.solana) {
        throw new Error('emitterChain == CHAIN_ID_SOLANA cannot exist as foreign token bridge emitter');
    }
    if (typeof emitterAddress == 'string') {
        emitterAddress = tryNativeToUint8Array(emitterAddress, emitterChain);
    }
    return deriveAddress([
        (() => {
            const buf = Buffer.alloc(2);
            buf.writeUInt16BE(emitterChain);
            return buf;
        })(),
        emitterAddress,
    ], tokenBridgeProgramId);
}
export async function getEndpointRegistration(connection, endpointKey, commitment) {
    return connection
        .getAccountInfo(new PublicKey(endpointKey), commitment)
        .then((info) => EndpointRegistration.deserialize(getAccountData(info)));
}
export class EndpointRegistration {
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
//# sourceMappingURL=endpoint.js.map