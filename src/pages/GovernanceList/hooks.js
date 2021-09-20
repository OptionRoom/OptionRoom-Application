import {useState, useEffect} from 'react';
import {filter, orderBy} from 'lodash';

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
