export const getCourtFarming_MatterStakeContract = (chainId, web3) => {
    const abi = [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }],
            "name": "ClaimIncentiveReward",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
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
                "internalType": "address",
                "name": "oldAddress",
                "type": "address"
            }, {"indexed": false, "internalType": "address", "name": "newAddress", "type": "address"}],
            "name": "CourtStakeChanged",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "internalType": "uint256",
                "name": "incvRewardPerBlock",
                "type": "uint256"
            }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "incvRewardFinsishBlock",
                "type": "uint256"
            }, {"indexed": false, "internalType": "uint256", "name": "incvLockTime", "type": "uint256"}],
            "name": "StakeParametersChanged",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }, {"indexed": false, "internalType": "uint256", "name": "lockTime", "type": "uint256"}],
            "name": "StakeRewards",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "Staked",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "Unstaked",
            "type": "event"
        }, {
            "constant": true,
            "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "blockNumber",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "internalType": "uint256",
                "name": "incvRewardsPerBlock",
                "type": "uint256"
            }, {
                "internalType": "uint256",
                "name": "incvRewardsPeriodInDays",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "iLockTime", "type": "uint256"}],
            "name": "changeStakeParameters",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "courtStakeAddress",
            "outputs": [{"internalType": "address", "name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "courtToken",
            "outputs": [{"internalType": "contract IMERC20", "name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
            "name": "expectedRewardsToday",
            "outputs": [{"internalType": "uint256", "name": "reward", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "incvReward",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"internalType": "address", "name": "ibeneficiary", "type": "address"}],
            "name": "getBeneficiaryInfo",
            "outputs": [{"internalType": "address", "name": "beneficiary", "type": "address"}, {
                "internalType": "uint256",
                "name": "totalLocked",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "withdrawn", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "releasableAmount",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "nextBatchTime", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "currentTime",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "getCurrentTime",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "incvBatchCount",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "incvBatchPeriod",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "incvFinishBlock",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "incvRewardClaim",
            "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "incvRewardInfo",
            "outputs": [{"internalType": "uint256", "name": "cBlockNumber", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "incvRewardPerBlock",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "incvRewardFinishBlock", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "incvRewardFinishTime",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "incvRewardLockTime", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "incvStartReleasingTime",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"internalType": "address", "name": "", "type": "address"}],
            "name": "incvWithdrawn",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "lastUpdateBlock",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [{"internalType": "address", "name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
            "name": "rewards",
            "outputs": [{"internalType": "uint256", "name": "reward", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "incvReward",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"internalType": "address", "name": "courtStakeAdd", "type": "address"}],
            "name": "setCourtStake",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
            "name": "stake",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
            "name": "stakeIncvRewards",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "stakedToken",
            "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalStaked",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {
                "internalType": "bool",
                "name": "claim",
                "type": "bool"
            }],
            "name": "unstake",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
            "name": "updateReward",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }];
    const contractAddress = chainId === 1 ? "0x3bF32bb284a038Fd40E6DC022fddc87F894bF148" : "0x564EbfCA1b15103319809c296CCD382c88d8fc89";
    return new web3.eth.Contract(abi, contractAddress);
};
