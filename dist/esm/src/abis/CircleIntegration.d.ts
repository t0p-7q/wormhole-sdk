import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common';
export declare namespace CircleIntegrationStructs {
    type DepositWithPayloadStruct = {
        token: PromiseOrValue<BytesLike>;
        amount: PromiseOrValue<BigNumberish>;
        sourceDomain: PromiseOrValue<BigNumberish>;
        targetDomain: PromiseOrValue<BigNumberish>;
        nonce: PromiseOrValue<BigNumberish>;
        fromAddress: PromiseOrValue<BytesLike>;
        mintRecipient: PromiseOrValue<BytesLike>;
        payload: PromiseOrValue<BytesLike>;
    };
    type DepositWithPayloadStructOutput = [
        string,
        BigNumber,
        number,
        number,
        BigNumber,
        string,
        string,
        string
    ] & {
        token: string;
        amount: BigNumber;
        sourceDomain: number;
        targetDomain: number;
        nonce: BigNumber;
        fromAddress: string;
        mintRecipient: string;
        payload: string;
    };
    type RedeemParametersStruct = {
        encodedWormholeMessage: PromiseOrValue<BytesLike>;
        circleBridgeMessage: PromiseOrValue<BytesLike>;
        circleAttestation: PromiseOrValue<BytesLike>;
    };
    type RedeemParametersStructOutput = [string, string, string] & {
        encodedWormholeMessage: string;
        circleBridgeMessage: string;
        circleAttestation: string;
    };
    type TransferParametersStruct = {
        token: PromiseOrValue<string>;
        amount: PromiseOrValue<BigNumberish>;
        targetChain: PromiseOrValue<BigNumberish>;
        mintRecipient: PromiseOrValue<BytesLike>;
    };
    type TransferParametersStructOutput = [
        string,
        BigNumber,
        number,
        string
    ] & {
        token: string;
        amount: BigNumber;
        targetChain: number;
        mintRecipient: string;
    };
}
export interface CircleIntegrationInterface extends utils.Interface {
    functions: {
        'addressToBytes32(address)': FunctionFragment;
        'chainId()': FunctionFragment;
        'circleBridge()': FunctionFragment;
        'circleTokenMinter()': FunctionFragment;
        'circleTransmitter()': FunctionFragment;
        'decodeDepositWithPayload(bytes)': FunctionFragment;
        'encodeDepositWithPayload((bytes32,uint256,uint32,uint32,uint64,bytes32,bytes32,bytes))': FunctionFragment;
        'evmChain()': FunctionFragment;
        'fetchLocalTokenAddress(uint32,bytes32)': FunctionFragment;
        'getChainIdFromDomain(uint32)': FunctionFragment;
        'getDomainFromChainId(uint16)': FunctionFragment;
        'getRegisteredEmitter(uint16)': FunctionFragment;
        'governanceChainId()': FunctionFragment;
        'governanceContract()': FunctionFragment;
        'isAcceptedToken(address)': FunctionFragment;
        'isInitialized(address)': FunctionFragment;
        'isMessageConsumed(bytes32)': FunctionFragment;
        'localDomain()': FunctionFragment;
        'redeemTokensWithPayload((bytes,bytes,bytes))': FunctionFragment;
        'registerEmitterAndDomain(bytes)': FunctionFragment;
        'transferTokensWithPayload((address,uint256,uint16,bytes32),uint32,bytes)': FunctionFragment;
        'updateWormholeFinality(bytes)': FunctionFragment;
        'upgradeContract(bytes)': FunctionFragment;
        'verifyGovernanceMessage(bytes,uint8)': FunctionFragment;
        'wormhole()': FunctionFragment;
        'wormholeFinality()': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'addressToBytes32' | 'chainId' | 'circleBridge' | 'circleTokenMinter' | 'circleTransmitter' | 'decodeDepositWithPayload' | 'encodeDepositWithPayload' | 'evmChain' | 'fetchLocalTokenAddress' | 'getChainIdFromDomain' | 'getDomainFromChainId' | 'getRegisteredEmitter' | 'governanceChainId' | 'governanceContract' | 'isAcceptedToken' | 'isInitialized' | 'isMessageConsumed' | 'localDomain' | 'redeemTokensWithPayload' | 'registerEmitterAndDomain' | 'transferTokensWithPayload' | 'updateWormholeFinality' | 'upgradeContract' | 'verifyGovernanceMessage' | 'wormhole' | 'wormholeFinality'): FunctionFragment;
    encodeFunctionData(functionFragment: 'addressToBytes32', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'chainId', values?: undefined): string;
    encodeFunctionData(functionFragment: 'circleBridge', values?: undefined): string;
    encodeFunctionData(functionFragment: 'circleTokenMinter', values?: undefined): string;
    encodeFunctionData(functionFragment: 'circleTransmitter', values?: undefined): string;
    encodeFunctionData(functionFragment: 'decodeDepositWithPayload', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'encodeDepositWithPayload', values: [CircleIntegrationStructs.DepositWithPayloadStruct]): string;
    encodeFunctionData(functionFragment: 'evmChain', values?: undefined): string;
    encodeFunctionData(functionFragment: 'fetchLocalTokenAddress', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'getChainIdFromDomain', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'getDomainFromChainId', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'getRegisteredEmitter', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'governanceChainId', values?: undefined): string;
    encodeFunctionData(functionFragment: 'governanceContract', values?: undefined): string;
    encodeFunctionData(functionFragment: 'isAcceptedToken', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'isInitialized', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'isMessageConsumed', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'localDomain', values?: undefined): string;
    encodeFunctionData(functionFragment: 'redeemTokensWithPayload', values: [CircleIntegrationStructs.RedeemParametersStruct]): string;
    encodeFunctionData(functionFragment: 'registerEmitterAndDomain', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'transferTokensWithPayload', values: [
        CircleIntegrationStructs.TransferParametersStruct,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: 'updateWormholeFinality', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'upgradeContract', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'verifyGovernanceMessage', values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'wormhole', values?: undefined): string;
    encodeFunctionData(functionFragment: 'wormholeFinality', values?: undefined): string;
    decodeFunctionResult(functionFragment: 'addressToBytes32', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'chainId', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'circleBridge', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'circleTokenMinter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'circleTransmitter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'decodeDepositWithPayload', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'encodeDepositWithPayload', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'evmChain', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'fetchLocalTokenAddress', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getChainIdFromDomain', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getDomainFromChainId', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRegisteredEmitter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'governanceChainId', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'governanceContract', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isAcceptedToken', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isInitialized', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isMessageConsumed', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'localDomain', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'redeemTokensWithPayload', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'registerEmitterAndDomain', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferTokensWithPayload', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateWormholeFinality', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'upgradeContract', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'verifyGovernanceMessage', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'wormhole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'wormholeFinality', data: BytesLike): Result;
    events: {
        'AdminChanged(address,address)': EventFragment;
        'BeaconUpgraded(address)': EventFragment;
        'ContractUpgraded(address,address)': EventFragment;
        'Redeemed(uint16,bytes32,uint64)': EventFragment;
        'Upgraded(address)': EventFragment;
        'WormholeFinalityUpdated(uint8,uint8)': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'AdminChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'BeaconUpgraded'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'ContractUpgraded'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Redeemed'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'WormholeFinalityUpdated'): EventFragment;
}
export interface AdminChangedEventObject {
    previousAdmin: string;
    newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<[
    string,
    string
], AdminChangedEventObject>;
export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;
export interface BeaconUpgradedEventObject {
    beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<[
    string
], BeaconUpgradedEventObject>;
export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;
export interface ContractUpgradedEventObject {
    oldContract: string;
    newContract: string;
}
export type ContractUpgradedEvent = TypedEvent<[
    string,
    string
], ContractUpgradedEventObject>;
export type ContractUpgradedEventFilter = TypedEventFilter<ContractUpgradedEvent>;
export interface RedeemedEventObject {
    emitterChainId: number;
    emitterAddress: string;
    sequence: BigNumber;
}
export type RedeemedEvent = TypedEvent<[
    number,
    string,
    BigNumber
], RedeemedEventObject>;
export type RedeemedEventFilter = TypedEventFilter<RedeemedEvent>;
export interface UpgradedEventObject {
    implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface WormholeFinalityUpdatedEventObject {
    oldFinality: number;
    newFinality: number;
}
export type WormholeFinalityUpdatedEvent = TypedEvent<[
    number,
    number
], WormholeFinalityUpdatedEventObject>;
export type WormholeFinalityUpdatedEventFilter = TypedEventFilter<WormholeFinalityUpdatedEvent>;
export interface CircleIntegration extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CircleIntegrationInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        addressToBytes32(address_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        chainId(overrides?: CallOverrides): Promise<[number]>;
        circleBridge(overrides?: CallOverrides): Promise<[string]>;
        circleTokenMinter(overrides?: CallOverrides): Promise<[string]>;
        circleTransmitter(overrides?: CallOverrides): Promise<[string]>;
        decodeDepositWithPayload(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            CircleIntegrationStructs.DepositWithPayloadStructOutput
        ] & {
            message: CircleIntegrationStructs.DepositWithPayloadStructOutput;
        }>;
        encodeDepositWithPayload(message: CircleIntegrationStructs.DepositWithPayloadStruct, overrides?: CallOverrides): Promise<[string]>;
        evmChain(overrides?: CallOverrides): Promise<[BigNumber]>;
        fetchLocalTokenAddress(sourceDomain: PromiseOrValue<BigNumberish>, sourceToken: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        getChainIdFromDomain(domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number]>;
        getDomainFromChainId(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number]>;
        getRegisteredEmitter(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        governanceChainId(overrides?: CallOverrides): Promise<[number]>;
        governanceContract(overrides?: CallOverrides): Promise<[string]>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isInitialized(impl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isMessageConsumed(hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        localDomain(overrides?: CallOverrides): Promise<[number]>;
        redeemTokensWithPayload(params: CircleIntegrationStructs.RedeemParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerEmitterAndDomain(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferTokensWithPayload(transferParams: CircleIntegrationStructs.TransferParametersStruct, batchId: PromiseOrValue<BigNumberish>, payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateWormholeFinality(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        upgradeContract(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        verifyGovernanceMessage(encodedMessage: PromiseOrValue<BytesLike>, action: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            messageHash: string;
            payload: string;
        }>;
        wormhole(overrides?: CallOverrides): Promise<[string]>;
        wormholeFinality(overrides?: CallOverrides): Promise<[number]>;
    };
    addressToBytes32(address_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    chainId(overrides?: CallOverrides): Promise<number>;
    circleBridge(overrides?: CallOverrides): Promise<string>;
    circleTokenMinter(overrides?: CallOverrides): Promise<string>;
    circleTransmitter(overrides?: CallOverrides): Promise<string>;
    decodeDepositWithPayload(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<CircleIntegrationStructs.DepositWithPayloadStructOutput>;
    encodeDepositWithPayload(message: CircleIntegrationStructs.DepositWithPayloadStruct, overrides?: CallOverrides): Promise<string>;
    evmChain(overrides?: CallOverrides): Promise<BigNumber>;
    fetchLocalTokenAddress(sourceDomain: PromiseOrValue<BigNumberish>, sourceToken: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    getChainIdFromDomain(domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
    getDomainFromChainId(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
    getRegisteredEmitter(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    governanceChainId(overrides?: CallOverrides): Promise<number>;
    governanceContract(overrides?: CallOverrides): Promise<string>;
    isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isInitialized(impl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isMessageConsumed(hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    localDomain(overrides?: CallOverrides): Promise<number>;
    redeemTokensWithPayload(params: CircleIntegrationStructs.RedeemParametersStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerEmitterAndDomain(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferTokensWithPayload(transferParams: CircleIntegrationStructs.TransferParametersStruct, batchId: PromiseOrValue<BigNumberish>, payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateWormholeFinality(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    upgradeContract(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    verifyGovernanceMessage(encodedMessage: PromiseOrValue<BytesLike>, action: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
        messageHash: string;
        payload: string;
    }>;
    wormhole(overrides?: CallOverrides): Promise<string>;
    wormholeFinality(overrides?: CallOverrides): Promise<number>;
    callStatic: {
        addressToBytes32(address_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        chainId(overrides?: CallOverrides): Promise<number>;
        circleBridge(overrides?: CallOverrides): Promise<string>;
        circleTokenMinter(overrides?: CallOverrides): Promise<string>;
        circleTransmitter(overrides?: CallOverrides): Promise<string>;
        decodeDepositWithPayload(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<CircleIntegrationStructs.DepositWithPayloadStructOutput>;
        encodeDepositWithPayload(message: CircleIntegrationStructs.DepositWithPayloadStruct, overrides?: CallOverrides): Promise<string>;
        evmChain(overrides?: CallOverrides): Promise<BigNumber>;
        fetchLocalTokenAddress(sourceDomain: PromiseOrValue<BigNumberish>, sourceToken: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        getChainIdFromDomain(domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        getDomainFromChainId(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        getRegisteredEmitter(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        governanceChainId(overrides?: CallOverrides): Promise<number>;
        governanceContract(overrides?: CallOverrides): Promise<string>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isInitialized(impl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isMessageConsumed(hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        localDomain(overrides?: CallOverrides): Promise<number>;
        redeemTokensWithPayload(params: CircleIntegrationStructs.RedeemParametersStruct, overrides?: CallOverrides): Promise<CircleIntegrationStructs.DepositWithPayloadStructOutput>;
        registerEmitterAndDomain(encodedMessage: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        transferTokensWithPayload(transferParams: CircleIntegrationStructs.TransferParametersStruct, batchId: PromiseOrValue<BigNumberish>, payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        updateWormholeFinality(encodedMessage: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        upgradeContract(encodedMessage: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        verifyGovernanceMessage(encodedMessage: PromiseOrValue<BytesLike>, action: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string, string] & {
            messageHash: string;
            payload: string;
        }>;
        wormhole(overrides?: CallOverrides): Promise<string>;
        wormholeFinality(overrides?: CallOverrides): Promise<number>;
    };
    filters: {
        'AdminChanged(address,address)'(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        'BeaconUpgraded(address)'(beacon?: PromiseOrValue<string> | null): BeaconUpgradedEventFilter;
        BeaconUpgraded(beacon?: PromiseOrValue<string> | null): BeaconUpgradedEventFilter;
        'ContractUpgraded(address,address)'(oldContract?: PromiseOrValue<string> | null, newContract?: PromiseOrValue<string> | null): ContractUpgradedEventFilter;
        ContractUpgraded(oldContract?: PromiseOrValue<string> | null, newContract?: PromiseOrValue<string> | null): ContractUpgradedEventFilter;
        'Redeemed(uint16,bytes32,uint64)'(emitterChainId?: PromiseOrValue<BigNumberish> | null, emitterAddress?: PromiseOrValue<BytesLike> | null, sequence?: PromiseOrValue<BigNumberish> | null): RedeemedEventFilter;
        Redeemed(emitterChainId?: PromiseOrValue<BigNumberish> | null, emitterAddress?: PromiseOrValue<BytesLike> | null, sequence?: PromiseOrValue<BigNumberish> | null): RedeemedEventFilter;
        'Upgraded(address)'(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        'WormholeFinalityUpdated(uint8,uint8)'(oldFinality?: PromiseOrValue<BigNumberish> | null, newFinality?: PromiseOrValue<BigNumberish> | null): WormholeFinalityUpdatedEventFilter;
        WormholeFinalityUpdated(oldFinality?: PromiseOrValue<BigNumberish> | null, newFinality?: PromiseOrValue<BigNumberish> | null): WormholeFinalityUpdatedEventFilter;
    };
    estimateGas: {
        addressToBytes32(address_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        chainId(overrides?: CallOverrides): Promise<BigNumber>;
        circleBridge(overrides?: CallOverrides): Promise<BigNumber>;
        circleTokenMinter(overrides?: CallOverrides): Promise<BigNumber>;
        circleTransmitter(overrides?: CallOverrides): Promise<BigNumber>;
        decodeDepositWithPayload(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        encodeDepositWithPayload(message: CircleIntegrationStructs.DepositWithPayloadStruct, overrides?: CallOverrides): Promise<BigNumber>;
        evmChain(overrides?: CallOverrides): Promise<BigNumber>;
        fetchLocalTokenAddress(sourceDomain: PromiseOrValue<BigNumberish>, sourceToken: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        getChainIdFromDomain(domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getDomainFromChainId(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getRegisteredEmitter(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        governanceChainId(overrides?: CallOverrides): Promise<BigNumber>;
        governanceContract(overrides?: CallOverrides): Promise<BigNumber>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isInitialized(impl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isMessageConsumed(hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        localDomain(overrides?: CallOverrides): Promise<BigNumber>;
        redeemTokensWithPayload(params: CircleIntegrationStructs.RedeemParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerEmitterAndDomain(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferTokensWithPayload(transferParams: CircleIntegrationStructs.TransferParametersStruct, batchId: PromiseOrValue<BigNumberish>, payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateWormholeFinality(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        upgradeContract(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        verifyGovernanceMessage(encodedMessage: PromiseOrValue<BytesLike>, action: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        wormhole(overrides?: CallOverrides): Promise<BigNumber>;
        wormholeFinality(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        addressToBytes32(address_: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        circleBridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        circleTokenMinter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        circleTransmitter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decodeDepositWithPayload(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        encodeDepositWithPayload(message: CircleIntegrationStructs.DepositWithPayloadStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        evmChain(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        fetchLocalTokenAddress(sourceDomain: PromiseOrValue<BigNumberish>, sourceToken: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getChainIdFromDomain(domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDomainFromChainId(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRegisteredEmitter(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        governanceChainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        governanceContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isInitialized(impl: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isMessageConsumed(hash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        localDomain(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeemTokensWithPayload(params: CircleIntegrationStructs.RedeemParametersStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerEmitterAndDomain(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferTokensWithPayload(transferParams: CircleIntegrationStructs.TransferParametersStruct, batchId: PromiseOrValue<BigNumberish>, payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateWormholeFinality(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        upgradeContract(encodedMessage: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        verifyGovernanceMessage(encodedMessage: PromiseOrValue<BytesLike>, action: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        wormhole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        wormholeFinality(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=CircleIntegration.d.ts.map