//buy
import {getContract, getContractAddress, getMarketEntityContract} from "../shared/contracts/contracts.helper";
import {ContractNames} from "../shared/constants";
import {fromWei} from "../shared/helper";

export const buyMarketOptions = (wallet, marketAddress, tokenAddress, investmentAmount, outcomeIndex, minOutcomeTokensToBuy) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .buy(marketAddress, tokenAddress, investmentAmount, outcomeIndex, minOutcomeTokensToBuy)
        .send({
            from: wallet,
        });
};

export const sellMarketOptions = (wallet, marketAddress, tokenAddress, returnAmount, outcomeIndex, maxOutcomeTokensToSell) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .sell(marketAddress, tokenAddress, returnAmount, outcomeIndex, maxOutcomeTokensToSell)
        .send({
            from: wallet,
        });
};


export const addFunding = (wallet, marketAddress, addedFunds) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .addFunding(marketAddress, addedFunds)
        .send({
            from: wallet,
        });
};


export const removeFunding = (wallet, marketAddress, sharesToBurn, autoMerge) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .removeFunding(marketAddress, sharesToBurn, autoMerge)
        .send({
            from: wallet,
        });
};

export const createMarketProposal = (wallet, collateralToken, participationEndTime, resolvingEndTime, initialLiq, question, choices, imageURL, description, resolveResources, categories) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .createMarketProposal(collateralToken, participationEndTime, resolvingEndTime, initialLiq, question, choices, imageURL, description, resolveResources, categories)
        .send({
            from: wallet,
        });
};

export const calcBuyAmount = (wallet, marketAddress, tokenAddress, investmentAmount, outcomeIndex) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .calcBuyAmount(marketAddress, tokenAddress, investmentAmount, outcomeIndex)
        .call({
            from: wallet,
        });
};

export const calcSellAmount = (wallet, marketAddress, tokenAddress, returnAmount, outcomeIndex) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .calcSellAmount(marketAddress, tokenAddress, returnAmount, outcomeIndex)
        .call({
            from: wallet,
        });
};

export const getCollateralAmountOut = (wallet, collateralAddress, tokenAddress, tokenAmount) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .getCollateralAmountOut(collateralAddress, tokenAddress, tokenAmount)
        .call({
            from: wallet,
        });
};

export const getCollateralAmountIn = (wallet, collateralAddress, tokenAddress, tokenAmount) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .getCollateralAmountIn(collateralAddress, tokenAddress, tokenAmount)
        .call({
            from: wallet,
        });
};

export const getCategories = (wallet) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .getCategoreis()
        .call({
            from: wallet,
        });
};

export const addCategory = async (wallet, categroy) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .addCAtegory(categroy)
        .send({
            from: wallet,
        });
};

export const getMarketInfo = async (wallet, market, withState, withVolume, withPrices, withCategories, withTotalSupply, withLiquidity, withPoolBalances) => {
    const contract = getContract(ContractNames.marketControllerV4);
    let info = await contract
        .methods
        .getMarketInfo(market)
        .call({
            from: wallet,
        });

    info = {info};


    if(withState) {
        const result = await getMarketState(wallet, market);
        info = {...info, state: result};
    }

    if(withVolume) {
        const volume = await getMarketVolume(wallet, market);
        info = {...info, volume: volume};
    }

    if(withTotalSupply) {
        const result = await getMarketTotalSupply(wallet, market);
        info = {...info, totalSupply: result};
    }

    if(withLiquidity) {
        const result = await getMarketLiquidity(wallet, market);
        info = {...info, liquidity: result};
    }

    if(withPoolBalances) {
        const result = await getMarketPoolBalances(wallet, market);
        info = {...info, poolBalances: result};
    }

    if(withPrices) {
    }

    if(withCategories) {
        const allCats = await getCategories(wallet);
        const result = await getMarketCategories(wallet, market);
        info = {
            ...info,
            categories: result.map((entry) => {
                return allCats[entry];
            })
        };
    }

    return info;
};

export const getMarketVolumeSell = async (wallet, market) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .marketsVolumeSell(market)
        .call({
            from: wallet,
        });
};

export const getBuyAmount = async (wallet, marketAddress, tokenAddress, investmentAmount, outcomeIndex) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .calcBuyAmount(marketAddress, tokenAddress, investmentAmount, outcomeIndex)
        .call({
            from: wallet,
        });
};

export const getMarketVolumeBuy = async (wallet, market) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .marketsVolumeBuy(market)
        .call({
            from: wallet,
        });
};

