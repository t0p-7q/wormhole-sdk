import { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import type { TokenMessenger, TokenMessengerInterface } from './TokenMessenger';
export declare class TokenMessenger__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_messageTransmitter";
            readonly type: "address";
        }, {
            readonly internalType: "uint32";
            readonly name: "_messageBodyVersion";
            readonly type: "uint32";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint64";
            readonly name: "nonce";
            readonly type: "uint64";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "burnToken";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "depositor";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "mintRecipient";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "destinationDomain";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "destinationTokenMessenger";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "destinationCaller";
            readonly type: "bytes32";
        }];
        readonly name: "DepositForBurn";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "localMinter";
            readonly type: "address";
        }];
        readonly name: "LocalMinterAdded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "localMinter";
            readonly type: "address";
        }];
        readonly name: "LocalMinterRemoved";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "mintRecipient";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "mintToken";
            readonly type: "address";
        }];
        readonly name: "MintAndWithdraw";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferStarted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "domain";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "tokenMessenger";
            readonly type: "bytes32";
        }];
        readonly name: "RemoteTokenMessengerAdded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint32";
            readonly name: "domain";
            readonly type: "uint32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "tokenMessenger";
            readonly type: "bytes32";
        }];
        readonly name: "RemoteTokenMessengerRemoved";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newRescuer";
            readonly type: "address";
        }];
        readonly name: "RescuerChanged";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "acceptOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newLocalMinter";
            readonly type: "address";
        }];
        readonly name: "addLocalMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "domain";
            readonly type: "uint32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "tokenMessenger";
            readonly type: "bytes32";
        }];
        readonly name: "addRemoteTokenMessenger";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint32";
            readonly name: "destinationDomain";
            readonly type: "uint32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "mintRecipient";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "burnToken";
            readonly type: "address";
        }];
        readonly name: "depositForBurn";
        readonly outputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "_nonce";
            readonly type: "uint64";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint32";
            readonly name: "destinationDomain";
            readonly type: "uint32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "mintRecipient";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "burnToken";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "destinationCaller";
            readonly type: "bytes32";
        }];
        readonly name: "depositForBurnWithCaller";
        readonly outputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "nonce";
            readonly type: "uint64";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "remoteDomain";
            readonly type: "uint32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "sender";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes";
            readonly name: "messageBody";
            readonly type: "bytes";
        }];
        readonly name: "handleReceiveMessage";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "localMessageTransmitter";
        readonly outputs: readonly [{
            readonly internalType: "contract IMessageTransmitter";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "localMinter";
        readonly outputs: readonly [{
            readonly internalType: "contract ITokenMinter";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "messageBodyVersion";
        readonly outputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "pendingOwner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "";
            readonly type: "uint32";
        }];
        readonly name: "remoteTokenMessengers";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "removeLocalMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "domain";
            readonly type: "uint32";
        }];
        readonly name: "removeRemoteTokenMessenger";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "originalMessage";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "originalAttestation";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes32";
            readonly name: "newDestinationCaller";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "newMintRecipient";
            readonly type: "bytes32";
        }];
        readonly name: "replaceDepositForBurn";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20";
            readonly name: "tokenContract";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "rescueERC20";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "rescuer";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newRescuer";
            readonly type: "address";
        }];
        readonly name: "updateRescuer";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): TokenMessengerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TokenMessenger;
}
//# sourceMappingURL=TokenMessenger__factory.d.ts.map