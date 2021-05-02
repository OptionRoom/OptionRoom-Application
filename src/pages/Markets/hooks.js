import {useState, useEffect} from 'react';
import {filter, orderBy} from 'lodash';

export const useGetFilteredMarkets = (markets, marketsContracts, searchQuery, category, sortBy, marketsTotalVolume) => {
    const [filteredMarkets, setFilteredMarkets] = useState([]);

    useEffect(() => {
        if (markets && marketsContracts) {
            let newMarkets = filter(markets, (entry) => {
                return !!marketsContracts[entry.id];
            });

            if (searchQuery && searchQuery.trim()) {
                newMarkets = filter(newMarkets, (entry) => {
                    if (!entry.title || !entry.title.trim()) {
                        return false;
                    }

                    return entry.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
                });
            }

            if (category) {
                newMarkets = filter(newMarkets, (entry) => {
                    return entry.category.id == category.value;
                });
            }

            if (sortBy) {
                const sortDirection = sortBy.direction === 'up' ? 'asc' : 'desc';

                if (sortBy.by === 'volume') {
                    newMarkets = orderBy(newMarkets, (entry) => {
                        if (marketsTotalVolume[entry.id]) {
                            return marketsTotalVolume[entry.id].tradeVolume;
                        }

                        return 0;
                    }, [sortDirection]);
                } else if (sortBy.by === 'created') {
                    newMarkets = orderBy(newMarkets, ["createdAt"], [sortDirection]);
                }
            }


            setFilteredMarkets(newMarkets);
        }
    }, [markets, marketsContracts, searchQuery, category, sortBy, marketsTotalVolume]);

    return filteredMarkets;
}
