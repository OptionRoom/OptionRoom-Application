export const getMatterTokenContract = (chainId, web3) => {
    const ropstenContract = {
        address: "0x2d6cdf6f61eeda72971a69eaa4821827c56eba1a",
        abi: [
            {
                inputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "constructor",
            },
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
                inputs: [
                    { internalType: "address", name: "owner", type: "address" },
                    {
                        internalType: "address",
                        name: "spender",
                        type: "address",
                    },
                ],
                name: "allowance",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
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
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "decimals",
                outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "name",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "symbol",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "totalSupply",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
        ],
    };

    const mainContract = {
        address: "0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f",
        abi: [
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
                        indexed: false,
                        internalType: "uint256",
                        name: "fromChainId",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "signatory",
                        type: "address",
                    },
                ],
                name: "Authorize",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "signatory",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "decrement",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "quota",
                        type: "uint256",
                    },
                ],
                name: "DecreaseAuthQuota",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "previousGovernor",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "newGovernor",
                        type: "address",
                    },
                ],
                name: "GovernorshipTransferred",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "signatory",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "increment",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "quota",
                        type: "uint256",
                    },
                ],
                name: "IncreaseAuthQuota",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "fromChainId",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                ],
                name: "Receive",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "signatory",
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
                        name: "volume",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "chainId",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "txHash",
                        type: "uint256",
                    },
                ],
                name: "Redeem",
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
                        internalType: "uint256",
                        name: "toChainId",
                        type: "uint256",
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
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                ],
                name: "Send",
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
                        indexed: false,
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "chainId",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "to",
                        type: "address",
                    },
                ],
                name: "Stake",
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
                inputs: [],
                name: "DOMAIN_SEPARATOR",
                outputs: [
                    { internalType: "bytes32", name: "", type: "bytes32" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "DOMAIN_TYPEHASH",
                outputs: [
                    { internalType: "bytes32", name: "", type: "bytes32" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "PERMIT_TYPEHASH",
                outputs: [
                    { internalType: "bytes32", name: "", type: "bytes32" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "RECEIVE_TYPEHASH",
                outputs: [
                    { internalType: "bytes32", name: "", type: "bytes32" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "REDEEM_TYPEHASH",
                outputs: [
                    { internalType: "bytes32", name: "", type: "bytes32" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "governor_",
                        type: "address",
                    },
                ],
                name: "__Governable_init_unchained",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "governor_",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "offering_",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "public_",
                        type: "address",
                    },
                    { internalType: "address", name: "team_", type: "address" },
                    { internalType: "address", name: "fund_", type: "address" },
                    { internalType: "address", name: "mine_", type: "address" },
                    {
                        internalType: "address",
                        name: "liquidity_",
                        type: "address",
                    },
                ],
                name: "__MATTER_init",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "offering_",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "public_",
                        type: "address",
                    },
                    { internalType: "address", name: "team_", type: "address" },
                    { internalType: "address", name: "fund_", type: "address" },
                    { internalType: "address", name: "mine_", type: "address" },
                    {
                        internalType: "address",
                        name: "liquidity_",
                        type: "address",
                    },
                ],
                name: "__MATTER_init_unchained",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "governor_",
                        type: "address",
                    },
                    { internalType: "string", name: "name_", type: "string" },
                    { internalType: "string", name: "symbol_", type: "string" },
                    { internalType: "uint8", name: "decimals_", type: "uint8" },
                ],
                name: "__MappableToken_init",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "__MappableToken_init_unchained",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "owner", type: "address" },
                    {
                        internalType: "address",
                        name: "spender",
                        type: "address",
                    },
                ],
                name: "allowance",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "signatory",
                        type: "address",
                    },
                ],
                name: "authQuotaOf",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                ],
                name: "balanceOf",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "decimals",
                outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
                stateMutability: "view",
                type: "function",
            },
            {
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "signatory",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "decrement",
                        type: "uint256",
                    },
                ],
                name: "decreaseAuthQuota",
                outputs: [
                    { internalType: "uint256", name: "quota", type: "uint256" },
                ],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "factory",
                outputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "key", type: "bytes32" },
                    { internalType: "address", name: "addr", type: "address" },
                ],
                name: "getConfig",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "key", type: "bytes32" },
                ],
                name: "getConfig",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "key", type: "bytes32" },
                    { internalType: "uint256", name: "index", type: "uint256" },
                ],
                name: "getConfig",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "governor",
                outputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "signatory",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "increment",
                        type: "uint256",
                    },
                ],
                name: "increaseAuthQuota",
                outputs: [
                    { internalType: "uint256", name: "quota", type: "uint256" },
                ],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "mainChainId",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "name",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                name: "nonces",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "owner", type: "address" },
                    {
                        internalType: "address",
                        name: "spender",
                        type: "address",
                    },
                    { internalType: "uint256", name: "value", type: "uint256" },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    { internalType: "uint8", name: "v", type: "uint8" },
                    { internalType: "bytes32", name: "r", type: "bytes32" },
                    { internalType: "bytes32", name: "s", type: "bytes32" },
                ],
                name: "permit",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "uint256",
                        name: "fromChainId",
                        type: "uint256",
                    },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "nonce", type: "uint256" },
                    {
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "signatory",
                                type: "address",
                            },
                            { internalType: "uint8", name: "v", type: "uint8" },
                            {
                                internalType: "bytes32",
                                name: "r",
                                type: "bytes32",
                            },
                            {
                                internalType: "bytes32",
                                name: "s",
                                type: "bytes32",
                            },
                        ],
                        internalType: "struct Signature[]",
                        name: "signatures",
                        type: "tuple[]",
                    },
                ],
                name: "receive",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                    { internalType: "address", name: "", type: "address" },
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                name: "received",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "authorizer",
                        type: "address",
                    },
                    { internalType: "address", name: "to", type: "address" },
                    {
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "chainId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "txHash",
                        type: "uint256",
                    },
                    { internalType: "uint8", name: "v", type: "uint8" },
                    { internalType: "bytes32", name: "r", type: "bytes32" },
                    { internalType: "bytes32", name: "s", type: "bytes32" },
                ],
                name: "redeem",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "to", type: "address" },
                    {
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "chainId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "txHash",
                        type: "uint256",
                    },
                ],
                name: "redeem",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                name: "redeemed",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "renounceGovernorship",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "uint256",
                        name: "toChainId",
                        type: "uint256",
                    },
                    { internalType: "address", name: "to", type: "address" },
                    {
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                ],
                name: "send",
                outputs: [
                    { internalType: "uint256", name: "nonce", type: "uint256" },
                ],
                stateMutability: "payable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    {
                        internalType: "uint256",
                        name: "toChainId",
                        type: "uint256",
                    },
                    { internalType: "address", name: "to", type: "address" },
                    {
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                ],
                name: "sendFrom",
                outputs: [
                    { internalType: "uint256", name: "nonce", type: "uint256" },
                ],
                stateMutability: "payable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                    { internalType: "address", name: "", type: "address" },
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                name: "sent",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                    { internalType: "address", name: "", type: "address" },
                ],
                name: "sentCount",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "key", type: "bytes32" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                ],
                name: "setConfig",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "key", type: "bytes32" },
                    { internalType: "address", name: "addr", type: "address" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                ],
                name: "setConfig",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "key", type: "bytes32" },
                    { internalType: "uint256", name: "index", type: "uint256" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                ],
                name: "setConfig",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "uint256",
                        name: "volume",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "chainId",
                        type: "uint256",
                    },
                    { internalType: "address", name: "to", type: "address" },
                ],
                name: "stake",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "symbol",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "token",
                outputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "totalMapped",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "totalSupply",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
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
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "newGovernor",
                        type: "address",
                    },
                ],
                name: "transferGovernorship",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
        ],
    };

    const contract = chainId === 1 ? mainContract : ropstenContract;

    return new web3.eth.Contract(
        contract.abi,
        contract.address
    );
}
