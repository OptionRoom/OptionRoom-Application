import {getContract, getContractAddress} from "../shared/contracts/contracts.helper";
import { ContractNames } from "../shared/constants";

export const redeemMarketRewards = async (wallet, marketAddress) => {
    const contract = getContract(ContractNames.or_fix_redeem);
    return contract
        .methods
        .redeemFix(
            getContractAddress(ContractNames.optionTokenV4),
            getContractAddress(ContractNames.marketControllerV4),
            marketAddress
        )
        .send({
            from: wallet,
        });
};
