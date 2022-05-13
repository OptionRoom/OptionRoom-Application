import { useState, useEffect } from 'react';
import { reduce, groupBy, sum } from 'lodash';
import Web3 from "web3";
import moment from 'moment';

import MarketAPIs from "../../shared/contracts/MarketAPIs";
import { fromWei } from "../../shared/helper";
import { getDataRan } from './../../components/MarketOutcome/generate-data';
import {getBuySellEventsOfMarket} from '../../shared/firestore.service';
import {getMarketState} from "../../methods/market-controller.methods";

export const useGetMarketBuyPrices = (wallet, marketContractAddress, optionTokensPercentage) => {
    const [buyPrices, setBuyPrices] = useState({});

    useEffect(() => {
        const init = async () => {
            setBuyPrices({
                '0': optionTokensPercentage[0] / 1000000,
                '1': optionTokensPercentage[1] / 1000000,
            })
        };

        if (wallet && marketContractAddress, optionTokensPercentage) {
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

        if (wallet && marketContractAddress) {
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

        if (wallet && marketContractAddress) {
            init();
        }

    }, [wallet, marketContractAddress, optionTokensPercentage]);

    return tradeVolume;
};

export const useGetMarketState = (wallet, marketContractAddress) => {
    const [val, setVal] = useState(null);

    useEffect(() => {
        const init = async () => {
            const marketState = await getMarketState(wallet, marketContractAddress);
            setVal(marketState);
        };

        if (wallet && marketContractAddress) {
            init();
        }

    }, [wallet, marketContractAddress]);

    return val;
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
            if (Object.keys(groupedHistory).length > 0) {
                Object.keys(groupedHistory).forEach((outcomeIndex) => {
                    const reducedBuys = reduce(groupedHistory[outcomeIndex], function (old, entry) {

                        if (entry.event === 'MCSell') {
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

        if (wallet && marketContractAddress) {
            init();
        }
    }, [wallet, marketContractAddress, walletOptionTokensBalance]);

    return walletBuySellPositions;
}


export const useGetMarketBuySell = (wallet, marketContractAddress, optionTokensPercentage) => {
    const [history, setHistory] = useState({});

    useEffect(() => {
        const init = async () => {
            const marketAPIs = new MarketAPIs();
            const historyOfWallet = await marketAPIs.getMarketBuyAndSellHistory(wallet, marketContractAddress);

            setHistory(historyOfWallet);
        }

        if (wallet && marketContractAddress) {
            init();
        }
    }, [wallet, marketContractAddress, optionTokensPercentage]);

    return history;
}


export const useGetMarketOptionsGraphItems = (wallet, marketContractAddress, timeframe) => {
    const [history, setHistory] = useState({});

    function round(date, duration, method) {
        return moment(Math[method]((+date) / (+duration)) * (+duration)).valueOf();
    }

    useEffect(() => {
        const init = async () => {
            const dd = await getBuySellEventsOfMarket(marketContractAddress);
            const groubedBy = groupBy(dd, (entry) => {
                return round(parseInt(entry.returnValues.timestamp * 1000), moment.duration(1, "hours"), "ceil")
            });

            const groubedByPrice = {};

            Object.keys(groubedBy).forEach((entry) => {
                const prices = [];
                groubedBy[entry].forEach((eventEntry) => {
                    let price = 0;
                    if(eventEntry.event === 'MCBuy') {
                        price = parseFloat(eventEntry.returnValues.investmentAmount) / parseFloat(eventEntry.returnValues.outcomeTokensBought);
                    } else {
                        price = parseFloat(eventEntry.returnValues.returnAmount) / parseFloat(eventEntry.returnValues.outcomeTokensSold);
                    }

                    if (eventEntry.returnValues.outcomeIndex == 0) {
                        prices.push(price);
                    } else {
                        prices.push(1 - price);
                    }
                });

                groubedByPrice[entry] = sum(prices) / prices.length;
            });

            setHistory(groubedByPrice);
        }

        if (wallet && marketContractAddress && timeframe) {
            init();
        }
    }, [wallet, marketContractAddress, timeframe]);

    return history;
}
