import { getContract, getContractAddress } from "./contracts.helper";
import { MaxUint256 } from "../../shared/constants";


class NewCourtClaimAPIs {
    constructor() {
        this.CourtFarming_NoRoomStakeMatter = getContract('CourtFarming_NoRoomStakeMatter');
        this.CourtFarming_NoRoomStakeHT = getContract('CourtFarming_NoRoomStakeHT');
        this.CourtFarming_RoomStakeNew = getContract('CourtFarming_RoomStakeNew');
        this.CourtFarming_RoomBNBLP = getContract('CourtFarming_RoomLPStake');
        this.usdtTokenContract = getContract('usdt');
    }

    async getClaimInfo(address, contract) {
        if(contract === 'CourtFarming_NoRoomStakeMatter') {
            const claimInfo = await this.CourtFarming_NoRoomStakeMatter.methods
                .getClaimInfo(
                    address
                )
                .call({
                    from: address,
                });

            const claimCost = await this.CourtFarming_NoRoomStakeMatter.methods
                .claimFeePerCourt(
                )
                .call({
                    from: address,
                });

            return {
                ...claimInfo,
                claimCost: claimCost
            };
        }

        if(contract === 'CourtFarming_NoRoomStakeHT') {
            const claimInfo = await this.CourtFarming_NoRoomStakeHT.methods
                .getClaimInfo(
                    address
                )
                .call({
                    from: address,
                });

            const claimCost = await this.CourtFarming_NoRoomStakeHT.methods
                .claimFeePerCourt(
                )
                .call({
                    from: address,
                });

            return {
                ...claimInfo,
                claimCost: claimCost
            };
        }

        if(contract === 'CourtFarming_RoomStakeNew') {
            const claimInfo = await this.CourtFarming_RoomStakeNew.methods
                .getClaimInfo(
                    address
                )
                .call({
                    from: address,
                });

            return {
                ...claimInfo,
                claimCost: 0
            };
        }

        if(contract === 'CourtFarming_RoomLPStake') {
            const claimInfo = await this.CourtFarming_RoomBNBLP.methods
                .getClaimInfo(
                    address
                )
                .call({
                    from: address,
                });

            return {
                ...claimInfo,
                claimCost: 0
            };
        }
    }

    async approveUsdtForClaimContract(address, contract) {
        if(contract === 'CourtFarming_NoRoomStakeMatter') {
            return await this.usdtTokenContract.methods
                .approve(
                    this.CourtFarming_NoRoomStakeMatter._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });
        }

        if(contract === 'CourtFarming_NoRoomStakeHT') {
            return await this.usdtTokenContract.methods
                .approve(
                    this.CourtFarming_NoRoomStakeHT._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });
        }
    }

    async getAddressUsdtAllowanceOfClaimContract(address, contract) {
        //"CourtFarming_HtStake", "CourtFarming_MatterStake"
        if(contract === 'CourtFarming_NoRoomStakeMatter') {
            return await this.usdtTokenContract.methods
                .allowance(
                    address,
                    getContractAddress('CourtFarming_NoRoomStakeMatter')
                )
                .call({
                    from: address,
                });
        }

        if(contract === 'CourtFarming_NoRoomStakeHT') {
            return await this.usdtTokenContract.methods
                .allowance(
                    address,
                    getContractAddress('CourtFarming_NoRoomStakeHT')
                )
                .call({
                    from: address,
                });
        }
    }

    async claimCourt(address, contract, amount) {
        if(['CourtFarming_RoomStakeNew', 'CourtFarming_RoomLPStake'].indexOf(contract) > -1) {
            return getContract(contract)
            .methods
            .claimAll()
            .send({
                from: address,
            });
        }

        return getContract(contract)
            .methods
            .claim(
                amount
            )
            .send({
                from: address,
            });
    }
}

export default NewCourtClaimAPIs;
