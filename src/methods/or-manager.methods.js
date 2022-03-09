import { getContract } from "../shared/contracts/contracts.helper";
import { ContractNames } from "../shared/constants";

export const getFees = (wallet) => {
    const contract = getContract(ContractNames.orManager);

    return contract
        .methods
        .getFees()
        .call({
            from: wallet,
        });
};

export const getMarketCreationConfig = async (wallet) => {
    const contract = getContract(ContractNames.orManager);
    const minLiquidity = await contract
        .methods
        .minLiquidity()
        .call({
            from: wallet,
        });
    const marketCreationFees = await contract
        .methods
        .marketCreationFees()
        .call({
            from: wallet,
        });

    return {
        marketCreationFees,
        minLiquidity
    }
};
