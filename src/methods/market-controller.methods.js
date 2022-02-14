//buy
import { getContract } from "../shared/contracts/contracts.helper";

const contracts = {
    "MARKET_CONTROLLER": 'MARKET_CONTROLLER'
};

export const buy = (wallet, marketAddress, tokenAddress, investmentAmount, outcomeIndex, minOutcomeTokensToBuy) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .buy(marketAddress, tokenAddress, investmentAmount, outcomeIndex, minOutcomeTokensToBuy)
        .send({
            from: wallet,
        });
};

export const sell = (wallet, marketAddress, tokenAddress, returnAmount, outcomeIndex, maxOutcomeTokensToSell) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .sell(marketAddress, tokenAddress, returnAmount, outcomeIndex, maxOutcomeTokensToSell)
        .send({
            from: wallet,
        });
};


export const addFunding = (wallet, marketAddress, addedFunds) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .addFunding(marketAddress, addedFunds)
        .send({
            from: wallet,
        });
};


export const removeFunding = (wallet, marketAddress, sharesToBurn, autoMerge) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .removeFunding(marketAddress, sharesToBurn, autoMerge)
        .send({
            from: wallet,
        });
};

export const createMarketProposal = (wallet, collateralToken, participationEndTime, resolvingEndTime, initialLiq, question, choices, imageURL, description, resolveResources) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .createMarketProposal(collateralToken, participationEndTime, resolvingEndTime, initialLiq, question, choices, imageURL, description, resolveResources)
        .send({
            from: wallet,
        });
};

export const calcBuyAmount = (wallet, marketAddress, tokenAddress, investmentAmount, outcomeIndex) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .calcBuyAmount(marketAddress, tokenAddress, investmentAmount, outcomeIndex)
        .call({
            from: wallet,
        });
};

export const calcSellAmount = (wallet, marketAddress, tokenAddress, returnAmount, outcomeIndex) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .calcSellAmount(marketAddress, tokenAddress, returnAmount, outcomeIndex)
        .call({
            from: wallet,
        });
};

export const getCollateralAmountOut = (wallet, collateralAddress, tokenAddress, tokenAmount) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .getCollateralAmountOut(collateralAddress, tokenAddress, tokenAmount)
        .call({
            from: wallet,
        });
};

export const getCollateralAmountIn = (wallet, collateralAddress, tokenAddress, tokenAmount) => {
    const contract = getContract(contracts.MARKET_CONTROLLER);

    return contract
        .methods
        .getCollateralAmountIn(collateralAddress, tokenAddress, tokenAmount)
        .call({
            from: wallet,
        });
};
