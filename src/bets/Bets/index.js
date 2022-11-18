import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import clsx from "clsx";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

import ChainAlert from '../../components/ChainAlert';
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import BetCard from "./BetCard";
import { useStyles } from "./styles";

import Button from "../../components/Button";
import OrLoader from "../../components/OrLoader";
import {ChainNetworks} from "../../shared/constants";
import { marketStatesDisplay } from "../constants";
import {useGetIsChainSupported} from "../../shared/hooks";
import {useGetBets} from "../apis";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET, ChainNetworks.LOCAL_CHAIN, ChainNetworks.BINANCE_SMART_CHAIN];

const useFilteredBets = (allBets, state, category) => {
    const [bets, setBets] =  useState([]);
    useEffect(() => {
        setBets(allBets || []);
    }, [allBets, state, category]);
    return bets;
};

function Bets() {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const isChainSupported = useGetIsChainSupported(supportedChains);
    const {data: bets, isLoading: isLoadingBets, isError: isErrorLoadingBets, refetch: refetchBets, error: errorLoadingBets} = useGetBets();
    const filteredMarkets = useFilteredBets(bets);
    useEffect(() => {
        if(accountContext.account && accountContext.chainId) {
            refetchBets();
        }
    }, [accountContext.account, accountContext.chainId]);

    const getStateOptions = ()=> {
        return marketStatesDisplay.filter(entry => entry.showInMarketsQuickFilter);
    }
    const [filterDetails, setFilterDetails] = useState({
        name: "",
        category: {
            title: 'All',
            id: "all"
        },
        state: {
            id: "all",
            title: "All",
        },
        sort: {
            by: "volume",
            direction: "down",
        },
        view: "grid",
    });


    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton />
            </div>
        );
    }

    if(!isChainSupported) {
        return (
            <ChainAlert/>
        )
    }

    return (
        <div className={classes.MarketsPage}>
            <div className={classes.MarketsPage__Main}>
                <div className={classes.MarketsPage__Header}>
                    <div className={classes.MarketsPage__HeaderTitle}>
                        Bets
                    </div>
                    <div className={classes.MarketsPage__HeaderActions}>
                        <Link to={`/bets/create`}>
                            <Button color="primary"
                                    size={"medium"}>
                                + Create New
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={classes.QuickFilters}>
                    {
                        getStateOptions().map((entry) => {
                            return (
                                <div className={clsx({
                                    [classes.QuickFilters__IsActive]: filterDetails.state.id == entry.id
                                })}
                                onClick={() => {
                                    setFilterDetails({
                                        ...filterDetails,
                                        state: entry
                                    });
                                }}
                                key={`state-${entry.id}`}>{entry.title}</div>
                            );
                        })
                    }
                </div>
                <div className={classes.MarketsPage__MainList}>
                    {
                        filteredMarkets.length == 0 && (
                            <div className={classes.notFoundResults}>
                                <SentimentDissatisfiedIcon/>
                                <div>We couldn't find any markets that match your search, please try another time</div>
                            </div>
                        )
                    }
                    {filteredMarkets && filteredMarkets.length > 0 && (
                        <div
                            className={clsx(classes.MarketsList, {
                                [classes.MarketsList__ListView]:
                                    get(filterDetails, "view") === "list",
                            })}
                        >
                            {
                                filteredMarkets.map((entry, index) => {
                                    return (
                                        <div key={`market-${entry.address}`}>
                                            <BetCard
                                                betData={entry}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Bets;
