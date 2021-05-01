import {useState, useEffect} from 'react';
import {filter, orderBy} from 'lodash';

export const useGetFilteredMarkets = (markets, marketsContractData, searchQuery, category, state, sortBy) => {
    const [filteredMarkets, setFilteredMarkets] = useState([]);

    useEffect(() => {
        if (markets) {
            let newMarkets = markets;

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

            if (state) {
                console.log("here");
                //value
                newMarkets = filter(newMarkets, (entry) => {
                    if (marketsContractData[entry.id]) {
                        console.log("marketsContractData[entry.id].state", marketsContractData[entry.id].state, state);
                        return marketsContractData[entry.id].state == state;
                    }

                    return false;
                });
            }

            if (sortBy) {
                console.log("sortBy", sortBy);
                const sortDirection = sortBy.direction === 'up' ? 'asc' : 'desc';

                if (sortBy.by === 'volume') {
                    newMarkets = orderBy(newMarkets, (entry) => {
                        if (marketsContractData[entry.id]) {
                            return marketsContractData[entry.id].tradeVolume;
                        }

                        return 0;
                    }, [sortDirection]);
                } else if (sortBy.by === 'created') {
                    newMarkets = orderBy(newMarkets, ["createdAt"], [sortDirection]);
                }
            }

            setFilteredMarkets(newMarkets);
        }
    }, [markets, searchQuery, category, state, sortBy]);

    return filteredMarkets;
}
