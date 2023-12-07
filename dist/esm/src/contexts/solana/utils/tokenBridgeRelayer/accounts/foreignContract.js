import { deriveAddress } from '../../utils';
export function deriveForeignContractAddress(programId, chainId) {
    const chainIdBuf = Buffer.alloc(2);
    chainIdBuf.writeUInt16BE(chainId);
    return deriveAddress([Buffer.from('foreign_contract'), chainIdBuf], programId);
}
//# sourceMappingURL=foreignContract.js.map