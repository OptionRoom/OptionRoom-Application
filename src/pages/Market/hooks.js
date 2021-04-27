import {useState, useEffect} from 'react';
import {reduce, groupBy} from 'lodash';
import Web3 from "web3";

import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei} from "../../shared/helper";

export const useGetMarketBuyPrices = (wallet, marketContractAddress, optionTokensPercentage) => {
    const [buyPrices, setBuyPrices] = useState({});

    useEffect(() => {
        const init = async () => {
            setBuyPrices({
                '0': optionTokensPercentage[0]/100,
                '1': optionTokensPercentage[1]/100,
            })
        };

        if(wallet && marketContractAddress, optionTokensPercentage) {
            init();
        }
    }, [wallet, marketContractAddress, optionTokensPercentage]);

    return buyPrices;
}

export const useGetMarketSellPrices = (wallet, marketContractAddress) => {
    const [sellPrices, setSellPrices] = useState({});

    useEffect(() => {
        const init = async () => {
            const marketAPIs = new MarketAPIs();

            //marketId, buyAmount, outcomeIndex
            const pricesOfSell = await marketAPIs.getPricesOfSell(wallet, marketContractAddress);

            setSellPrices({
                'yes': pricesOfSell.yes,
                'no': pricesOfSell.no,
            })
        };

        if(wallet && marketContractAddress) {
            init();
        }
    }, [wallet, marketContractAddress]);

    return sellPrices;
};

export const useGetMarketTradeVolume = (wallet, marketContractAddress, optionTokensPercentage) => {
    const [tradeVolume, setTradeVolume] = useState(0);

    useEffect(() => {
        const init = async () => {
            const marketAPIs = new MarketAPIs();
            const tradingVolume = await marketAPIs.getMarketTradingVolume(wallet, marketContractAddress);
            setTradeVolume(tradingVolume);
        };

        if(wallet && marketContractAddress) {
            init();
        }

    }, [wallet, marketContractAddress, optionTokensPercentage]);

    return tradeVolume;
};

export const useGetWalletBuySellPositions = (wallet, marketContractAddress, walletOptionTokensBalance) => {
    const [walletBuySellPositions, setWalletBuySellPositions] = useState({});

    useEffect(() => {
        const init = async () => {
            const marketAPIs = new MarketAPIs();
            const buyResult = {};

            const historyOfWallet = await marketAPIs.getWalletMarketBuyAndSellHistory(wallet, marketContractAddress);
            const groupedHistory = groupBy(historyOfWallet, (entry) => {
                return entry.returnValues.outcomeIndex;
            });

            //investmentAmount returnAmount
            console.log("groupedHistory", groupedHistory);

            if (Object.keys(groupedHistory).length > 0) {
                Object.keys(groupedHistory).forEach((outcomeIndex) => {
                    const reducedBuys = reduce(groupedHistory[outcomeIndex], function (old, entry) {

                        if (entry.event === 'FPMMSell') {
                            return {
                                payingTokenAmount: old.payingTokenAmount.sub(Web3.utils.toBN(`${entry.returnValues.returnAmount}`)),
                                averagePrice: old.averagePrice,
                                totalAmount: old.totalAmount.sub(Web3.utils.toBN(`${entry.returnValues.outcomeTokensSold}`))
                            };
                        }

                        const newAmount = old.totalAmount.add(Web3.utils.toBN(`${entry.returnValues.outcomeTokensBought}`));

                        return {
                            payingTokenAmount: old.payingTokenAmount.add(Web3.utils.toBN(`${entry.returnValues.investmentAmount}`)),
                            averagePrice: (old.averagePrice + parseFloat(fromWei(entry.returnValues.investmentAmount))) / parseFloat(fromWei(entry.returnValues.outcomeTokensBought)),
                            totalAmount: newAmount
                        };

                    }, {
                        averagePrice: 0,
                        totalAmount: Web3.utils.toBN('0'),
                        payingTokenAmount: Web3.utils.toBN('0')
                    });

                    buyResult[outcomeIndex] = reducedBuys;
                });
            }

            setWalletBuySellPositions(buyResult);
        }

        if(wallet && marketContractAddress) {
            init();
        }
    }, [wallet, marketContractAddress, walletOptionTokensBalance]);

    return walletBuySellPositions;
}
