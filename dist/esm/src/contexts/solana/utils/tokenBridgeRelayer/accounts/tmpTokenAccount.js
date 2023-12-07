import { deriveAddress } from '../../utils';
import { PublicKey } from '@solana/web3.js';
export function deriveTmpTokenAccountAddress(programId, mint) {
    return deriveAddress([Buffer.from('tmp'), new PublicKey(mint).toBuffer()], programId);
}
//# sourceMappingURL=tmpTokenAccount.js.map