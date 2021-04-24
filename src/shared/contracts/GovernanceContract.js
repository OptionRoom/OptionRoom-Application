export const getGovernanceContract = (chainId, web3) => {
    const abi = [
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
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "marketAddress",
                    "type": "address"
                }
            ],
            "name": "resolveMarketAction",
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
        }
    ];

    const addresses = {
        1: "0x717aee66574a72d83b7AcfD1BB8fA5e0b0A0A64A",
        3: "0x717aee66574a72d83b7AcfD1BB8fA5e0b0A0A64A",
    };

    return new web3.eth.Contract(
        abi,
        chainId === 1 ? addresses["1"] : addresses["3"]
    );
};
