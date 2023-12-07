import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from '../common';
export interface MessageTransmitterInterface extends utils.Interface {
    functions: {
        'acceptOwnership()': FunctionFragment;
        'attesterManager()': FunctionFragment;
        'disableAttester(address)': FunctionFragment;
        'enableAttester(address)': FunctionFragment;
        'getEnabledAttester(uint256)': FunctionFragment;
        'getNumEnabledAttesters()': FunctionFragment;
        'isEnabledAttester(address)': FunctionFragment;
        'localDomain()': FunctionFragment;
        'maxMessageBodySize()': FunctionFragment;
        'nextAvailableNonce()': FunctionFragment;
        'owner()': FunctionFragment;
        'pause()': FunctionFragment;
        'paused()': FunctionFragment;
        'pauser()': FunctionFragment;
        'pendingOwner()': FunctionFragment;
        'receiveMessage(bytes,bytes)': FunctionFragment;
        'replaceMessage(bytes,bytes,bytes,bytes32)': FunctionFragment;
        'rescueERC20(address,address,uint256)': FunctionFragment;
        'rescuer()': FunctionFragment;
        'sendMessage(uint32,bytes32,bytes)': FunctionFragment;
        'sendMessageWithCaller(uint32,bytes32,bytes32,bytes)': FunctionFragment;
        'setMaxMessageBodySize(uint256)': FunctionFragment;
        'setSignatureThreshold(uint256)': FunctionFragment;
        'signatureThreshold()': FunctionFragment;
        'transferOwnership(address)': FunctionFragment;
        'unpause()': FunctionFragment;
        'updateAttesterManager(address)': FunctionFragment;
        'updatePauser(address)': FunctionFragment;
        'updateRescuer(address)': FunctionFragment;
        'usedNonces(bytes32)': FunctionFragment;
        'version()': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'acceptOwnership' | 'attesterManager' | 'disableAttester' | 'enableAttester' | 'getEnabledAttester' | 'getNumEnabledAttesters' | 'isEnabledAttester' | 'localDomain' | 'maxMessageBodySize' | 'nextAvailableNonce' | 'owner' | 'pause' | 'paused' | 'pauser' | 'pendingOwner' | 'receiveMessage' | 'replaceMessage' | 'rescueERC20' | 'rescuer' | 'sendMessage' | 'sendMessageWithCaller' | 'setMaxMessageBodySize' | 'setSignatureThreshold' | 'signatureThreshold' | 'transferOwnership' | 'unpause' | 'updateAttesterManager' | 'updatePauser' | 'updateRescuer' | 'usedNonces' | 'version'): FunctionFragment;
    encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
    encodeFunctionData(functionFragment: 'attesterManager', values?: undefined): string;
    encodeFunctionData(functionFragment: 'disableAttester', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'enableAttester', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'getEnabledAttester', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'getNumEnabledAttesters', values?: undefined): string;
    encodeFunctionData(functionFragment: 'isEnabledAttester', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'localDomain', values?: undefined): string;
    encodeFunctionData(functionFragment: 'maxMessageBodySize', values?: undefined): string;
    encodeFunctionData(functionFragment: 'nextAvailableNonce', values?: undefined): string;
    encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pause', values?: undefined): string;
    encodeFunctionData(functionFragment: 'paused', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pauser', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pendingOwner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'receiveMessage', values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'replaceMessage', values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: 'rescueERC20', values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: 'rescuer', values?: undefined): string;
    encodeFunctionData(functionFragment: 'sendMessage', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: 'sendMessageWithCaller', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: 'setMaxMessageBodySize', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'setSignatureThreshold', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'signatureThreshold', values?: undefined): string;
    encodeFunctionData(functionFragment: 'transferOwnership', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'unpause', values?: undefined): string;
    encodeFunctionData(functionFragment: 'updateAttesterManager', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'updatePauser', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'updateRescuer', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'usedNonces', values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'version', values?: undefined): string;
    decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'attesterManager', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'disableAttester', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'enableAttester', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getEnabledAttester', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'getNumEnabledAttesters', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'isEnabledAttester', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'localDomain', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'maxMessageBodySize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'nextAvailableNonce', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pause', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'paused', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pauser', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pendingOwner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'receiveMessage', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'replaceMessage', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'rescueERC20', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'rescuer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'sendMessage', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'sendMessageWithCaller', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setMaxMessageBodySize', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'setSignatureThreshold', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'signatureThreshold', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'unpause', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateAttesterManager', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updatePauser', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateRescuer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'usedNonces', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'version', data: BytesLike): Result;
    events: {
        'AttesterDisabled(address)': EventFragment;
        'AttesterEnabled(address)': EventFragment;
        'AttesterManagerUpdated(address,address)': EventFragment;
        'MaxMessageBodySizeUpdated(uint256)': EventFragment;
        'MessageReceived(address,uint32,uint64,bytes32,bytes)': EventFragment;
        'MessageSent(bytes)': EventFragment;
        'OwnershipTransferStarted(address,address)': EventFragment;
        'OwnershipTransferred(address,address)': EventFragment;
        'Pause()': EventFragment;
        'PauserChanged(address)': EventFragment;
        'RescuerChanged(address)': EventFragment;
        'SignatureThresholdUpdated(uint256,uint256)': EventFragment;
        'Unpause()': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'AttesterDisabled'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'AttesterEnabled'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'AttesterManagerUpdated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'MaxMessageBodySizeUpdated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'MessageReceived'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'MessageSent'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'OwnershipTransferStarted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Pause'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'PauserChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RescuerChanged'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'SignatureThresholdUpdated'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'Unpause'): EventFragment;
}
export interface AttesterDisabledEventObject {
    attester: string;
}
export type AttesterDisabledEvent = TypedEvent<[
    string
], AttesterDisabledEventObject>;
export type AttesterDisabledEventFilter = TypedEventFilter<AttesterDisabledEvent>;
export interface AttesterEnabledEventObject {
    attester: string;
}
export type AttesterEnabledEvent = TypedEvent<[
    string
], AttesterEnabledEventObject>;
export type AttesterEnabledEventFilter = TypedEventFilter<AttesterEnabledEvent>;
export interface AttesterManagerUpdatedEventObject {
    previousAttesterManager: string;
    newAttesterManager: string;
}
export type AttesterManagerUpdatedEvent = TypedEvent<[
    string,
    string
], AttesterManagerUpdatedEventObject>;
export type AttesterManagerUpdatedEventFilter = TypedEventFilter<AttesterManagerUpdatedEvent>;
export interface MaxMessageBodySizeUpdatedEventObject {
    newMaxMessageBodySize: BigNumber;
}
export type MaxMessageBodySizeUpdatedEvent = TypedEvent<[
    BigNumber
], MaxMessageBodySizeUpdatedEventObject>;
export type MaxMessageBodySizeUpdatedEventFilter = TypedEventFilter<MaxMessageBodySizeUpdatedEvent>;
export interface MessageReceivedEventObject {
    caller: string;
    sourceDomain: number;
    nonce: BigNumber;
    sender: string;
    messageBody: string;
}
export type MessageReceivedEvent = TypedEvent<[
    string,
    number,
    BigNumber,
    string,
    string
], MessageReceivedEventObject>;
export type MessageReceivedEventFilter = TypedEventFilter<MessageReceivedEvent>;
export interface MessageSentEventObject {
    message: string;
}
export type MessageSentEvent = TypedEvent<[string], MessageSentEventObject>;
export type MessageSentEventFilter = TypedEventFilter<MessageSentEvent>;
export interface OwnershipTransferStartedEventObject {
    previousOwner: string;
    newOwner: string;
}
export type OwnershipTransferStartedEvent = TypedEvent<[
    string,
    string
], OwnershipTransferStartedEventObject>;
export type OwnershipTransferStartedEventFilter = TypedEventFilter<OwnershipTransferStartedEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface PauseEventObject {
}
export type PauseEvent = TypedEvent<[], PauseEventObject>;
export type PauseEventFilter = TypedEventFilter<PauseEvent>;
export interface PauserChangedEventObject {
    newAddress: string;
}
export type PauserChangedEvent = TypedEvent<[string], PauserChangedEventObject>;
export type PauserChangedEventFilter = TypedEventFilter<PauserChangedEvent>;
export interface RescuerChangedEventObject {
    newRescuer: string;
}
export type RescuerChangedEvent = TypedEvent<[
    string
], RescuerChangedEventObject>;
export type RescuerChangedEventFilter = TypedEventFilter<RescuerChangedEvent>;
export interface SignatureThresholdUpdatedEventObject {
    oldSignatureThreshold: BigNumber;
    newSignatureThreshold: BigNumber;
}
export type SignatureThresholdUpdatedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], SignatureThresholdUpdatedEventObject>;
export type SignatureThresholdUpdatedEventFilter = TypedEventFilter<SignatureThresholdUpdatedEvent>;
export interface UnpauseEventObject {
}
export type UnpauseEvent = TypedEvent<[], UnpauseEventObject>;
export type UnpauseEventFilter = TypedEventFilter<UnpauseEvent>;
export interface MessageTransmitter extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MessageTransmitterInterface;
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
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        attesterManager(overrides?: CallOverrides): Promise<[string]>;
        disableAttester(attester: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        enableAttester(newAttester: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getEnabledAttester(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getNumEnabledAttesters(overrides?: CallOverrides): Promise<[BigNumber]>;
        isEnabledAttester(attester: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        localDomain(overrides?: CallOverrides): Promise<[number]>;
        maxMessageBodySize(overrides?: CallOverrides): Promise<[BigNumber]>;
        nextAvailableNonce(overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        pauser(overrides?: CallOverrides): Promise<[string]>;
        pendingOwner(overrides?: CallOverrides): Promise<[string]>;
        receiveMessage(message: PromiseOrValue<BytesLike>, attestation: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        replaceMessage(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newMessageBody: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rescuer(overrides?: CallOverrides): Promise<[string]>;
        sendMessage(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendMessageWithCaller(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, destinationCaller: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMaxMessageBodySize(newMaxMessageBodySize: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSignatureThreshold(newSignatureThreshold: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        signatureThreshold(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateAttesterManager(newAttesterManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updatePauser(_newPauser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        usedNonces(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;
        version(overrides?: CallOverrides): Promise<[number]>;
    };
    acceptOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    attesterManager(overrides?: CallOverrides): Promise<string>;
    disableAttester(attester: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    enableAttester(newAttester: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getEnabledAttester(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getNumEnabledAttesters(overrides?: CallOverrides): Promise<BigNumber>;
    isEnabledAttester(attester: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    localDomain(overrides?: CallOverrides): Promise<number>;
    maxMessageBodySize(overrides?: CallOverrides): Promise<BigNumber>;
    nextAvailableNonce(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    pause(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    pauser(overrides?: CallOverrides): Promise<string>;
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    receiveMessage(message: PromiseOrValue<BytesLike>, attestation: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    replaceMessage(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newMessageBody: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rescuer(overrides?: CallOverrides): Promise<string>;
    sendMessage(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendMessageWithCaller(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, destinationCaller: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMaxMessageBodySize(newMaxMessageBodySize: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSignatureThreshold(newSignatureThreshold: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    signatureThreshold(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unpause(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateAttesterManager(newAttesterManager: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updatePauser(_newPauser: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    usedNonces(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    version(overrides?: CallOverrides): Promise<number>;
    callStatic: {
        acceptOwnership(overrides?: CallOverrides): Promise<void>;
        attesterManager(overrides?: CallOverrides): Promise<string>;
        disableAttester(attester: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        enableAttester(newAttester: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        getEnabledAttester(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getNumEnabledAttesters(overrides?: CallOverrides): Promise<BigNumber>;
        isEnabledAttester(attester: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        localDomain(overrides?: CallOverrides): Promise<number>;
        maxMessageBodySize(overrides?: CallOverrides): Promise<BigNumber>;
        nextAvailableNonce(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        pause(overrides?: CallOverrides): Promise<void>;
        paused(overrides?: CallOverrides): Promise<boolean>;
        pauser(overrides?: CallOverrides): Promise<string>;
        pendingOwner(overrides?: CallOverrides): Promise<string>;
        receiveMessage(message: PromiseOrValue<BytesLike>, attestation: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        replaceMessage(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newMessageBody: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        rescuer(overrides?: CallOverrides): Promise<string>;
        sendMessage(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        sendMessageWithCaller(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, destinationCaller: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        setMaxMessageBodySize(newMaxMessageBodySize: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setSignatureThreshold(newSignatureThreshold: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        signatureThreshold(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        unpause(overrides?: CallOverrides): Promise<void>;
        updateAttesterManager(newAttesterManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updatePauser(_newPauser: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        usedNonces(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        version(overrides?: CallOverrides): Promise<number>;
    };
    filters: {
        'AttesterDisabled(address)'(attester?: PromiseOrValue<string> | null): AttesterDisabledEventFilter;
        AttesterDisabled(attester?: PromiseOrValue<string> | null): AttesterDisabledEventFilter;
        'AttesterEnabled(address)'(attester?: PromiseOrValue<string> | null): AttesterEnabledEventFilter;
        AttesterEnabled(attester?: PromiseOrValue<string> | null): AttesterEnabledEventFilter;
        'AttesterManagerUpdated(address,address)'(previousAttesterManager?: PromiseOrValue<string> | null, newAttesterManager?: PromiseOrValue<string> | null): AttesterManagerUpdatedEventFilter;
        AttesterManagerUpdated(previousAttesterManager?: PromiseOrValue<string> | null, newAttesterManager?: PromiseOrValue<string> | null): AttesterManagerUpdatedEventFilter;
        'MaxMessageBodySizeUpdated(uint256)'(newMaxMessageBodySize?: null): MaxMessageBodySizeUpdatedEventFilter;
        MaxMessageBodySizeUpdated(newMaxMessageBodySize?: null): MaxMessageBodySizeUpdatedEventFilter;
        'MessageReceived(address,uint32,uint64,bytes32,bytes)'(caller?: PromiseOrValue<string> | null, sourceDomain?: null, nonce?: PromiseOrValue<BigNumberish> | null, sender?: null, messageBody?: null): MessageReceivedEventFilter;
        MessageReceived(caller?: PromiseOrValue<string> | null, sourceDomain?: null, nonce?: PromiseOrValue<BigNumberish> | null, sender?: null, messageBody?: null): MessageReceivedEventFilter;
        'MessageSent(bytes)'(message?: null): MessageSentEventFilter;
        MessageSent(message?: null): MessageSentEventFilter;
        'OwnershipTransferStarted(address,address)'(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferStartedEventFilter;
        OwnershipTransferStarted(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferStartedEventFilter;
        'OwnershipTransferred(address,address)'(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        'Pause()'(): PauseEventFilter;
        Pause(): PauseEventFilter;
        'PauserChanged(address)'(newAddress?: PromiseOrValue<string> | null): PauserChangedEventFilter;
        PauserChanged(newAddress?: PromiseOrValue<string> | null): PauserChangedEventFilter;
        'RescuerChanged(address)'(newRescuer?: PromiseOrValue<string> | null): RescuerChangedEventFilter;
        RescuerChanged(newRescuer?: PromiseOrValue<string> | null): RescuerChangedEventFilter;
        'SignatureThresholdUpdated(uint256,uint256)'(oldSignatureThreshold?: null, newSignatureThreshold?: null): SignatureThresholdUpdatedEventFilter;
        SignatureThresholdUpdated(oldSignatureThreshold?: null, newSignatureThreshold?: null): SignatureThresholdUpdatedEventFilter;
        'Unpause()'(): UnpauseEventFilter;
        Unpause(): UnpauseEventFilter;
    };
    estimateGas: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        attesterManager(overrides?: CallOverrides): Promise<BigNumber>;
        disableAttester(attester: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        enableAttester(newAttester: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getEnabledAttester(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getNumEnabledAttesters(overrides?: CallOverrides): Promise<BigNumber>;
        isEnabledAttester(attester: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        localDomain(overrides?: CallOverrides): Promise<BigNumber>;
        maxMessageBodySize(overrides?: CallOverrides): Promise<BigNumber>;
        nextAvailableNonce(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        pauser(overrides?: CallOverrides): Promise<BigNumber>;
        pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
        receiveMessage(message: PromiseOrValue<BytesLike>, attestation: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        replaceMessage(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newMessageBody: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rescuer(overrides?: CallOverrides): Promise<BigNumber>;
        sendMessage(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendMessageWithCaller(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, destinationCaller: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMaxMessageBodySize(newMaxMessageBodySize: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSignatureThreshold(newSignatureThreshold: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        signatureThreshold(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateAttesterManager(newAttesterManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updatePauser(_newPauser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        usedNonces(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        version(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        attesterManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        disableAttester(attester: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        enableAttester(newAttester: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getEnabledAttester(index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getNumEnabledAttesters(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isEnabledAttester(attester: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        localDomain(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        maxMessageBodySize(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nextAvailableNonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pauser(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        receiveMessage(message: PromiseOrValue<BytesLike>, attestation: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        replaceMessage(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newMessageBody: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rescuer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sendMessage(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendMessageWithCaller(destinationDomain: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<BytesLike>, destinationCaller: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMaxMessageBodySize(newMaxMessageBodySize: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSignatureThreshold(newSignatureThreshold: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        signatureThreshold(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateAttesterManager(newAttesterManager: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updatePauser(_newPauser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        usedNonces(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=MessageTransmitter.d.ts.map