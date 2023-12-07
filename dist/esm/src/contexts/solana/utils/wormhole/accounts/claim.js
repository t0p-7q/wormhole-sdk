import { deriveAddress, getAccountData } from '../../utils';
export function deriveClaimKey(programId, emitterAddress, emitterChain, sequence) {
    const address = typeof emitterAddress == 'string'
        ? Buffer.from(emitterAddress, 'hex')
        : Buffer.from(emitterAddress);
    if (address.length != 32) {
        throw Error('address.length != 32');
    }
    const sequenceSerialized = Buffer.alloc(8);
    sequenceSerialized.writeBigUInt64BE(typeof sequence == 'number' ? BigInt(sequence) : sequence);
    return deriveAddress([
        address,
        (() => {
            const buf = Buffer.alloc(2);
            buf.writeUInt16BE(emitterChain);
            return buf;
        })(),
        sequenceSerialized,
    ], programId);
}
export async function getClaim(connection, programId, emitterAddress, emitterChain, sequence, commitment) {
    return connection
        .getAccountInfo(deriveClaimKey(programId, emitterAddress, emitterChain, sequence), commitment)
        .then((info) => !!getAccountData(info)[0]);
}
//# sourceMappingURL=claim.js.map