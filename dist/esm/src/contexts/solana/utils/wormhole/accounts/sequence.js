import { PublicKey, } from '@solana/web3.js';
import { deriveAddress, getAccountData } from '../../utils';
export function deriveEmitterSequenceKey(emitter, wormholeProgramId) {
    return deriveAddress([Buffer.from('Sequence'), new PublicKey(emitter).toBytes()], wormholeProgramId);
}
export async function getSequenceTracker(connection, emitter, wormholeProgramId, commitment) {
    return connection
        .getAccountInfo(deriveEmitterSequenceKey(emitter, wormholeProgramId), commitment)
        .then((info) => SequenceTracker.deserialize(getAccountData(info)));
}
export class SequenceTracker {
    constructor(sequence) {
        this.sequence = sequence;
    }
    static deserialize(data) {
        if (data.length != 8) {
            throw new Error('data.length != 8');
        }
        return new SequenceTracker(data.readBigUInt64LE(0));
    }
    value() {
        return this.sequence;
    }
}
//# sourceMappingURL=sequence.js.map