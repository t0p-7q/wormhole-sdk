"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeContractAccounts = exports.createUpgradeContractInstruction = exports.getRegisterChainAccounts = exports.createRegisterChainInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const program_1 = require("../program");
const wormhole_1 = require("../../wormhole");
const accounts_1 = require("../accounts");
const vaa_1 = require("../../../../../vaa");
const utils_1 = require("../../utils");
function createRegisterChainInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId, connection).methods.registerChain();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getRegisterChainAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createRegisterChainInstruction = createRegisterChainInstruction;
function getRegisterChainAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseNftBridgeRegisterChainVaa)(vaa) : vaa;
    return {
        payer: new web3_js_1.PublicKey(payer),
        config: (0, accounts_1.deriveNftBridgeConfigKey)(nftBridgeProgramId),
        endpoint: (0, accounts_1.deriveEndpointKey)(nftBridgeProgramId, parsed.foreignChain, parsed.foreignAddress),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, wormhole_1.deriveClaimKey)(nftBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
    };
}
exports.getRegisterChainAccounts = getRegisterChainAccounts;
function createUpgradeContractInstruction(connection, nftBridgeProgramId, wormholeProgramId, payer, vaa, spill) {
    const methods = (0, program_1.createReadOnlyNftBridgeProgramInterface)(nftBridgeProgramId, connection).methods.upgradeContract();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getUpgradeContractAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, spill),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createUpgradeContractInstruction = createUpgradeContractInstruction;
function getUpgradeContractAccounts(nftBridgeProgramId, wormholeProgramId, payer, vaa, spill) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseNftBridgeUpgradeContractVaa)(vaa) : vaa;
    return {
        payer: new web3_js_1.PublicKey(payer),
        vaa: (0, wormhole_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, wormhole_1.deriveClaimKey)(nftBridgeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        upgradeAuthority: (0, accounts_1.deriveUpgradeAuthorityKey)(nftBridgeProgramId),
        spill: new web3_js_1.PublicKey(spill === undefined ? payer : spill),
        implementation: new web3_js_1.PublicKey(parsed.newContract),
        programData: (0, utils_1.deriveUpgradeableProgramKey)(nftBridgeProgramId),
        nftBridgeProgram: new web3_js_1.PublicKey(nftBridgeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        clock: web3_js_1.SYSVAR_CLOCK_PUBKEY,
        bpfLoaderUpgradeable: utils_1.BpfLoaderUpgradeable.programId,
        systemProgram: web3_js_1.SystemProgram.programId,
    };
}
exports.getUpgradeContractAccounts = getUpgradeContractAccounts;
//# sourceMappingURL=governance.js.map