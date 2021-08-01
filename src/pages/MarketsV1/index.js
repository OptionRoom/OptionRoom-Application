import React, { useState, useContext, useEffect } from "react";
import { get } from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

import ChainAlert from '../../components/ChainAlert';

import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import MarketCard from "../../components/MarketCard";
import { useStyles } from "./styles";
import {
    getMarkets,
} from "../../shared/firestore.service";

import MarketAPIs from "../../shared/contracts/MarketAPIs";
import { useGetFilteredMarkets } from "./hooks";

const marketsContractData = {};

function MarketsV1() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const [allMarkets, setAllMarkets] = useState([]);
    const [marketsContracts, setMarketsContracts] = useState([]);
    const [marketsPriceOfBuy, setMarketsPriceOfBuy] = useState([]);
    const [marketsTotalVolume, setMarketsTotalVolume] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWalletWhitelistedForBeta, setIsWalletWhitelistedForBeta] =
        useState(true);
    const [isMinHeader, setIsMinHeader] = useState(false);
    const [isMarketsSidebarOpen, setIsMarketsSidebarOpen] = useState(false);
    const [marketsTradedByWallet, setMarketsTradedByWallet] = useState([]);

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

    const filteredMarkets = useGetFilteredMarkets(
        allMarkets,
        marketsContracts,
        filterDetails.name,
        filterDetails.category,
        filterDetails.sort,
        filterDetails.tradedOnly,
        marketsTotalVolume,
        marketsTradedByWallet
    );

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);

            const result = await getMarkets(true);
            setAllMarkets(result);
            const marketApis = new MarketAPIs('1.0');
            const marketContracts = await marketApis.getMarketsByState(
                accountContext.account,
                filterDetails.state.id
            );
            setMarketsContracts(marketContracts);

            const marketsTradedByWallet = await marketApis.getMarketsTradedByWallet(accountContext.account);
            setMarketsTradedByWallet(marketsTradedByWallet);

            setIsLoading(false);
        };

        if (accountContext.account && accountContext.isChain('bsc')) {
            init();
        }
    }, [accountContext.account, accountContext.chainId]);

    useEffect(() => {
        const init = async () => {
            const marketApis = new MarketAPIs('1.0');
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

        if (accountContext.account && marketsContracts && accountContext.isChain('bsc')) {
            init();
        }
    }, [marketsContracts, accountContext.chainId]);

    useEffect(() => {
        const init = async () => {
            const marketAPIs = new MarketAPIs('1.0');
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

        if (accountContext.account && marketsContracts && accountContext.isChain('bsc')) {
            init();
        }
    }, [marketsContracts, accountContext.chainId]);

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

    if(!accountContext.isChain('bsc')) {
        return (
            <ChainAlert/>
        )
    }

    if (isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={classes.MarketsPage}>
            <div className={classes.MarketsPage__Main}>
                {
                    !accountContext.isChain('bsc') && (
                        <ChainAlert/>
                    )
                }
                <div className={classes.MarketsPage__MainList}>
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
        </div>
    );
}

export default MarketsV1;
