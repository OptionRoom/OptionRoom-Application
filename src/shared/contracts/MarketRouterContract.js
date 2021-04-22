export const getMarketRouterContract = (chainId, web3) => {
    const abi = [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "creator",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "contract ORFPMarket",
                    name: "fixedProductMarketMaker",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "contract ConditionalTokens",
                    name: "conditionalTokens",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "contract IERC20",
                    name: "collateralToken",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "bytes32[]",
                    name: "conditionIds",
                    type: "bytes32[]",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "fee",
                    type: "uint256",
                },
            ],
            name: "FixedProductMarketMakerCreation",
            type: "event",
        },
        {
            constant: true,
            inputs: [],
            name: "collateralToken",
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
            constant: false,
            inputs: [
                {
                    internalType: "string",
                    name: "marketQuestion",
                    type: "string",
                },
                {
                    internalType: "uint256",
                    name: "participationEndTime",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "resolvingPeriodInDays",
                    type: "uint256",
                },
            ],
            name: "createMarketProposal",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "ct",
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
            name: "getMarkets",
            outputs: [
                {
                    internalType: "contract ORFPMarket[]",
                    name: "",
                    type: "address[]",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "implementationMaster",
            outputs: [
                {
                    internalType: "contract ORFPMarket",
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
            constant: true,
            inputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            name: "markets",
            outputs: [
                {
                    internalType: "contract ORFPMarket",
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
            name: "marketsCount",
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
                    internalType: "bytes32",
                    name: "",
                    type: "bytes32",
                },
            ],
            name: "proposalIds",
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
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "a",
                    type: "address",
                },
            ],
            name: "setA0",
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
                    name: "a",
                    type: "address",
                },
            ],
            name: "setA1",
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
                    name: "a",
                    type: "address",
                },
            ],
            name: "setA2",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const addresses = {
        1: "0x5519D8c8ecC71C4a85168F852B8C089a198D9e05",
        3: "0x5519D8c8ecC71C4a85168F852B8C089a198D9e05",
    };

    return new web3.eth.Contract(
        abi,
        chainId === 1 ? addresses["1"] : addresses["3"]
    );
};
