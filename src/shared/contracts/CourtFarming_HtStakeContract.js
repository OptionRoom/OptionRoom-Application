export const getCourtFarming_HtStakeContract = (chainId, web3) => {
    const ropstenContract = {
        address: "0x28aBa35A0D432b307Fc4ac41C2EB6881C2DDFc75",
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
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                ],
                name: "ClaimIncentiveReward",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                ],
                name: "ClaimReward",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "oldAddress",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "address",
                        name: "newAddress",
                        type: "address",
                    },
                ],
                name: "CourtStakeChanged",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "rewardPerBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "rewardFinishBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "incvRewardPerBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "incvRewardFinsishBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "incvLockTime",
                        type: "uint256",
                    },
                ],
                name: "StakeParametersChanged",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "lockTime",
                        type: "uint256",
                    },
                ],
                name: "StakeRewards",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "Staked",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "Unstaked",
                type: "event",
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
                name: "blockNumber",
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
                        internalType: "uint256",
                        name: "totalRewards",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardsPeriodInDays",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvTotalRewards",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardsPeriodInDays",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "iLockTime",
                        type: "uint256",
                    },
                ],
                name: "changeStakeParameters",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: false,
                inputs: [],
                name: "claimIncvReward",
                outputs: [
                    {
                        internalType:
                            "enum CourtFarming_ROOMLPStake.TransferRewardState",
                        name: "",
                        type: "uint8",
                    },
                ],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: false,
                inputs: [],
                name: "claimReward",
                outputs: [
                    {
                        internalType:
                            "enum CourtFarming_ROOMLPStake.TransferRewardState",
                        name: "",
                        type: "uint8",
                    },
                ],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "courtStakeAddress",
                outputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "courtToken",
                outputs: [
                    {
                        internalType: "contract IMERC20",
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
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "expectedRewardsToday",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvReward",
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
                name: "finishBlock",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: false,
                inputs: [{ internalType: "bool", name: "flag", type: "bool" }],
                name: "frezeBlock",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: false,
                inputs: [
                    { internalType: "uint256", name: "count", type: "uint256" },
                ],
                name: "increaseBlock",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "incvFinishBlock",
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
                name: "incvLockTime",
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
                name: "incvRewardInfo",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "cBlockNumber",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardPerBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardFinishBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardFinishTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardLockTime",
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
                name: "isTimeFrerzed",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "lastUpdateBlock",
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
                name: "owner",
                outputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "rewardInfo",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "cBlockNumber",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardPerBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardFinishBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardFinishTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardLockTime",
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
                name: "rewards",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvReward",
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
                        name: "courtStakeAdd",
                        type: "address",
                    },
                ],
                name: "setCourtStake",
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
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "stake",
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
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "stakeIncRewards",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
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
                name: "stakeRewards",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "stakedToken",
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
                name: "timeFrezed",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "totalStaked",
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
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    { internalType: "bool", name: "claim", type: "bool" },
                ],
                name: "unstake",
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
                        name: "account",
                        type: "address",
                    },
                ],
                name: "updateReward",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
        ],
    };

    const mainContract = {
        address: "0x56cA5FAF9F40254e093D99B6381ccce8D8d78212",
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
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                ],
                name: "ClaimIncentiveReward",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                ],
                name: "ClaimReward",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "oldAddress",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "address",
                        name: "newAddress",
                        type: "address",
                    },
                ],
                name: "CourtStakeChanged",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "rewardPerBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "rewardFinishBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "incvRewardPerBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "incvRewardFinsishBlock",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "incvLockTime",
                        type: "uint256",
                    },
                ],
                name: "StakeParametersChanged",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "lockTime",
                        type: "uint256",
                    },
                ],
                name: "StakeRewards",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "Staked",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "user",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "Unstaked",
                type: "event",
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
                name: "blockNumber",
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
                        internalType: "uint256",
                        name: "totalRewards",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardsPeriodInDays",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvTotalRewards",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardsPeriodInDays",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "iLockTime",
                        type: "uint256",
                    },
                ],
                name: "changeStakeParameters",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: false,
                inputs: [],
                name: "claimIncvReward",
                outputs: [
                    {
                        internalType:
                            "enum CourtFarming_ROOMLPStake.TransferRewardState",
                        name: "",
                        type: "uint8",
                    },
                ],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: false,
                inputs: [],
                name: "claimReward",
                outputs: [
                    {
                        internalType:
                            "enum CourtFarming_ROOMLPStake.TransferRewardState",
                        name: "",
                        type: "uint8",
                    },
                ],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "courtStakeAddress",
                outputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "courtToken",
                outputs: [
                    {
                        internalType: "contract IMERC20",
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
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "expectedRewardsToday",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvReward",
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
                name: "finishBlock",
                outputs: [
                    { internalType: "uint256", name: "", type: "uint256" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: false,
                inputs: [{ internalType: "bool", name: "flag", type: "bool" }],
                name: "frezeBlock",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: false,
                inputs: [
                    { internalType: "uint256", name: "count", type: "uint256" },
                ],
                name: "increaseBlock",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "incvFinishBlock",
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
                name: "incvLockTime",
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
                name: "incvRewardInfo",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "cBlockNumber",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardPerBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardFinishBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardFinishTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvRewardLockTime",
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
                name: "isTimeFrerzed",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "lastUpdateBlock",
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
                name: "owner",
                outputs: [
                    { internalType: "address", name: "", type: "address" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "rewardInfo",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "cBlockNumber",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardPerBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardFinishBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardFinishTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardLockTime",
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
                name: "rewards",
                outputs: [
                    {
                        internalType: "uint256",
                        name: "reward",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "incvReward",
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
                        name: "courtStakeAdd",
                        type: "address",
                    },
                ],
                name: "setCourtStake",
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
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "stake",
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
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "stakeIncRewards",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
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
                name: "stakeRewards",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "stakedToken",
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
                name: "timeFrezed",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "totalStaked",
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
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    { internalType: "bool", name: "claim", type: "bool" },
                ],
                name: "unstake",
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
                        name: "account",
                        type: "address",
                    },
                ],
                name: "updateReward",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
        ],
    };

    const contract = chainId === 1 ? mainContract : ropstenContract;

    return new web3.eth.Contract(contract.abi, contract.address);
};
