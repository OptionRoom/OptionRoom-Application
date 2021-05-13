import { walletHelper } from "../wallet.helper";
import { getHtTokenContract } from "./HtTokenContract";
import { getContract, getContractAddress } from "./contracts.helper";
import { getMatterTokenContract } from "./MatterTokenContract";
import { getCourtTokenContract } from "./CourtTokenContract";
import { MaxUint256, controlledNetworkId } from "../../shared/constants";

const walletHelperInstance = walletHelper();

class ClaimCourtAPIs {
    constructor() {

        this.courtTokenContract = getCourtTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.usdtTokenContract = getContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3(),
            'usdt'
        );

        this.matterTokenContract = getMatterTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.htTokenContract = getHtTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.htClaimContract =  getContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3(),
            'ht_court_farming_claim'
        );

        this.matterClaimContract =  getContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3(),
            'matter_court_farming_claim'
        );

        this.courtPowerStakeContract =  getContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3(),
            'court_vote_stake'
        );
    }

    async getWalletBalanceOfUsdt(address) {
        return await this.usdtTokenContract.methods
            .balanceOf(address)
            .call({
                from: address,
            });
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
    }

    async getAddressUsdtAllowanceOfClaimContract(address, contract) {
        //"CourtFarming_HtStake", "CourtFarming_MatterStake"
        if(contract === 'CourtFarming_HtStake') {
            return await this.usdtTokenContract.methods
                .allowance(
                    address,
                    getContractAddress(controlledNetworkId, 'ht_court_farming_claim')
                )
                .call({
                    from: address,
                });
        }

        if(contract === 'CourtFarming_MatterStake') {
            return await this.usdtTokenContract.methods
                .allowance(
                    address,
                    getContractAddress(controlledNetworkId, 'matter_court_farming_claim')
                )
                .call({
                    from: address,
                });
        }
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
