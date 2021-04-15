export const abi = [
    {
        constant: false,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "uint256", name: "dollarAmount", type: "uint256" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "addLiquidity",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "uint256", name: "index", type: "uint256" },
            { internalType: "uint256", name: "dollarAmount", type: "uint256" },
            { internalType: "address", name: "account", type: "address" },
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
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            {
                internalType: "uint256",
                name: "investmentAmount",
                type: "uint256",
            },
            { internalType: "uint256", name: "outcomeIndex", type: "uint256" },
        ],
        name: "calcBuyAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "uint256", name: "inputIndex", type: "uint256" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "calcSellReturnInv",
        outputs: [{ internalType: "uint256", name: "ret", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "uint256", name: "inputIndex", type: "uint256" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "calcSellReturnInv2",
        outputs: [
            { internalType: "uint256", name: "c", type: "uint256" },
            { internalType: "uint256", name: "m", type: "uint256" },
            { internalType: "uint256", name: "f", type: "uint256" },
            { internalType: "uint256", name: "np1", type: "uint256" },
            { internalType: "uint256", name: "ret", type: "uint256" },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "dollar_balance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "dollar_balanceList",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "balance",
                        type: "uint256",
                    },
                ],
                internalType: "struct testWrapper.account_balance[]",
                name: "dollarBalances",
                type: "tuple[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "dollar_mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "getConditionId",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "getMarket",
        outputs: [
            {
                internalType: "contract FixedProductMarketMaker",
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
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "isMarketCreated",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "marketCreate",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "redeem",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "uint256", name: "shareAmount", type: "uint256" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "removeLiquidity",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "uint256", name: "correctIndx", type: "uint256" },
        ],
        name: "resolve",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "uint256", name: "indx", type: "uint256" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "sell",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "share_balance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "share_balanceList",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "balance",
                        type: "uint256",
                    },
                ],
                internalType: "struct testWrapper.account_balance[]",
                name: "sharesBalances",
                type: "tuple[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "yesno_balance",
        outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "yesno_balanceList",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "holder",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "yesBalnce",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "noBalance",
                        type: "uint256",
                    },
                ],
                internalType: "struct testWrapper.tokenBalnce[]",
                name: "balancesList",
                type: "tuple[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "yesno_balancePool",
        outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "bytes32", name: "questionId", type: "bytes32" },
        ],
        name: "yesno_percentage",
        outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
];
export const address = "0xf73350947c70bd9bc78a52ff8210bd83d4049c08";
