import { getTokenPriceInUsd } from "./PoolsStatsAPIs";
import {fromWei} from '../helper';
import { MaxUint256 } from "../../shared/constants";
import {getContract} from "./contracts.helper";


class CourtAPIs {
    constructor() {
        this.courtTokenContract = getContract('court_token');
        this.courtFarming_MatterStakeContract = getContract('CourtFarming_MatterStakeContract');
        this.courtFarming_HtStakeContract = getContract('CourtFarming_HtStakeContract');
        this.courtFarming_RoomStakeContract = getContract('CourtFarming_RoomStake');
        this.courtFarming_RoomEthLpStakeContract = getContract('CourtFarming_RoomEthLpStakeContract');
        this.courtFarming_CourtEthLpStakeContract = getContract('CourtFarming_CourtEthLpStake');
        this.roomFarming_RoomEthLpStakeContract = getContract('RoomLPStakingContract');
        this.courtEthLpTokenContract = getContract('CourtEthLpTokenContract');
        this.roomTokenContract = getContract('room');
        this.roomEthLpTokenContract = getContract('RoomLPTokenContract');
        this.matterTokenContract = getContract('MatterTokenContract');
        this.htTokenContract = getContract('HtTokenContract');
        this.usdtTokenContract = getContract('usdt');
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

        if (token === "usdt") {
            const result = await this.usdtTokenContract.methods
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
                .incvRewardClaim()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_RoomEthLpStake") {
            const result = await this.courtFarming_RoomEthLpStakeContract.methods
                .incvRewardClaim()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_CourtEthLpStake") {
            const result = await this.courtFarming_CourtEthLpStakeContract.methods
                .incvRewardClaim()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_HtStake") {
            const result = await this.courtFarming_HtStakeContract.methods
                .incvRewardClaim()
                .send({
                    from: address,
                });

            return result;
        }

        if (contract === "CourtFarming_MatterStake") {
            const result = await this.courtFarming_MatterStakeContract.methods
                .incvRewardClaim()
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

    async payAndClaimRewards(address, contract, amount) {
        if (contract === "CourtFarming_HtStake") {
            return this.courtFarming_HtStakeContract.methods
                .stakeIncvRewards(amount)
                .send({
                    from: address,
                });
        }

        if (contract === "CourtFarming_MatterStake") {
            return this.courtFarming_MatterStakeContract.methods
                .stakeIncvRewards(amount)
                .send({
                    from: address,
                });
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
