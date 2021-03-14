import { walletHelper } from "../wallet.helper";
import {getRoomTokenContract} from './RoomTokenContract';
import {getNftStakeContract} from './NftStakeContract';
import {getNftTokenContract} from './NftTokenContract';
import {MaxUint256, controlledNetworkId} from '../../shared/constants';

const walletHelperInstance = walletHelper();

class RoomLPFarmingAPIs {
    constructor() {
        this.roomTokenContract = getRoomTokenContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.nftStakeContract = getNftStakeContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.nftTokenContract = getNftTokenContract(controlledNetworkId, walletHelperInstance.getWeb3());
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
}

export default RoomLPFarmingAPIs;
