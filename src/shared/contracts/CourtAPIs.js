import { walletHelper } from "../wallet.helper";
import { getRoomTokenContract } from "./RoomTokenContract";
import { getHtTokenContract } from "./HtTokenContract";
import { getMatterTokenContract } from "./MatterTokenContract";
import { getCourtTokenContract } from "./CourtTokenContract";
import { getCourtFarming_RoomStakeContract } from "./CourtFarming_RoomStake";
import { getCourtFarming_RoomEthLpStakeContract } from "./CourtFarming_RoomEthLpStakeContract";
import { getCourtEthLpTokenContract } from "./CourtEthLpTokenContract";
import { getCourtFarming_CourtEthLpStakeContract } from "./CourtFarming_CourtEthLpStake";
import { getCourtFarming_HtStakeContract } from "./CourtFarming_HtStakeContract";
import { getCourtFarming_MatterStakeContract } from "./CourtFarming_MatterStakeContract";
import { getRoomLPStakingContract } from "./RoomLPStakingContract";
import { getRoomLPTokenContract } from "./RoomLPTokenContract";
import { getTokenPriceInUsd } from "./PoolsStatsAPIs";
import {fromWei} from '../helper';
import { MaxUint256, controlledNetworkId } from "../../shared/constants";

const walletHelperInstance = walletHelper();

class CourtAPIs {
    constructor() {
        this.courtTokenContract = getCourtTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.courtFarming_MatterStakeContract = getCourtFarming_MatterStakeContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.courtFarming_HtStakeContract = getCourtFarming_HtStakeContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.courtFarming_RoomStakeContract = getCourtFarming_RoomStakeContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.courtFarming_RoomEthLpStakeContract = getCourtFarming_RoomEthLpStakeContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.courtFarming_CourtEthLpStakeContract = getCourtFarming_CourtEthLpStakeContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.roomFarming_RoomEthLpStakeContract = getRoomLPStakingContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.courtEthLpTokenContract = getCourtEthLpTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.roomTokenContract = getRoomTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
        this.roomEthLpTokenContract = getRoomLPTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.matterTokenContract = getMatterTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.htTokenContract = getHtTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
    }


    async getRoomPastEvents(address, token) {
        const result = await this.roomTokenContract
            .getPastEvents("allEvents", {

                fromBlock: 1,
            });
        return result;
    }

    async getAddressTokenBalance(address, token) {
        if (token === "room") {
            const result = await this.roomTokenContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (token === "room_eth_lp") {
            const result = await this.roomEthLpTokenContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (token === "court") {
            const result = await this.courtTokenContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (token === "court_eth_lp") {
            const result = await this.courtEthLpTokenContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (token === "ht") {
            const result = await this.htTokenContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (token === "matter") {
            const result = await this.matterTokenContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }
    }

    async getAddressAllowance(address, sender, reciver) {
        if (sender === "room" && reciver === "CourtFarming_RoomStake") {
            const result = await this.roomTokenContract.methods
                .allowance(
                    address,
                    this.courtFarming_RoomStakeContract._address
                )
                .call({
                    from: address,
                });

            return result;
        }

        if (
            sender === "room_eth_lp" &&
            reciver === "RoomFarming_RoomEthLpStake"
        ) {
            const result = await this.roomEthLpTokenContract.methods
                .allowance(
                    address,
                    this.roomFarming_RoomEthLpStakeContract._address
                )
                .call({
                    from: address,
                });

            return result;
        }

        if (
            sender === "room_eth_lp" &&
            reciver === "CourtFarming_RoomEthLpStake"
        ) {
            const result = await this.roomEthLpTokenContract.methods
                .allowance(
                    address,
                    this.courtFarming_RoomEthLpStakeContract._address
                )
                .call({
                    from: address,
                });

            return result;
        }

        if (
            sender === "court_eth_lp" &&
            reciver === "CourtFarming_CourtEthLpStake"
        ) {
            const result = await this.courtEthLpTokenContract.methods
                .allowance(
                    address,
                    this.courtFarming_CourtEthLpStakeContract._address
                )
                .call({
                    from: address,
                });

            return result;
        }

        if (sender === "ht" && reciver === "CourtFarming_HtStake") {
            const result = await this.htTokenContract.methods
                .allowance(address, this.courtFarming_HtStakeContract._address)
                .call({
                    from: address,
                });

            return result;
        }

        if (sender === "matter" && reciver === "CourtFarming_MatterStake") {
            const result = await this.matterTokenContract.methods
                .allowance(
                    address,
                    this.courtFarming_MatterStakeContract._address
                )
                .call({
                    from: address,
                });

            return result;
        }
    }

    async approveAddressAllowance(address, sender, reciver) {
        if (sender === "room" && reciver === "CourtFarming_RoomStake") {
            const result = await this.roomTokenContract.methods
                .approve(
                    this.courtFarming_RoomStakeContract._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });

            return result;
        }

        if (
            sender === "room_eth_lp" &&
            reciver === "RoomFarming_RoomEthLpStake"
        ) {
            const result = await this.roomEthLpTokenContract.methods
                .approve(
                    this.roomFarming_RoomEthLpStakeContract._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });

            return result;
        }

        if (
            sender === "room_eth_lp" &&
            reciver === "CourtFarming_RoomEthLpStake"
        ) {
            const result = await this.roomEthLpTokenContract.methods
                .approve(
                    this.courtFarming_RoomEthLpStakeContract._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });

            return result;
        }

        if (
            sender === "court_eth_lp" &&
            reciver === "CourtFarming_CourtEthLpStake"
        ) {
            const result = await this.courtEthLpTokenContract.methods
                .approve(
                    this.courtFarming_CourtEthLpStakeContract._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });

            return result;
        }

        if (sender === "matter" && reciver === "CourtFarming_MatterStake") {
            const result = await this.matterTokenContract.methods
                .approve(
                    this.courtFarming_MatterStakeContract._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });

            return result;
        }

        if (sender === "ht" && reciver === "CourtFarming_HtStake") {
            const result = await this.htTokenContract.methods
                .approve(this.courtFarming_HtStakeContract._address, MaxUint256)
                .send({
                    from: address,
                });

            return result;
        }
    }

