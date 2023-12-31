import bs58 from 'bs58';
import { camelCase, upperFirst } from 'lodash';
import * as borsh from '@coral-xyz/borsh';
import { IdlCoder } from './idl';
/** Solitaire enum of existing the Core Bridge's instructions.
 *
 * https://github.com/certusone/wormhole/blob/main/solana/bridge/program/src/lib.rs#L92
 */
export var WormholeInstruction;
(function (WormholeInstruction) {
    WormholeInstruction[WormholeInstruction["Initialize"] = 0] = "Initialize";
    WormholeInstruction[WormholeInstruction["PostMessage"] = 1] = "PostMessage";
    WormholeInstruction[WormholeInstruction["PostVaa"] = 2] = "PostVaa";
    WormholeInstruction[WormholeInstruction["SetFees"] = 3] = "SetFees";
    WormholeInstruction[WormholeInstruction["TransferFees"] = 4] = "TransferFees";
    WormholeInstruction[WormholeInstruction["UpgradeContract"] = 5] = "UpgradeContract";
    WormholeInstruction[WormholeInstruction["UpgradeGuardianSet"] = 6] = "UpgradeGuardianSet";
    WormholeInstruction[WormholeInstruction["VerifySignatures"] = 7] = "VerifySignatures";
    WormholeInstruction[WormholeInstruction["PostMessageUnreliable"] = 8] = "PostMessageUnreliable";
})(WormholeInstruction || (WormholeInstruction = {}));
// Inspired by  coral-xyz/anchor
//
// https://github.com/coral-xyz/anchor/blob/master/ts/packages/anchor/src/coder/borsh/instruction.ts
export class WormholeInstructionCoder {
    constructor(idl) {
        this.ixLayout = WormholeInstructionCoder.parseIxLayout(idl);
    }
    static parseIxLayout(idl) {
        const stateMethods = idl.state ? idl.state.methods : [];
        const ixLayouts = stateMethods
            .map((m) => {
            let fieldLayouts = m.args.map((arg) => {
                return IdlCoder.fieldLayout(arg, Array.from([...(idl.accounts ?? []), ...(idl.types ?? [])]));
            });
            const name = camelCase(m.name);
            return [name, borsh.struct(fieldLayouts, name)];
        })
            .concat(idl.instructions.map((ix) => {
            let fieldLayouts = ix.args.map((arg) => IdlCoder.fieldLayout(arg, Array.from([...(idl.accounts ?? []), ...(idl.types ?? [])])));
            const name = camelCase(ix.name);
            return [name, borsh.struct(fieldLayouts, name)];
        }));
        return new Map(ixLayouts);
    }
    encode(ixName, ix) {
        const buffer = Buffer.alloc(1000); // TODO: use a tighter buffer.
        const methodName = camelCase(ixName);
        const layout = this.ixLayout.get(methodName);
        if (!layout) {
            throw new Error(`Unknown method: ${methodName}`);
        }
        const len = layout.encode(ix, buffer);
        const data = buffer.slice(0, len);
        return encodeWormholeInstructionData(WormholeInstruction[upperFirst(methodName)], data);
    }
    encodeState(_ixName, _ix) {
        throw new Error('Wormhole program does not have state');
    }
    decode(ix, encoding = 'hex') {
        if (typeof ix === 'string') {
            ix = encoding === 'hex' ? Buffer.from(ix, 'hex') : bs58.decode(ix);
        }
        let discriminator = ix.slice(0, 1).readInt8();
        let data = ix.slice(1);
        let name = camelCase(WormholeInstruction[discriminator]);
        let layout = this.ixLayout.get(name);
        if (!layout) {
            return null;
        }
        return { data: this.ixLayout.get(name)?.decode(data), name };
    }
}
function encodeWormholeInstructionData(discriminator, data) {
    const instructionData = Buffer.alloc(1 + (data === undefined ? 0 : data.length));
    instructionData.writeUInt8(discriminator, 0);
    if (data !== undefined) {
        instructionData.write(data.toString('hex'), 1, 'hex');
    }
    return instructionData;
}
//# sourceMappingURL=instruction.js.map