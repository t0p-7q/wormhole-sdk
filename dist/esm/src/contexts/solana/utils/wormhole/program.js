import { PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import { createReadOnlyProvider } from '../utils';
import { WormholeCoder } from './coder';
import IDL from '../../../../anchor-idl/wormhole.json';
export function createWormholeProgramInterface(programId, provider) {
    return new Program(IDL, new PublicKey(programId), provider === undefined ? { connection: null } : provider, coder());
}
export function createReadOnlyWormholeProgramInterface(programId, connection) {
    return createWormholeProgramInterface(programId, createReadOnlyProvider(connection));
}
export function coder() {
    return new WormholeCoder(IDL);
}
//# sourceMappingURL=program.js.map