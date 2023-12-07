/// <reference types="bn.js" />
import { ChainId } from 'types';
import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
export interface ForeignContract {
    chain: number;
    address: number[];
    fee: BN;
}
export declare function deriveForeignContractAddress(programId: PublicKeyInitData, chainId: ChainId): PublicKey;
//# sourceMappingURL=foreignContract.d.ts.map