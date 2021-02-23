import {BigNumber} from "@ethersproject/bignumber";

import {getRoomTokenContract} from './RoomTokenContract';
import {getRoomLPTokenContract} from './RoomLPTokenContract';
import {getRoomLPStakingContract} from './RoomLPStakingContract';
import {getNftStakeContract} from './NftStakeContract';
import {getNftTokenContract} from './NftTokenContract';
import {getWethTokenContract} from './WethTokenContract';
import {getTetherTokenContract} from './TetherTokenContract';
import {MaxUint256, controlledNetworkId} from '../../shared/constants';

class RoomLPFarmingAPIs {
    constructor(chainId, web3) {
        this.chainId = controlledNetworkId;
        this.web3 = web3;
        this.roomTokenContract = getRoomTokenContract(controlledNetworkId, web3);
        this.roomLPTokenContract = getRoomLPTokenContract(controlledNetworkId, web3);
        this.roomLPStakingContract = getRoomLPStakingContract(controlledNetworkId, web3);
        this.nftStakeContract = getNftStakeContract(controlledNetworkId, web3);
        this.nftTokenContract = getNftTokenContract(controlledNetworkId, web3);
        this.wethTokenContract = getWethTokenContract(controlledNetworkId, web3);
        this.tetherTokenContract = getTetherTokenContract(controlledNetworkId, web3);
    }


    async getWethPrice(address) {
        const result = await this.tetherTokenContract
            .methods
            .balanceOf('0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852')
            .call({
                from: address
            });

        const result2 = await this.wethTokenContract
            .methods
            .balanceOf('0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852')
            .call({
                from: address
            });

        const usdt = BigNumber.from(result);
        const ethPrice = (usdt / 1e6) / (result2 / 1e18);

        return ethPrice;
    }

    async getTotalLiquidity(address) {
        const ethInLpContract = await this.wethTokenContract
            .methods
            .balanceOf(this.roomLPTokenContract._address)
            .call({
                from: address
            });

        const wethPrice = await this.getWethPrice(address);
        const totalLiquidity = (ethInLpContract / 1e18) * wethPrice * 2;
        return totalLiquidity;
    }

    async getRoomLpTokenValue(address) {
        const totalLiquidity = await this.getTotalLiquidity(address);
        const totalSupplyOfLp = await this.roomLPTokenContract
            .methods
            .totalSupply()
            .call({
                from: address
            });
        const lpTokenValue = totalLiquidity / (totalSupplyOfLp / 1e18);
        return lpTokenValue;
    }

    async getTotalValueLocked(address) {
        const lpTokenValue = await this.getRoomLpTokenValue(address);
        const lockedLpTokens = await this.roomLPStakingContract
            .methods
            .totalStaked()
            .call({
                from: address
            });

        return lpTokenValue * (lockedLpTokens / 1e18);
    }

    async getRoomTokenPrice(address) {
        const wethPrice = await this.getWethPrice(address);
        const ethInLpContract = await this.wethTokenContract
            .methods
            .balanceOf(this.roomLPTokenContract._address)
            .call({
                from: address
            });
        const roomInLpContract = await this.roomTokenContract
            .methods
            .balanceOf(this.roomLPTokenContract._address)
            .call({
                from: address
            });

        const roomPrice = (ethInLpContract/roomInLpContract) * wethPrice;
        return roomPrice;
    }

    async getLpApy(address) {
        //(40,000 * 12 * Room Price) / (LP Locked * LP Token Value) * 100
        const roomPrice = await this.getRoomTokenPrice(address);
        const lockedLpTokens = await this.roomLPStakingContract
            .methods
            .totalStaked()
            .call({
                from: address
            });
        const roomLpTokenValue = await this.getRoomLpTokenValue(address);
        return (40000 * 12 * roomPrice) / ((lockedLpTokens/1e18) * roomLpTokenValue) * 100;
    }

    async getUserRoomTokenBalance(address) {
        const result = await this.roomTokenContract
            .methods
            .balanceOf(address)
            .call({
                from: address
            });

        return result;
    }

    ///
    async getTotalValueStakedInNftStakingInUsd(address, poolId) {
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

        const result = await this.nftStakeContract
            .methods
            .totalStaked(poolId)
            .call({
                from: address
            });

        const roomPrice = await this.getRoomTokenPrice(address);
        return {
            totalStakedValue: (result / 1e18) * roomPrice,
            apy: (getAt(poolId) / (result / 1e18)) * 100
        }
    }

    async getUserRoomTokenAllowanceBalanceForNftStakeContract(address) {
        const result = await this.roomTokenContract
            .methods
            .allowance(address, this.nftStakeContract._address)
            .call({
                from: address
            });

        return result;
    }

    async getUserRoomTokenAllowanceBalanceForNftTokenContract(address) {
        const result = await this.roomTokenContract
            .methods
            .allowance(address, this.nftTokenContract._address)
            .call({
                from: address
            });

        return result;
    }

    async approveUserRoomTokenForNftTokenContract(address) {
        const result = await this.roomTokenContract
            .methods
            .approve(this.nftTokenContract._address, MaxUint256)
            .send({
                from: address
            });

        return result;
    }