export const getAllMarkets = async (wallet, withInfo, withState, withVolume, withPrices, withCategories) => {
    const result = await getAllMarketsAddresses(wallet);

    let markets = result.map((e) => {
        return {
            address: e,
        }
    });

    if(withInfo) {
        const info = await getAllMarketsInfo(wallet);
        for(let i =0;  i< markets.length; i++) {
            markets[i].info = info[i];
        }
    }

    if(withState) {
        try {
            const promiseArray = markets.map((entry) => {
                return getMarketState(wallet, entry.address);
            })

            await Promise.all(promiseArray)
                .then(resolvedPromises => {
                    markets = markets.map((entry, index) => {
                        return {
                            ...entry,
                            state: resolvedPromises[index]
                        };
                    })
            });
        }
        catch(err) {
            console.warn(err);
        }
    }

    if(withVolume) {
        try {
            const promiseArray = markets.map((entry) => {
                return getMarketVolume(wallet, entry.address);
            })

            await Promise.all(promiseArray)
                .then(resolvedPromises => {
                    markets = markets.map((entry, index) => {
                        return {
                            ...entry,
                            volume: resolvedPromises[index]
                        };
                    })
                });
        }
        catch(err) {
            console.warn(err);
        }
    }

    if(withCategories) {
        const allCats = await getCategories(wallet);
        try {
            const promiseArray = markets.map((entry) => {
                return getMarketCategories(wallet, entry.address);
            })

            await Promise.all(promiseArray)
                .then(resolvedPromises => {
                    markets = markets.map((entry, index) => {
                        return {
                            ...entry,
                            categories: resolvedPromises[index].map((entry) => {
                                return allCats[entry];
                            })
                        };
                    })
                });
        }
        catch(err) {
            console.warn(err);
        }
    }

    if(withPrices) {
        try {
            const promiseArray = markets.map((entry) => {
                return getMarketBuyPrices(wallet, entry.address, entry.info.choices);
            })

            await Promise.all(promiseArray)
                .then(resolvedPromises => {

                    markets = markets.map((entry, index) => {
                        return {
                            ...entry,
                            pricesOfBuy: resolvedPromises[index]
                        };
                    })
                });
        }
        catch(err) {
            console.warn(err);
        }
    }

    return markets;
}

export const getMarketBuyPrices = (wallet, marketِAddress, choices) => {
    return choices.map((entry) => {
        return 1;
    });
/*    const contract = getContract(ContractNames.marketQueryV4);
    const marketControllerV4Address = getContractAddress(ContractNames.marketControllerV4);

    return contract
        .methods
        .getAllMarketsInfo(marketControllerV4Address)
        .call({
            from: wallet,
        });*/
};

export const getAllMarketsInfo = (wallet) => {
    const contract = getContract(ContractNames.marketQueryV4);
    const marketControllerV4Address = getContractAddress(ContractNames.marketControllerV4);

    return contract
        .methods
        .getAllMarketsInfo(marketControllerV4Address)
        .call({
            from: wallet,
        });
};

export const getAllMarketsAddresses = (wallet) => {
    const contract = getContract(ContractNames.marketQueryV4);
    const marketControllerV4Address = getContractAddress(ContractNames.marketControllerV4);
    console.log({marketControllerV4Address})
    return contract
        .methods
        .getAllMarketsAddresses(marketControllerV4Address)
        .call({
            from: wallet,
        });
};

export const getMarketState = (wallet, marketAddress) => {
    const contract = getMarketEntityContract(wallet, marketAddress);

    return contract
        .methods
        .getMarketState()
        .call({
            from: wallet,
        });
};

export const getMarketCategories = (wallet, marketAddress) => {
    const contract = getContract(ContractNames.marketControllerV4);

    return contract
        .methods
        .getCategoriesForMarket(marketAddress)
        .call({
            from: wallet,
        });
};

export const getMarketVolume = async (wallet, marketAddress) => {
    const buyVolume = await getMarketVolumeBuy(wallet, marketAddress);
    const sellVolume = await getMarketVolumeSell(wallet, marketAddress);
    const totalVolume = parseFloat(fromWei(buyVolume)) + parseFloat(fromWei(sellVolume));
    return {
        buyVolume,
        sellVolume,
        totalVolume
    };
};


export const getMarketTotalSupply = async (wallet, marketAddress) => {
    const contract = getMarketEntityContract(wallet, marketAddress);

    return contract
        .methods
        .totalSupply()
        .call({
            from: wallet,
        });
};

export const getMarketBalanceOf = async (wallet, marketAddress, account) => {
    const contract = getMarketEntityContract(wallet, marketAddress);

    return contract
        .methods
        .balanceOf(account)
        .call({
            from: wallet,
        });
};

export const getAccountBalances = async (wallet, marketAddress, account) => {
    const contract = getMarketEntityContract(wallet, marketAddress);

    return contract
        .methods
        .getAccountBalances(account)
        .call({
            from: wallet,
        });
};

export const getMarketPoolBalances = async (wallet, marketAddress) => {
    const contract = getMarketEntityContract(wallet, marketAddress);

    return contract
        .methods
        .getPoolBalances()
        .call({
            from: wallet,
        });
};

export const getMarketLiquidity = async (wallet, marketAddress) => {
    const contract = getMarketEntityContract(wallet, marketAddress);

    return contract
        .methods
        .totalSupply()
        .call({
            from: wallet,
        });
};

export const getIsWalletOptionTokenApprovedForMarketController = async (wallet) => {
    const contract = getContract(ContractNames.optionTokenV4);

    return contract
        .methods
        .isApprovedForAll(wallet, getContractAddress(ContractNames.marketControllerV4))
        .call({
            from: wallet,
        });
}

export const getIsWalletOptionTokenApprovedForMarket = async (wallet, marketAddress) => {
    const contract = getContract(ContractNames.optionTokenV4);

    return contract
        .methods
        .isApprovedForAll(wallet, marketAddress)
        .call({
            from: wallet,
        });
}

export const redeemMarketRewards = async (wallet, marketAddress) => {
    const contract = getContract(ContractNames.optionTokenV4);

    return contract
        .methods
        .redeem(marketAddress)
        .send({
            from: wallet,
        });
}

export const approveOptionTokenForMarketController = async (wallet) => {
    const contract = getContract(ContractNames.optionTokenV4);

    return contract
        .methods
        .setApprovalForAll(getContractAddress(ContractNames.marketControllerV4), true)
        .send({
            from: wallet,
        });
}

export const approveOptionTokenForMarket = async (wallet, market) => {
    const contract = getContract(ContractNames.optionTokenV4);

    return contract
        .methods
        .setApprovalForAll(market, true)
        .send({
            from: wallet,
        });
}
