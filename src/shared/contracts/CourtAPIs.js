import { BigNumber } from "@ethersproject/bignumber";
import { walletHelper } from "../wallet.helper";
import { getRoomTokenContract } from './RoomTokenContract';
import { getCourtTokenContract } from './CourtTokenContract';
import { getCourtFarming_RoomStakeContract } from './CourtFarming_RoomStake';
import { getCourtFarming_RoomEthLpStakeContract } from './CourtFarming_RoomEthLpStakeContract';
import { getCourtEthLpTokenContract } from './CourtEthLpTokenContract';
import { getCourtFarming_CourtEthLpStakeContract } from './CourtFarming_CourtEthLpStake';
import { getRoomLPStakingContract } from './RoomLPStakingContract';
import { getRoomLPTokenContract } from './RoomLPTokenContract';

import { MaxUint256, controlledNetworkId } from '../../shared/constants';

const walletHelperInstance = walletHelper();

class CourtAPIs {
    constructor() {
        this.courtTokenContract = getCourtTokenContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.courtFarming_RoomStakeContract = getCourtFarming_RoomStakeContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.courtFarming_RoomEthLpStakeContract = getCourtFarming_RoomEthLpStakeContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.courtFarming_CourtEthLpStakeContract = getCourtFarming_CourtEthLpStakeContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.roomFarming_RoomEthLpStakeContract = getRoomLPStakingContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.courtEthLpTokenContract = getCourtEthLpTokenContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.roomTokenContract = getRoomTokenContract(controlledNetworkId, walletHelperInstance.getWeb3());
        this.roomEthLpTokenContract = getRoomLPTokenContract(controlledNetworkId, walletHelperInstance.getWeb3());
    }

    async getAddressTokenBalance(address, token) {
        if (token === "room") {
            const result = await this.roomTokenContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }

        if (token === "room_eth_lp") {
            const result = await this.roomEthLpTokenContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }

        if (token === "court") {
            const result = await this.courtTokenContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }

        if (token === "court_eth_lp") {
            const result = await this.courtEthLpTokenContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }

    }

    async getAddressAllowance(address, sender, reciver) {
        if (sender === 'room' && reciver === "CourtFarming_RoomStake") {
            const result = await this.roomTokenContract
                .methods
                .allowance(address, this.courtFarming_RoomStakeContract._address)
                .call({
                    from: address
                });

            return result;
        }

        if (sender === 'room_eth_lp' && reciver === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomEthLpTokenContract
                .methods
                .allowance(address, this.roomFarming_RoomEthLpStakeContract._address)
                .call({
                    from: address
                });

            return result;
        }

        if (sender === 'room_eth_lp' && reciver === "CourtFarming_RoomEthLpStake") {
            const result = await this.roomEthLpTokenContract
                .methods
                .allowance(address, this.courtFarming_RoomEthLpStakeContract._address)
                .call({
                    from: address
                });

            return result;
        }

        if (sender === 'court_eth_lp' && reciver === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtEthLpTokenContract
                .methods
                .allowance(address, this.courtFarming_CourtEthLpStakeContract._address)
                .call({
                    from: address
                });

            return result;
        }
    }


    async approveAddressAllowance(address, sender, reciver) {
        if (sender === 'room' && reciver === "CourtFarming_RoomStake") {
            const result = await this.roomTokenContract
                .methods
                .approve(this.courtFarming_RoomStakeContract._address, MaxUint256)
                .send({
                    from: address
                });

            return result;
        }

        if (sender === 'room_eth_lp' && reciver === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomEthLpTokenContract
                .methods
                .approve(address, this.roomFarming_RoomEthLpStakeContract._address)
                .send({
                    from: address
                });

            return result;
        }

        if (sender === 'room_eth_lp' && reciver === "CourtFarming_RoomEthLpStake") {
            const result = await this.roomEthLpTokenContract
                .methods
                .approve(this.courtFarming_RoomEthLpStakeContract._address, MaxUint256)
                .send({
                    from: address
                });

            return result;
        }

        if (sender === 'court_eth_lp' && reciver === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtEthLpTokenContract
                .methods
                .approve(this.courtFarming_CourtEthLpStakeContract._address, MaxUint256)
                .send({
                    from: address
                });

            return result;
        }
    }

    async stackeTokens(address, contract, amount) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract
                .methods
                .stake(amount)
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract
                .methods
                .stake(amount)
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract
                .methods
                .stake(amount)
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract
                .methods
                .stake(amount)
                .send({
                    from: address
                });

            return result;
        }
    }

    async unstackeTokens(address, contract, amount, claim) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract
                .methods
                .unstake(amount, claim)
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract
                .methods
                .unstake(amount, claim)
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract
                .methods
                .unstake(amount, claim)
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract
                .methods
                .unstake(amount, claim)
                .send({
                    from: address
                });

            return result;
        }
    }

    async getRewards(address, contract) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract
                .methods
                .rewards(address)
                .call({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract
                .methods
                .rewards(address)
                .call({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract
                .methods
                .rewards(address)
                .call({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract
                .methods
                .rewards(address)
                .call({
                    from: address
                });

            return result;
        }
    }

    async claimRewards(address, contract) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract
                .methods
                .claimReward()
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract
                .methods
                .claimReward()
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract
                .methods
                .claimReward()
                .send({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract
                .methods
                .claimReward()
                .send({
                    from: address
                });

            return result;
        }
    }

    async getAddressStakeBalance(address, contract) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract
                .methods
                .balanceOf(address)
                .call({
                    from: address
                });

            return result;
        }
    }
}

export default CourtAPIs;
