import { BigNumber } from 'ethers';
import { TokenBridgeAbstract } from './tokenBridge';
/**
 * @abstract
 *
 * A standard set of methods for interacting with the Token Bridge Relayer contracts across any of the supported chains
 *
 * @example
 * const context = Wormhole.getContext(chain); // get the chain Context
 * const hasRelayer = context.relaySupported(chain);
 * if (hasRelayer) {
 *   // call any of the supported methods in a standardized uniform fashion
 *   context.sendWithRelay(...);
 * }
 */
export class RelayerAbstract extends TokenBridgeAbstract {
    /**
     * Returns if the Token Bridge relayer is supported on a given chain
     *
     * @param chain The chain name or id
     * @returns True/False if the Token Bridge relayer is supported or not
     */
    relaySupported(chain) {
        const contracts = this.context.getContracts(chain);
        if (!contracts)
            return false;
        return !!contracts.relayer;
    }
    parseRelayerPayload(transferPayload) {
        return {
            relayerPayloadId: transferPayload.readUint8(0),
            relayerFee: BigNumber.from('0x' + transferPayload.subarray(1, 33).toString('hex')),
            toNativeTokenAmount: BigNumber.from('0x' + transferPayload.subarray(33, 65).toString('hex')),
            to: '0x' + transferPayload.subarray(65, 98).toString('hex'),
        };
    }
}
//# sourceMappingURL=relayer.js.map