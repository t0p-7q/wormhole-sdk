import { EventCoder, Event, Idl } from '@project-serum/anchor';
import { IdlEvent } from '../../anchor';
export declare class NftBridgeEventsCoder implements EventCoder {
    constructor(_idl: Idl);
    decode<E extends IdlEvent = IdlEvent, T = Record<string, string>>(_log: string): Event<E, T> | null;
}
//# sourceMappingURL=events.d.ts.map