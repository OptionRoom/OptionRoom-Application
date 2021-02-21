import {getRoomTokenContract} from './RoomTokenContract';
import {getRoomLPTokenContract} from './RoomLPTokenContract';
import {getRoomLPStakingContract} from './RoomLPStakingContract';
import {getNftStakeContract} from './NftStakeContract';
import {getNftTokenContract} from './NftTokenContract';
import {MaxUint256} from '../../shared/constants';

class RoomLPFarmingAPIs {
    constructor(chainId, web3) {
        this.chainId = chainId;
        this.web3 = web3;
        this.roomTokenContract = getRoomTokenContract(chainId, web3);
        this.roomLPTokenContract = getRoomLPTokenContract(chainId, web3);
        this.roomLPStakingContract = getRoomLPStakingContract(chainId, web3);
        this.nftStakeContract = getNftStakeContract(chainId, web3);
        this.nftTokenContract = getNftTokenContract(chainId, web3);
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
