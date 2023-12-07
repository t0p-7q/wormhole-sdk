import { PublicKey } from '@solana/web3.js';
import { deriveAddress } from '../../utils';
export function deriveCustodyKey(tokenBridgeProgramId, mint) {
    return deriveAddress([new PublicKey(mint).toBuffer()], tokenBridgeProgramId);
}
//# sourceMappingURL=custody.js.map