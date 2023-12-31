"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = exports.Metadata = exports.Key = exports.deriveSplTokenMetadataKey = exports.SplTokenMetadataProgram = exports.CreateMetadataAccountArgs = exports.Data = exports.Creator = void 0;
const web3_js_1 = require("@solana/web3.js");
const account_1 = require("./account");
class Creator {
    constructor(address, verified, share) {
        this.address = new web3_js_1.PublicKey(address);
        this.verified = verified;
        this.share = share;
    }
    serialize() {
        const serialized = Buffer.alloc(Creator.size);
        serialized.write(this.address.toBuffer().toString('hex'), 0, 'hex');
        if (this.verified) {
            serialized.writeUInt8(1, 32);
        }
        serialized.writeUInt8(this.share, 33);
        return serialized;
    }
    static deserialize(data) {
        const address = data.subarray(0, 32);
        const verified = data.readUInt8(32) > 0;
        const share = data.readUInt8(33);
        return new Creator(address, verified, share);
    }
}
exports.Creator = Creator;
Creator.size = 34;
class Data {
    constructor(name, symbol, uri, sellerFeeBasisPoints, creators) {
        this.name = name;
        this.symbol = symbol;
        this.uri = uri;
        this.sellerFeeBasisPoints = sellerFeeBasisPoints;
        this.creators = creators;
    }
    serialize() {
        const nameLen = this.name.length;
        const symbolLen = this.symbol.length;
        const uriLen = this.uri.length;
        const creators = this.creators;
        const [creatorsLen, creatorsSize] = (() => {
            if (creators === null) {
                return [0, 0];
            }
            const creatorsLen = creators.length;
            return [creatorsLen, 4 + creatorsLen * Creator.size];
        })();
        const serialized = Buffer.alloc(15 + nameLen + symbolLen + uriLen + creatorsSize);
        serialized.writeUInt32LE(nameLen, 0);
        serialized.write(this.name, 4);
        serialized.writeUInt32LE(symbolLen, 4 + nameLen);
        serialized.write(this.symbol, 8 + nameLen);
        serialized.writeUInt32LE(uriLen, 8 + nameLen + symbolLen);
        serialized.write(this.uri, 12 + nameLen + symbolLen);
        serialized.writeUInt16LE(this.sellerFeeBasisPoints, 12 + nameLen + symbolLen + uriLen);
        if (creators === null) {
            serialized.writeUInt8(0, 14 + nameLen + symbolLen + uriLen);
        }
        else {
            serialized.writeUInt8(1, 14 + nameLen + symbolLen + uriLen);
            serialized.writeUInt32LE(creatorsLen, 15 + nameLen + symbolLen + uriLen);
            for (let i = 0; i < creatorsLen; ++i) {
                const creator = creators.at(i);
                const idx = 19 + nameLen + symbolLen + uriLen + i * Creator.size;
                serialized.write(creator.serialize().toString('hex'), idx, 'hex');
            }
        }
        return serialized;
    }
    static deserialize(data) {
        const nameLen = data.readUInt32LE(0);
        const name = data.subarray(4, 4 + nameLen).toString();
        const symbolLen = data.readUInt32LE(4 + nameLen);
        const symbol = data
            .subarray(8 + nameLen, 8 + nameLen + symbolLen)
            .toString();
        const uriLen = data.readUInt32LE(8 + nameLen + symbolLen);
        const uri = data
            .subarray(12 + nameLen + symbolLen, 12 + nameLen + symbolLen + uriLen)
            .toString();
        const sellerFeeBasisPoints = data.readUInt16LE(12 + nameLen + symbolLen + uriLen);
        const optionCreators = data.readUInt8(14 + nameLen + symbolLen + uriLen);
        const creators = (() => {
            if (optionCreators == 0) {
                return null;
            }
            const creators = [];
            const creatorsLen = data.readUInt32LE(15 + nameLen + symbolLen + uriLen);
            for (let i = 0; i < creatorsLen; ++i) {
                const idx = 19 + nameLen + symbolLen + uriLen + i * Creator.size;
                creators.push(Creator.deserialize(data.subarray(idx, idx + Creator.size)));
            }
            return creators;
        })();
        return new Data(name, symbol, uri, sellerFeeBasisPoints, creators);
    }
}
exports.Data = Data;
class CreateMetadataAccountArgs extends Data {
    constructor(name, symbol, uri, sellerFeeBasisPoints, creators, isMutable) {
        super(name, symbol, uri, sellerFeeBasisPoints, creators);
        this.isMutable = isMutable;
    }
    static serialize(name, symbol, uri, sellerFeeBasisPoints, creators, isMutable) {
        return new CreateMetadataAccountArgs(name, symbol, uri, sellerFeeBasisPoints, creators, isMutable).serialize();
    }
    static serializeInstructionData(name, symbol, uri, sellerFeeBasisPoints, creators, isMutable) {
        return Buffer.concat([
            Buffer.alloc(1, 0),
            CreateMetadataAccountArgs.serialize(name, symbol, uri, sellerFeeBasisPoints, creators, isMutable),
        ]);
    }
    serialize() {
        return Buffer.concat([
            super.serialize(),
            Buffer.alloc(1, this.isMutable ? 1 : 0),
        ]);
    }
}
exports.CreateMetadataAccountArgs = CreateMetadataAccountArgs;
class SplTokenMetadataProgram {
    /**
     * @internal
     */
    constructor() { }
    static createMetadataAccounts(payer, mint, mintAuthority, name, symbol, updateAuthority, updateAuthorityIsSigner = false, uri, creators, sellerFeeBasisPoints, isMutable = false, metadataAccount = deriveSplTokenMetadataKey(mint)) {
        const keys = [
            (0, account_1.newAccountMeta)(metadataAccount, false),
            (0, account_1.newReadOnlyAccountMeta)(mint, false),
            (0, account_1.newReadOnlyAccountMeta)(mintAuthority, true),
            (0, account_1.newReadOnlyAccountMeta)(payer, true),
            (0, account_1.newReadOnlyAccountMeta)(updateAuthority, updateAuthorityIsSigner),
            (0, account_1.newReadOnlyAccountMeta)(web3_js_1.SystemProgram.programId, false),
            (0, account_1.newReadOnlyAccountMeta)(web3_js_1.SYSVAR_RENT_PUBKEY, false),
        ];
        const data = CreateMetadataAccountArgs.serializeInstructionData(name, symbol, uri === undefined ? '' : uri, sellerFeeBasisPoints === undefined ? 0 : sellerFeeBasisPoints, creators === undefined ? null : creators, isMutable);
        return {
            programId: SplTokenMetadataProgram.programId,
            keys,
            data,
        };
    }
}
exports.SplTokenMetadataProgram = SplTokenMetadataProgram;
/**
 * Public key that identifies the SPL Token Metadata program
 */
