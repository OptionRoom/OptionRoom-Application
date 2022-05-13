import { getContract, getContractAddress } from "./contracts.helper";
import {ContractNames, MaxUint256} from "../../shared/constants";


class ClaimCourtAPIs {
    constructor() {
        this.courtTokenContract = getContract(ContractNames.court_token);
        this.usdtTokenContract = getContract(ContractNames.usdt);
        this.matterTokenContract = getContract(ContractNames.MatterTokenContract);
        this.htTokenContract =  getContract(ContractNames.HtTokenContract);
        this.htClaimContract =  getContract(ContractNames.ht_court_farming_claim);
        this.matterClaimContract =  getContract(ContractNames.matter_court_farming_claim);
        this.courtPowerStakeContract =  getContract(ContractNames.court_vote_stake);
    }

    async approveUsdtForClaimContract(address, contract) {
        if(contract === 'matter_court_farming_claim') {
            return await this.usdtTokenContract.methods
                .approve(
                    this.matterClaimContract._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });
        }

        if(contract === 'ht_court_farming_claim') {
            return await this.usdtTokenContract.methods
                .approve(
                    this.htClaimContract._address,
                    MaxUint256
                )
                .send({
                    from: address,
                });
        }

        return this.usdtTokenContract.methods
            .approve(
                getContractAddress(contract),
                MaxUint256
            )
            .send({
                from: address,
            });
    }

    async getAddressUsdtAllowanceOfClaimContract(address, contract) {
        //"CourtFarming_HtStake", "CourtFarming_MatterStake"
        if(contract === 'CourtFarming_HtStake') {
            return await this.usdtTokenContract.methods
                .allowance(
                    address,
                    getContractAddress('ht_court_farming_claim')
                )
                .call({
                    from: address,
                });
        }

        if(contract === 'CourtFarming_MatterStake') {
            return await this.usdtTokenContract.methods
                .allowance(
                    address,
                    getContractAddress('matter_court_farming_claim')
                )
                .call({
                    from: address,
                });
        }

        return await this.usdtTokenContract.methods
            .allowance(
                address,
                getContractAddress(contract)
            )
            .call({
                from: address,
            });
    }

    async getCostOfCourtClaim(address, amount, contract) {
        if(contract === 'CourtFarming_HtStake') {
            return await this.htClaimContract.methods
                .getRequiredAmount(amount)
                .call({
                    from: address,
                });
        }

        if(contract === 'CourtFarming_MatterStake') {
            return await this.matterClaimContract.methods
                .getRequiredAmount(amount)
                .call({
                    from: address,
                });
        }
    }

    async getAddressTokenBalance(address, token) {
        if (token === "court") {
            const result = await this.courtTokenContract.methods
                .balanceOf(address)
                .call({
                    from: address,
                });

            return result;
        }
    }

    async getVotePower(address) {
        return await this.courtPowerStakeContract.methods
            .getUserPower(address)
            .call({
                from: address,
            });
    }

    async getWalletCourtAllowanceOfPowerStakeContract(address) {
        return await this.courtTokenContract.methods
            .allowance(
                address,
                this.courtPowerStakeContract._address
            )
            .call({
                from: address,
            });
    }

    async getWalletStakedCourtInPowerStakeContract(address) {
        return await this.courtPowerStakeContract.methods
            .stakedPerUser(address)
            .call({
                from: address,
            });
    }

    async approveCourtForPowerStakeContract(address) {
        return await this.courtTokenContract.methods
            .approve(
                this.courtPowerStakeContract._address,
                MaxUint256
            )
            .send({
                from: address,
            });
    }

    async depositCourtInPowerStakeContract(address, amount) {
        return await this.courtPowerStakeContract.methods
            .deposit(amount)
            .send({
                from: address,
            });
    }

    async withdrawCourtInPowerStakeContract(address, amount) {
        return await this.courtPowerStakeContract.methods
            .withdraw(amount)
            .send({
                from: address,
            });
    }
}

export default ClaimCourtAPIs;
