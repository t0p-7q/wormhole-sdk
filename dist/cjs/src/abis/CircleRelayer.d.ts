import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common';
export declare namespace CircleRelayerStructs {
    type TransferTokensWithRelayStruct = {
        payloadId: PromiseOrValue<BigNumberish>;
        targetRelayerFee: PromiseOrValue<BigNumberish>;
        toNativeTokenAmount: PromiseOrValue<BigNumberish>;
        targetRecipientWallet: PromiseOrValue<BytesLike>;
    };
    type TransferTokensWithRelayStructOutput = [
        number,
        BigNumber,
        BigNumber,
        string
    ] & {
        payloadId: number;
        targetRelayerFee: BigNumber;
        toNativeTokenAmount: BigNumber;
        targetRecipientWallet: string;
    };
}
export declare namespace ICircleIntegration {
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
}
export interface CircleRelayerInterface extends utils.Interface {
    functions: {
        'VERSION()': FunctionFragment;
        'bytes32ToAddress(bytes32)': FunctionFragment;
        'calculateMaxSwapAmountIn(address)': FunctionFragment;
        'calculateNativeSwapAmountOut(address,uint256)': FunctionFragment;
        'cancelOwnershipTransferRequest(uint16)': FunctionFragment;
        'chainId()': FunctionFragment;
        'circleIntegration()': FunctionFragment;
        'confirmOwnershipTransferRequest()': FunctionFragment;
        'decodeTransferTokensWithRelay(bytes)': FunctionFragment;
        'encodeTransferTokensWithRelay((uint8,uint256,uint256,bytes32))': FunctionFragment;
        'feeRecipient()': FunctionFragment;
        'getPaused()': FunctionFragment;
        'getRegisteredContract(uint16)': FunctionFragment;
        'maxNativeSwapAmount(address)': FunctionFragment;
        'nativeSwapRate(address)': FunctionFragment;
        'nativeSwapRatePrecision()': FunctionFragment;
        'nativeTokenDecimals()': FunctionFragment;
        'owner()': FunctionFragment;
        'ownerAssistant()': FunctionFragment;
        'pendingOwner()': FunctionFragment;
        'redeemTokens((bytes,bytes,bytes))': FunctionFragment;
        'registerContract(uint16,bytes32)': FunctionFragment;
        'relayerFee(uint16,address)': FunctionFragment;
        'setPauseForTransfers(uint16,bool)': FunctionFragment;
        'submitOwnershipTransferRequest(uint16,address)': FunctionFragment;
        'transferTokensWithRelay(address,uint256,uint256,uint16,bytes32)': FunctionFragment;
        'updateFeeRecipient(uint16,address)': FunctionFragment;
        'updateMaxNativeSwapAmount(uint16,address,uint256)': FunctionFragment;
        'updateNativeSwapRate(uint16,address,uint256)': FunctionFragment;
        'updateNativeSwapRatePrecision(uint16,uint256)': FunctionFragment;
        'updateOwnerAssistant(uint16,address)': FunctionFragment;
        'updateRelayerFee(uint16,address,uint256)': FunctionFragment;
        'wormhole()': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'VERSION' | 'bytes32ToAddress' | 'calculateMaxSwapAmountIn' | 'calculateNativeSwapAmountOut' | 'cancelOwnershipTransferRequest' | 'chainId' | 'circleIntegration' | 'confirmOwnershipTransferRequest' | 'decodeTransferTokensWithRelay' | 'encodeTransferTokensWithRelay' | 'feeRecipient' | 'getPaused' | 'getRegisteredContract' | 'maxNativeSwapAmount' | 'nativeSwapRate' | 'nativeSwapRatePrecision' | 'nativeTokenDecimals' | 'owner' | 'ownerAssistant' | 'pendingOwner' | 'redeemTokens' | 'registerContract' | 'relayerFee' | 'setPauseForTransfers' | 'submitOwnershipTransferRequest' | 'transferTokensWithRelay' | 'updateFeeRecipient' | 'updateMaxNativeSwapAmount' | 'updateNativeSwapRate' | 'updateNativeSwapRatePrecision' | 'updateOwnerAssistant' | 'updateRelayerFee' | 'wormhole'): FunctionFragment;
    encodeFunctionData(functionFragment: 'VERSION', values?: undefined): string;
    encodeFunctionData(functionFragment: 'bytes32ToAddress', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'calculateMaxSwapAmountIn', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'calculateNativeSwapAmountOut', values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'cancelOwnershipTransferRequest', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'chainId', values?: undefined): string;
    encodeFunctionData(functionFragment: 'circleIntegration', values?: undefined): string;
    encodeFunctionData(functionFragment: 'confirmOwnershipTransferRequest', values?: undefined): string;
    encodeFunctionData(functionFragment: 'decodeTransferTokensWithRelay', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'encodeTransferTokensWithRelay', values: [CircleRelayerStructs.TransferTokensWithRelayStruct]): string;
    encodeFunctionData(functionFragment: 'feeRecipient', values?: undefined): string;
    encodeFunctionData(functionFragment: 'getPaused', values?: undefined): string;
    encodeFunctionData(functionFragment: 'getRegisteredContract', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'maxNativeSwapAmount', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'nativeSwapRate', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'nativeSwapRatePrecision', values?: undefined): string;
    encodeFunctionData(functionFragment: 'nativeTokenDecimals', values?: undefined): string;
    encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'ownerAssistant', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pendingOwner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'redeemTokens', values: [ICircleIntegration.RedeemParametersStruct]): string;
    encodeFunctionData(functionFragment: 'registerContract', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'relayerFee', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'setPauseForTransfers', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: 'submitOwnershipTransferRequest', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'transferTokensWithRelay', values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: 'updateFeeRecipient', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'updateMaxNativeSwapAmount', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'updateNativeSwapRate', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'updateNativeSwapRatePrecision', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'updateOwnerAssistant', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'updateRelayerFee', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'wormhole', values?: undefined): string;
    decodeFunctionResult(functionFragment: 'VERSION', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'bytes32ToAddress', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'calculateMaxSwapAmountIn', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'calculateNativeSwapAmountOut', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'cancelOwnershipTransferRequest', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'chainId', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'circleIntegration', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'confirmOwnershipTransferRequest', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'decodeTransferTokensWithRelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'encodeTransferTokensWithRelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'feeRecipient', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getPaused', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRegisteredContract', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'maxNativeSwapAmount', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'nativeSwapRate', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'nativeSwapRatePrecision', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'nativeTokenDecimals', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'ownerAssistant', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pendingOwner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'redeemTokens', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'registerContract', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'relayerFee', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setPauseForTransfers', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'submitOwnershipTransferRequest', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferTokensWithRelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateFeeRecipient', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateMaxNativeSwapAmount', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateNativeSwapRate', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateNativeSwapRatePrecision', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateOwnerAssistant', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateRelayerFee', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'wormhole', data: BytesLike): Result;
    events: {
        'AdminChanged(address,address)': EventFragment;
        'BeaconUpgraded(address)': EventFragment;
        'FeeRecipientUpdated(address,address)': EventFragment;
        'OwnershipTransfered(address,address)': EventFragment;
        'SwapExecuted(address,address,address,uint256,uint256)': EventFragment;
        'SwapRateUpdated(address,uint256)': EventFragment;
        'Upgraded(address)': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'AdminChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'BeaconUpgraded'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'FeeRecipientUpdated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'OwnershipTransfered'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'SwapExecuted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'SwapRateUpdated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment;
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
export interface FeeRecipientUpdatedEventObject {
    oldRecipient: string;
    newRecipient: string;
}
export type FeeRecipientUpdatedEvent = TypedEvent<[
    string,
    string
], FeeRecipientUpdatedEventObject>;
export type FeeRecipientUpdatedEventFilter = TypedEventFilter<FeeRecipientUpdatedEvent>;
export interface OwnershipTransferedEventObject {
    oldOwner: string;
    newOwner: string;
}
export type OwnershipTransferedEvent = TypedEvent<[
    string,
    string
], OwnershipTransferedEventObject>;
export type OwnershipTransferedEventFilter = TypedEventFilter<OwnershipTransferedEvent>;
export interface SwapExecutedEventObject {
    recipient: string;
    relayer: string;
    token: string;
    tokenAmount: BigNumber;
    nativeAmount: BigNumber;
}
export type SwapExecutedEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber,
    BigNumber
], SwapExecutedEventObject>;
export type SwapExecutedEventFilter = TypedEventFilter<SwapExecutedEvent>;
export interface SwapRateUpdatedEventObject {
    token: string;
    swapRate: BigNumber;
}
export type SwapRateUpdatedEvent = TypedEvent<[
    string,
    BigNumber
], SwapRateUpdatedEventObject>;
export type SwapRateUpdatedEventFilter = TypedEventFilter<SwapRateUpdatedEvent>;
export interface UpgradedEventObject {
    implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
export interface CircleRelayer extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CircleRelayerInterface;
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
        VERSION(overrides?: CallOverrides): Promise<[string]>;
        bytes32ToAddress(address_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber] & {
            maxAllowed: BigNumber;
        }>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            nativeAmount: BigNumber;
        }>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        chainId(overrides?: CallOverrides): Promise<[number]>;
        circleIntegration(overrides?: CallOverrides): Promise<[string]>;
        confirmOwnershipTransferRequest(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decodeTransferTokensWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            CircleRelayerStructs.TransferTokensWithRelayStructOutput
        ] & {
            transfer: CircleRelayerStructs.TransferTokensWithRelayStructOutput;
        }>;
        encodeTransferTokensWithRelay(transfer: CircleRelayerStructs.TransferTokensWithRelayStruct, overrides?: CallOverrides): Promise<[string] & {
            encoded: string;
        }>;
        feeRecipient(overrides?: CallOverrides): Promise<[string]>;
        getPaused(overrides?: CallOverrides): Promise<[boolean] & {
            paused: boolean;
        }>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        nativeSwapRatePrecision(overrides?: CallOverrides): Promise<[BigNumber]>;
        nativeTokenDecimals(overrides?: CallOverrides): Promise<[number]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        ownerAssistant(overrides?: CallOverrides): Promise<[string]>;
        pendingOwner(overrides?: CallOverrides): Promise<[string]>;
        redeemTokens(redeemParams: ICircleIntegration.RedeemParametersStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        setPauseForTransfers(chainId_: PromiseOrValue<BigNumberish>, paused: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipientWallet: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateFeeRecipient(chainId_: PromiseOrValue<BigNumberish>, newFeeRecipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateNativeSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateNativeSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, nativeSwapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateOwnerAssistant(chainId_: PromiseOrValue<BigNumberish>, newAssistant: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        wormhole(overrides?: CallOverrides): Promise<[string]>;
    };
    VERSION(overrides?: CallOverrides): Promise<string>;
    bytes32ToAddress(address_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    chainId(overrides?: CallOverrides): Promise<number>;
    circleIntegration(overrides?: CallOverrides): Promise<string>;
    confirmOwnershipTransferRequest(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decodeTransferTokensWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<CircleRelayerStructs.TransferTokensWithRelayStructOutput>;
    encodeTransferTokensWithRelay(transfer: CircleRelayerStructs.TransferTokensWithRelayStruct, overrides?: CallOverrides): Promise<string>;
    feeRecipient(overrides?: CallOverrides): Promise<string>;
    getPaused(overrides?: CallOverrides): Promise<boolean>;
    getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    nativeSwapRatePrecision(overrides?: CallOverrides): Promise<BigNumber>;
    nativeTokenDecimals(overrides?: CallOverrides): Promise<number>;
    owner(overrides?: CallOverrides): Promise<string>;
    ownerAssistant(overrides?: CallOverrides): Promise<string>;
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    redeemTokens(redeemParams: ICircleIntegration.RedeemParametersStruct, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    relayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    setPauseForTransfers(chainId_: PromiseOrValue<BigNumberish>, paused: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipientWallet: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateFeeRecipient(chainId_: PromiseOrValue<BigNumberish>, newFeeRecipient: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateNativeSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateNativeSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, nativeSwapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateOwnerAssistant(chainId_: PromiseOrValue<BigNumberish>, newAssistant: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    wormhole(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        VERSION(overrides?: CallOverrides): Promise<string>;
        bytes32ToAddress(address_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        chainId(overrides?: CallOverrides): Promise<number>;
        circleIntegration(overrides?: CallOverrides): Promise<string>;
        confirmOwnershipTransferRequest(overrides?: CallOverrides): Promise<void>;
        decodeTransferTokensWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<CircleRelayerStructs.TransferTokensWithRelayStructOutput>;
        encodeTransferTokensWithRelay(transfer: CircleRelayerStructs.TransferTokensWithRelayStruct, overrides?: CallOverrides): Promise<string>;
        feeRecipient(overrides?: CallOverrides): Promise<string>;
        getPaused(overrides?: CallOverrides): Promise<boolean>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nativeSwapRatePrecision(overrides?: CallOverrides): Promise<BigNumber>;
        nativeTokenDecimals(overrides?: CallOverrides): Promise<number>;
        owner(overrides?: CallOverrides): Promise<string>;
        ownerAssistant(overrides?: CallOverrides): Promise<string>;
        pendingOwner(overrides?: CallOverrides): Promise<string>;
        redeemTokens(redeemParams: ICircleIntegration.RedeemParametersStruct, overrides?: CallOverrides): Promise<void>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        setPauseForTransfers(chainId_: PromiseOrValue<BigNumberish>, paused: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipientWallet: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        updateFeeRecipient(chainId_: PromiseOrValue<BigNumberish>, newFeeRecipient: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateNativeSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateNativeSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, nativeSwapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateOwnerAssistant(chainId_: PromiseOrValue<BigNumberish>, newAssistant: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        wormhole(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        'AdminChanged(address,address)'(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter;
        'BeaconUpgraded(address)'(beacon?: PromiseOrValue<string> | null): BeaconUpgradedEventFilter;
        BeaconUpgraded(beacon?: PromiseOrValue<string> | null): BeaconUpgradedEventFilter;
        'FeeRecipientUpdated(address,address)'(oldRecipient?: PromiseOrValue<string> | null, newRecipient?: PromiseOrValue<string> | null): FeeRecipientUpdatedEventFilter;
        FeeRecipientUpdated(oldRecipient?: PromiseOrValue<string> | null, newRecipient?: PromiseOrValue<string> | null): FeeRecipientUpdatedEventFilter;
        'OwnershipTransfered(address,address)'(oldOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferedEventFilter;
        OwnershipTransfered(oldOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferedEventFilter;
        'SwapExecuted(address,address,address,uint256,uint256)'(recipient?: PromiseOrValue<string> | null, relayer?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, tokenAmount?: null, nativeAmount?: null): SwapExecutedEventFilter;
        SwapExecuted(recipient?: PromiseOrValue<string> | null, relayer?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, tokenAmount?: null, nativeAmount?: null): SwapExecutedEventFilter;
        'SwapRateUpdated(address,uint256)'(token?: PromiseOrValue<string> | null, swapRate?: PromiseOrValue<BigNumberish> | null): SwapRateUpdatedEventFilter;
        SwapRateUpdated(token?: PromiseOrValue<string> | null, swapRate?: PromiseOrValue<BigNumberish> | null): SwapRateUpdatedEventFilter;
        'Upgraded(address)'(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
        Upgraded(implementation?: PromiseOrValue<string> | null): UpgradedEventFilter;
    };
    estimateGas: {
        VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        bytes32ToAddress(address_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        chainId(overrides?: CallOverrides): Promise<BigNumber>;
        circleIntegration(overrides?: CallOverrides): Promise<BigNumber>;
        confirmOwnershipTransferRequest(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decodeTransferTokensWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        encodeTransferTokensWithRelay(transfer: CircleRelayerStructs.TransferTokensWithRelayStruct, overrides?: CallOverrides): Promise<BigNumber>;
        feeRecipient(overrides?: CallOverrides): Promise<BigNumber>;
        getPaused(overrides?: CallOverrides): Promise<BigNumber>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nativeSwapRatePrecision(overrides?: CallOverrides): Promise<BigNumber>;
        nativeTokenDecimals(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        ownerAssistant(overrides?: CallOverrides): Promise<BigNumber>;
        pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
        redeemTokens(redeemParams: ICircleIntegration.RedeemParametersStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        setPauseForTransfers(chainId_: PromiseOrValue<BigNumberish>, paused: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipientWallet: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateFeeRecipient(chainId_: PromiseOrValue<BigNumberish>, newFeeRecipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateNativeSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateNativeSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, nativeSwapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateOwnerAssistant(chainId_: PromiseOrValue<BigNumberish>, newAssistant: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        wormhole(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        bytes32ToAddress(address_: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        circleIntegration(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        confirmOwnershipTransferRequest(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decodeTransferTokensWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        encodeTransferTokensWithRelay(transfer: CircleRelayerStructs.TransferTokensWithRelayStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        feeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nativeSwapRatePrecision(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nativeTokenDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerAssistant(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeemTokens(redeemParams: ICircleIntegration.RedeemParametersStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setPauseForTransfers(chainId_: PromiseOrValue<BigNumberish>, paused: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipientWallet: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateFeeRecipient(chainId_: PromiseOrValue<BigNumberish>, newFeeRecipient: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateNativeSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateNativeSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, nativeSwapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateOwnerAssistant(chainId_: PromiseOrValue<BigNumberish>, newAssistant: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        wormhole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=CircleRelayer.d.ts.map