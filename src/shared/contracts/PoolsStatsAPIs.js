import { BigNumber } from "@ethersproject/bignumber";

import { walletHelper } from "../wallet.helper";
import {
    getContract
} from "./contracts.helper";

import { nftTires } from "../constants";

const lpContractAddress = {
    room: "0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732",
    court: "0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732",
    ht: "0x26ce49c08ee71aff0c43db8f8b9bea950b6cdc67",
    matter: "0x6c8a55f67a7a6274d11e20bde30ee45049bdb570",
};

export const getWethPrice = async (address) => {
    const result = await getContract('usdt')
        .methods
        .balanceOf("0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852")
        .call({
            from: address,
        });

    const result2 = await getContract('WethTokenContract')
        .methods
        .balanceOf("0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852")
        .call({
            from: address,
        });

    const usdt = BigNumber.from(result);
    const ethPrice = usdt / 1e6 / (result2 / 1e18);

    return ethPrice;
};

export const getRoomLpTokenValue = async (address) => {
    const totalLiquidity = await getTotalLiquidity(address);
    const totalSupplyOfLp = await getContract('RoomLPTokenContract')
        .methods
        .totalSupply()
        .call({
            from: address,
        });
    const lpTokenValue = totalLiquidity / (totalSupplyOfLp / 1e18);
    return lpTokenValue;
};

export const getTotalValueLocked = async (address) => {
    const lpTokenValue = await getRoomLpTokenValue(address);

    const lockedLpTokens = await getContract('RoomLPStakingContract')
        .methods
        .totalStaked()
        .call({
            from: address,
        });

    return lpTokenValue * (lockedLpTokens / 1e18);
};

export const getTokenPriceInUsd = async (address, token) => {
    const wethPrice = await getWethPrice(address);
    if (token === "room_eth_lp") {
        const lpTokenValue = await getRoomLpTokenValue(address);
        return lpTokenValue;
    }

    const wethCountInLpContract = await getContract('WethTokenContract')
        .methods
        .balanceOf(lpContractAddress[token])
        .call({
            from: address,
        });

    let tokenContract = null;
    if (token === "room") {
        tokenContract = getContract('room');
    }

    if (token === "court") {
        tokenContract = getContract('court_token');
    }

    if (token === "ht") {
        tokenContract = getContract('HtTokenContract');
    }

    if (token === "matter") {
        tokenContract = getContract('MatterTokenContract');
    }

    const tokenCountInLpContract = await tokenContract.methods
        .balanceOf(lpContractAddress[token])
        .call({
            from: address,
        });

    const tokenPrice =
        (wethCountInLpContract / tokenCountInLpContract) * wethPrice;
    return tokenPrice;
};

export const getRoomTokenPrice = async (address) => {
    const wethPrice = await getWethPrice(address);
    //0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732 = Room_RoomEthLpStake
    const ethInLpContract = await getContract('WethTokenContract')
        .methods.balanceOf("0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732")
        .call({
            from: address,
        });

    const roomInLpContract = await getContract('room')
        .methods.balanceOf("0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732")
        .call({
            from: address,
        });

    const roomPrice = (ethInLpContract / roomInLpContract) * wethPrice;
    return roomPrice;
};

export const getLpApy = async (address) => {
    //(40,000 * 12 * Room Price) / (LP Locked * LP Token Value) * 100
    const roomPrice = await getRoomTokenPrice(address);
    const lockedLpTokens = await getContract('RoomLPStakingContract')
        .methods.totalStaked()
        .call({
            from: address,
        });
    const roomLpTokenValue = await getRoomLpTokenValue(address);
    return (
        ((40000 * 12 * roomPrice) /
            ((lockedLpTokens / 1e18) * roomLpTokenValue)) *
        100
    );
};

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

    const result = await getContract('NftStakeContract')
        .methods.totalStaked(poolId)
        .call({
            from: address,
        });

    const roomPrice = await getRoomTokenPrice(address);
    return {
        totalStakedValue: (result / 1e18) * roomPrice,
        apy: (getAt(poolId) / (result / 1e18)) * 100,
    };
};

export const getTotalLiquidity = async (address) => {
    //0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732 = this.roomLPTokenContract._address
    const ethInLpContract = await getContract('WethTokenContract')
        .methods.balanceOf("0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732")
        .call({
            from: address,
        });

    const wethPrice = await getWethPrice(address);
    const totalLiquidity = (ethInLpContract / 1e18) * wethPrice * 2;
    return totalLiquidity;
};

export const getAvailableNftTokenBalanceOfTire = async (address, tire) => {
    const result = await getContract('NftTokenContract')
        .methods.checkAvailableToMint(tire)
        .call({
            from: address,
        });

    return result;
};

export const loadAllNftTokenAvilable = async (address) => {
    const data = {};
    for (let nftTire of nftTires) {
        const res = await getAvailableNftTokenBalanceOfTire(address, nftTire);
        data[nftTire] = parseInt(res);
    }

    return data;
};
