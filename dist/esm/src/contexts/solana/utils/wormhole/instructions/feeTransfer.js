import { PublicKey, SystemProgram, } from '@solana/web3.js';
import { deriveFeeCollectorKey, getWormholeBridgeData } from '../accounts';
export async function createBridgeFeeTransferInstruction(connection, wormholeProgramId, payer, commitment) {
    const fee = await getWormholeBridgeData(connection, wormholeProgramId, commitment).then((data) => data.config.fee);
    return SystemProgram.transfer({
        fromPubkey: new PublicKey(payer),
        toPubkey: deriveFeeCollectorKey(wormholeProgramId),
        lamports: fee,
    });
}
//# sourceMappingURL=feeTransfer.js.map