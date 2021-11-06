import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import clsx from "clsx";
import SearchIcon from '@material-ui/icons/Search';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

import ChainAlert from '../../components/ChainAlert';

import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import MarketCard from "../../components/MarketCard";
import { useStyles } from "./styles";
import {
    getMarkets,
} from "../../shared/firestore.service";
import FiltrationWidget from "../../components/FiltrationWidget";

import Button from "../../components/Button";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {
    useGetFilteredMarkets,
    useGetMarketsContractsPricesOfBuy,
    useGetMarketsContractsState,
    useGetMarketsContractsInfo
} from "./hooks";
import { GridIcon, ListIcon } from "../../shared/icons";
import OrLoader from "../../components/OrLoader";
import {marketStatesDisplay, ChainNetworks, FiltrationWidgetTypes} from "../../shared/constants";

function Markets() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const [allMarkets, setAllMarkets] = useState([]);
    const [marketsContracts, setMarketsContracts] = useState([]);

    const marketsContractsInfo = useGetMarketsContractsInfo(accountContext.account, marketsContracts);
    const marketsContractsState = useGetMarketsContractsState(accountContext.account, marketsContracts);
    const marketsPriceOfBuy = useGetMarketsContractsPricesOfBuy(accountContext.account, marketsContracts);

    const [isLoading, setIsLoading] = useState(true);
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
        marketsContracts,
        filterDetails.name,
        filterDetails.category,
        filterDetails.sort,
        filterDetails.tradedOnly,
        filterDetails.state.id,
        marketsTradedByWallet
    );

    const classes = useStyles();

    const getStateOptions = ()=> {
        return marketStatesDisplay.filter(entry => entry.showInMarketsQuickFilter);
    }

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);

            const marketApis = new MarketAPIs();
            const marketContracts = await marketApis.getAllMarkets(
                accountContext.account,
                true,
                true,
                true,
                true
            );

            setMarketsContracts(marketContracts);
            setIsLoading(false);
            const marketsTradedByWallet = await marketApis.getMarketsTradedByWallet(accountContext.account);
            setMarketsTradedByWallet(marketsTradedByWallet);
        };

        if (accountContext.account && accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
            init();
        }
    }, [accountContext.account, accountContext.chainId]);

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

    if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
        return (
            <ChainAlert/>
        )
    }

    if (isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <OrLoader width={400}
                          height={400}/>
            </div>
        );
    }

    return (
        <div className={classes.MarketsPage}>
            <div className={classes.MarketsPage__Main}>
                {
                    !accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN) && (
                        <ChainAlert/>
                    )
                }
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
                                }}>{entry.title}</div>
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
                                            <MarketCard
                                                market={entry}
                                                isListView={
                                                    get(filterDetails, "view") === "list"
                                                }
                                                isFeatured={get(entry, ['dbData', 'isFeatured'], false)}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
            <div className={clsx(classes.MarketsPage__Sidebar, {
                [classes.MarketsPage__Sidebar__IsMin]: isMinHeader,
                [classes.MarketsPage__Sidebar__MobileOpen]: isMarketsSidebarOpen,
            })}>
                <FiltrationWidget
                    onClose={() => {
                        setIsMarketsSidebarOpen(false);
                    }}
                    filterDetails={filterDetails}
                    onFilterUpdate={(newDetails) => {
                        setFilterDetails(newDetails);
                    }}
                    type={FiltrationWidgetTypes.MARKETS}
                />
            </div>
        </div>
    );
}

export default Markets;
