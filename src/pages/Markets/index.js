import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { filter, get } from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

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
import NoResultsImg from "./no-results.png";
import { useGetFilteredMarkets } from "./hooks";
import roomIcon from "../../assets/room.svg";
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
    const [filterDetails, setFilterDetails] = useState({
        name: "",
        category: "",
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
                        <div
                            onClick={() => {
                                setFilterDetails({
                                    ...filterDetails,
                                    view: "grid",
                                });
                            }}
                        >
                            <GridIcon />
                        </div>
                        <div
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
                            <Button color="primary" size={"medium"}>
                                + Create New
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={classes.MarketsPage__MainList}>
                    {filteredMarkets && filteredMarkets.length > 0 && (
                        <div
                            className={clsx(classes.MarketsList, {
                                [classes.MarketsList__ListView]:
                                    get(filterDetails, "view") === "list",
                            })}
                        >
                            {filteredMarkets.map((entry, index) => {
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
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.MarketsPage__Sidebar}>
                <FiltrationWidget
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
