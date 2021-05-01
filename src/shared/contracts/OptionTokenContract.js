import ConfigHelper from "../config.helper";

export const getOptionTokenContract = (chainId, web3) => {
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
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "oracle",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "questionId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "outcomeSlotCount",
                    "type": "uint256"
                }
            ],
            "name": "ConditionPreparation",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "oracle",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "questionId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "outcomeSlotCount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "payoutNumerators",
                    "type": "uint256[]"
                }
            ],
            "name": "ConditionResolution",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "redeemer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "parentCollectionId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "indexSets",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "payout",
                    "type": "uint256"
                }
            ],
            "name": "PayoutRedemption",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "stakeholder",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "parentCollectionId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "partition",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PositionSplit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "stakeholder",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "parentCollectionId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "partition",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PositionsMerge",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
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
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "TransferBatch",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
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
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "TransferSingle",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "value",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "URI",
            "type": "event"
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
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
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
            "constant": true,
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "owners",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                }
            ],
            "name": "balanceOfBatch",
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
                    "internalType": "bytes32",
                    "name": "parentCollectionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "indexSet",
                    "type": "uint256"
                }
            ],
            "name": "getCollectionId",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "oracle",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "questionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "outcomeSlotCount",
                    "type": "uint256"
                }
            ],
            "name": "getConditionId",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                }
            ],
            "name": "getOutcomeSlotCount",
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
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "collectionId",
                    "type": "bytes32"
                }
            ],
            "name": "getPositionId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
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
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
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
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "parentCollectionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256[]",
                    "name": "partition",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mergePositions",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "name": "payoutDenominator",
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
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "payoutNumerators",
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
                    "name": "oracle",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "questionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "outcomeSlotCount",
                    "type": "uint256"
                }
            ],
            "name": "prepareCondition",
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
            "name": "redeem",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "parentCollectionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256[]",
                    "name": "indexSets",
                    "type": "uint256[]"
                }
            ],
            "name": "redeemPositions",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "questionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256[]",
                    "name": "payouts",
                    "type": "uint256[]"
                }
            ],
            "name": "reportPayouts",
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeBatchTransferFrom",
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
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
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "parentCollectionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "conditionId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256[]",
                    "name": "partition",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "splitPosition",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "totalBalances",
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

    const addresses = {
        1: ConfigHelper.getContractsAddresses().optionToken,
        3: ConfigHelper.getContractsAddresses().optionToken,
    };

    return new web3.eth.Contract(
        abi,
        chainId === 1 ? addresses["1"] : addresses["3"]
    );
};
