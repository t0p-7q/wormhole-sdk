import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common';
export declare namespace TokenBridgeRelayerStructs {
    type TransferWithRelayStruct = {
        payloadId: PromiseOrValue<BigNumberish>;
        targetRelayerFee: PromiseOrValue<BigNumberish>;
        toNativeTokenAmount: PromiseOrValue<BigNumberish>;
        targetRecipient: PromiseOrValue<BytesLike>;
    };
    type TransferWithRelayStructOutput = [
        number,
        BigNumber,
        BigNumber,
        string
    ] & {
        payloadId: number;
        targetRelayerFee: BigNumber;
        toNativeTokenAmount: BigNumber;
        targetRecipient: string;
    };
}
export interface TokenBridgeRelayerInterface extends utils.Interface {
    functions: {
        'WETH()': FunctionFragment;
        'calculateMaxSwapAmountIn(address)': FunctionFragment;
        'calculateNativeSwapAmountOut(address,uint256)': FunctionFragment;
        'calculateRelayerFee(uint16,address,uint8)': FunctionFragment;
        'cancelOwnershipTransferRequest(uint16)': FunctionFragment;
        'chainId()': FunctionFragment;
        'completeTransferWithRelay(bytes)': FunctionFragment;
        'confirmOwnershipTransferRequest()': FunctionFragment;
        'decodeTransferWithRelay(bytes)': FunctionFragment;
        'denormalizeAmount(uint256,uint8)': FunctionFragment;
        'deregisterToken(uint16,address)': FunctionFragment;
        'encodeTransferWithRelay((uint8,uint256,uint256,bytes32))': FunctionFragment;
        'fetchLocalAddressFromTransferMessage(bytes)': FunctionFragment;
        'getAcceptedTokensList()': FunctionFragment;
        'getRegisteredContract(uint16)': FunctionFragment;
        'isAcceptedToken(address)': FunctionFragment;
        'maxNativeSwapAmount(address)': FunctionFragment;
        'nativeSwapRate(address)': FunctionFragment;
        'normalizeAmount(uint256,uint8)': FunctionFragment;
        'owner()': FunctionFragment;
        'pendingOwner()': FunctionFragment;
        'registerContract(uint16,bytes32)': FunctionFragment;
        'registerToken(uint16,address)': FunctionFragment;
        'relayerFee(uint16)': FunctionFragment;
        'relayerFeePrecision()': FunctionFragment;
        'submitOwnershipTransferRequest(uint16,address)': FunctionFragment;
        'swapRate(address)': FunctionFragment;
        'swapRatePrecision()': FunctionFragment;
        'tokenBridge()': FunctionFragment;
        'transferTokensWithRelay(address,uint256,uint256,uint16,bytes32,uint32)': FunctionFragment;
        'unwrapWeth()': FunctionFragment;
        'updateMaxNativeSwapAmount(uint16,address,uint256)': FunctionFragment;
        'updateRelayerFee(uint16,uint256)': FunctionFragment;
        'updateRelayerFeePrecision(uint16,uint256)': FunctionFragment;
        'updateSwapRate(uint16,address,uint256)': FunctionFragment;
        'updateSwapRatePrecision(uint16,uint256)': FunctionFragment;
        'updateUnwrapWethFlag(uint16,bool)': FunctionFragment;
        'wormhole()': FunctionFragment;
        'wrapAndTransferEthWithRelay(uint256,uint16,bytes32,uint32)': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'WETH' | 'calculateMaxSwapAmountIn' | 'calculateNativeSwapAmountOut' | 'calculateRelayerFee' | 'cancelOwnershipTransferRequest' | 'chainId' | 'completeTransferWithRelay' | 'confirmOwnershipTransferRequest' | 'decodeTransferWithRelay' | 'denormalizeAmount' | 'deregisterToken' | 'encodeTransferWithRelay' | 'fetchLocalAddressFromTransferMessage' | 'getAcceptedTokensList' | 'getRegisteredContract' | 'isAcceptedToken' | 'maxNativeSwapAmount' | 'nativeSwapRate' | 'normalizeAmount' | 'owner' | 'pendingOwner' | 'registerContract' | 'registerToken' | 'relayerFee' | 'relayerFeePrecision' | 'submitOwnershipTransferRequest' | 'swapRate' | 'swapRatePrecision' | 'tokenBridge' | 'transferTokensWithRelay' | 'unwrapWeth' | 'updateMaxNativeSwapAmount' | 'updateRelayerFee' | 'updateRelayerFeePrecision' | 'updateSwapRate' | 'updateSwapRatePrecision' | 'updateUnwrapWethFlag' | 'wormhole' | 'wrapAndTransferEthWithRelay'): FunctionFragment;
    encodeFunctionData(functionFragment: 'WETH', values?: undefined): string;
    encodeFunctionData(functionFragment: 'calculateMaxSwapAmountIn', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'calculateNativeSwapAmountOut', values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'calculateRelayerFee', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'cancelOwnershipTransferRequest', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'chainId', values?: undefined): string;
    encodeFunctionData(functionFragment: 'completeTransferWithRelay', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'confirmOwnershipTransferRequest', values?: undefined): string;
    encodeFunctionData(functionFragment: 'decodeTransferWithRelay', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'denormalizeAmount', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'deregisterToken', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'encodeTransferWithRelay', values: [TokenBridgeRelayerStructs.TransferWithRelayStruct]): string;
    encodeFunctionData(functionFragment: 'fetchLocalAddressFromTransferMessage', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'getAcceptedTokensList', values?: undefined): string;
    encodeFunctionData(functionFragment: 'getRegisteredContract', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'isAcceptedToken', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'maxNativeSwapAmount', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'nativeSwapRate', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'normalizeAmount', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pendingOwner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'registerContract', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'registerToken', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'relayerFee', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'relayerFeePrecision', values?: undefined): string;
    encodeFunctionData(functionFragment: 'submitOwnershipTransferRequest', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'swapRate', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'swapRatePrecision', values?: undefined): string;
    encodeFunctionData(functionFragment: 'tokenBridge', values?: undefined): string;
    encodeFunctionData(functionFragment: 'transferTokensWithRelay', values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'unwrapWeth', values?: undefined): string;
    encodeFunctionData(functionFragment: 'updateMaxNativeSwapAmount', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'updateRelayerFee', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'updateRelayerFeePrecision', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'updateSwapRate', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'updateSwapRatePrecision', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'updateUnwrapWethFlag', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: 'wormhole', values?: undefined): string;
    encodeFunctionData(functionFragment: 'wrapAndTransferEthWithRelay', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: 'WETH', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'calculateMaxSwapAmountIn', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'calculateNativeSwapAmountOut', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'calculateRelayerFee', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'cancelOwnershipTransferRequest', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'chainId', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'completeTransferWithRelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'confirmOwnershipTransferRequest', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'decodeTransferWithRelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'denormalizeAmount', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'deregisterToken', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'encodeTransferWithRelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'fetchLocalAddressFromTransferMessage', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getAcceptedTokensList', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getRegisteredContract', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isAcceptedToken', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'maxNativeSwapAmount', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'nativeSwapRate', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'normalizeAmount', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pendingOwner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'registerContract', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'registerToken', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'relayerFee', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'relayerFeePrecision', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'submitOwnershipTransferRequest', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'swapRate', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'swapRatePrecision', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'tokenBridge', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferTokensWithRelay', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'unwrapWeth', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateMaxNativeSwapAmount', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateRelayerFee', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateRelayerFeePrecision', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateSwapRate', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateSwapRatePrecision', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateUnwrapWethFlag', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'wormhole', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'wrapAndTransferEthWithRelay', data: BytesLike): Result;
    events: {
        'OwnershipTransfered(address,address)': EventFragment;
        'SwapExecuted(address,address,address,uint256,uint256)': EventFragment;
        'SwapRateUpdated(address,uint256)': EventFragment;
        'TransferRedeemed(uint16,bytes32,uint64)': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'OwnershipTransfered'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'SwapExecuted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'SwapRateUpdated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'TransferRedeemed'): EventFragment;
}
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
export interface TransferRedeemedEventObject {
    emitterChainId: number;
    emitterAddress: string;
    sequence: BigNumber;
}
export type TransferRedeemedEvent = TypedEvent<[
    number,
    string,
    BigNumber
], TransferRedeemedEventObject>;
export type TransferRedeemedEventFilter = TypedEventFilter<TransferRedeemedEvent>;
export interface TokenBridgeRelayer extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TokenBridgeRelayerInterface;
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
        WETH(overrides?: CallOverrides): Promise<[string]>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber] & {
            maxAllowed: BigNumber;
        }>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            nativeAmount: BigNumber;
        }>;
        calculateRelayerFee(targetChainId: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            feeInTokenDenomination: BigNumber;
        }>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        chainId(overrides?: CallOverrides): Promise<[number]>;
        completeTransferWithRelay(encodedTransferMessage: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        confirmOwnershipTransferRequest(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decodeTransferWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            TokenBridgeRelayerStructs.TransferWithRelayStructOutput
        ] & {
            transfer: TokenBridgeRelayerStructs.TransferWithRelayStructOutput;
        }>;
        denormalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        deregisterToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        encodeTransferWithRelay(transfer: TokenBridgeRelayerStructs.TransferWithRelayStruct, overrides?: CallOverrides): Promise<[string] & {
            encoded: string;
        }>;
        fetchLocalAddressFromTransferMessage(payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string] & {
            localAddress: string;
        }>;
        getAcceptedTokensList(overrides?: CallOverrides): Promise<[string[]]>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        normalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pendingOwner(overrides?: CallOverrides): Promise<[string]>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        relayerFeePrecision(overrides?: CallOverrides): Promise<[BigNumber]>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        swapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        swapRatePrecision(overrides?: CallOverrides): Promise<[BigNumber]>;
        tokenBridge(overrides?: CallOverrides): Promise<[string]>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unwrapWeth(overrides?: CallOverrides): Promise<[boolean]>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateRelayerFeePrecision(chainId_: PromiseOrValue<BigNumberish>, relayerFeePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, swapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateUnwrapWethFlag(chainId_: PromiseOrValue<BigNumberish>, unwrapWeth_: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        wormhole(overrides?: CallOverrides): Promise<[string]>;
        wrapAndTransferEthWithRelay(toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    WETH(overrides?: CallOverrides): Promise<string>;
    calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    calculateRelayerFee(targetChainId: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    chainId(overrides?: CallOverrides): Promise<number>;
    completeTransferWithRelay(encodedTransferMessage: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    confirmOwnershipTransferRequest(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decodeTransferWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<TokenBridgeRelayerStructs.TransferWithRelayStructOutput>;
    denormalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    deregisterToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    encodeTransferWithRelay(transfer: TokenBridgeRelayerStructs.TransferWithRelayStruct, overrides?: CallOverrides): Promise<string>;
    fetchLocalAddressFromTransferMessage(payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    getAcceptedTokensList(overrides?: CallOverrides): Promise<string[]>;
    getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    normalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    relayerFee(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    relayerFeePrecision(overrides?: CallOverrides): Promise<BigNumber>;
    submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    swapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    swapRatePrecision(overrides?: CallOverrides): Promise<BigNumber>;
    tokenBridge(overrides?: CallOverrides): Promise<string>;
    transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unwrapWeth(overrides?: CallOverrides): Promise<boolean>;
    updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateRelayerFeePrecision(chainId_: PromiseOrValue<BigNumberish>, relayerFeePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, swapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateUnwrapWethFlag(chainId_: PromiseOrValue<BigNumberish>, unwrapWeth_: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    wormhole(overrides?: CallOverrides): Promise<string>;
    wrapAndTransferEthWithRelay(toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        WETH(overrides?: CallOverrides): Promise<string>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        calculateRelayerFee(targetChainId: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        chainId(overrides?: CallOverrides): Promise<number>;
        completeTransferWithRelay(encodedTransferMessage: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        confirmOwnershipTransferRequest(overrides?: CallOverrides): Promise<void>;
        decodeTransferWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<TokenBridgeRelayerStructs.TransferWithRelayStructOutput>;
        denormalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        deregisterToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        encodeTransferWithRelay(transfer: TokenBridgeRelayerStructs.TransferWithRelayStruct, overrides?: CallOverrides): Promise<string>;
        fetchLocalAddressFromTransferMessage(payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        getAcceptedTokensList(overrides?: CallOverrides): Promise<string[]>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        normalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        pendingOwner(overrides?: CallOverrides): Promise<string>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        registerToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        relayerFeePrecision(overrides?: CallOverrides): Promise<BigNumber>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        swapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        swapRatePrecision(overrides?: CallOverrides): Promise<BigNumber>;
        tokenBridge(overrides?: CallOverrides): Promise<string>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        unwrapWeth(overrides?: CallOverrides): Promise<boolean>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateRelayerFeePrecision(chainId_: PromiseOrValue<BigNumberish>, relayerFeePrecision_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, swapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateUnwrapWethFlag(chainId_: PromiseOrValue<BigNumberish>, unwrapWeth_: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        wormhole(overrides?: CallOverrides): Promise<string>;
        wrapAndTransferEthWithRelay(toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        'OwnershipTransfered(address,address)'(oldOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferedEventFilter;
        OwnershipTransfered(oldOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferedEventFilter;
        'SwapExecuted(address,address,address,uint256,uint256)'(recipient?: PromiseOrValue<string> | null, relayer?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, tokenAmount?: null, nativeAmount?: null): SwapExecutedEventFilter;
        SwapExecuted(recipient?: PromiseOrValue<string> | null, relayer?: PromiseOrValue<string> | null, token?: PromiseOrValue<string> | null, tokenAmount?: null, nativeAmount?: null): SwapExecutedEventFilter;
        'SwapRateUpdated(address,uint256)'(token?: PromiseOrValue<string> | null, swapRate?: PromiseOrValue<BigNumberish> | null): SwapRateUpdatedEventFilter;
        SwapRateUpdated(token?: PromiseOrValue<string> | null, swapRate?: PromiseOrValue<BigNumberish> | null): SwapRateUpdatedEventFilter;
        'TransferRedeemed(uint16,bytes32,uint64)'(emitterChainId?: PromiseOrValue<BigNumberish> | null, emitterAddress?: PromiseOrValue<BytesLike> | null, sequence?: PromiseOrValue<BigNumberish> | null): TransferRedeemedEventFilter;
        TransferRedeemed(emitterChainId?: PromiseOrValue<BigNumberish> | null, emitterAddress?: PromiseOrValue<BytesLike> | null, sequence?: PromiseOrValue<BigNumberish> | null): TransferRedeemedEventFilter;
    };
    estimateGas: {
        WETH(overrides?: CallOverrides): Promise<BigNumber>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        calculateRelayerFee(targetChainId: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        chainId(overrides?: CallOverrides): Promise<BigNumber>;
        completeTransferWithRelay(encodedTransferMessage: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        confirmOwnershipTransferRequest(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decodeTransferWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        denormalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        deregisterToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        encodeTransferWithRelay(transfer: TokenBridgeRelayerStructs.TransferWithRelayStruct, overrides?: CallOverrides): Promise<BigNumber>;
        fetchLocalAddressFromTransferMessage(payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        getAcceptedTokensList(overrides?: CallOverrides): Promise<BigNumber>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        normalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        relayerFeePrecision(overrides?: CallOverrides): Promise<BigNumber>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        swapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        swapRatePrecision(overrides?: CallOverrides): Promise<BigNumber>;
        tokenBridge(overrides?: CallOverrides): Promise<BigNumber>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unwrapWeth(overrides?: CallOverrides): Promise<BigNumber>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateRelayerFeePrecision(chainId_: PromiseOrValue<BigNumberish>, relayerFeePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, swapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateUnwrapWethFlag(chainId_: PromiseOrValue<BigNumberish>, unwrapWeth_: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        wormhole(overrides?: CallOverrides): Promise<BigNumber>;
        wrapAndTransferEthWithRelay(toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateMaxSwapAmountIn(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateNativeSwapAmountOut(token: PromiseOrValue<string>, toNativeAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateRelayerFee(targetChainId: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        completeTransferWithRelay(encodedTransferMessage: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        confirmOwnershipTransferRequest(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decodeTransferWithRelay(encoded: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        denormalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deregisterToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        encodeTransferWithRelay(transfer: TokenBridgeRelayerStructs.TransferWithRelayStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        fetchLocalAddressFromTransferMessage(payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAcceptedTokensList(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRegisteredContract(emitterChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAcceptedToken(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        maxNativeSwapAmount(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nativeSwapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        normalizeAmount(amount: PromiseOrValue<BigNumberish>, decimals: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerContract(chainId_: PromiseOrValue<BigNumberish>, contractAddress: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerToken(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        relayerFee(chainId_: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        relayerFeePrecision(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        submitOwnershipTransferRequest(chainId_: PromiseOrValue<BigNumberish>, newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        swapRate(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        swapRatePrecision(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenBridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferTokensWithRelay(token: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unwrapWeth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        updateMaxNativeSwapAmount(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, maxAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateRelayerFee(chainId_: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateRelayerFeePrecision(chainId_: PromiseOrValue<BigNumberish>, relayerFeePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateSwapRate(chainId_: PromiseOrValue<BigNumberish>, token: PromiseOrValue<string>, swapRate: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateSwapRatePrecision(chainId_: PromiseOrValue<BigNumberish>, swapRatePrecision_: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateUnwrapWethFlag(chainId_: PromiseOrValue<BigNumberish>, unwrapWeth_: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        wormhole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        wrapAndTransferEthWithRelay(toNativeTokenAmount: PromiseOrValue<BigNumberish>, targetChain: PromiseOrValue<BigNumberish>, targetRecipient: PromiseOrValue<BytesLike>, batchId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TokenBridgeRelayer.d.ts.map