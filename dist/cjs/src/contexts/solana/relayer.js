"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaRelayer = void 0;
const web3_js_1 = require("@solana/web3.js");
const tokenBridgeRelayer_1 = require("./utils/tokenBridgeRelayer");
const anchor_1 = require("@project-serum/anchor");
const spl_token_1 = require("@solana/spl-token");
const accounts_1 = require("./utils/tokenBridgeRelayer/accounts");
const SOL_DECIMALS = 9;
const TEN = new anchor_1.BN(10);
const SWAP_RATE_PRECISION = new anchor_1.BN(100000000);
class SolanaRelayer {
    constructor(programId, connection) {
        this.connection = connection;
        this.program = (0, tokenBridgeRelayer_1.createTokenBridgeRelayerProgramInterface)(programId, connection);
    }
    async isAcceptedToken(mint) {
        try {
            await this.getRegisteredToken(new web3_js_1.PublicKey(mint));
            return true;
        }
        catch (e) {
            if (e.message?.includes('Account does not exist')) {
                // the token is not registered
                return false;
            }
            throw e;
        }
    }
    async calculateRelayerFee(targetChain, mint, decimals) {
        const [{ fee }, { swapRate }, { relayerFeePrecision }] = await Promise.all([
            this.getForeignContract(targetChain),
            this.getRegisteredToken(mint),
            this.getRedeemerConfig(),
        ]);
        const relayerFee = TEN.pow(new anchor_1.BN(decimals))
            .mul(fee)
            .mul(SWAP_RATE_PRECISION)
            .div(new anchor_1.BN(relayerFeePrecision).mul(swapRate));
        return BigInt(relayerFee.toString());
    }
    async calculateMaxSwapAmountIn(mint, decimals) {
        const [{ swapRate, maxNativeSwapAmount }, { swapRate: solSwapRate }] = await Promise.all([
            this.getRegisteredToken(mint),
            this.getRegisteredToken(spl_token_1.NATIVE_MINT),
        ]);
        const nativeSwapRate = this.calculateNativeSwapRate(solSwapRate, swapRate);
        const maxSwapAmountIn = decimals > SOL_DECIMALS
            ? maxNativeSwapAmount
                .mul(nativeSwapRate)
                .mul(TEN.pow(new anchor_1.BN(decimals - SOL_DECIMALS)))
                .div(SWAP_RATE_PRECISION)
            : maxNativeSwapAmount
                .mul(nativeSwapRate)
                .div(TEN.pow(new anchor_1.BN(SOL_DECIMALS - decimals)).mul(SWAP_RATE_PRECISION));
        return BigInt(maxSwapAmountIn.toString());
    }
    async calculateNativeSwapAmountOut(mint, toNativeAmount, decimals) {
        if (toNativeAmount === 0n) {
            return 0n;
        }
        const [{ swapRate }, { swapRate: solSwapRate }] = await Promise.all([
            this.getRegisteredToken(mint),
            this.getRegisteredToken(spl_token_1.NATIVE_MINT),
        ]);
        const nativeSwapRate = this.calculateNativeSwapRate(solSwapRate, swapRate);
        const swapAmountOut = decimals > SOL_DECIMALS
            ? SWAP_RATE_PRECISION.mul(new anchor_1.BN(toNativeAmount.toString())).div(nativeSwapRate.mul(TEN.pow(new anchor_1.BN(decimals - SOL_DECIMALS))))
            : SWAP_RATE_PRECISION.mul(new anchor_1.BN(toNativeAmount.toString()))
                .mul(TEN.pow(new anchor_1.BN(SOL_DECIMALS - decimals)))
                .div(nativeSwapRate);
        return BigInt(swapAmountOut.toString());
    }
    async fetchSwapEvent(signature) {
        const transaction = await this.connection.getParsedTransaction(signature);
        if (transaction) {
            const logMessages = transaction.meta?.logMessages || [];
            for (const msg of logMessages) {
                const matches = /Swap executed successfully, recipient: (\w+), relayer: (\w+), token: (\w+), tokenAmount: (\w+), nativeAmount: (\w+)/.exec(msg);
                if (matches) {
                    return {
                        recipient: matches[1],
                        relayer: matches[2],
                        token: matches[3],
                        tokenAmount: matches[4],
                        nativeAmount: matches[5],
                    };
                }
            }
        }
        return null;
    }
    calculateNativeSwapRate(solSwapRate, swapRate) {
        return SWAP_RATE_PRECISION.mul(solSwapRate).div(swapRate);
    }
    async getForeignContract(chain) {
        return await this.program.account.foreignContract.fetch((0, accounts_1.deriveForeignContractAddress)(this.program.programId, chain));
    }
    async getRegisteredToken(mint) {
        return await this.program.account.registeredToken.fetch((0, accounts_1.deriveRegisteredTokenAddress)(this.program.programId, mint));
    }
    async getRedeemerConfig() {
        return await this.program.account.redeemerConfig.fetch((0, accounts_1.deriveRedeemerConfigAddress)(this.program.programId));
    }
}
exports.SolanaRelayer = SolanaRelayer;
//# sourceMappingURL=relayer.js.map