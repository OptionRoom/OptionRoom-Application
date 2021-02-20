import {getRoomTokenContract} from './RoomTokenContract';
import {getRoomLPTokenContract} from './RoomLPTokenContract';
import {getRoomLPStakingContract} from './RoomLPStakingContract';
import {MaxUint256} from '../../shared/constants';

class RoomLPFarmingAPIs {
    constructor(chainId, web3) {
        this.chainId = chainId;
        this.web3 = web3;
        this.roomTokenContract = getRoomTokenContract(chainId, web3);
        this.roomLPTokenContract = getRoomLPTokenContract(chainId, web3);
        this.roomLPStakingContract = getRoomLPStakingContract(chainId, web3);
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
