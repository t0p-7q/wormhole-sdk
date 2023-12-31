import { accountSize } from '../../anchor';
export class WormholeAccountsCoder {
    constructor(idl) {
        this.idl = idl;
    }
    async encode(accountName, account) {
        switch (accountName) {
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    decode(accountName, ix) {
        return this.decodeUnchecked(accountName, ix);
    }
    decodeUnchecked(accountName, ix) {
        switch (accountName) {
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    memcmp(accountName, _appendData) {
        switch (accountName) {
            case 'postVaa': {
                return {
                    dataSize: 56, // + 4 + payload.length
                };
            }
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    size(idlAccount) {
        return accountSize(this.idl, idlAccount) ?? 0;
    }
}
export function encodePostVaaData(account) {
    const payload = account.payload;
    const serialized = Buffer.alloc(60 + payload.length);
    serialized.writeUInt8(account.version, 0);
    serialized.writeUInt32LE(account.guardianSetIndex, 1);
    serialized.writeUInt32LE(account.timestamp, 5);
    serialized.writeUInt32LE(account.nonce, 9);
    serialized.writeUInt16LE(account.emitterChain, 13);
    serialized.write(account.emitterAddress.toString('hex'), 15, 'hex');
    serialized.writeBigUInt64LE(account.sequence, 47);
    serialized.writeUInt8(account.consistencyLevel, 55);
    serialized.writeUInt32LE(payload.length, 56);
    serialized.write(payload.toString('hex'), 60, 'hex');
    return serialized;
}
export function decodePostVaaAccount(buf) {
    return {};
}
//# sourceMappingURL=accounts.js.map