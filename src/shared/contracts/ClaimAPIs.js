import { getContract, getContractAddress } from "./contracts.helper";


class ClaimAPIs {
    constructor() {
        this.claimContract = getContract('claim_contract');
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
}

export default ClaimAPIs;
