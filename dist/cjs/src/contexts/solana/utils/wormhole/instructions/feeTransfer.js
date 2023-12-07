"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBridgeFeeTransferInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const accounts_1 = require("../accounts");
async function createBridgeFeeTransferInstruction(connection, wormholeProgramId, payer, commitment) {
    const fee = await (0, accounts_1.getWormholeBridgeData)(connection, wormholeProgramId, commitment).then((data) => data.config.fee);
    return web3_js_1.SystemProgram.transfer({
        fromPubkey: new web3_js_1.PublicKey(payer),
        toPubkey: (0, accounts_1.deriveFeeCollectorKey)(wormholeProgramId),
        lamports: fee,
    });
}
exports.createBridgeFeeTransferInstruction = createBridgeFeeTransferInstruction;
//# sourceMappingURL=feeTransfer.js.map