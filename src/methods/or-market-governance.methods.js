import {getContract} from "../shared/contracts/contracts.helper";
import {ContractNames, MarketVotingTypes} from "../shared/constants";

export const disputeMarket = (wallet, marketId, disputeReason) => {
    const contract = getContract(ContractNames.marketGovernance);

    return contract.methods
        .disputeMarket(marketId, disputeReason)
        .send({
            from: wallet,
        });

}

export const getResolvingOutcome = (wallet, marketId, choicesLength) => {
    const contract = getContract(ContractNames.marketGovernance);

    return contract.methods
        .getResolvingOutcome(marketId, choicesLength)
        .call({
            from: wallet,
        });
}

export const getIsMarketRejected = (wallet, marketId) => {
    const contract = getContract(ContractNames.marketGovernance);

    return contract.methods
        .isMarketRejected(marketId)
        .call({
            from: wallet,
        });
}

export const getIsMarketDisputed = (wallet, marketId) => {
    const contract = getContract(ContractNames.marketGovernance);

    return contract.methods
        .IsMarketDisputed(marketId)
        .call({
            from: wallet,
        });
}

export const addGovernanceVoteForMarket = (wallet, marketId, vote, state) => {
    const contract = getContract(ContractNames.marketGovernance);

    if (state == 1) {
        return contract
            .methods
            .castGovernanceValidatingVote(marketId, vote)
            .send({
                from: wallet,
            });

    }

    if (state == 5 || state == 8) {
        return contract
            .methods
            .castGovernanceResolvingVote(marketId, vote)
            .send({
                from: wallet,
            });
    }
}

export const withdrawMarketVote = (wallet, marketId, state) => {
    const contract = getContract(ContractNames.marketGovernance);

    if (state == 1) {
        return contract.methods
            .withdrawGovernanceValidatingVote(marketId)
            .send({
                from: wallet,
            });
    }

    if (state == 5 || state == 8) {
        return contract
            .methods
            .withdrawGovernanceResolvingVote(marketId)
            .send({
                from: wallet,
            });
    }
}

export const getAllVotesOnMarket = (wallet, marketId, type) => {
    const contract = getContract(ContractNames.marketGovernance);

    if(type === MarketVotingTypes.resolving) {
        return contract.methods
            .resolvingVotesCount(marketId)
            .call({
                from: wallet,
            });
    }

    if(type === MarketVotingTypes.validating) {
        return contract.methods
            .validatingVotesCount(marketId)
            .call({
                from: wallet,
            });
    }
}

export const getWalletVotesOnMarket = (wallet, marketId, type) => {
    const contract = getContract(ContractNames.marketGovernance);

    if(type === MarketVotingTypes.resolving) {
        return contract.methods
            .marketResolvingVotersInfo(marketId, wallet)
            .call({
                from: wallet,
            });
    }

    if(type === MarketVotingTypes.validating) {
        return contract.methods
            .marketValidatingVotersInfo(marketId, wallet)
            .call({
                from: wallet,
            });
    }
}

export const getMarketDisputers = (wallet, marketId) => {
    const contract = getContract(ContractNames.marketGovernance);

    return contract.methods
        .marketDisputers(marketId, wallet)
        .call({
            from: wallet,
        });
}

export const getMarketResolvingCount = (wallet, marketId) => {
    const contract = getContract(ContractNames.marketGovernance);

    return contract.methods
        .getMarketResolvingCounts(marketId)
        .call({
            from: wallet,
        });
}