    async approveUserRoomTokenForNftStakeContract(address) {
        const result = await this.roomTokenContract
            .methods
            .approve(this.nftStakeContract._address, MaxUint256)
            .send({
                from: address
            });

        return result;
    }

    async isNftTokenApprovedForNftTokenContract(address) {
        const result = await this.nftTokenContract
            .methods
            .isApprovedForAll(address, this.nftTokenContract._address)
            .call({
                from: address
            });

        return result;
    }

    async isNftTokenApprovedForNftStakeContract(address) {
        const result = await this.nftTokenContract
            .methods
            .isApprovedForAll(address, this.nftStakeContract._address)
            .call({
                from: address
            });

        return result;
    }

    async approveUserNftTokenForNftTokenContract(address) {
        const result = await this.nftTokenContract
            .methods
            .setApprovalForAll(this.nftTokenContract._address, true)
            .send({
                from: address
            });

        return result;
    }

    async approveUserNftTokenForNftStakeContract(address) {
        const result = await this.nftTokenContract
            .methods
            .setApprovalForAll(this.nftStakeContract._address, true)
            .send({
                from: address
            });

        return result;
    }

    async getUserNftTokenBalanceOfTire(address, tire) {
        const result = await this.nftTokenContract
            .methods
            .balanceOf(address, tire)
            .call({
                from: address
            });

        return result;
    }

    async getAvailableNftTokenBalanceOfTire(address, tire) {
        const result = await this.nftTokenContract
            .methods
            .checkAvailableToMint(tire)
            .call({
                from: address
            });

        return result;
    }

    async getRequiredRoomsForTire(address, tire) {
        const result = await this.nftTokenContract
            .methods
            .requiredRoomBurned(tire)
            .call({
                from: address
            });

        return result;
    }

    async mintTireOfNftToken(address, tire) {
        const result = await this.nftTokenContract
            .methods
            .mintTier(tire)
            .send({
                from: address
            });

        return result;
    }

    async getUserNftStakeBalanceOfTire(address, tire) {
        const result = await this.nftStakeContract
            .methods
            .balanceOf(tire, address)
            .call({
                from: address
            });


        return result;
    }

    async getUserNftStakeRewardsBalanceOfTire(address, tire) {
        const result = await this.nftStakeContract
            .methods
            .rewards(tire, address)
            .call({
                from: address
            });


        return result;
    }

    async stakeNftStakeContractForTire(address, tire, amount) {
        const result = await this.nftStakeContract
            .methods
            .stake(tire, amount)
            .send({
                from: address
            });

        return result;
    }

    async unstakeNftStakeContractForTire(address, tire, amount, claim) {
        const result = await this.nftStakeContract
            .methods
            .unstake(tire, amount, claim)
            .send({
                from: address
            });

        return result;
    }

    async claimNftStakeContractRewardsForTire(address, tire) {
        const result = await this.nftStakeContract
            .methods
            .claimReward(tire)
            .send({
                from: address
            });

        return result;
    }

    async exitNftStakeContractForTire(address, tire) {
        const result = await this.nftStakeContract
            .methods
            .exit(tire)
            .send({
                from: address
            });

        return result;
    }

    async getRoomLPTokensBalanceForAddress(address) {
        const result = await this.roomLPTokenContract
            .methods
            .balanceOf(address)
            .call({
                from: address
            });

        return result;
    }

    async getRoomLPTokensAllowanceBalanceForAddress(address) {
        const result = await this.roomLPTokenContract
            .methods
            .allowance(address, this.roomLPStakingContract._address)
            .call({
                from: address
            });

        return result;
    }

    async approveUserRoomLPTokens(address) {
        const result = await this.roomLPTokenContract
            .methods
            .approve(this.roomLPStakingContract._address, MaxUint256)
            .send({
                from: address
            });

        return result;
    }

    async getStackedRoomLPTokens(address) {
        const result = await this.roomLPStakingContract
            .methods
            .balanceOf(address)
            .call({
                from: address
            });

        return result;
    }

    async getBlockNumber(address) {
        const result = await this.roomLPStakingContract
            .methods
            .blockNumber()
            .call({
                from: address
            });

        return result;
    }

    async getApprovedRoomLPTokens(address) {
        const result = await this.roomLPStakingContract
            .methods
            .balanceOf(address)
            .call({
                from: address
            });

        return result;
    }

    async unstackRoomLPTokens(address, amount, claim) {
        const result = await this.roomLPStakingContract
            .methods
            .unstake(amount, claim)
            .send({
                from: address
            });

        return result;
    }

    async stackRoomLPTokens(address, amount) {
        const result = await this.roomLPStakingContract
            .methods
            .stake(amount)
            .send({
                from: address
            });

        return result;
    }

    async getFarmedRoomTokens(address) {
        const result = await this.roomLPStakingContract
            .methods
            .rewards(address)
            .call({
                from: address
            });

        return result;
    }

    async claimFarmedRoomTokens(address) {
        const result = await this.roomLPStakingContract
            .methods
            .claimReward()
            .send({
                from: address
            });

        return result;
    }
}

export default RoomLPFarmingAPIs;
