import ConfigHelper from '../config.helper';

export const getMarketRouterContract = (chainId, web3) => {
    const abi = [
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
            "constant": true,
            "inputs": [],
            "name": "collateralToken",
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
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
                    "internalType": "enum ORMarketLib.MarketState",
                    "name": "marketState",
                    "type": "uint8"
                }
            ],
            "name": "getMarketsCount",
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
                    "name": "marketStat",
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
                    "name": "a",
                    "type": "address"
                }
            ],
            "name": "setA0",
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
                    "name": "a",
                    "type": "address"
                }
            ],
            "name": "setA1",
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
                    "name": "a",
                    "type": "address"
                }
            ],
            "name": "setA2",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const addresses = {
        1: ConfigHelper.getContractsAddresses().marketRouter,
        3: ConfigHelper.getContractsAddresses().marketRouter,
    };

    return new web3.eth.Contract(
        abi,
        chainId === 1 ? addresses["1"] : addresses["3"]
    );
};
