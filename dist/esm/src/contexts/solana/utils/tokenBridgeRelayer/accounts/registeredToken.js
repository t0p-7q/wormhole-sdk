import { PublicKey } from '@solana/web3.js';
import { deriveAddress } from '../../utils';
export function deriveRegisteredTokenAddress(programId, mint) {
    return deriveAddress([Buffer.from('mint'), new PublicKey(mint).toBuffer()], programId);
}
//# sourceMappingURL=registeredToken.js.map