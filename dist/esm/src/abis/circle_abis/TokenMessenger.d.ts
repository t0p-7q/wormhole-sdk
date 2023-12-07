import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from '../common';
export interface TokenMessengerInterface extends utils.Interface {
    functions: {
        'acceptOwnership()': FunctionFragment;
        'addLocalMinter(address)': FunctionFragment;
        'addRemoteTokenMessenger(uint32,bytes32)': FunctionFragment;
        'depositForBurn(uint256,uint32,bytes32,address)': FunctionFragment;
        'depositForBurnWithCaller(uint256,uint32,bytes32,address,bytes32)': FunctionFragment;
        'handleReceiveMessage(uint32,bytes32,bytes)': FunctionFragment;
        'localMessageTransmitter()': FunctionFragment;
        'localMinter()': FunctionFragment;
        'messageBodyVersion()': FunctionFragment;
        'owner()': FunctionFragment;
        'pendingOwner()': FunctionFragment;
        'remoteTokenMessengers(uint32)': FunctionFragment;
        'removeLocalMinter()': FunctionFragment;
        'removeRemoteTokenMessenger(uint32)': FunctionFragment;
        'replaceDepositForBurn(bytes,bytes,bytes32,bytes32)': FunctionFragment;
        'rescueERC20(address,address,uint256)': FunctionFragment;
        'rescuer()': FunctionFragment;
        'transferOwnership(address)': FunctionFragment;
        'updateRescuer(address)': FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: 'acceptOwnership' | 'addLocalMinter' | 'addRemoteTokenMessenger' | 'depositForBurn' | 'depositForBurnWithCaller' | 'handleReceiveMessage' | 'localMessageTransmitter' | 'localMinter' | 'messageBodyVersion' | 'owner' | 'pendingOwner' | 'remoteTokenMessengers' | 'removeLocalMinter' | 'removeRemoteTokenMessenger' | 'replaceDepositForBurn' | 'rescueERC20' | 'rescuer' | 'transferOwnership' | 'updateRescuer'): FunctionFragment;
    encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
    encodeFunctionData(functionFragment: 'addLocalMinter', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'addRemoteTokenMessenger', values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: 'depositForBurn', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: 'depositForBurnWithCaller', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: 'handleReceiveMessage', values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: 'localMessageTransmitter', values?: undefined): string;
    encodeFunctionData(functionFragment: 'localMinter', values?: undefined): string;
    encodeFunctionData(functionFragment: 'messageBodyVersion', values?: undefined): string;
    encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'pendingOwner', values?: undefined): string;
    encodeFunctionData(functionFragment: 'remoteTokenMessengers', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'removeLocalMinter', values?: undefined): string;
    encodeFunctionData(functionFragment: 'removeRemoteTokenMessenger', values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: 'replaceDepositForBurn', values: [
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
    encodeFunctionData(functionFragment: 'transferOwnership', values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: 'updateRescuer', values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'addLocalMinter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'addRemoteTokenMessenger', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'depositForBurn', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'depositForBurnWithCaller', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'handleReceiveMessage', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'localMessageTransmitter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'localMinter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'messageBodyVersion', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'pendingOwner', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'remoteTokenMessengers', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'removeLocalMinter', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'removeRemoteTokenMessenger', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'replaceDepositForBurn', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'rescueERC20', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'rescuer', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
    decodeFunctionResult(functionFragment: 'updateRescuer', data: BytesLike): Result;
    events: {
        'DepositForBurn(uint64,address,uint256,address,bytes32,uint32,bytes32,bytes32)': EventFragment;
        'LocalMinterAdded(address)': EventFragment;
        'LocalMinterRemoved(address)': EventFragment;
        'MintAndWithdraw(address,uint256,address)': EventFragment;
        'OwnershipTransferStarted(address,address)': EventFragment;
        'OwnershipTransferred(address,address)': EventFragment;
        'RemoteTokenMessengerAdded(uint32,bytes32)': EventFragment;
        'RemoteTokenMessengerRemoved(uint32,bytes32)': EventFragment;
        'RescuerChanged(address)': EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: 'DepositForBurn'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'LocalMinterAdded'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'LocalMinterRemoved'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'MintAndWithdraw'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'OwnershipTransferStarted'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RemoteTokenMessengerAdded'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RemoteTokenMessengerRemoved'): EventFragment;
    getEvent(nameOrSignatureOrTopic: 'RescuerChanged'): EventFragment;
}
export interface DepositForBurnEventObject {
    nonce: BigNumber;
    burnToken: string;
    amount: BigNumber;
    depositor: string;
    mintRecipient: string;
    destinationDomain: number;
    destinationTokenMessenger: string;
    destinationCaller: string;
}
export type DepositForBurnEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber,
    string,
    string,
    number,
    string,
    string
], DepositForBurnEventObject>;
export type DepositForBurnEventFilter = TypedEventFilter<DepositForBurnEvent>;
export interface LocalMinterAddedEventObject {
    localMinter: string;
}
export type LocalMinterAddedEvent = TypedEvent<[
    string
], LocalMinterAddedEventObject>;
export type LocalMinterAddedEventFilter = TypedEventFilter<LocalMinterAddedEvent>;
export interface LocalMinterRemovedEventObject {
    localMinter: string;
}
export type LocalMinterRemovedEvent = TypedEvent<[
    string
], LocalMinterRemovedEventObject>;
export type LocalMinterRemovedEventFilter = TypedEventFilter<LocalMinterRemovedEvent>;
export interface MintAndWithdrawEventObject {
    mintRecipient: string;
    amount: BigNumber;
    mintToken: string;
}
export type MintAndWithdrawEvent = TypedEvent<[
    string,
    BigNumber,
    string
], MintAndWithdrawEventObject>;
export type MintAndWithdrawEventFilter = TypedEventFilter<MintAndWithdrawEvent>;
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
export interface RemoteTokenMessengerAddedEventObject {
    domain: number;
    tokenMessenger: string;
}
export type RemoteTokenMessengerAddedEvent = TypedEvent<[
    number,
    string
], RemoteTokenMessengerAddedEventObject>;
export type RemoteTokenMessengerAddedEventFilter = TypedEventFilter<RemoteTokenMessengerAddedEvent>;
export interface RemoteTokenMessengerRemovedEventObject {
    domain: number;
    tokenMessenger: string;
}
export type RemoteTokenMessengerRemovedEvent = TypedEvent<[
    number,
    string
], RemoteTokenMessengerRemovedEventObject>;
export type RemoteTokenMessengerRemovedEventFilter = TypedEventFilter<RemoteTokenMessengerRemovedEvent>;
export interface RescuerChangedEventObject {
    newRescuer: string;
}
export type RescuerChangedEvent = TypedEvent<[
    string
], RescuerChangedEventObject>;
export type RescuerChangedEventFilter = TypedEventFilter<RescuerChangedEvent>;
export interface TokenMessenger extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TokenMessengerInterface;
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
        addLocalMinter(newLocalMinter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, tokenMessenger: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        depositForBurn(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        depositForBurnWithCaller(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, destinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        handleReceiveMessage(remoteDomain: PromiseOrValue<BigNumberish>, sender: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        localMessageTransmitter(overrides?: CallOverrides): Promise<[string]>;
        localMinter(overrides?: CallOverrides): Promise<[string]>;
        messageBodyVersion(overrides?: CallOverrides): Promise<[number]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pendingOwner(overrides?: CallOverrides): Promise<[string]>;
        remoteTokenMessengers(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        removeLocalMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        replaceDepositForBurn(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, newMintRecipient: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        rescuer(overrides?: CallOverrides): Promise<[string]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    acceptOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addLocalMinter(newLocalMinter: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, tokenMessenger: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    depositForBurn(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    depositForBurnWithCaller(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, destinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    handleReceiveMessage(remoteDomain: PromiseOrValue<BigNumberish>, sender: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    localMessageTransmitter(overrides?: CallOverrides): Promise<string>;
    localMinter(overrides?: CallOverrides): Promise<string>;
    messageBodyVersion(overrides?: CallOverrides): Promise<number>;
    owner(overrides?: CallOverrides): Promise<string>;
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    remoteTokenMessengers(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    removeLocalMinter(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    replaceDepositForBurn(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, newMintRecipient: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    rescuer(overrides?: CallOverrides): Promise<string>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        acceptOwnership(overrides?: CallOverrides): Promise<void>;
        addLocalMinter(newLocalMinter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        addRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, tokenMessenger: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        depositForBurn(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        depositForBurnWithCaller(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, destinationCaller: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        handleReceiveMessage(remoteDomain: PromiseOrValue<BigNumberish>, sender: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        localMessageTransmitter(overrides?: CallOverrides): Promise<string>;
        localMinter(overrides?: CallOverrides): Promise<string>;
        messageBodyVersion(overrides?: CallOverrides): Promise<number>;
        owner(overrides?: CallOverrides): Promise<string>;
        pendingOwner(overrides?: CallOverrides): Promise<string>;
        remoteTokenMessengers(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        removeLocalMinter(overrides?: CallOverrides): Promise<void>;
        removeRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        replaceDepositForBurn(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, newMintRecipient: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        rescuer(overrides?: CallOverrides): Promise<string>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        'DepositForBurn(uint64,address,uint256,address,bytes32,uint32,bytes32,bytes32)'(nonce?: PromiseOrValue<BigNumberish> | null, burnToken?: PromiseOrValue<string> | null, amount?: null, depositor?: PromiseOrValue<string> | null, mintRecipient?: null, destinationDomain?: null, destinationTokenMessenger?: null, destinationCaller?: null): DepositForBurnEventFilter;
        DepositForBurn(nonce?: PromiseOrValue<BigNumberish> | null, burnToken?: PromiseOrValue<string> | null, amount?: null, depositor?: PromiseOrValue<string> | null, mintRecipient?: null, destinationDomain?: null, destinationTokenMessenger?: null, destinationCaller?: null): DepositForBurnEventFilter;
        'LocalMinterAdded(address)'(localMinter?: null): LocalMinterAddedEventFilter;
        LocalMinterAdded(localMinter?: null): LocalMinterAddedEventFilter;
        'LocalMinterRemoved(address)'(localMinter?: null): LocalMinterRemovedEventFilter;
        LocalMinterRemoved(localMinter?: null): LocalMinterRemovedEventFilter;
        'MintAndWithdraw(address,uint256,address)'(mintRecipient?: PromiseOrValue<string> | null, amount?: null, mintToken?: PromiseOrValue<string> | null): MintAndWithdrawEventFilter;
        MintAndWithdraw(mintRecipient?: PromiseOrValue<string> | null, amount?: null, mintToken?: PromiseOrValue<string> | null): MintAndWithdrawEventFilter;
        'OwnershipTransferStarted(address,address)'(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferStartedEventFilter;
        OwnershipTransferStarted(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferStartedEventFilter;
        'OwnershipTransferred(address,address)'(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        'RemoteTokenMessengerAdded(uint32,bytes32)'(domain?: null, tokenMessenger?: null): RemoteTokenMessengerAddedEventFilter;
        RemoteTokenMessengerAdded(domain?: null, tokenMessenger?: null): RemoteTokenMessengerAddedEventFilter;
        'RemoteTokenMessengerRemoved(uint32,bytes32)'(domain?: null, tokenMessenger?: null): RemoteTokenMessengerRemovedEventFilter;
        RemoteTokenMessengerRemoved(domain?: null, tokenMessenger?: null): RemoteTokenMessengerRemovedEventFilter;
        'RescuerChanged(address)'(newRescuer?: PromiseOrValue<string> | null): RescuerChangedEventFilter;
        RescuerChanged(newRescuer?: PromiseOrValue<string> | null): RescuerChangedEventFilter;
    };
    estimateGas: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addLocalMinter(newLocalMinter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, tokenMessenger: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        depositForBurn(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        depositForBurnWithCaller(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, destinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        handleReceiveMessage(remoteDomain: PromiseOrValue<BigNumberish>, sender: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        localMessageTransmitter(overrides?: CallOverrides): Promise<BigNumber>;
        localMinter(overrides?: CallOverrides): Promise<BigNumber>;
        messageBodyVersion(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
        remoteTokenMessengers(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        removeLocalMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        replaceDepositForBurn(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, newMintRecipient: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        rescuer(overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addLocalMinter(newLocalMinter: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, tokenMessenger: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        depositForBurn(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        depositForBurnWithCaller(amount: PromiseOrValue<BigNumberish>, destinationDomain: PromiseOrValue<BigNumberish>, mintRecipient: PromiseOrValue<BytesLike>, burnToken: PromiseOrValue<string>, destinationCaller: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        handleReceiveMessage(remoteDomain: PromiseOrValue<BigNumberish>, sender: PromiseOrValue<BytesLike>, messageBody: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        localMessageTransmitter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        localMinter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        messageBodyVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        remoteTokenMessengers(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        removeLocalMinter(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeRemoteTokenMessenger(domain: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        replaceDepositForBurn(originalMessage: PromiseOrValue<BytesLike>, originalAttestation: PromiseOrValue<BytesLike>, newDestinationCaller: PromiseOrValue<BytesLike>, newMintRecipient: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rescueERC20(tokenContract: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        rescuer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateRescuer(newRescuer: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=TokenMessenger.d.ts.map