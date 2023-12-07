import { deriveAddress } from '../../utils';
import { PublicKey } from '@solana/web3.js';
export function deriveTokenTransferMessageAddress(programId, payer, sequence) {
    const sequenceBuf = Buffer.alloc(8);
    sequenceBuf.writeBigUInt64BE(BigInt(sequence.toString()));
    return deriveAddress([Buffer.from('bridged'), new PublicKey(payer).toBuffer(), sequenceBuf], programId);
}
//# sourceMappingURL=tokenTransferMessage.js.map