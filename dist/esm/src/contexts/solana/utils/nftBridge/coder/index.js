import { NftBridgeAccountsCoder } from './accounts';
import { NftBridgeEventsCoder } from './events';
import { NftBridgeInstructionCoder } from './instruction';
import { NftBridgeStateCoder } from './state';
import { NftBridgeTypesCoder } from './types';
export { NftBridgeInstruction } from './instruction';
export class NftBridgeCoder {
    constructor(idl) {
        this.instruction = new NftBridgeInstructionCoder(idl);
        this.accounts = new NftBridgeAccountsCoder(idl);
        this.state = new NftBridgeStateCoder(idl);
        this.events = new NftBridgeEventsCoder(idl);
        this.types = new NftBridgeTypesCoder(idl);
    }
}
//# sourceMappingURL=index.js.map