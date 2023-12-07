import { tryNativeToUint8Array } from '@certusone/wormhole-sdk';
import { PublicKey, } from '@solana/web3.js';
import { MAINNET_CHAINS } from '../../../../../config/MAINNET';
import { deriveAddress, getAccountData } from '../../utils';
export { deriveSplTokenMetadataKey } from '../../utils/splMetadata';
export function deriveWrappedMintKey(tokenBridgeProgramId, tokenChain, tokenAddress) {
    if (tokenChain == MAINNET_CHAINS.solana) {
        throw new Error('tokenChain == CHAIN_ID_SOLANA does not have wrapped mint key');
    }
    if (typeof tokenAddress == 'string') {
        tokenAddress = tryNativeToUint8Array(tokenAddress, tokenChain);
    }
    return deriveAddress([
        Buffer.from('wrapped'),
        (() => {
            const buf = Buffer.alloc(2);
            buf.writeUInt16BE(tokenChain);
            return buf;
        })(),
        tokenAddress,
    ], tokenBridgeProgramId);
}
export function deriveWrappedMetaKey(tokenBridgeProgramId, mint) {
    return deriveAddress([Buffer.from('meta'), new PublicKey(mint).toBuffer()], tokenBridgeProgramId);
}
export async function getWrappedMeta(connection, tokenBridgeProgramId, mint, commitment) {
    return connection
        .getAccountInfo(deriveWrappedMetaKey(tokenBridgeProgramId, mint), commitment)
        .then((info) => WrappedMeta.deserialize(getAccountData(info)));
}
export class WrappedMeta {
    constructor(chain, tokenAddress, originalDecimals) {
        this.chain = chain;
        this.tokenAddress = tokenAddress;
        this.originalDecimals = originalDecimals;
    }
    static deserialize(data) {
        if (data.length != 35) {
            throw new Error('data.length != 35');
        }
        const chain = data.readUInt16LE(0);
        const tokenAddress = data.subarray(2, 34);
        const originalDecimals = data.readUInt8(34);
        return new WrappedMeta(chain, tokenAddress, originalDecimals);
    }
}
//# sourceMappingURL=wrapped.js.map