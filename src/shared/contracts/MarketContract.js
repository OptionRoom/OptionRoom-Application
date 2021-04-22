export const getMarketContract = (web3, marketId, wallet) => {
    const abi = [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "buyer",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "investmentAmount",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "feeAmount",
                    type: "uint256",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "outcomeTokensBought",
                    type: "uint256",
                },
            ],
            name: "FPMMBuy",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "funder",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256[]",
                    name: "amountsAdded",
                    type: "uint256[]",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "sharesMinted",
                    type: "uint256",
                },
            ],
            name: "FPMMFundingAdded",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "funder",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256[]",
                    name: "amountsRemoved",
                    type: "uint256[]",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "collateralRemovedFromFeePool",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "sharesBurnt",
                    type: "uint256",
                },
            ],
            name: "FPMMFundingRemoved",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "seller",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "returnAmount",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "feeAmount",
                    type: "uint256",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "outcomeTokensSold",
                    type: "uint256",
                },
            ],
            name: "FPMMSell",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            constant: true,
            inputs: [],
            name: "ORGovernance",
            outputs: [
                {
                    internalType: "contract IORGovernance",
                    name: "",
                    type: "address",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "addLiquidity",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
            ],
            name: "allowance",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "approve",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "bool",
                    name: "approve",
                    type: "bool",
                },
            ],
            name: "approveMarket",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "approveVotesCount",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "balanceOf",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "investmentAmount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "minOutcomeTokensToBuy",
                    type: "uint256",
                },
            ],
            name: "buy",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "uint256",
                    name: "investmentAmount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                },
            ],
            name: "calcBuyAmount",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "inputIndex",
                    type: "uint256",
                },
            ],
            name: "calcSellReturnInv",
            outputs: [
                {
                    internalType: "uint256",
                    name: "ret",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "collateralToken",
            outputs: [
                {
                    internalType: "contract IERC20",
                    name: "",
                    type: "address",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "collectedFees",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            name: "conditionIds",
            outputs: [
                {
                    internalType: "bytes32",
                    name: "",
                    type: "bytes32",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "conditionalTokens",
            outputs: [
                {
                    internalType: "contract ConditionalTokens",
                    name: "",
                    type: "address",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "createdTime",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "subtractedValue",
                    type: "uint256",
                },
            ],
            name: "decreaseAllowance",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "fee",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "feesWithdrawableBy",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "getBalances",
            outputs: [
                {
                    internalType: "uint256[]",
                    name: "",
                    type: "uint256[]",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getCurrentState",
            outputs: [
                {
                    internalType: "enum ORFPMarket.MarketState",
                    name: "yes",
                    type: "uint8",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getCurrentTime",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getIndexSet",
            outputs: [
                {
                    internalType: "uint256[]",
                    name: "indexSet",
                    type: "uint256[]",
                },
            ],
            payable: false,
            stateMutability: "pure",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getPercentage",
            outputs: [
                {
                    internalType: "uint256[]",
                    name: "percentage",
                    type: "uint256[]",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getPositionIds",
            outputs: [
                {
                    internalType: "uint256[]",
                    name: "",
                    type: "uint256[]",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getResolvingOutcome",
            outputs: [
                {
                    internalType: "uint256[]",
                    name: "indexSet",
                    type: "uint256[]",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "getVotingPeriod",
            outputs: [
                {
                    internalType: "uint256",
                    name: "time",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "addedValue",
                    type: "uint256",
                },
            ],
            name: "increaseAllowance",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "t",
                    type: "uint256",
                },
            ],
            name: "increaseTime",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "contract ConditionalTokens",
                    name: "_conditionalTokens",
                    type: "address",
                },
                {
                    internalType: "contract IERC20",
                    name: "_collateralToken",
                    type: "address",
                },
                {
                    internalType: "bytes32[]",
                    name: "_conditionIds",
                    type: "bytes32[]",
                },
                {
                    internalType: "uint256",
                    name: "_fee",
                    type: "uint256",
                },
            ],
            name: "init",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "string",
                    name: "_marketQuestion",
                    type: "string",
                },
                {
                    internalType: "address",
                    name: "_proposer",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_createdTime",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_participationEndTime",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_resolvingPeriod",
                    type: "uint256",
                },
                {
                    internalType: "address",
                    name: "_governance",
                    type: "address",
                },
                {
                    internalType: "bytes32",
                    name: "_questionId",
                    type: "bytes32",
                },
            ],
            name: "init2",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "marketQuestion",
            outputs: [
                {
                    internalType: "string",
                    name: "",
                    type: "string",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [],
            name: "merge",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "operator",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "from",
                    type: "address",
                },
                {
                    internalType: "uint256[]",
                    name: "",
                    type: "uint256[]",
                },
                {
                    internalType: "uint256[]",
                    name: "",
                    type: "uint256[]",
                },
                {
                    internalType: "bytes",
                    name: "",
                    type: "bytes",
                },
            ],
            name: "onERC1155BatchReceived",
            outputs: [
                {
                    internalType: "bytes4",
                    name: "",
                    type: "bytes4",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "operator",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
                {
                    internalType: "bytes",
                    name: "",
                    type: "bytes",
                },
            ],
            name: "onERC1155Received",
            outputs: [
                {
                    internalType: "bytes4",
                    name: "",
                    type: "bytes4",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "participationEndTime",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "proposer",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "questionId",
            outputs: [
                {
                    internalType: "bytes32",
                    name: "",
                    type: "bytes32",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "rejectVotesCount",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "shares",
                    type: "uint256",
                },
            ],
            name: "removeLiquidity",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [],
            name: "resetCurrentTime",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                },
            ],
            name: "resolvingMarket",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "resolvingPeriod",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            name: "resolvingVotes",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "index",
                    type: "uint256",
                },
            ],
            name: "sell",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "state",
            outputs: [
                {
                    internalType: "enum ORFPMarket.MarketState",
                    name: "",
                    type: "uint8",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "bytes4",
                    name: "interfaceId",
                    type: "bytes4",
                },
            ],
            name: "supportsInterface",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "transfer",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "sender",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "transferFrom",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "votingPeriod",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "withdrawFees",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    return new web3.eth.Contract(abi, marketId);
};
