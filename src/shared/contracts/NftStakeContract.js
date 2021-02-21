export const getNftStakeContract = (chainId, web3) => {

    const ropstenContract = {
        address: "0x45c3F9d0E0E46C8AdCDDBA76bEb4228E6788ff2B",
        abi: [{"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            }, {"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }],
            "name": "ClaimReward",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "enum RoomNFTStake.TransferRewardState",
                "name": "failure",
                "type": "uint8"
            }],
            "name": "RewardTransferFailed",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            }, {"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "Staked",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            }, {"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "Unstaked",
            "type": "event"
        }, {
            "inputs": [],
            "name": "NFTToken",
            "outputs": [{"internalType": "contract IERC1155", "name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}, {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "blockNumber",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "blockShift",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
            "name": "claimReward",
            "outputs": [{
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }, {"internalType": "enum RoomNFTStake.TransferRewardState", "name": "reason", "type": "uint8"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
            "name": "exit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "finishBlock",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "count", "type": "uint256"}],
            "name": "increaseBlockNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "name": "lastUpdateBlock",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
                "internalType": "address",
                "name": "",
                "type": "address"
            }, {"internalType": "uint256[]", "name": "", "type": "uint256[]"}, {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }, {"internalType": "bytes", "name": "", "type": "bytes"}],
            "name": "onERC1155BatchReceived",
            "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
                "internalType": "address",
                "name": "",
                "type": "address"
            }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }, {"internalType": "bytes", "name": "", "type": "bytes"}],
            "name": "onERC1155Received",
            "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}, {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }],
            "name": "rewards",
            "outputs": [{"internalType": "uint256", "name": "reward", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "roomToken",
            "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "roomTokenRewardsReservoirAddress",
            "outputs": [{"internalType": "address", "name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function"
        }, {
            "inputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
            "name": "supportsInterface",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
            "name": "totalStaked",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }, {"internalType": "bool", "name": "claim", "type": "bool"}],
            "name": "unstake",
            "outputs": [{
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }, {"internalType": "enum RoomNFTStake.TransferRewardState", "name": "reason", "type": "uint8"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}, {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }], "name": "updateReward", "outputs": [], "stateMutability": "nonpayable", "type": "function"
        }]

    };

    if (chainId === "main") {

    }

    return new web3.eth.Contract(
        ropstenContract.abi,
        ropstenContract.address
    );
}
