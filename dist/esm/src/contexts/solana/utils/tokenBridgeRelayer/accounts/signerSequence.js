import { deriveAddress } from '../../utils';
import { PublicKey } from '@solana/web3.js';
export function deriveSignerSequenceAddress(programId, payerKey) {
    return deriveAddress([Buffer.from('seq'), new PublicKey(payerKey).toBuffer()], programId);
}
//# sourceMappingURL=signerSequence.js.map