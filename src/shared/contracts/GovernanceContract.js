import ConfigHelper from "../config.helper";

export const getGovernanceContract = (chainId, web3) => {
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "disputer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "market",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "disputeTotalBalances",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "reachThresholdFlag",
                    "type": "bool"
                }
            ],
            "name": "DisputeSubmittedEvent",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_marketCreatedTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_marketParticipationEndTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_marketResolvingEndTime",
                    "type": "uint256"
                }
            ],
            "name": "addMarket",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint8",
                    "name": "outcomeIndex",
                    "type": "uint8"
                }
            ],
            "name": "castGovernanceResolvingVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "validationFlag",
                    "type": "bool"
                }
            ],
            "name": "castGovernanceValidatingVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "disputeReason",
                    "type": "string"
                }
            ],
            "name": "disputeMarket",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "disputeThreshold",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getAccountInfo",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "canVote",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "votePower",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCurrentTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCurrentTime1",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "getMarketInfo",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "createdTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "participationEndTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "resolvingEndTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastResolvingVoteTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastDisputeResolvingVoteTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "disputeTotalBalances",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[2]",
                            "name": "validatingVotesCount",
                            "type": "uint256[2]"
                        },
                        {
                            "internalType": "uint256[2]",
                            "name": "resolvingVotesCount",
                            "type": "uint256[2]"
                        },
                        {
                            "internalType": "bool",
                            "name": "disputedFlag",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct ORMarketController.MarketInfo",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "getMarketState",
            "outputs": [
                {
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getPowerCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "getResolvingOutcome",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "indexSet",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "getResolvingVotesCount",
            "outputs": [
                {
                    "internalType": "uint256[2]",
                    "name": "",
                    "type": "uint256[2]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isResolvingVoter",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "power",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "voteFlag",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint8",
                            "name": "selection",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "insertedFlag",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct ORMarketController.MarketVotersInfo",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isValidatingVoter",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "power",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "voteFlag",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint8",
                            "name": "selection",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "insertedFlag",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct ORMarketController.MarketVotersInfo",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "marketDisputePeriod",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "marketDisputers",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "marketDisputersInfo",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "reason",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "marketMinShareLiq",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "marketReCastResolvingPeriod",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "marketResolvingVoters",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "marketResolvingVotersInfo",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "power",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "voteFlag",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "selection",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "insertedFlag",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "marketValidatingPeriod",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "marketValidatingVoters",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "marketValidatingVotersInfo",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "power",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "voteFlag",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "selection",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "insertedFlag",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "payoutsAction",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract CentralTimeForTesting",
                    "name": "_centralTimeForTesting",
                    "type": "address"
                }
            ],
            "name": "setCentralTimeForTesting",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "t",
                    "type": "uint256"
                }
            ],
            "name": "setDisputeThreshold",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "p",
                    "type": "uint256"
                }
            ],
            "name": "setMarketDisputePeriod",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "minLiq",
                    "type": "uint256"
                }
            ],
            "name": "setMarketMinShareLiq",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "p",
                    "type": "uint256"
                }
            ],
            "name": "setMarketReCastResolvingPeriod",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "p",
                    "type": "uint256"
                }
            ],
            "name": "setMarketValidatingPeriod",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "power",
                    "type": "uint256"
                }
            ],
            "name": "setPower",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "power",
                    "type": "uint256"
                }
            ],
            "name": "setSenderPower",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "withdrawGovernanceResolvingVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "withdrawGovernanceValidatingVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const addresses = {
        1: ConfigHelper.getContractsAddresses().governance,
        3: ConfigHelper.getContractsAddresses().governance,
    };

    return new web3.eth.Contract(
        abi,
        chainId === 1 ? addresses["1"] : addresses["3"]
    );
};
