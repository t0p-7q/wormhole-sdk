import { Parser } from 'binary-parser';
import { BigNumber, ethers } from 'ethers';
import { solidityKeccak256 } from 'ethers/lib/utils';
import * as elliptic from 'elliptic';
class P {
    constructor(parser) {
        this.parser = parser;
    }
    // Try to parse a buffer with a parser, and return null if it failed due to an
    // assertion error.
    parse(buffer) {
        try {
            let result = this.parser.parse(buffer);
            delete result['end'];
            return result;
        }
        catch (e) {
            if (e.message?.includes('Assertion error')) {
                return null;
            }
            else {
                throw e;
            }
        }
    }
    or(other) {
        let p = new P(other.parser);
        p.parse = (buffer) => {
            return this.parse(buffer) ?? other.parse(buffer);
        };
        return p;
    }
}
export function parse(buffer) {
    const vaa = parseEnvelope(buffer);
    const parser = guardianSetUpgradeParser
        .or(coreContractUpgradeParser)
        .or(portalContractUpgradeParser('TokenBridge'))
        .or(portalContractUpgradeParser('NFTBridge'))
        .or(portalRegisterChainParser('TokenBridge'))
        .or(portalRegisterChainParser('NFTBridge'))
        .or(tokenBridgeTransferParser())
        .or(tokenBridgeTransferWithPayloadParser())
        .or(tokenBridgeAttestMetaParser())
        .or(nftBridgeTransferParser());
    let payload = parser.parse(vaa.payload);
    if (payload === null) {
        payload = {
            type: 'Other',
            hex: Buffer.from(vaa.payload).toString('hex'),
            ascii: Buffer.from(vaa.payload).toString('utf8'),
        };
    }
    else {
        // @ts-ignore
        delete payload['tokenURILength'];
    }
    var myVAA = { ...vaa, payload };
    return myVAA;
}
export function assertKnownPayload(vaa) {
    if (vaa.payload.type === 'Other') {
        throw Error(`Couldn't parse VAA payload: ${vaa.payload.hex}`);
    }
}
// Parse the VAA envelope without looking into the payload.
// If you want to parse the payload as well, use 'parse'.
export function parseEnvelope(buffer) {
    var vaa = vaaParser.parse(buffer);
    delete vaa['end'];
    delete vaa['signatureCount'];
    vaa.payload = Buffer.from(vaa.payload);
    return vaa;
}
// Parse a signature
const signatureParser = new Parser()
    .endianess('big')
    .uint8('guardianSetIndex')
    .array('signature', {
    type: 'uint8',
    lengthInBytes: 65,
    formatter: (arr) => Buffer.from(arr).toString('hex'),
});
function serialiseSignature(sig) {
    const body = [encode('uint8', sig.guardianSetIndex), sig.signature];
    return body.join('');
}
// Parse a vaa envelope. The payload is returned as a byte array.
const vaaParser = new Parser()
    .endianess('big')
    .uint8('version')
    .uint32('guardianSetIndex')
    .uint8('signatureCount')
    .array('signatures', {
    type: signatureParser,
    length: 'signatureCount',
})
    .uint32('timestamp')
    .uint32('nonce')
    .uint16('emitterChain')
    .array('emitterAddress', {
    type: 'uint8',
    lengthInBytes: 32,
    formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
})
    .uint64('sequence')
    .uint8('consistencyLevel')
    .array('payload', {
    type: 'uint8',
    readUntil: 'eof',
})
    .string('end', {
    greedy: true,
    assert: (str) => str === '',
});
export function serialiseVAA(vaa) {
    const body = [
        encode('uint8', vaa.version),
        encode('uint32', vaa.guardianSetIndex),
        encode('uint8', vaa.signatures.length),
        ...vaa.signatures.map((sig) => serialiseSignature(sig)),
        vaaBody(vaa),
    ];
    return body.join('');
}
export function vaaDigest(vaa) {
    return solidityKeccak256(['bytes'], [solidityKeccak256(['bytes'], ['0x' + vaaBody(vaa)])]);
}
function vaaBody(vaa) {
    let payload_str;
    if (vaa.payload.type === 'Other') {
        payload_str = vaa.payload.hex;
    }
    else {
        let payload = vaa.payload;
        switch (payload.module) {
            case 'Core':
                switch (payload.type) {
                    case 'GuardianSetUpgrade':
                        payload_str = serialiseGuardianSetUpgrade(payload);
                        break;
                    case 'ContractUpgrade':
                        payload_str = serialiseCoreContractUpgrade(payload);
                        break;
                    default:
                        return impossible(payload);
                }
                break;
            case 'NFTBridge':
                switch (payload.type) {
                    case 'ContractUpgrade':
                        payload_str = serialisePortalContractUpgrade(payload);
                        break;
                    case 'RegisterChain':
                        payload_str = serialisePortalRegisterChain(payload);
                        break;
                    case 'Transfer':
                        payload_str = serialiseNFTBridgeTransfer(payload);
                        break;
                    default:
                        return impossible(payload);
                }
                break;
            case 'TokenBridge':
                switch (payload.type) {
                    case 'ContractUpgrade':
                        payload_str = serialisePortalContractUpgrade(payload);
                        break;
                    case 'RegisterChain':
                        payload_str = serialisePortalRegisterChain(payload);
                        break;
                    case 'Transfer':
                        payload_str = serialiseTokenBridgeTransfer(payload);
                        break;
                    case 'TransferWithPayload':
                        payload_str = serialiseTokenBridgeTransferWithPayload(payload);
                        break;
                    case 'AttestMeta':
                        payload_str = serialiseTokenBridgeAttestMeta(payload);
                        break;
                    default:
                        return impossible(payload);
                }
                break;
            default:
                return impossible(payload);
        }
    }
    const body = [
        encode('uint32', vaa.timestamp),
        encode('uint32', vaa.nonce),
        encode('uint16', vaa.emitterChain),
        encode('bytes32', hex(vaa.emitterAddress)),
        encode('uint64', vaa.sequence),
        encode('uint8', vaa.consistencyLevel),
        payload_str,
    ];
    return body.join('');
}
/** @category VAA */
export function sign(signers, vaa) {
    const hash = vaaDigest(vaa);
    const ec = new elliptic.ec('secp256k1');
    return signers.map((signer, i) => {
        const key = ec.keyFromPrivate(signer);
        const signature = key.sign(Buffer.from(hash.substr(2), 'hex'), {
            canonical: true,
        });
        const packed = [
            signature.r.toString('hex').padStart(64, '0'),
            signature.s.toString('hex').padStart(64, '0'),
            encode('uint8', signature.recoveryParam),
        ].join('');
        return {
            guardianSetIndex: i,
            signature: packed,
        };
    });
}
// Parse an address of given length, and render it as hex
const addressParser = (length) => new Parser().endianess('big').array('address', {
    type: 'uint8',
    lengthInBytes: length,
    formatter: (arr) => Buffer.from(arr).toString('hex'),
});
// Parse a guardian set upgrade payload
const guardianSetUpgradeParser = new P(new Parser()
    .endianess('big')
    .string('module', {
    length: 32,
    encoding: 'hex',
    assert: Buffer.from('Core').toString('hex').padStart(64, '0'),
    formatter: (_str) => 'Core',
})
    .uint8('type', {
    assert: 2,
    formatter: (_action) => 'GuardianSetUpgrade',
})
    .uint16('chain')
    .uint32('newGuardianSetIndex')
    .uint8('newGuardianSetLength')
    .array('newGuardianSet', {
    type: addressParser(20),
    length: 'newGuardianSetLength',
    formatter: (arr) => arr.map((addr) => addr.address),
})
    .string('end', {
    greedy: true,
    assert: (str) => str === '',
}));
function serialiseGuardianSetUpgrade(payload) {
    const body = [
        encode('bytes32', encodeString(payload.module)),
        encode('uint8', 2),
        encode('uint16', payload.chain),
        encode('uint32', payload.newGuardianSetIndex),
        encode('uint8', payload.newGuardianSet.length),
        ...payload.newGuardianSet,
    ];
    return body.join('');
}
// Parse a core contract upgrade payload
const coreContractUpgradeParser = new P(new Parser()
    .endianess('big')
    .string('module', {
    length: 32,
    encoding: 'hex',
    assert: Buffer.from('Core').toString('hex').padStart(64, '0'),
    formatter: (_str) => 'Core',
})
    .uint8('type', {
    assert: 1,
    formatter: (_action) => 'ContractUpgrade',
})
    .uint16('chain')
    .array('address', {
    type: 'uint8',
    lengthInBytes: 32,
    formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
})
    .string('end', {
    greedy: true,
    assert: (str) => str === '',
}));
function serialiseCoreContractUpgrade(payload) {
    const body = [
        encode('bytes32', encodeString(payload.module)),
        encode('uint8', 1),
        encode('uint16', payload.chain),
        encode('bytes32', payload.address),
    ];
    return body.join('');
}
// Parse a portal contract upgrade payload
function portalContractUpgradeParser(module) {
    return new P(new Parser()
        .endianess('big')
        .string('module', {
        length: 32,
        encoding: 'hex',
        assert: Buffer.from(module).toString('hex').padStart(64, '0'),
        formatter: (_str) => module,
    })
        .uint8('type', {
        assert: 2,
        formatter: (_action) => 'ContractUpgrade',
    })
        .uint16('chain')
        .array('address', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .string('end', {
        greedy: true,
        assert: (str) => str === '',
    }));
}
function serialisePortalContractUpgrade(payload) {
    const body = [
        encode('bytes32', encodeString(payload.module)),
        encode('uint8', 2),
        encode('uint16', payload.chain),
        encode('bytes32', payload.address),
    ];
    return body.join('');
}
// Parse a portal chain registration payload
function portalRegisterChainParser(module) {
    return new P(new Parser()
        .endianess('big')
        .string('module', {
        length: 32,
        encoding: 'hex',
        assert: Buffer.from(module).toString('hex').padStart(64, '0'),
        formatter: (_str) => module,
    })
        .uint8('type', {
        assert: 1,
        formatter: (_action) => 'RegisterChain',
    })
        .uint16('chain')
        .uint16('emitterChain')
        .array('emitterAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .string('end', {
        greedy: true,
        assert: (str) => str === '',
    }));
}
function serialisePortalRegisterChain(payload) {
    const body = [
        encode('bytes32', encodeString(payload.module)),
        encode('uint8', 1),
        encode('uint16', payload.chain),
        encode('uint16', payload.emitterChain),
        encode('bytes32', payload.emitterAddress),
    ];
    return body.join('');
}
function tokenBridgeTransferParser() {
    return new P(new Parser()
        .endianess('big')
        .string('module', {
        length: (_) => 0,
        formatter: (_) => 'TokenBridge',
    })
        .uint8('type', {
        assert: 1,
        formatter: (_action) => 'Transfer',
    })
        .array('amount', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (bytes) => BigNumber.from(bytes).toBigInt(),
    })
        .array('tokenAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .uint16('tokenChain')
        .array('toAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .uint16('chain')
        .array('fee', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (bytes) => BigNumber.from(bytes).toBigInt(),
    })
        .string('end', {
        greedy: true,
        assert: (str) => str === '',
    }));
}
function serialiseTokenBridgeTransfer(payload) {
    const body = [
        encode('uint8', 1),
        encode('uint256', payload.amount),
        encode('bytes32', hex(payload.tokenAddress)),
        encode('uint16', payload.tokenChain),
        encode('bytes32', hex(payload.toAddress)),
        encode('uint16', payload.chain),
        encode('uint256', payload.fee),
    ];
    return body.join('');
}
function tokenBridgeAttestMetaParser() {
    return new P(new Parser()
        .endianess('big')
        .string('module', {
        length: (_) => 0,
        formatter: (_) => 'TokenBridge',
    })
        .string('chain', {
        length: (_) => 0,
        formatter: (_) => 0,
    })
        .uint8('type', {
        assert: 2,
        formatter: (_action) => 'AttestMeta',
    })
        .array('tokenAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .uint16('tokenChain')
        .uint8('decimals')
        .array('symbol', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => Buffer.from(arr).toString('utf8', arr.findIndex((val) => val != 0)),
    })
        .array('name', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => Buffer.from(arr).toString('utf8', arr.findIndex((val) => val != 0)),
    })
        .string('end', {
        greedy: true,
        assert: (str) => str === '',
    }));
}
function serialiseTokenBridgeAttestMeta(payload) {
    const body = [
        encode('uint8', 2),
        encode('bytes32', hex(payload.tokenAddress)),
        encode('uint16', payload.tokenChain),
        encode('uint8', payload.decimals),
        encode('bytes32', encodeString(payload.symbol)),
        encode('bytes32', encodeString(payload.name)),
    ];
    return body.join('');
}
function tokenBridgeTransferWithPayloadParser() {
    return new P(new Parser()
        .endianess('big')
        .string('module', {
        length: (_) => 0,
        formatter: (_) => 'TokenBridge',
    })
        .uint8('type', {
        assert: 3,
        formatter: (_action) => 'TransferWithPayload',
    })
        .array('amount', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (bytes) => BigNumber.from(bytes).toBigInt(),
    })
        .array('tokenAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .uint16('tokenChain')
        .array('toAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .uint16('chain')
        .array('fromAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .array('payload', {
        type: 'uint8',
        greedy: true,
        readUntil: 'eof',
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    }));
}
function serialiseTokenBridgeTransferWithPayload(payload) {
    const body = [
        encode('uint8', 3),
        encode('uint256', payload.amount),
        encode('bytes32', hex(payload.tokenAddress)),
        encode('uint16', payload.tokenChain),
        encode('bytes32', hex(payload.toAddress)),
        encode('uint16', payload.chain),
        encode('bytes32', hex(payload.fromAddress)),
        payload.payload.substring(2),
    ];
    return body.join('');
}
function nftBridgeTransferParser() {
    return new P(new Parser()
        .endianess('big')
        .string('module', {
        length: (_) => 0,
        formatter: (_) => 'NFTBridge',
    })
        .uint8('type', {
        assert: 1,
        formatter: (_action) => 'Transfer',
    })
        .array('tokenAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .uint16('tokenChain')
        .array('tokenSymbol', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => Buffer.from(arr).toString('utf8', arr.findIndex((val) => val != 0)),
    })
        .array('tokenName', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => Buffer.from(arr).toString('utf8', arr.findIndex((val) => val != 0)),
    })
        .array('tokenId', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (bytes) => BigNumber.from(bytes).toBigInt(),
    })
        .uint8('tokenURILength')
        .array('tokenURI', {
        type: 'uint8',
        lengthInBytes: function () {
            // @ts-ignore
            return this.tokenURILength;
        },
        formatter: (arr) => Buffer.from(arr).toString('utf8'),
    })
        .array('toAddress', {
        type: 'uint8',
        lengthInBytes: 32,
        formatter: (arr) => '0x' + Buffer.from(arr).toString('hex'),
    })
        .uint16('chain')
        .string('end', {
        greedy: true,
        assert: (str) => str === '',
    }));
}
function serialiseNFTBridgeTransfer(payload) {
    const body = [
        encode('uint8', 1),
        encode('bytes32', hex(payload.tokenAddress)),
        encode('uint16', payload.tokenChain),
        encode('bytes32', encodeString(payload.tokenSymbol)),
        encode('bytes32', encodeString(payload.tokenName)),
        encode('uint256', payload.tokenId),
        encode('uint8', payload.tokenURI.length),
        Buffer.from(payload.tokenURI, 'utf8').toString('hex'),
        encode('bytes32', hex(payload.toAddress)),
        encode('uint16', payload.chain),
    ];
    return body.join('');
}
// This function should be called after pattern matching on all possible options
// of an enum (union) type, so that typescript can derive that no other options
// are possible.  If (from JavaScript land) an unsupported argument is passed
// in, this function just throws. If the enum type is extended with new cases,
// the call to this function will then fail to compile, drawing attention to an
// unhandled case somewhere.
export function impossible(a) {
    throw new Error(`Impossible: ${a}`);
}
export function typeWidth(type) {
    switch (type) {
        case 'uint8':
            return 1;
        case 'uint16':
            return 2;
        case 'uint32':
            return 4;
        case 'uint64':
            return 8;
        case 'uint128':
            return 16;
        case 'uint256':
            return 32;
        case 'bytes32':
            return 32;
        case 'address':
            return 20;
    }
}
// Couldn't find a satisfactory binary serialisation solution, so we just use
// the ethers library's encoding logic
export function encode(type, val) {
    // ethers operates on hex strings (sigh) and left pads everything to 32
    // bytes (64 characters). We take last 2*n characters where n is the width
    // of the type being serialised in bytes (since a byte is represented as 2
    // digits in hex).
    return ethers.utils.defaultAbiCoder
        .encode([type], [val])
        .substr(-2 * typeWidth(type));
}
// Encode a string as binary left-padded to 32 bytes, represented as a hex
// string (64 chars long)
export function encodeString(str) {
    return Buffer.from(Buffer.from(str).toString('hex').padStart(64, '0'), 'hex');
}
// Turn hex string with potentially missing 0x prefix into Buffer
function hex(x) {
    return Buffer.from(ethers.utils.hexlify(x, { allowMissingPrefix: true }).substring(2), 'hex');
}
//# sourceMappingURL=generic.js.map