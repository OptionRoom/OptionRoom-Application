import {useState, useEffect} from 'react';
import {filter, orderBy, get} from 'lodash';
import MarketAPIs from "../../shared/contracts/MarketAPIs";

export const useGetFilteredMarkets = (marketsContracts , searchQuery, category, sortBy, tradedOnly, marketsTradedByWallet) => {
    const [filteredMarkets, setFilteredMarkets] = useState([]);

    useEffect(() => {
        if (marketsContracts && marketsContracts.length > 0) {
            let newMarkets = [...marketsContracts];

            if(tradedOnly) {
                newMarkets = filter(newMarkets, (entry) => {
                    return marketsTradedByWallet.indexOf(entry.address) > -1;
                });
            }

            if (searchQuery && searchQuery.trim()) {
                newMarkets = filter(newMarkets, (entry) => {
                    return get(entry, ['info', 'question']) && get(entry, ['info', 'question']).toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
                });
            }

            if (category && category.id != 'all') {
                newMarkets = filter(newMarkets, (entry) => {
                    return get(entry, ['dbData', 'category', 'id']) == category.value;
                });
            }

            if (sortBy) {
                const sortDirection = sortBy.direction === 'up' ? 'asc' : 'desc';

                if (sortBy.by === 'volume') {
                    newMarkets = orderBy(newMarkets, (entry) => {
                        return get(entry, ['dbData', 'tradeVolume'], 0);
                    }, [sortDirection]);
                } else if (sortBy.by === 'created') {
                    newMarkets = orderBy(newMarkets, (entry) => {
                        return parseFloat(get(entry, ['info', 'createdTime'], new Date().getTime()));
                    }, [sortDirection]);
                }
            }

            setFilteredMarkets(newMarkets);
        }
    }, [marketsContracts, searchQuery, category, sortBy, tradedOnly, marketsTradedByWallet]);

    return filteredMarkets;
}

export const useGetMarketsContractsInfo = (wallet, markets) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const init = async () => {
            if (wallet && markets && markets.length > 0) {
                const newData = {};
                const marketApis = new MarketAPIs();
                for(const m of markets) {
                    const marketInfo = await marketApis.getMarketInfo(wallet, m.address);
                    newData[m.address] = marketInfo;
                }
                setData(newData);
            }
        };

        init();

    }, [wallet, markets]);

    return data;
}

export const useGetMarketsContractsState = (wallet, markets) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const init = async () => {
            if (wallet && markets && markets.length > 0) {
                const newData = {};
                const marketApis = new MarketAPIs();
                for(const m of markets) {
                    const marketState = await marketApis.getMarketState(wallet, m.address);
                    newData[m.address] = marketState;
                }
                setData(newData);
            }
        };

        init();

    }, [wallet, markets]);

    return data;
}

export const useGetMarketsContractsPricesOfBuy = (wallet, markets) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const init = async () => {
            if (wallet && markets && markets.length > 0) {
                const newData = {};
                const marketApis = new MarketAPIs();
                for(const m of markets) {
                    const marketPricesOfBuy = await marketApis.getPricesOfBuy(wallet, m.address);
                    newData[m.address] = {
                        yes: marketPricesOfBuy.priceOfYes,
                        no: marketPricesOfBuy.priceOfNo,
                    };
                }
                setData(newData);
            }
        };

        init();

    }, [wallet, markets]);

    return data;
}
