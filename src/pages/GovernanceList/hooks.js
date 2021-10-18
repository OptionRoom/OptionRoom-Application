import {useState, useEffect} from 'react';
import {filter, orderBy, get} from 'lodash';
import {marketStatesDisplay} from "../../shared/constants";

export const useGetFilteredProposals = (markets, searchQuery, category, state, sortBy) => {
    const [filteredMarkets, setFilteredMarkets] = useState([]);

    useEffect(() => {
        if (markets) {
            let newMarkets = markets;

            if (searchQuery && searchQuery.trim()) {
                newMarkets = filter(newMarkets, (entry) => {
                    if (!entry.question || !entry.question.trim()) {
                        return false;
                    }

                    return entry.question.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
                });
            }

            if (category && category.id != 'all') {
                newMarkets = filter(newMarkets, (entry) => {
                    return entry.cats.indexOf(category.id) > -1;
                });
            }

            if (state && state.id != 'all') {
                newMarkets = filter(newMarkets, (entry) => {
                    if(state.id === 'active') {
                        return (parseFloat(entry.endTime) * 1000) > (new Date()).getTime();
                    } else if(state.id === 'ended') {
                        return (parseFloat(entry.endTime) * 1000) < (new Date()).getTime();
                    }

                    return true;
                });
            }

            if (sortBy) {
                const sortDirection = sortBy.direction === 'up' ? 'asc' : 'desc';
                if (sortBy.by === 'posted') {
                    newMarkets = orderBy(newMarkets, (entry) => {
                        return parseFloat(entry.createdTime);
                    }, [sortDirection]);
                } else if (sortBy.by === 'ends') {
                    newMarkets = orderBy(newMarkets, (entry) => {
                        return parseFloat(entry.endTime);
                    }, [sortDirection]);
                }
            }

            setFilteredMarkets(newMarkets);
        }
    }, [markets, searchQuery, category, sortBy, state]);

    return filteredMarkets;
}

const supportedMarketsCats = marketStatesDisplay.filter(entry => entry.showInGovernanceFilterWidget).map((entry) => {
    return entry.id;
});

export const useGetFilteredMarkets = (marketsContracts , searchQuery, category, sortBy, state) => {
    const [filteredMarkets, setFilteredMarkets] = useState([]);

    useEffect(() => {
        if (marketsContracts && marketsContracts.length > 0) {
            let newMarkets = [...marketsContracts];

            if (searchQuery && searchQuery.trim()) {
                newMarkets = filter(newMarkets, (entry) => {
                    return get(entry, ['info', 'question']) && get(entry, ['info', 'question']).toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
                });
            }

            if (category && category.id != 'all') {
                newMarkets = filter(newMarkets, (entry) => {
                    return get(entry, ['dbData', 'category', 'id']) == category.id;
                });
            } else if (category.id == 'all') {
                newMarkets = filter(newMarkets, (entry) => {
                    return supportedMarketsCats.indexOf(get(entry, ['dbData', 'category', 'id'])) > -1;
                });
            }

            if (state && state != 'all') {
                newMarkets = filter(newMarkets, (entry) => {
                    return get(entry, ['state']) == state;
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
    }, [marketsContracts, searchQuery, category, sortBy, state]);

    return filteredMarkets;
}
