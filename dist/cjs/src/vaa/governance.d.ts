/// <reference types="node" />
import { ParsedVaa, SignedVaa } from './wormhole';
export interface Governance {
    module: string;
    action: number;
    chain: number;
    orderPayload: Buffer;
}
export interface ParsedGovernanceVaa extends ParsedVaa, Governance {
}
export declare function parseGovernanceVaa(vaa: SignedVaa): ParsedGovernanceVaa;
export declare function parseGovernancePayload(payload: Buffer): Governance;
//# sourceMappingURL=governance.d.ts.map