"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaContext = void 0;
const wormhole_sdk_1 = require("@certusone/wormhole-sdk");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const MAINNET_1 = __importStar(require("../../config/MAINNET"));
const vaa_1 = require("../../vaa");
const types_1 = require("../../types");
const contracts_1 = require("./contracts");
const tokenBridge_1 = require("./utils/tokenBridge");
const wormhole_1 = require("./utils/wormhole");
const relayer_1 = require("../abstracts/relayer");
const tokenBridgeRelayer_1 = require("./utils/tokenBridgeRelayer");
const SOLANA_SEQ_LOG = 'Program log: Sequence: ';
const SOLANA_CHAIN_NAME = MAINNET_1.default.chains.solana.key;
const SOLANA_MAINNET_EMMITER_ID = 'ec7372995d5cc8732397fb0ad35c0121e0eaa90d26f828a534cab54391b3a4f5';
const SOLANA_TESTNET_EMITTER_ID = '3b26409f8aaded3f5ddca184695aa6a0fa829b0c85caf84856324896d214ca98';
/**
 * @category Solana
 */
class SolanaContext extends relayer_1.RelayerAbstract {
    constructor(context, foreignAssetCache) {
        super();
        this.type = types_1.Context.SOLANA;
        this.context = context;
        const tag = context.environment === 'MAINNET' ? 'mainnet-beta' : 'devnet';
        this.connection = new web3_js_1.Connection(context.conf.rpcs.solana || (0, web3_js_1.clusterApiUrl)(tag));
        this.contracts = new contracts_1.SolContracts(context);
        this.foreignAssetCache = foreignAssetCache;
    }
    async getTxGasFee(txId, chain) {
        if (!this.connection)
            throw new Error('no connection');
        const transaction = await this.connection.getParsedTransaction(txId);
        const parsedInstr = transaction?.meta?.innerInstructions[0].instructions;
        const gasFee = parsedInstr
            ? parsedInstr.reduce((acc, c) => {
                if (!c.parsed || !c.parsed.info || !c.parsed.info.lamports)
                    return acc;
                return acc + c.parsed.info.lamports;
            }, 0)
            : 0;
        return ethers_1.BigNumber.from(gasFee);
    }
    /**
     * Sets the Connection
     *
     * @param connection The Solana Connection
     */
    async setConnection(connection) {
        this.connection = connection;
    }
    async fetchTokenDecimals(tokenAddr, chain) {
        if (!this.connection)
            throw new Error('no connection');
        let mint = await this.connection.getParsedAccountInfo(new web3_js_1.PublicKey(tokenAddr));
        if (!mint)
            throw new Error('could not fetch token details');
        const { decimals } = mint.value.data.parsed.info;
        return decimals;
    }
    /**
     * Gets the owner address of an Associated Token Account
     *
     * @param accountAddr The associated token account address
     * @returns The owner address
     */
    async getTokenAccountOwner(tokenAddr) {
        const token = await (0, spl_token_1.getAccount)(this.connection, new web3_js_1.PublicKey(tokenAddr));
        return token.owner.toString();
    }
    async getNativeBalance(walletAddress, chain) {
        if (!this.connection)
            throw new Error('no connection');
        const balance = await this.connection.getBalance(new web3_js_1.PublicKey(walletAddress));
        return ethers_1.BigNumber.from(balance);
    }
    async getTokenBalance(walletAddress, tokenId, chain) {
        if (!this.connection)
            throw new Error('no connection');
        const address = await this.getForeignAsset(tokenId, chain);
        if (!address)
            return null;
        const splToken = await this.connection.getTokenAccountsByOwner(new web3_js_1.PublicKey(walletAddress), { mint: new web3_js_1.PublicKey(address) });
        if (!splToken.value[0])
            return null;
        const balance = await this.connection.getTokenAccountBalance(splToken.value[0].pubkey);
        return ethers_1.BigNumber.from(balance.value.amount);
    }
    async getTokenBalances(walletAddress, tokenIds, chain) {
        if (!this.connection)
            throw new Error('no connection');
        const addresses = await Promise.all(tokenIds.map((tokenId) => this.getForeignAsset(tokenId, chain)));
        const splParsedTokenAccounts = await this.connection.getParsedTokenAccountsByOwner(new web3_js_1.PublicKey(walletAddress), {
            programId: new web3_js_1.PublicKey(spl_token_1.TOKEN_PROGRAM_ID),
        });
        return addresses.map((address) => {
            if (!address)
                return null;
            const amount = splParsedTokenAccounts.value.find((v) => v?.account.data.parsed?.info?.mint === address)?.account.data.parsed?.info?.tokenAmount?.amount;
            if (!amount)
                return null;
            return ethers_1.BigNumber.from(amount);
        });
    }
    /**
     * Gets the Associate Token Address
     *
     * @param token The token id (home chain/address)
     * @param account The wallet address
     * @returns The associated token address
     */
    async getAssociatedTokenAddress(token, account) {
        const solAddr = await this.mustGetForeignAsset(token, SOLANA_CHAIN_NAME);
        return await (0, spl_token_1.getAssociatedTokenAddress)(new web3_js_1.PublicKey(solAddr), new web3_js_1.PublicKey(account), undefined, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
    }
    async getAssociatedTokenAccount(token, account) {
        if (!this.connection)
            throw new Error('no connection');
        const addr = await this.getAssociatedTokenAddress(token, account);
        try {
            const account = await (0, spl_token_1.getAccount)(this.connection, addr);
            return account;
        }
        catch (_) {
            return null;
        }
    }
    /**
     * Creates the Associated Token Account for a given wallet address. This must exist before a user can send a token bridge transfer, also it is the recipient address when sending the transfer.
     *
     * @param token The token id (home chain/address)
     * @param account The wallet address
     * @param commitment The commitment level
     * @returns The transaction for creating the Associated Token Account
     */
    async createAssociatedTokenAccount(token, account, commitment) {
        if (!this.connection)
            throw new Error('no connection');
        const tokenAccount = await this.getAssociatedTokenAccount(token, account);
        if (tokenAccount)
            return;
        const solAddr = await this.mustGetForeignAsset(token, SOLANA_CHAIN_NAME);
        const associatedAddr = await this.getAssociatedTokenAddress(token, account);
        const payerPublicKey = new web3_js_1.PublicKey(account);
        const tokenPublicKey = new web3_js_1.PublicKey(solAddr);
        const associatedPublicKey = new web3_js_1.PublicKey(associatedAddr);
        const createAccountInst = (0, spl_token_1.createAssociatedTokenAccountInstruction)(payerPublicKey, associatedPublicKey, payerPublicKey, tokenPublicKey);
        const transaction = new web3_js_1.Transaction().add(createAccountInst);
        const { blockhash } = await this.connection.getLatestBlockhash(commitment);
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = payerPublicKey;
        return transaction;
    }
    /**
     * Prepare the transfer instructions for a native token bridge transfer from Solana
     *
     * @dev This _must_ be claimed on the destination chain, see {@link WormholeContext#redeem | redeem}
     *
     * @param senderAddress The address of the sender
     * @param amount The token amount to be sent
     * @param recipientChain The destination chain name or id
     * @param recipientAddress The associated token address where funds will be sent
     * @param relayerFee The fee that would be paid to a relayer
     * @param payload Arbitrary bytes that can contain any addition information about a given transfer
     * @param commitment The commitment level
     * @returns The transaction for sending Native SOL from Solana
     */
    async transferNativeSol(senderAddress, amount, recipientChain, recipientAddress, relayerFee, payload, commitment) {
        if (!this.connection)
            throw new Error('no connection');
        const contracts = this.contracts.mustGetContracts(SOLANA_CHAIN_NAME);
        if (!contracts.core || !contracts.token_bridge) {
            throw new Error('contracts not found');
        }
        const rentBalance = await (0, spl_token_1.getMinimumBalanceForRentExemptAccount)(this.connection, commitment);
        const payerPublicKey = new web3_js_1.PublicKey(senderAddress);
        const ancillaryKeypair = web3_js_1.Keypair.generate();
        //This will create a temporary account where the wSOL will be created.
        const createAncillaryAccountIx = web3_js_1.SystemProgram.createAccount({
            fromPubkey: payerPublicKey,
            newAccountPubkey: ancillaryKeypair.publicKey,
            lamports: rentBalance,
            space: spl_token_1.ACCOUNT_SIZE,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        });
        //Send in the amount of SOL which we want converted to wSOL
        const initialBalanceTransferIx = web3_js_1.SystemProgram.transfer({
            fromPubkey: payerPublicKey,
            lamports: amount,
            toPubkey: ancillaryKeypair.publicKey,
        });
        //Initialize the account as a WSOL account, with the original payerAddress as owner
        const initAccountIx = (0, spl_token_1.createInitializeAccountInstruction)(ancillaryKeypair.publicKey, spl_token_1.NATIVE_MINT, payerPublicKey);
        //Normal approve & transfer instructions, except that the wSOL is sent from the ancillary account.
        const approvalIx = (0, tokenBridge_1.createApproveAuthoritySignerInstruction)(contracts.token_bridge, ancillaryKeypair.publicKey, payerPublicKey, amount);
        const message = web3_js_1.Keypair.generate();
        const nonce = (0, wormhole_sdk_1.createNonce)().readUInt32LE(0);
        const tokenBridgeTransferIx = payload
            ? (0, tokenBridge_1.createTransferNativeWithPayloadInstruction)(this.connection, contracts.token_bridge, contracts.core, senderAddress, message.publicKey, ancillaryKeypair.publicKey, spl_token_1.NATIVE_MINT, nonce, amount, Buffer.from(recipientAddress), this.context.toChainId(recipientChain), payload)
            : (0, tokenBridge_1.createTransferNativeInstruction)(this.connection, contracts.token_bridge, contracts.core, senderAddress, message.publicKey, ancillaryKeypair.publicKey, spl_token_1.NATIVE_MINT, nonce, amount, relayerFee || BigInt(0), Buffer.from(recipientAddress), this.context.toChainId(recipientChain));
        //Close the ancillary account for cleanup. Payer address receives any remaining funds
        const closeAccountIx = (0, spl_token_1.createCloseAccountInstruction)(ancillaryKeypair.publicKey, //account to close
        payerPublicKey, //Remaining funds destination
        payerPublicKey);
        const { blockhash } = await this.connection.getLatestBlockhash(commitment);
        const transaction = new web3_js_1.Transaction();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = payerPublicKey;
        transaction.add(createAncillaryAccountIx, initialBalanceTransferIx, initAccountIx, approvalIx, tokenBridgeTransferIx, closeAccountIx);
        transaction.partialSign(message, ancillaryKeypair);
        return transaction;
    }
    /**
     * Prepare the transfer instructions for a token bridge transfer from Solana
     *
     * @dev This _must_ be claimed on the destination chain, see {@link WormholeContext#redeem | redeem}
     *
     * @param senderAddress The address of the sender
     * @param amount The token amount to be sent
     * @param recipientChain The destination chain name or id
     * @param recipientAddress The associated token address where funds will be sent
     * @param fromAddress The token account pubkey, owned by fromOwner address
     * @param tokenChainId The id of the token's chain
     * @param mintAddress The token address on the destination
     * @param fromOwnerAddress If not specified, will default to the sender address
     * @param relayerFee The fee that would be paid to a relayer
     * @param payload Arbitrary bytes that can contain any addition information about a given transfer
     * @param commitment The commitment level
     * @returns The transaction for sending tokens from Solana
     */
    async transferFromSolana(senderAddress, amount, recipientChain, recipientAddress, fromAddress, // token account pubkey, owned by fromOwner address
    tokenChainId, mintAddress, // token address
    fromOwnerAddress, relayerFee, payload, commitment) {
        if (!this.connection)
            throw new Error('no connection');
        const contracts = this.contracts.mustGetContracts(SOLANA_CHAIN_NAME);
        if (!contracts.core || !contracts.token_bridge) {
            throw new Error('contracts not found');
        }
        const recipientChainId = this.context.toChainId(recipientChain);
        if (fromOwnerAddress === undefined) {
            fromOwnerAddress = senderAddress;
        }
        const nonce = (0, wormhole_sdk_1.createNonce)().readUInt32LE(0);
        const approvalIx = (0, tokenBridge_1.createApproveAuthoritySignerInstruction)(contracts.token_bridge, fromAddress, new web3_js_1.PublicKey(fromOwnerAddress), amount);
        const message = web3_js_1.Keypair.generate();
        const isSolanaNative = tokenChainId === undefined || tokenChainId === wormhole_sdk_1.CHAIN_ID_SOLANA;
        const tokenBridgeTransferIx = isSolanaNative
            ? payload
                ? (0, tokenBridge_1.createTransferNativeWithPayloadInstruction)(this.connection, contracts.token_bridge, contracts.core, senderAddress, message.publicKey, fromAddress, mintAddress, nonce, amount, recipientAddress, recipientChainId, payload)
                : (0, tokenBridge_1.createTransferNativeInstruction)(this.connection, contracts.token_bridge, contracts.core, senderAddress, message.publicKey, fromAddress, mintAddress, nonce, amount, relayerFee || BigInt(0), recipientAddress, recipientChainId)
            : payload
                ? (0, tokenBridge_1.createTransferWrappedWithPayloadInstruction)(this.connection, contracts.token_bridge, contracts.core, senderAddress, message.publicKey, fromAddress, fromOwnerAddress, tokenChainId, mintAddress, nonce, amount, recipientAddress, recipientChainId, payload)
                : (0, tokenBridge_1.createTransferWrappedInstruction)(this.connection, contracts.token_bridge, contracts.core, senderAddress, message.publicKey, fromAddress, fromOwnerAddress, tokenChainId, mintAddress, nonce, amount, relayerFee || BigInt(0), recipientAddress, recipientChainId);
        const transaction = new web3_js_1.Transaction().add(approvalIx, tokenBridgeTransferIx);
        const { blockhash } = await this.connection.getLatestBlockhash(commitment);
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = new web3_js_1.PublicKey(senderAddress);
        transaction.partialSign(message);
        return transaction;
    }
    async send(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee, commitment) {
        if (!this.connection)
            throw new Error('no connection');
        const destContext = this.context.getContext(recipientChain);
        const formattedRecipient = (0, utils_1.arrayify)(destContext.formatAddress(recipientAddress));
        const relayerFeeBN = relayerFee ? BigInt(relayerFee) : undefined;
        const amountBN = ethers_1.BigNumber.from(amount).toBigInt();
        if (token === types_1.NATIVE) {
            return await this.transferNativeSol(senderAddress, amountBN, recipientChain, formattedRecipient, relayerFeeBN, undefined, 'finalized');
        }
        else {
            const tokenContext = this.context.getContext(token.chain);
            const formattedTokenAddr = (0, utils_1.arrayify)(await tokenContext.formatAssetAddress(token.address));
            const solTokenAddr = await this.mustGetForeignAsset(token, SOLANA_CHAIN_NAME);
            const splToken = await this.connection.getTokenAccountsByOwner(new web3_js_1.PublicKey(senderAddress), { mint: new web3_js_1.PublicKey(solTokenAddr) });
            if (!splToken || !splToken.value[0])
                throw new Error('account does not have any token balance');
            return await this.transferFromSolana(senderAddress, amountBN, recipientChain, formattedRecipient, splToken.value[0].pubkey, this.context.toChainId(token.chain), formattedTokenAddr, undefined, relayerFeeBN, undefined, 'finalized');
        }
    }
    async sendWithPayload(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, payload, commitment) {
        if (!this.connection)
            throw new Error('no connection');
        const amountBN = BigInt(amount);
        const destContext = this.context.getContext(recipientChain);
        const formattedRecipient = (0, utils_1.arrayify)(destContext.formatAddress(recipientAddress));
        if (token === types_1.NATIVE) {
            return await this.transferNativeSol(senderAddress, amountBN, recipientChain, formattedRecipient, undefined, payload, 'finalized');
        }
        else {
            const tokenContext = this.context.getContext(token.chain);
            const formattedTokenAddr = (0, utils_1.arrayify)(await tokenContext.formatAssetAddress(token.address));
            const solTokenAddr = await this.mustGetForeignAsset(token, SOLANA_CHAIN_NAME);
            const splToken = await this.connection.getTokenAccountsByOwner(new web3_js_1.PublicKey(senderAddress), { mint: new web3_js_1.PublicKey(solTokenAddr) });
            if (!splToken || !splToken.value[0])
                throw new Error('account does not have any token balance');
            return await this.transferFromSolana(senderAddress, amountBN, recipientChain, formattedRecipient, splToken.value[0].pubkey, this.context.resolveDomain(token.chain), formattedTokenAddr, undefined, undefined, payload, 'finalized');
        }
    }
    async estimateSendGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress) {
        throw new Error('not implemented');
    }
    async estimateClaimGas(destChain, VAA) {
        throw new Error('not implemented');
    }
    formatAddress(address) {
        const addr = typeof address === 'string' && address.startsWith('0x')
            ? (0, utils_1.arrayify)(address)
            : address;
        return (0, utils_1.arrayify)((0, utils_1.zeroPad)(new web3_js_1.PublicKey(addr).toBytes(), 32));
    }
    async estimateSendWithRelayGas(token, amount, sendingChain, senderAddress, recipientChain, recipientAddress, relayerFee, toNativeToken) {
        throw new Error('not implemented');
    }
    parseAddress(address) {
        const addr = typeof address === 'string' && address.startsWith('0x')
            ? (0, utils_1.arrayify)(address)
            : address;
        return new web3_js_1.PublicKey(addr).toString();
    }
    async formatAssetAddress(address) {
        return this.formatAddress(address);
    }
    async parseAssetAddress(address) {
        return this.parseAddress(address);
    }
    async getForeignAsset(tokenId, chain) {
        const chainName = this.context.toChainName(chain);
        if (this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName)) {
            return this.foreignAssetCache.get(tokenId.chain, tokenId.address, chainName);
        }
        if (!this.connection)
            throw new Error('no connection');
        const chainId = this.context.toChainId(tokenId.chain);
        const toChainId = this.context.toChainId(chain);
        if (toChainId === chainId)
            return tokenId.address;
        const contracts = this.context.mustGetContracts(chain);
        if (!contracts.token_bridge)
            throw new Error('contracts not found');
        const tokenContext = this.context.getContext(tokenId.chain);
        const formattedAddr = await tokenContext.formatAssetAddress(tokenId.address);
        const addr = await (0, wormhole_sdk_1.getForeignAssetSolana)(this.connection, contracts.token_bridge, chainId, (0, utils_1.arrayify)(formattedAddr));
        if (!addr)
            return null;
        this.foreignAssetCache.set(tokenId.chain, tokenId.address, chainName, addr);
        return addr;
    }
    async mustGetForeignAsset(tokenId, chain) {
        const addr = await this.getForeignAsset(tokenId, chain);
        if (!addr)
            throw new Error('token not registered');
        return addr;
    }
    async getMessage(tx, chain, parseRelayerPayload = true) {
        if (!this.connection)
            throw new Error('no connection');
        const contracts = this.contracts.mustGetContracts(SOLANA_CHAIN_NAME);
        if (!contracts.core || !contracts.token_bridge)
            throw new Error('contracts not found');
        const response = await this.connection.getTransaction(tx);
        if (!response || !response.meta?.innerInstructions[0].instructions)
            throw new Error('transaction not found');
        const transaction = await this.connection.getParsedTransaction(tx);
        // the first instruction may be creating the associated token account
        // for an automatic transfer of the native token
        const wormholeInstructionIndex = response.meta?.innerInstructions.length - 1;
        const instructions = response.meta?.innerInstructions[wormholeInstructionIndex].instructions;
        const accounts = response.transaction.message.accountKeys;
        // find the instruction where the programId equals the Wormhole ProgramId and the emitter equals the Token Bridge
        const bridgeInstructions = instructions.filter((i) => {
            const programId = accounts[i.programIdIndex].toString();
            const emitterId = accounts[i.accounts[2]];
            const wormholeCore = contracts.core;
            const tokenBridge = (0, wormhole_1.deriveWormholeEmitterKey)(contracts.token_bridge);
            return programId === wormholeCore && emitterId.equals(tokenBridge);
        });
        const { message } = await (0, wormhole_1.getPostedMessage)(this.connection, accounts[bridgeInstructions[0].accounts[1]], 'finalized');
        const parsedInstr = transaction?.meta?.innerInstructions[0].instructions;
        const gasFee = parsedInstr
            ? parsedInstr.reduce((acc, c) => {
                if (!c.parsed || !c.parsed.info || !c.parsed.info.lamports)
                    return acc;
                return acc + c.parsed.info.lamports;
            }, 0)
            : 0;
        // parse message payload
        const transfer = (0, vaa_1.parseTokenTransferPayload)(message.payload);
        // get sequence
        const sequence = response.meta?.logMessages
            ?.filter((msg) => msg.startsWith(SOLANA_SEQ_LOG))?.[0]
            ?.replace(SOLANA_SEQ_LOG, '');
        if (!sequence) {
            throw new Error('sequence not found');
        }
        // format response
        const tokenContext = this.context.getContext(transfer.tokenChain);
        const destContext = this.context.getContext(transfer.toChain);
        const tokenAddress = await tokenContext.parseAssetAddress((0, utils_1.hexlify)(transfer.tokenAddress));
        const tokenChain = this.context.toChainName(transfer.tokenChain);
        const fromChain = this.context.toChainName(chain);
        const toChain = this.context.toChainName(transfer.toChain);
        const toAddress = destContext.parseAddress((0, utils_1.hexlify)(transfer.to));
        const parsedMessage = {
            sendTx: tx,
            sender: accounts[0].toString(),
            amount: ethers_1.BigNumber.from(transfer.amount),
            payloadID: transfer.payloadType,
            recipient: toAddress,
            toChain,
            fromChain,
            tokenAddress,
            tokenChain,
            tokenId: {
                chain: tokenChain,
                address: tokenAddress,
            },
            sequence: ethers_1.BigNumber.from(sequence),
            emitterAddress: this.context.conf.env === 'MAINNET'
                ? SOLANA_MAINNET_EMMITER_ID
                : SOLANA_TESTNET_EMITTER_ID,
            gasFee: ethers_1.BigNumber.from(gasFee),
            block: response.slot,
            payload: transfer.tokenTransferPayload.length
                ? (0, utils_1.hexlify)(transfer.tokenTransferPayload)
                : undefined,
        };
        if (parseRelayerPayload && parsedMessage.payloadID === 3) {
            const destContext = this.context.getContext(transfer.toChain);
            const parsedPayload = destContext.parseRelayerPayload(transfer.tokenTransferPayload);
            const parsedPayloadMessage = {
                ...parsedMessage,
                relayerPayloadId: parsedPayload.relayerPayloadId,
                recipient: destContext.parseAddress(parsedPayload.to),
                to: toAddress,
                relayerFee: parsedPayload.relayerFee,
                toNativeTokenAmount: parsedPayload.toNativeTokenAmount,
                payload: transfer.tokenTransferPayload.length
                    ? (0, utils_1.hexlify)(transfer.tokenTransferPayload)
                    : undefined,
            };
            return parsedPayloadMessage;
        }
        return parsedMessage;
    }
    async redeem(destChain, signedVAA, overrides, payerAddr) {
        if (!payerAddr)
            throw new Error('receiving wallet address required for redeeming on Solana');
        if (!this.connection)
            throw new Error('no connection');
        const contracts = this.contracts.mustGetContracts(SOLANA_CHAIN_NAME);
        if (!contracts.core || !contracts.token_bridge) {
            throw new Error('contracts not found for solana');
        }
        const parsed = (0, vaa_1.parseTokenTransferVaa)(signedVAA);
        const isNativeSol = parsed.tokenChain === MAINNET_1.MAINNET_CHAINS.solana &&
            new web3_js_1.PublicKey(parsed.tokenAddress).equals(spl_token_1.NATIVE_MINT);
        if (isNativeSol) {
            return await (0, wormhole_sdk_1.redeemAndUnwrapOnSolana)(this.connection, contracts.core, contracts.token_bridge, payerAddr, signedVAA);
        }
        else {
            return await (0, wormhole_sdk_1.redeemOnSolana)(this.connection, contracts.core, contracts.token_bridge, payerAddr, signedVAA);
        }
    }
    async isTransferCompleted(destChain, signedVaa) {
        if (!this.connection)
            throw new Error('no connection');
        const parsed = (0, vaa_1.parseVaa)((0, utils_1.arrayify)(signedVaa, { allowMissingPrefix: true }));
        const tokenBridge = this.contracts.mustGetBridge(destChain);
        return (0, wormhole_1.getClaim)(this.connection, tokenBridge.programId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence, 'finalized').catch((e) => false);
    }
    async fetchRedeemedSignature(emitterChainId, emitterAddress, sequence) {
        if (!this.connection)
            throw new Error('no connection');
        const tokenBridge = this.contracts.mustGetBridge(SOLANA_CHAIN_NAME);
        const claimKey = (0, wormhole_1.deriveClaimKey)(tokenBridge.programId, emitterAddress, emitterChainId, BigInt(sequence));
        const signatures = await this.connection.getSignaturesForAddress(claimKey, {
            limit: 1,
        });
        return signatures ? signatures[0].signature : null;
    }
    async getCurrentBlock() {
        if (!this.connection)
            throw new Error('no connection');
        return await this.connection.getSlot();
    }
    async sendWithRelay(token, amount, toNativeToken, sendingChain, senderAddress, recipientChain, recipientAddress, overrides) {
        if (!this.connection)
            throw new Error('no connection');
        const { core, token_bridge, relayer } = this.contracts.mustGetContracts(SOLANA_CHAIN_NAME);
        if (!core || !token_bridge || !relayer) {
            throw new Error('contracts not found');
        }
        const destContext = this.context.getContext(recipientChain);
        const formattedRecipient = (0, utils_1.arrayify)(destContext.formatAddress(recipientAddress));
        const recipientChainId = this.context.toChainId(recipientChain);
        const nonce = (0, wormhole_sdk_1.createNonce)().readUint32LE();
        const transaction = new web3_js_1.Transaction();
        let transferIx;
        if (token === types_1.NATIVE || token.chain === SOLANA_CHAIN_NAME) {
            const mint = token === types_1.NATIVE ? spl_token_1.NATIVE_MINT : token.address;
            const wrapToken = token === types_1.NATIVE;
            if (wrapToken) {
                const ata = (0, spl_token_1.getAssociatedTokenAddressSync)(spl_token_1.NATIVE_MINT, new web3_js_1.PublicKey(senderAddress));
                try {
                    await (0, spl_token_1.getAccount)(this.connection, ata);
                }
                catch (e) {
                    if (e instanceof spl_token_1.TokenAccountNotFoundError) {
                        // the relayer expects the WSOL associated token account to exist
                        const createAccountInst = (0, spl_token_1.createAssociatedTokenAccountInstruction)(new web3_js_1.PublicKey(senderAddress), new web3_js_1.PublicKey(ata), new web3_js_1.PublicKey(senderAddress), new web3_js_1.PublicKey(spl_token_1.NATIVE_MINT));
                        transaction.add(createAccountInst);
                    }
                    else {
                        throw e;
                    }
                }
            }
            transferIx = await (0, tokenBridgeRelayer_1.createTransferNativeTokensWithRelayInstruction)(this.connection, relayer, senderAddress, token_bridge, core, mint, BigInt(amount), BigInt(toNativeToken), formattedRecipient, recipientChainId, nonce, wrapToken);
        }
        else {
            const mint = await this.mustGetForeignAsset(token, sendingChain);
            transferIx = await (0, tokenBridgeRelayer_1.createTransferWrappedTokensWithRelayInstruction)(this.connection, relayer, senderAddress, token_bridge, core, mint, BigInt(amount), BigInt(toNativeToken), formattedRecipient, recipientChainId, nonce);
        }
        transaction.add(transferIx);
        const { blockhash } = await this.connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = new web3_js_1.PublicKey(senderAddress);
        return transaction;
    }
    async calculateNativeTokenAmt(destChain, tokenId, amount, walletAddress) {
        const relayer = this.contracts.mustGetTokenBridgeRelayer(destChain);
        const address = await this.mustGetForeignAsset(tokenId, destChain);
        const decimals = await this.fetchTokenDecimals(address, destChain);
        const nativeTokenAmount = await relayer.calculateNativeSwapAmountOut(new web3_js_1.PublicKey(address), ethers_1.BigNumber.from(amount).toBigInt(), decimals);
        // an non-existent account cannot be sent less than the rent exempt amount
        // in order to create the wallet, it must be sent at least the rent exemption minimum
        const acctExists = (await this.connection.getAccountInfo(new web3_js_1.PublicKey(walletAddress))) !==
            null;
        if (acctExists)
            return ethers_1.BigNumber.from(nativeTokenAmount);
        const minBalance = await this.connection.getMinimumBalanceForRentExemption(0);
        return nativeTokenAmount > minBalance
            ? ethers_1.BigNumber.from(nativeTokenAmount)
            : ethers_1.BigNumber.from(0);
    }
    async calculateMaxSwapAmount(destChain, tokenId, walletAddress) {
        const relayer = this.contracts.mustGetTokenBridgeRelayer(destChain);
        const address = await this.mustGetForeignAsset(tokenId, destChain);
        const decimals = await this.fetchTokenDecimals(address, destChain);
        const maxSwap = await relayer.calculateMaxSwapAmountIn(new web3_js_1.PublicKey(address), decimals);
        return ethers_1.BigNumber.from(maxSwap);
    }
    async getRelayerFee(sourceChain, destChain, tokenId) {
        const relayer = this.contracts.mustGetTokenBridgeRelayer(sourceChain);
        const address = await this.mustGetForeignAsset(tokenId, sourceChain);
        const decimals = await this.fetchTokenDecimals(address, sourceChain);
        const destChainId = this.context.toChainId(destChain);
        const fee = await relayer.calculateRelayerFee(destChainId, new web3_js_1.PublicKey(address), decimals);
        return ethers_1.BigNumber.from(fee);
    }
    async getWrappedNativeTokenId(chain) {
        return {
            address: spl_token_1.NATIVE_MINT.toString(),
            chain: 'solana',
        };
    }
}
exports.SolanaContext = SolanaContext;
//# sourceMappingURL=context.js.map