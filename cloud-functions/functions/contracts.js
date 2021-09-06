exports.getMarketControllerContract = function (web3) {
    const marketControllerAbi = [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "contract ORFPMarket",
                    "name": "fixedProductMarketMaker",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "contract ConditionalTokens",
                    "name": "conditionalTokens",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bytes32[]",
                    "name": "conditionIds",
                    "type": "bytes32[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                }
            ],
            "name": "FixedProductMarketMakerCreation",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "oldGuardianAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newGuardianAddress",
                    "type": "address"
                }
            ],
            "name": "GovernorTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "oldGuardianAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newGuardianAddress",
                    "type": "address"
                }
            ],
            "name": "GuardianTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "market",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "investmentAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "outcomeIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "outcomeTokensBought",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "MCBuy",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "market",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "returnAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "outcomeIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "outcomeTokensSold",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "MCSell",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "FeeProposer",
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
            "name": "FeeProtocol",
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
            "name": "RP",
            "outputs": [
                {
                    "internalType": "contract IRewardProgram",
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
            "inputs": [],
            "name": "buyRoomThreshold",
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
            "name": "ct",
            "outputs": [
                {
                    "internalType": "contract ConditionalTokens",
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
            "constant": true,
            "inputs": [],
            "name": "feeMarketLP",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "fpMarkets",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket",
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
            "inputs": [],
            "name": "getAllMarkets",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAllMarketsCount",
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
            "name": "governorAddress",
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
            "inputs": [],
            "name": "guardianAddress",
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
            "inputs": [],
            "name": "implementationMaster",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket",
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
            "inputs": [],
            "name": "marketCreationFees",
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
            "constant": true,
            "inputs": [],
            "name": "marketsCount",
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
            "name": "marketsLiquidityByUser",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "marketsProposedByUser",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "marketsTradeByUser",
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
            "inputs": [],
            "name": "orGovernor",
            "outputs": [
                {
                    "internalType": "contract IORGovernor",
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
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "proposalIds",
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
            "inputs": [],
            "name": "rewardCenterAddress",
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
            "inputs": [],
            "name": "roomOracleAddress",
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
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newGovernorAddress",
                    "type": "address"
                }
            ],
            "name": "transferGovernor",
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
                    "name": "newGuardianAddress",
                    "type": "address"
                }
            ],
            "name": "transferGuardian",
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
            "name": "payoutsAction",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
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
                }
            ],
            "name": "withdrawGovernanceValidatingVote",
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
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "marketQuestionID",
                    "type": "string"
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
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "initialLiq",
                    "type": "uint256"
                }
            ],
            "name": "createMarketProposal",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
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
                    "name": "market",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "marketAddLiquidity",
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
                    "name": "market",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "sharesAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "autoMerg",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "withdrawFees",
                    "type": "bool"
                }
            ],
            "name": "marketRemoveLiquidity",
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
                    "name": "market",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "investmentAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "outcomeIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minOutcomeTokensToBu",
                    "type": "uint256"
                }
            ],
            "name": "marketBuy",
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
                    "name": "market",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "marketSell",
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
                    "name": "erc20Address",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "withdrawFees",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "trader",
                    "type": "address"
                }
            ],
            "name": "getMarketsCountByTrader",
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
                    "name": "trader",
                    "type": "address"
                }
            ],
            "name": "getMarketsByTrader",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
                    "name": "templateAddress",
                    "type": "address"
                }
            ],
            "name": "setTemplateAddress",
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
                    "name": "orGovernorAddress",
                    "type": "address"
                }
            ],
            "name": "setIORGoverner",
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
                    "name": "rewardProgramAddress",
                    "type": "address"
                }
            ],
            "name": "setRewardProgram",
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
                    "name": "conditionalTokensAddress",
                    "type": "address"
                }
            ],
            "name": "setConditionalToken",
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
                    "name": "newAddress",
                    "type": "address"
                }
            ],
            "name": "setRoomoracleAddress",
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
                    "name": "newAddress",
                    "type": "address"
                }
            ],
            "name": "setRewardCenter",
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
                    "name": "roomAddres",
                    "type": "address"
                }
            ],
            "name": "setRoomAddress",
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
                    "name": "newfees",
                    "type": "uint256"
                }
            ],
            "name": "setMarketCreationFees",
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
                    "name": "numerator",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "denominator",
                    "type": "uint256"
                }
            ],
            "name": "setFeeMarketLP",
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
                    "name": "numerator",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "denominator",
                    "type": "uint256"
                }
            ],
            "name": "setFeeProtocol",
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
                    "name": "numerator",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "denominator",
                    "type": "uint256"
                }
            ],
            "name": "setFeeProposer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "plentyFlag",
                    "type": "bool"
                }
            ],
            "name": "setpenaltyOnWrongResolving",
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
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "allowdFlag",
                    "type": "bool"
                }
            ],
            "name": "setCollateralAllowed",
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
                    "name": "market",
                    "type": "address"
                }
            ],
            "name": "marketStop",
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
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "setBuyRoomThreshold",
            "outputs": [],
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
        }
    ];

    const marketController = new web3.eth.Contract(marketControllerAbi,'0xC3B6D447D5d8869e4Eb1423bA5B8d0d6aFD7B6f6');

    return marketController;
}

