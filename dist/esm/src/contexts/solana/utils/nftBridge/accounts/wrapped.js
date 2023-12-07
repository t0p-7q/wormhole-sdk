import { tryNativeToUint8Array } from '@certusone/wormhole-sdk';
import { BN } from '@project-serum/anchor';
import { deriveAddress, getAccountData } from '../../utils';
import { deriveWrappedMetaKey } from '../../tokenBridge';
import { MAINNET_CHAINS } from '../../../../../config/MAINNET';
export { deriveWrappedMetaKey } from '../../tokenBridge';
export function deriveWrappedMintKey(tokenBridgeProgramId, tokenChain, tokenAddress, tokenId) {
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
        new BN(tokenId.toString()).toArrayLike(Buffer, 'be', 32),
    ], tokenBridgeProgramId);
}
export async function getWrappedMeta(connection, tokenBridgeProgramId, mint, commitment) {
    return connection
        .getAccountInfo(deriveWrappedMetaKey(tokenBridgeProgramId, mint), commitment)
        .then((info) => WrappedMeta.deserialize(getAccountData(info)));
}
export class WrappedMeta {
    constructor(chain, tokenAddress, tokenId) {
        this.chain = chain;
        this.tokenAddress = tokenAddress;
        this.tokenId = tokenId;
    }
    static deserialize(data) {
        if (data.length != 66) {
            throw new Error('data.length != 66');
        }
        const chain = data.readUInt16LE(0);
        const tokenAddress = data.subarray(2, 34);
        const tokenId = BigInt(new BN(data.subarray(34, 66), undefined, 'le').toString());
        return new WrappedMeta(chain, tokenAddress, tokenId);
    }
}
//# sourceMappingURL=wrapped.js.map