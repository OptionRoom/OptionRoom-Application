import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import SearchIcon from '@material-ui/icons/Search';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import MarketCard from "../../components/MarketCard";
import { useStyles } from "./styles";
import {
    getMarkets,
    getIfWalletIsWhitelistedForBeta,
} from "../../shared/firestore.service";
import FiltrationWidget from "../../components/FiltrationWidget";

import Button from "../../components/Button";
import NotWhitelisted from "../../components/NotWhitelisted";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import { useGetFilteredMarkets } from "./hooks";
import { GridIcon, ListIcon } from "../../shared/icons";
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
    const [isWalletWhitelistedForBeta, setIsWalletWhitelistedForBeta] =
        useState(false);
    const [isMinHeader, setIsMinHeader] = useState(false);
    const [isMarketsSidebarOpen, setIsMarketsSidebarOpen] = useState(false);

    const [filterDetails, setFilterDetails] = useState({
        name: "",
        category: {
            title: 'All',
            id: "all"
        },
        state: {
            id: "3",
            title: "Active",
        },
        sort: {
            by: "volume",
            direction: "down",
        },
        view: "grid",
    });

    const filteredMarkets = useGetFilteredMarkets(
        allMarkets,
        marketsContracts,
        filterDetails.name,
        filterDetails.category,
        filterDetails.sort,
        marketsTotalVolume
    );

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);

            const isWalletWhitelistedForBetaRes =
                await getIfWalletIsWhitelistedForBeta(accountContext.account);
            setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);

            if (isWalletWhitelistedForBetaRes) {
                const result = await getMarkets();
                setAllMarkets(result);
                const marketApis = new MarketAPIs();
                const marketContracts = await marketApis.getMarketsByState(
                    accountContext.account,
                    filterDetails.state.id
                );
                setMarketsContracts(marketContracts);

                const marketsTradedByWallet = await marketApis.getMarketsTradedByWallet(accountContext.account);
                console.log("marketsTradedByWallet", marketsTradedByWallet);
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
            const marketContracts = await marketApis.getMarketsByState(
                accountContext.account,
                filterDetails.state.id
            );
            setMarketsContracts(marketContracts);
        };

        if (accountContext.account) {
            init();
        }
    }, [filterDetails.state]);

    useEffect(() => {
        const init = async () => {
            const marketApis = new MarketAPIs();
            for (const address in marketsContracts) {
                if (!marketsPriceOfBuy[address]) {
                    const pricesOfBuy = await marketApis.getPricesOfBuy(
                        accountContext.account,
                        marketsContracts[address]
                    );
                    setMarketsPriceOfBuy((prevState) => {
                        return {
                            ...prevState,
                            [`${address}`]: {
                                yes: pricesOfBuy.priceOfYes,
                                no: pricesOfBuy.priceOfNo,
                            },
                        };
                    });
                }
            }
        };

        if (accountContext.account && marketsContracts) {
            init();
        }
    }, [marketsContracts]);

    console.log("filterDetails", filterDetails);
    useEffect(() => {
        const init = async () => {
            const marketAPIs = new MarketAPIs();
            for (const address in marketsContracts) {
                if (!marketsTotalVolume[address]) {
                    const tradingVolume =
                        await marketAPIs.getMarketTradingVolume(
                            accountContext.account,
                            marketsContracts[address]
                        );
                    setMarketsTotalVolume((prevState) => {
                        return {
                            ...prevState,
                            [`${address}`]: tradingVolume,
                        };
                    });
                }
            }
        };

        if (accountContext.account && marketsContracts) {
            init();
        }
    }, [marketsContracts]);

    useEffect(() => {

        const handleScroll = () => {
            if(window.scrollY > 30) {
                setIsMinHeader(true);
            } else {
                setIsMinHeader(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <CircularProgress />
            </div>
        );
    }

    if (!isWalletWhitelistedForBeta) {
        return <NotWhitelisted />;
    }

    return (
        <div className={classes.MarketsPage}>
            <div className={classes.MarketsPage__Main}>
                <div className={classes.MarketsPage__Header}>
                    <div className={classes.MarketsPage__HeaderTitle}>
                        Markets
                    </div>
                    <div className={classes.MarketsPage__HeaderActions}>
                        <div className={clsx(classes.MarketsPage__HeaderActionsIconWrap, classes.MarketsPage__HeaderActionsFilters)}
                            onClick={() => {
                                setIsMarketsSidebarOpen(!isMarketsSidebarOpen);
                            }}
                        >
                            <SearchIcon />
                        </div>
                        <div className={clsx(classes.MarketsPage__HeaderActionsIconWrapView, classes.MarketsPage__HeaderActionsIconWrap, {
                                 [classes.MarketsPage__HeaderActionsIconWrapActive]: get(filterDetails, "view") === "grid",
                             })}
                             onClick={() => {
                                setFilterDetails({
                                    ...filterDetails,
                                    view: "grid",
                                });
                            }}
                        >
                            <GridIcon />
                        </div>
                        <div className={clsx(classes.MarketsPage__HeaderActionsIconWrapView, classes.MarketsPage__HeaderActionsIconWrap, {
                                [classes.MarketsPage__HeaderActionsIconWrapActive]: get(filterDetails, "view") === "list",
                            })}
                             onClick={() => {
                                setFilterDetails({
                                    ...filterDetails,
                                    view: "list",
                                });
                            }}
                        >
                            <ListIcon />
                        </div>
                        <Link to={`/markets/create`}>
                            <Button color="primary"
                                    size={"medium"}>
                                + Create New
                            </Button>
                        </Link>
                    </div>
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
                                        <div key={`market-${entry.id}`}>
                                            <MarketCard
                                                market={{
                                                    ...entry,
                                                    state: filterDetails.state,
                                                    priceOfBuy: get(
                                                        marketsPriceOfBuy,
                                                        [entry.id]
                                                    ),
                                                    volume: get(
                                                        marketsTotalVolume,
                                                        [entry.id]
                                                    ),
                                                }}
                                                isListView={
                                                    get(filterDetails, "view") ===
                                                    "list"
                                                }
                                                isFeatured={entry.isFeatured}
                                                onMarketDataLoad={(e) => {
                                                    if (
                                                        e &&
                                                        e.marketContractAddress
                                                    ) {
                                                        marketsContractData[
                                                            e.marketId
                                                            ] = e;
                                                    }
                                                }}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
            {
                /**
                 * isMinHeader
                 */
            }
            <div className={clsx(classes.MarketsPage__Sidebar, {
                [classes.MarketsPage__Sidebar__IsMin]: isMinHeader,
                [classes.MarketsPage__Sidebar__MobileOpen]: isMarketsSidebarOpen,
            })}>
{/*
                <div className={classes.MarketsPage__SidebarOverlay}></div>
*/}
                <FiltrationWidget
                    onClose={() => {
                        setIsMarketsSidebarOpen(false);
                    }}
                    filterDetails={filterDetails}
                    onFilterUpdate={(newDetails) => {
                        setFilterDetails(newDetails);
                    }}
                />
            </div>
        </div>
    );
}

export default Markets;
