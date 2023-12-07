import { PublicKey } from '@solana/web3.js';
import { BN, Program } from '@project-serum/anchor';
import { createReadOnlyProvider } from '../utils';
import { NftBridgeCoder } from './coder';
import IDL from '../../../../anchor-idl/nft_bridge.json';
export const NFT_TRANSFER_NATIVE_TOKEN_ADDRESS = Buffer.alloc(32, 1);
export function createNftBridgeProgramInterface(programId, provider) {
    return new Program(IDL, new PublicKey(programId), provider === undefined ? { connection: null } : provider, coder());
}
export function createReadOnlyNftBridgeProgramInterface(programId, connection) {
    return createNftBridgeProgramInterface(programId, createReadOnlyProvider(connection));
}
export function coder() {
    return new NftBridgeCoder(IDL);
}
export function tokenIdToMint(tokenId) {
    return new PublicKey(new BN(tokenId.toString()).toArrayLike(Buffer));
}
export function mintToTokenId(mint) {
    return BigInt(new BN(new PublicKey(mint).toBuffer()).toString());
}
//# sourceMappingURL=program.js.map