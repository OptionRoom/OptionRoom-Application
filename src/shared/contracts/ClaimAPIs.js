import { getContract, getContractAddress } from "./contracts.helper";


class ClaimAPIs {
    constructor() {
        this.claimContract = getContract('claim_contract');
        this.rewardProgramContract = getContract('reward_program');
    }

    async getBeneficiaryInfo(address, poolId, beneficiary) {
        return this.claimContract
            .methods
            .getBeneficiaryInfo(poolId, beneficiary)
            .call({
                from: address,
            });
    }

    async claim(address, poolId, amount) {
        return this.claimContract
            .methods
            .claim(poolId, amount)
            .send({
                from: address,
            });
    }

    async getRewards(address, poolId) {
        if(poolId === 'resolve') {
            return this.rewardProgramContract
                .methods
                .resolveRewards(address)
                .call({
                    from: address,
                });
        }

        if(poolId === 'validation') {
            return this.rewardProgramContract
                .methods
                .validationRewards(address)
                .call({
                    from: address,
                });
        }

        if(poolId === 'trade') {
            return this.rewardProgramContract
                .methods
                .tradeRewards(address)
                .call({
                    from: address,
                });
        }
    }

    async claimRewards(address, poolId) {
        let pools = [true, true, true];

        if (poolId === 'validation') {
            pools = [true, false, false];
        }

        if (poolId === 'resolve') {
            pools = [false, true, false];
        }

        if (poolId === 'trade') {
            pools = [false, false, true];
        }

        return this.rewardProgramContract
            .methods
            .claimRewards(...pools)
            .send({
                from: address,
            });
    }
}

export default ClaimAPIs;
