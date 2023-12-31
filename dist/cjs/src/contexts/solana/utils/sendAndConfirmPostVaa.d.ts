/// <reference types="node" />
import { Commitment, ConfirmOptions, Connection, PublicKeyInitData } from '@solana/web3.js';
import { SignTransaction, TransactionSignatureAndResponse, PreparedTransactions } from './utils';
import { ParsedVaa, SignedVaa } from '../../../vaa/wormhole';
/**
 * @category Solana
 */
export declare function postVaaWithRetry(connection: Connection, signTransaction: SignTransaction, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: Buffer, maxRetries?: number, commitment?: Commitment): Promise<TransactionSignatureAndResponse[]>;
/**
 * @category Solana
 */
export declare function postVaa(connection: Connection, signTransaction: SignTransaction, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: Buffer, options?: ConfirmOptions, asyncVerifySignatures?: boolean): Promise<TransactionSignatureAndResponse[]>;
/**
 * @category Solana
 *
 * Send transactions for `verify_signatures` and `post_vaa` instructions.
 *
 * Using a signed VAA, execute transactions generated by {@link verifySignatures} and
 * {@link postVaa}. At most 4 transactions are sent (up to 3 from signature verification
 * and 1 to post VAA data to an account).
 *
 * @param {Connection} connection - Solana web3 connection
 * @param {PublicKeyInitData} wormholeProgramId - wormhole program address
 * @param {web3.Keypair} payer - transaction signer address
 * @param {Buffer} signedVaa - bytes of signed VAA
 * @param {Commitment} [options] - Solana commitment
 *
 */
export declare function createPostSignedVaaTransactions(connection: Connection, wormholeProgramId: PublicKeyInitData, payer: PublicKeyInitData, vaa: SignedVaa | ParsedVaa, commitment?: Commitment): Promise<PreparedTransactions>;
//# sourceMappingURL=sendAndConfirmPostVaa.d.ts.map