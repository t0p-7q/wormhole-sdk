import { Coder, Idl } from '@project-serum/anchor';
import { NftBridgeAccountsCoder } from './accounts';
import { NftBridgeEventsCoder } from './events';
import { NftBridgeInstructionCoder } from './instruction';
import { NftBridgeStateCoder } from './state';
import { NftBridgeTypesCoder } from './types';
export { NftBridgeInstruction } from './instruction';
export declare class NftBridgeCoder implements Coder {
    readonly instruction: NftBridgeInstructionCoder;
    readonly accounts: NftBridgeAccountsCoder;
    readonly state: NftBridgeStateCoder;
    readonly events: NftBridgeEventsCoder;
    readonly types: NftBridgeTypesCoder;
    constructor(idl: Idl);
}
//# sourceMappingURL=index.d.ts.map