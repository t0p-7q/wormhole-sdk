/// <reference types="node" />
import { AccountsCoder, Idl } from '@project-serum/anchor';
import { IdlTypeDef } from '../../anchor';
export declare class NftBridgeAccountsCoder<A extends string = string> implements AccountsCoder {
    private idl;
    constructor(idl: Idl);
    encode<T = any>(accountName: A, account: T): Promise<Buffer>;
    decode<T = any>(accountName: A, ix: Buffer): T;
    decodeUnchecked<T = any>(accountName: A, ix: Buffer): T;
    memcmp(accountName: A, _appendData?: Buffer): any;
    size(idlAccount: IdlTypeDef): number;
}
//# sourceMappingURL=accounts.d.ts.map