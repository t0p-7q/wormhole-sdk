"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAndConfirmTransactionsWithRetry = exports.signSendAndConfirmTransaction = exports.NodeWallet = exports.modifySignTransaction = exports.signTransactionFactory = void 0;
const web3_js_1 = require("@solana/web3.js");
/**
 *
 * @param payers
 * @returns
 */
function signTransactionFactory(...payers) {
    return modifySignTransaction((transaction) => Promise.resolve(transaction), ...payers);
}
exports.signTransactionFactory = signTransactionFactory;
function modifySignTransaction(signTransaction, ...payers) {
    return (transaction) => {
        for (const payer of payers) {
            transaction.partialSign(payer);
        }
        return signTransaction(transaction);
    };
}
exports.modifySignTransaction = modifySignTransaction;
/**
 * Wrapper for {@link Keypair} resembling Solana web3 browser wallet
 */
class NodeWallet {
    constructor(payer) {
        this.payer = payer;
        this.signTransaction = signTransactionFactory(this.payer);
    }
    static fromSecretKey(secretKey, options) {
        return new NodeWallet(web3_js_1.Keypair.fromSecretKey(secretKey, options));
    }
    publicKey() {
        return this.payer.publicKey;
    }
    pubkey() {
        return this.publicKey();
    }
    key() {
        return this.publicKey();
    }
    toString() {
        return this.publicKey().toString();
    }
    keypair() {
        return this.payer;
    }
    signer() {
        return this.keypair();
    }
}
exports.NodeWallet = NodeWallet;
/**
 * The transactions provided to this function should be ready to send.
 * This function will do the following:
 * 1. Add the {@param payer} as the feePayer and latest blockhash to the {@link Transaction}.
 * 2. Sign using {@param signTransaction}.
 * 3. Send raw transaction.
 * 4. Confirm transaction.
 */
async function signSendAndConfirmTransaction(connection, payer, signTransaction, unsignedTransaction, options) {
    const commitment = options?.commitment;
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash(commitment);
    unsignedTransaction.recentBlockhash = blockhash;
    unsignedTransaction.feePayer = new web3_js_1.PublicKey(payer);
    // Sign transaction, broadcast, and confirm
    const signed = await signTransaction(unsignedTransaction);
    const signature = await connection.sendRawTransaction(signed.serialize(), options);
    const response = await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
    }, commitment);
    return { signature, response };
}
exports.signSendAndConfirmTransaction = signSendAndConfirmTransaction;
/**
 * @deprecated Please use {@link signSendAndConfirmTransaction} instead, which allows
 * retries to be configured in {@link ConfirmOptions}.
 *
 * The transactions provided to this function should be ready to send.
 * This function will do the following:
 * 1. Add the {@param payer} as the feePayer and latest blockhash to the {@link Transaction}.
 * 2. Sign using {@param signTransaction}.
 * 3. Send raw transaction.
 * 4. Confirm transaction.
 */
async function sendAndConfirmTransactionsWithRetry(connection, signTransaction, payer, unsignedTransactions, maxRetries = 0, options) {
    if (unsignedTransactions.length == 0) {
        return Promise.reject('No transactions provided to send.');
    }
    const commitment = options?.commitment;
    let currentRetries = 0;
    const output = [];
    for (const transaction of unsignedTransactions) {
        while (currentRetries <= maxRetries) {
            try {
                const latest = await connection.getLatestBlockhash(commitment);
                transaction.recentBlockhash = latest.blockhash;
                transaction.feePayer = new web3_js_1.PublicKey(payer);
                const signed = await signTransaction(transaction).catch((e) => null);
                if (signed === null) {
                    return Promise.reject('Failed to sign transaction.');
                }
                const signature = await connection.sendRawTransaction(signed.serialize(), options);
                const response = await connection.confirmTransaction({
                    signature,
                    ...latest,
                }, commitment);
                output.push({ signature, response });
                break;
            }
            catch (e) {
                console.error(e);
                ++currentRetries;
            }
        }
        if (currentRetries > maxRetries) {
            return Promise.reject('Reached the maximum number of retries.');
        }
    }
    return Promise.resolve(output);
}
exports.sendAndConfirmTransactionsWithRetry = sendAndConfirmTransactionsWithRetry;
//# sourceMappingURL=transaction.js.map