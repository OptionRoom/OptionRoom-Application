export const getGovernanceContract = (chainId, web3) => {
    const abi = [
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "marketAddress",
                    type: "address",
                },
            ],
            name: "getInputsToResolve",
            outputs: [
                {
                    internalType: "contract ORConditionalTokens",
                    name: "orConditionalTokens",
                    type: "address",
                },
                {
                    internalType: "bytes32",
                    name: "questionId",
                    type: "bytes32",
                },
                {
                    internalType: "uint256[]",
                    name: "indices",
                    type: "uint256[]",
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
            name: "getPowerCount",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
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
                    name: "marketAddress",
                    type: "address",
                },
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
                {
                    internalType: "uint256",
                    name: "power",
                    type: "uint256",
                },
            ],
            name: "setPower",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const addresses = {
        1: "0x512e65b968e991749C3601Ea69F7ba28d29819AC",
        3: "0x512e65b968e991749C3601Ea69F7ba28d29819AC",
    };

    return new web3.eth.Contract(
        abi,
        chainId === 1 ? addresses["1"] : addresses["3"]
    );
};