SplTokenMetadataProgram.programId = new web3_js_1.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
function deriveSplTokenMetadataKey(mint) {
    return (0, account_1.deriveAddress)([
        Buffer.from('metadata'),
        SplTokenMetadataProgram.programId.toBuffer(),
        new web3_js_1.PublicKey(mint).toBuffer(),
    ], SplTokenMetadataProgram.programId);
}
exports.deriveSplTokenMetadataKey = deriveSplTokenMetadataKey;
var Key;
(function (Key) {
    Key[Key["Uninitialized"] = 0] = "Uninitialized";
    Key[Key["EditionV1"] = 1] = "EditionV1";
    Key[Key["MasterEditionV1"] = 2] = "MasterEditionV1";
    Key[Key["ReservationListV1"] = 3] = "ReservationListV1";
    Key[Key["MetadataV1"] = 4] = "MetadataV1";
    Key[Key["ReservationListV2"] = 5] = "ReservationListV2";
    Key[Key["MasterEditionV2"] = 6] = "MasterEditionV2";
    Key[Key["EditionMarker"] = 7] = "EditionMarker";
})(Key = exports.Key || (exports.Key = {}));
class Metadata {
    constructor(key, updateAuthority, mint, data, primarySaleHappened, isMutable) {
        this.key = key;
        this.updateAuthority = new web3_js_1.PublicKey(updateAuthority);
        this.mint = new web3_js_1.PublicKey(mint);
        this.data = data;
        this.primarySaleHappened = primarySaleHappened;
        this.isMutable = isMutable;
    }
    static deserialize(data) {
        const key = data.readUInt8(0);
        const updateAuthority = data.subarray(1, 33);
        const mint = data.subarray(33, 65);
        const meta = Data.deserialize(data.subarray(65));
        const metaLen = meta.serialize().length;
        const primarySaleHappened = data.readUInt8(65 + metaLen) > 0;
        const isMutable = data.readUInt8(66 + metaLen) > 0;
        return new Metadata(key, updateAuthority, mint, meta, primarySaleHappened, isMutable);
    }
}
exports.Metadata = Metadata;
async function getMetadata(connection, mint, commitment) {
    return connection
        .getAccountInfo(deriveSplTokenMetadataKey(mint), commitment)
        .then((info) => Metadata.deserialize((0, account_1.getAccountData)(info)));
}
exports.getMetadata = getMetadata;
//# sourceMappingURL=splMetadata.js.map