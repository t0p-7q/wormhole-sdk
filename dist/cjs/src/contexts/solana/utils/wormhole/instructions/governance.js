"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeContractAccounts = exports.createUpgradeContractInstruction = exports.getUpgradeGuardianSetAccounts = exports.createUpgradeGuardianSetInstruction = exports.getTransferFeesAccounts = exports.createTransferFeesInstruction = exports.getSetFeesAccounts = exports.createSetFeesInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const vaa_1 = require("../../../../../vaa");
const program_1 = require("../program");
const accounts_1 = require("../accounts");
const utils_1 = require("../../utils");
function createSetFeesInstruction(connection, wormholeProgramId, payer, vaa) {
    const methods = (0, program_1.createReadOnlyWormholeProgramInterface)(wormholeProgramId, connection).methods.setFees();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getSetFeesAccounts(wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createSetFeesInstruction = createSetFeesInstruction;
function getSetFeesAccounts(wormholeProgramId, payer, vaa) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseGovernanceVaa)(vaa) : vaa;
    return {
        payer: new web3_js_1.PublicKey(payer),
        bridge: (0, accounts_1.deriveWormholeBridgeDataKey)(wormholeProgramId),
        vaa: (0, accounts_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, accounts_1.deriveClaimKey)(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        systemProgram: web3_js_1.SystemProgram.programId,
    };
}
exports.getSetFeesAccounts = getSetFeesAccounts;
function createTransferFeesInstruction(connection, wormholeProgramId, payer, recipient, vaa) {
    const methods = (0, program_1.createReadOnlyWormholeProgramInterface)(wormholeProgramId, connection).methods.transferFees();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getTransferFeesAccounts(wormholeProgramId, payer, recipient, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createTransferFeesInstruction = createTransferFeesInstruction;
function getTransferFeesAccounts(wormholeProgramId, payer, recipient, vaa) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseGovernanceVaa)(vaa) : vaa;
    return {
        payer: new web3_js_1.PublicKey(payer),
        bridge: (0, accounts_1.deriveWormholeBridgeDataKey)(wormholeProgramId),
        vaa: (0, accounts_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, accounts_1.deriveClaimKey)(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        feeCollector: (0, accounts_1.deriveFeeCollectorKey)(wormholeProgramId),
        recipient: new web3_js_1.PublicKey(recipient),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        systemProgram: web3_js_1.SystemProgram.programId,
    };
}
exports.getTransferFeesAccounts = getTransferFeesAccounts;
function createUpgradeGuardianSetInstruction(connection, wormholeProgramId, payer, vaa) {
    const methods = (0, program_1.createReadOnlyWormholeProgramInterface)(wormholeProgramId, connection).methods.upgradeGuardianSet();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getUpgradeGuardianSetAccounts(wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createUpgradeGuardianSetInstruction = createUpgradeGuardianSetInstruction;
function getUpgradeGuardianSetAccounts(wormholeProgramId, payer, vaa) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseGovernanceVaa)(vaa) : vaa;
    return {
        payer: new web3_js_1.PublicKey(payer),
        bridge: (0, accounts_1.deriveWormholeBridgeDataKey)(wormholeProgramId),
        vaa: (0, accounts_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, accounts_1.deriveClaimKey)(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        guardianSetOld: (0, accounts_1.deriveGuardianSetKey)(wormholeProgramId, parsed.guardianSetIndex),
        guardianSetNew: (0, accounts_1.deriveGuardianSetKey)(wormholeProgramId, parsed.guardianSetIndex + 1),
        systemProgram: web3_js_1.SystemProgram.programId,
    };
}
exports.getUpgradeGuardianSetAccounts = getUpgradeGuardianSetAccounts;
function createUpgradeContractInstruction(connection, wormholeProgramId, payer, vaa) {
    const methods = (0, program_1.createReadOnlyWormholeProgramInterface)(wormholeProgramId, connection).methods.upgradeContract();
    // @ts-ignore
    return methods._ixFn(...methods._args, {
        accounts: getUpgradeContractAccounts(wormholeProgramId, payer, vaa),
        signers: undefined,
        remainingAccounts: undefined,
        preInstructions: undefined,
        postInstructions: undefined,
    });
}
exports.createUpgradeContractInstruction = createUpgradeContractInstruction;
function getUpgradeContractAccounts(wormholeProgramId, payer, vaa, spill) {
    const parsed = (0, vaa_1.isBytes)(vaa) ? (0, vaa_1.parseGovernanceVaa)(vaa) : vaa;
    const implementation = parsed.orderPayload;
    if (implementation.length != 32) {
        throw new Error('implementation.length != 32');
    }
    return {
        payer: new web3_js_1.PublicKey(payer),
        bridge: (0, accounts_1.deriveWormholeBridgeDataKey)(wormholeProgramId),
        vaa: (0, accounts_1.derivePostedVaaKey)(wormholeProgramId, parsed.hash),
        claim: (0, accounts_1.deriveClaimKey)(wormholeProgramId, parsed.emitterAddress, parsed.emitterChain, parsed.sequence),
        upgradeAuthority: (0, accounts_1.deriveUpgradeAuthorityKey)(wormholeProgramId),
        spill: new web3_js_1.PublicKey(spill === undefined ? payer : spill),
        implementation: new web3_js_1.PublicKey(implementation),
        programData: (0, utils_1.deriveUpgradeableProgramKey)(wormholeProgramId),
        wormholeProgram: new web3_js_1.PublicKey(wormholeProgramId),
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        clock: web3_js_1.SYSVAR_CLOCK_PUBKEY,
        bpfLoaderUpgradeable: utils_1.BpfLoaderUpgradeable.programId,
        systemProgram: web3_js_1.SystemProgram.programId,
    };
}
exports.getUpgradeContractAccounts = getUpgradeContractAccounts;
//# sourceMappingURL=governance.js.map