    async stackeTokens(address, contract, amount) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract.methods
                .stake(amount)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract.methods
                .stake(amount)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .stake(amount)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .stake(amount)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .stake(amount)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .stake(amount)
                .send({
                    from: address,
                });

            return result;
        }
    }

    async getExpectedRewardsToday(address, contract, amount) {
        let con = null;

        if (contract === "CourtFarming_RoomStake") {
            con = this.courtFarming_RoomStakeContract;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            con = this.courtFarming_RoomEthLpStakeContract;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            con = this.courtFarming_CourtEthLpStakeContract;
        }

        if (contract === "CourtFarming_HtStake") {
            con = this.courtFarming_HtStakeContract;
        }

        if (contract === "CourtFarming_MatterStake") {
            con = this.courtFarming_MatterStakeContract;
        }

        const result = await con.methods.expectedRewardsToday(amount).call({
            from: address,
        });

        return result;
    }

    async unstackeTokens(address, contract, amount, claim) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract.methods
                .unstake(amount, claim)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract.methods
                .unstake(amount, claim)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .unstake(amount, claim)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .unstake(amount, claim)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .unstake(amount, claim)
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .unstake(amount, claim)
                .send({
                    from: address,
                });

            return result;
        }
    }

    async getRewards(address, contract) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract.methods
                .rewards(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract.methods
                .rewards(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .rewards(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .rewards(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .rewards(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .rewards(address)
                .call({
                    from: address,
                });

            return result;
        }
    }

    async getIncvRewardInfo(address, contract) {
        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract.methods
                .incvRewardInfo()
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .incvRewardInfo()
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .incvRewardInfo()
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .incvRewardInfo()
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .incvRewardInfo()
                .call({
                    from: address,
                });

            return result;
        }
    }

    async claimIncvRewards(address, contract) {
        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract.methods
                .claimIncvReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .claimIncvReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .claimIncvReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .claimIncvReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .claimIncvReward()
                .send({
                    from: address,
                });

            return result;
        }
    }

    async claimRewards(address, contract) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract.methods
                .claimReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract.methods
                .claimReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .claimReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .claimReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .claimReward()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .claimReward()
                .send({
                    from: address,
                });

            return result;
        }
    }

    async getAddressStakeBalance(address, contract) {
        if (contract === "RoomFarming_RoomEthLpStake") {
            const result = await this.roomFarming_RoomEthLpStakeContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomStake") {
            const result = await this.courtFarming_RoomStakeContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }
    }

    async getContractLockedValue(address, contract) {
        let tokenPrice = 0;
        let contractInstance = null;
        if (contract === "CourtFarming_RoomStake") {
            tokenPrice = await getTokenPriceInUsd(address, "room");
            contractInstance = this.courtFarming_RoomStakeContract;
        }

        if (contract === "CourtFarming_HtStake") {
            tokenPrice = await getTokenPriceInUsd(address, "ht");
            contractInstance = this.courtFarming_HtStakeContract;
        }

        if (contract === "CourtFarming_MatterStake") {
            tokenPrice = await getTokenPriceInUsd(address, "matter");
            contractInstance = this.courtFarming_MatterStakeContract;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            tokenPrice = await getTokenPriceInUsd(address, "room_eth_lp");
            contractInstance = this.courtFarming_RoomEthLpStakeContract;
        }

        const numberOfTokens = await contractInstance.methods
            .totalStaked()
            .call({
                from: address,
            });

        return tokenPrice * fromWei(`${numberOfTokens}`);
    }
}

export default CourtAPIs;
