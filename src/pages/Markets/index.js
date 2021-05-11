import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {filter, get} from 'lodash';
import CircularProgress from "@material-ui/core/CircularProgress";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";
import MarketCard from "../../components/MarketCard";
import {useStyles} from "./styles";
import {getMarkets, getIfWalletIsWhitelistedForBeta} from '../../shared/firestore.service';

import Button from "../../components/Button";
import NotWhitelisted from "../../components/NotWhitelisted";
import MarketsFiltration from "./MarketsFiltration";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import NoResultsImg from "./no-results.png";
import {useGetFilteredMarkets} from './hooks';
import roomIcon from '../../assets/room.svg';
import clsx from "clsx";

const marketsContractData = {};

function Markets() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const [allMarkets, setAllMarkets] = useState([]);
    const [marketsContracts, setMarketsContracts] = useState([]);
    const [marketsPriceOfBuy, setMarketsPriceOfBuy] = useState([]);
    const [marketsTotalVolume, setMarketsTotalVolume] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWalletWhitelistedForBeta, setIsWalletWhitelistedForBeta] = useState(false);
    const [filterDetails, setFilterDetails] = useState({
        name: '',
        category: '',
        state: {
            value: "3",
            label: 'Active'
        },
        sort: {
            by: 'volume',
            direction: 'down'
        },
        view: 'grid'
    });

    const filteredMarkets = useGetFilteredMarkets(allMarkets, marketsContracts, filterDetails.name, filterDetails.category, filterDetails.sort, marketsTotalVolume);

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);

            const isWalletWhitelistedForBetaRes = await getIfWalletIsWhitelistedForBeta(accountContext.account);
            setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);

            if(isWalletWhitelistedForBetaRes) {
                const result = await getMarkets();
                setAllMarkets(result);
                const marketApis = new MarketAPIs();
                const marketContracts = await marketApis.getMarketsByState(accountContext.account, filterDetails.state.value);
                setMarketsContracts(marketContracts);
                console.log("marketContracts", result, marketContracts);
            }

            setIsLoading(false);
        };

        if (accountContext.account) {
            init();
        }
    }, [accountContext.account]);


    useEffect(() => {
        const init = async () => {
            const marketApis = new MarketAPIs();
            const marketContracts = await marketApis.getMarketsByState(accountContext.account, filterDetails.state.value);
            setMarketsContracts(marketContracts);
        };

        if (accountContext.account) {
            init();
        }
    }, [filterDetails.state]);

    useEffect(() => {
        const init = async () => {
            const marketApis = new MarketAPIs();
            for(const address in marketsContracts) {
                if(!marketsPriceOfBuy[address]) {
                    const pricesOfBuy = await marketApis.getPricesOfBuy(accountContext.account, marketsContracts[address]);
                    setMarketsPriceOfBuy(prevState => {
                        return {
                            ...prevState,
                            [`${address}`]: {
                                'yes': pricesOfBuy.priceOfYes,
                                'no': pricesOfBuy.priceOfNo,
                            }
                        }
                    });
                }
            }
        };

        if (accountContext.account && marketsContracts) {
            init();
        }
    }, [marketsContracts]);

    useEffect(() => {
        const init = async () => {
            const marketAPIs = new MarketAPIs();
            for(const address in marketsContracts) {
                if(!marketsTotalVolume[address]) {
                    const tradingVolume = await marketAPIs.getMarketTradingVolume(accountContext.account, marketsContracts[address]);
                    setMarketsTotalVolume(prevState => {
                        return {
                            ...prevState,
                            [`${address}`]: tradingVolume
                        }
                    });
                }
            }
        };

        if (accountContext.account && marketsContracts) {
            init();
        }
    }, [marketsContracts]);

    console.log("marketsPriceOfBuy", marketsPriceOfBuy);
    console.log("marketsTotalVolume", marketsTotalVolume);

    if(!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    if(isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <CircularProgress/>
            </div>
        )
    }

    if(!isWalletWhitelistedForBeta) {
        return (
            <NotWhitelisted/>
        )
    }

    console.log("filteredMarkets", JSON.stringify(filteredMarkets));

    return (
        <div className={classes.MarketsPage}>
            <div className={classes.MarketsHeader}>
                <div className={classes.MarketsContainer}>
                    <div>
                        <h1>Markets</h1>
{/*
                        <p>Search, participate and create</p>
*/}
                    </div>
                    <Link to={`/markets/create`}
                          className={classes.CreateMarketLink}>
                        <Button
                            color="primary"
                            size={'medium'}>Create market</Button>
                    </Link>
                </div>
            </div>
            <div className={classes.MarketsFiltrationWrap}>
                <div className={classes.MarketsContainer}>
                    <MarketsFiltration
                        filterDetails={filterDetails}
                        onFilterUpdate={(newDetails) => {
                            setFilterDetails(newDetails);
                        }}/>
                </div>
            </div>
            <div className={classes.MarketsListnWrap}>
                <div className={classes.MarketsContainer}>
                    {
                        (filteredMarkets && filteredMarkets.length > 0) && (
                            <div className={clsx(classes.MarketsList, {
                                [classes.MarketsList__ListView]: get(filterDetails, 'view') === 'list',
                            })}>
                                {filteredMarkets.map((entry, index) => {
                                    return (
                                        <div key={`market-${entry.id}`}>
                                            <MarketCard market={{
                                                ...entry,
                                                state: filterDetails.state,
                                                priceOfBuy: get(marketsPriceOfBuy, [entry.id]),
                                                volume: get(marketsTotalVolume, [entry.id]),
                                            }}
                                                        isListView={get(filterDetails, 'view') === 'list'}
                                                        isFeatured={entry.isFeatured}
                                                        onMarketDataLoad={(e) => {
                                                            if (e && e.marketContractAddress) {
                                                                marketsContractData[e.marketId] = e;
                                                            }
                                                        }}/>
                                        </div>
                                    );
                                })}

                            </div>
                        )
                    }
                    {
                        (!filteredMarkets || filteredMarkets.length === 0) && (
                            <div className={classes.NoResultsWrap}>
                                <img src={NoResultsImg}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Markets;
