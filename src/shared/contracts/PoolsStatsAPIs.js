import { BigNumber } from "@ethersproject/bignumber";
import { walletHelper } from "../wallet.helper";
import { getRoomTokenContract } from './RoomTokenContract';
import { getRoomLPTokenContract } from './RoomLPTokenContract';
import { getRoomLPStakingContract } from './RoomLPStakingContract';
import { getNftStakeContract } from './NftStakeContract';
import { getNftTokenContract } from './NftTokenContract';
import { getWethTokenContract } from './WethTokenContract';
import { getTetherTokenContract } from './TetherTokenContract';

const walletHelperInstance = walletHelper();

export const getWethPrice = async (address) => {
    const result = await getTetherTokenContract(1, walletHelperInstance.getWeb3())
        .methods
        .balanceOf('0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852')
        .call({
            from: address
        });

    const result2 = await getWethTokenContract(1, walletHelperInstance.getWeb3())
        .methods
        .balanceOf('0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852')
        .call({
            from: address
        });

    const usdt = BigNumber.from(result);
    const ethPrice = (usdt / 1e6) / (result2 / 1e18);

    return ethPrice;
}

export const getRoomLpTokenValue = async (address) => {
    const totalLiquidity = await getTotalLiquidity(address);
    const totalSupplyOfLp = await getRoomLPTokenContract(1, walletHelperInstance.getWeb3())
        .methods
        .totalSupply()
        .call({
            from: address
        });
    const lpTokenValue = totalLiquidity / (totalSupplyOfLp / 1e18);
    return lpTokenValue;
}

export const getTotalValueLocked = async (address) => {
    const lpTokenValue = await getRoomLpTokenValue(address);

    const lockedLpTokens = await getRoomLPStakingContract(1, walletHelperInstance.getWeb3())
        .methods
        .totalStaked()
        .call({
            from: address
        });

    return lpTokenValue * (lockedLpTokens / 1e18);
}

export const getRoomTokenPrice = async (address) => {
    const wethPrice = await getWethPrice(address);
    //0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732 = Room_RoomEthLpStake
    const ethInLpContract = await getWethTokenContract(1, walletHelperInstance.getWeb3())
        .methods
        .balanceOf('0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732')
        .call({
            from: address
        });

    const roomInLpContract = await getRoomTokenContract(1, walletHelperInstance.getWeb3())
        .methods
        .balanceOf('0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732')
        .call({
            from: address
        });

    const roomPrice = (ethInLpContract / roomInLpContract) * wethPrice;
    return roomPrice;
}

export const getLpApy = async (address) => {
    //(40,000 * 12 * Room Price) / (LP Locked * LP Token Value) * 100
    const roomPrice = await getRoomTokenPrice(address);
    const lockedLpTokens = await getRoomLPStakingContract(1, walletHelperInstance.getWeb3())
        .methods
        .totalStaked()
        .call({
            from: address
        });
    const roomLpTokenValue = await getRoomLpTokenValue(address);
    return (40000 * 12 * roomPrice) / ((lockedLpTokens / 1e18) * roomLpTokenValue) * 100;
}

export const getTotalValueStakedInNftStakingInUsd = async (address, poolId) => {
    const getAt = (poolId) => {
        if (poolId === 0) {
            return 50000 * 2;
        }

        if (poolId === 1) {
            return 49600 * 2;
        }

        if (poolId === 2) {
            return 44400 * 2;
        }

        if (poolId === 3) {
            return 36000 * 2;
        }

        return 20000 * 2;

    };

    const result = await getNftStakeContract(1, walletHelperInstance.getWeb3())
        .methods
        .totalStaked(poolId)
        .call({
            from: address
        });

    const roomPrice = await getRoomTokenPrice(address);
    console.log("roomPrice222", roomPrice);
    return {
        totalStakedValue: (result / 1e18) * roomPrice,
        apy: (getAt(poolId) / (result / 1e18)) * 100
    }
}

export const getTotalLiquidity = async (address) => {
    //0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732 = this.roomLPTokenContract._address
    const ethInLpContract = await getWethTokenContract(1, walletHelperInstance.getWeb3())
        .methods
        .balanceOf('0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732')
        .call({
            from: address
        });

    const wethPrice = await getWethPrice(address);
    const totalLiquidity = (ethInLpContract / 1e18) * wethPrice * 2;
    return totalLiquidity;
}