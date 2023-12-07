import { Connection, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js';
import { ChainId } from 'types';
export declare function createTransferWrappedTokensWithRelayInstruction(connection: Connection, programId: PublicKeyInitData, payer: PublicKeyInitData, tokenBridgeProgramId: PublicKeyInitData, wormholeProgramId: PublicKeyInitData, mint: PublicKeyInitData, amount: bigint, toNativeTokenAmount: bigint, recipientAddress: Uint8Array, recipientChain: ChainId, batchId: number): Promise<TransactionInstruction>;
//# sourceMappingURL=transferWrappedTokensWithRelay.d.ts.map