exports.getMarketQueryContract = function (web3) {
    const contractAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "oldGuardianAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newGuardianAddress",
                    "type": "address"
                }
            ],
            "name": "GovernorTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "oldGuardianAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newGuardianAddress",
                    "type": "address"
                }
            ],
            "name": "GuardianTransferred",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "marketQuestionID",
                    "type": "string"
                }
            ],
            "name": "getMarket",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket",
                    "name": "market",
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
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getMarketCountByProposer",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "marketsByProposerCount",
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
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                }
            ],
            "name": "getMarketCountByProposerNState",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "marketstByProposerNStateCount",
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
                    "name": "trader",
                    "type": "address"
                }
            ],
            "name": "getMarketCountByTrader",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "marketsCountByTrader",
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
                    "name": "trader",
                    "type": "address"
                },
                {
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                }
            ],
            "name": "getMarketCountByTraderNState",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "marketCountByTraderNState",
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
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarkets",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
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
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsByProposer",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
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
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsByProposerNState",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
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
                    "name": "trader",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsByTrader",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
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
                    "name": "trader",
                    "type": "address"
                },
                {
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsByTraderNState",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
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
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                }
            ],
            "name": "getMarketsCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "marketsInStateCount",
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
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsQuestionIDs",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
                },
                {
                    "internalType": "string[]",
                    "name": "questionsIDs",
                    "type": "string[]"
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
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsQuestionIDsByProposer",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
                },
                {
                    "internalType": "string[]",
                    "name": "questionsIDs",
                    "type": "string[]"
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
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsQuestionIDsByProposerNState",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
                },
                {
                    "internalType": "string[]",
                    "name": "questionsIDs",
                    "type": "string[]"
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
                    "name": "trader",
                    "type": "address"
                },
                {
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "startIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "int256",
                    "name": "length",
                    "type": "int256"
                }
            ],
            "name": "getMarketsQuestionIDsByTraderNState",
            "outputs": [
                {
                    "internalType": "contract ORFPMarket[]",
                    "name": "markets",
                    "type": "address[]"
                },
                {
                    "internalType": "string[]",
                    "name": "questionsIDs",
                    "type": "string[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "governorAddress",
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
            "inputs": [],
            "name": "guardianAddress",
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
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketController",
                    "type": "address"
                }
            ],
            "name": "setMarketsController",
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
                    "name": "newGovernorAddress",
                    "type": "address"
                }
            ],
            "name": "transfeerGovernor",
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
                    "name": "newGuardianAddress",
                    "type": "address"
                }
            ],
            "name": "transfeerGuardian",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    return new web3.eth.Contract(contractAbi,'0x84287DD628f72Ce344524Dc31F9aD953BA42cD63');
}

exports.getMarketContract = function(web3, marketAddress){
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "investmentAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "feeAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "outcomeIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "outcomeTokensBought",
                    "type": "uint256"
                }
            ],
            "name": "FPMMBuy",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "funder",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "amountsAdded",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "sharesMinted",
                    "type": "uint256"
                }
            ],
            "name": "FPMMFundingAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "funder",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "amountsRemoved",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "collateralRemovedFromFeePool",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "sharesBurnt",
                    "type": "uint256"
                }
            ],
            "name": "FPMMFundingRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "returnAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "feeAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "outcomeIndex",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "outcomeTokensSold",
                    "type": "uint256"
                }
            ],
            "name": "FPMMSell",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidity",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
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
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
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
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
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
                    "internalType": "uint256",
                    "name": "investmentAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "outcomeIndex",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minOutcomeTokensToBuy",
                    "type": "uint256"
                }
            ],
            "name": "buy",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "investmentAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "outcomeIndex",
                    "type": "uint256"
                }
            ],
            "name": "calcBuyAmount",
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
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "inputIndex",
                    "type": "uint256"
                }
            ],
            "name": "calcSellReturnInv",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "ret",
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
            "name": "collateralToken",
            "outputs": [
                {
                    "internalType": "contract IERC20",
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
            "inputs": [],
            "name": "collectedFees",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "conditionIds",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "conditionalTokens",
            "outputs": [
                {
                    "internalType": "contract ConditionalTokens",
                    "name": "",
                    "type": "address"
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
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "fee",
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
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "feesWithdrawableBy",
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
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getBalances",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getConditionalTokenAddress",
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
            "inputs": [],
            "name": "getIndexSet",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "indexSet",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getMarketCollateralTotalSupply",
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
            "name": "getMarketQuestionID",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
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
            "name": "getPercentage",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "percentage",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getPositionIds",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
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
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getSharesPercentage",
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
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
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
                    "internalType": "contract ConditionalTokens",
                    "name": "_conditionalTokens",
                    "type": "address"
                },
                {
                    "internalType": "contract IERC20",
                    "name": "_collateralToken",
                    "type": "address"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "_conditionIds",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "uint256",
                    "name": "_fee",
                    "type": "uint256"
                }
            ],
            "name": "init",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "marketController",
            "outputs": [
                {
                    "internalType": "contract IORMarketController",
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
            "inputs": [],
            "name": "marketQuestionID",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "merge",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "minShareLiq",
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
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "name": "onERC1155BatchReceived",
            "outputs": [
                {
                    "internalType": "bytes4",
                    "name": "",
                    "type": "bytes4"
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
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "name": "onERC1155Received",
            "outputs": [
                {
                    "internalType": "bytes4",
                    "name": "",
                    "type": "bytes4"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "proposer",
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
            "inputs": [],
            "name": "questionId",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
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
                    "internalType": "uint256",
                    "name": "shares",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "autoMerge",
                    "type": "bool"
                }
            ],
            "name": "removeLiquidity",
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
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "sell",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_marketQuestionID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_proposer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_governor",
                    "type": "address"
                },
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
                },
                {
                    "internalType": "bytes32",
                    "name": "_questionId",
                    "type": "bytes32"
                }
            ],
            "name": "setConfig",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "state",
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
            "constant": true,
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
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
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
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
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
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
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "withdrawFees",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    return new web3.eth.Contract(abi, marketAddress);
}
