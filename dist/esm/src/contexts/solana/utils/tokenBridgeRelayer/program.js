import { PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import { IDL } from '../types/tokenBridgeRelayer';
export function createTokenBridgeRelayerProgramInterface(programId, connection) {
    return new Program(IDL, new PublicKey(programId), { connection });
}
//# sourceMappingURL=program.js.map