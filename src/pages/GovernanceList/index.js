import React, { useState, useContext, useEffect } from "react";
import { get } from "lodash";
import clsx from "clsx";
import SearchIcon from '@material-ui/icons/Search';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import {Link} from "react-router-dom";

import ChainAlert from '../../components/ChainAlert';

import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import { useStyles } from "./styles";
import FiltrationWidget from "../../components/FiltrationWidget";

import GovernanceCard from "../../components/GovernanceCard";
import OracleApis from "../../shared/contracts/OracleApis";
import { GridIcon, ListIcon } from "../../shared/icons";
import OrLoader from "../../components/OrLoader";
import CourtVotePowerStaking2 from "../../components/CourtVotePowerStaking2";
import {useGetFilteredProposals} from "./hooks";

const supportedChains = ['ropsten'];

function Markets() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const [isLoading, setIsLoading] = useState(true);

    const [isMinHeader, setIsMinHeader] = useState(false);
    const [isMarketsSidebarOpen, setIsMarketsSidebarOpen] = useState(false);
    const [markets, setMarkets] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

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
            by: "posted",
            direction: "down",
        },
        view: "grid",
    });

    //(markets, searchQuery, category, state, sortBy)
    const filteredProposals = useGetFilteredProposals(markets, filterDetails.name, filterDetails.category, filterDetails.state, filterDetails.sort);

    const classes = useStyles();

    const isChainSupported = () => {
        let isSupported = false;
        supportedChains.forEach((entry) => {
            if(accountContext.isChain(entry)) {
                isSupported = true;
            }
        });

        return isSupported;
    };

    useEffect(() => {
        const init = async () => {
            const oracleApis = new OracleApis();

            setIsLoading(true);
            const allCategories = await oracleApis.getAllCategories(accountContext.account);
            let marketsResult = await oracleApis.getAllQuestions(accountContext.account);
            marketsResult = marketsResult.map((entry) => {
                return {
                    ...entry,
                    cats: entry.categoriesIndices.map((entry1) => {
                        return allCategories[parseInt(entry1) - 1];
                    })
                };
            });

            console.log("marketsResult", allCategories);
            setMarkets(marketsResult);
            setAllCategories(allCategories);
            setIsLoading(false);
        };

        if (accountContext.account && isChainSupported()) {
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

    if(!isChainSupported()) {
        return (
            <ChainAlert supportedChain={supportedChains.join(', ')}/>
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
                <CourtVotePowerStaking2/>
                <div className={classes.MarketsPage__Header}>
                    <div className={classes.MarketsPage__HeaderTitle}>
                        Proposals
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
                    </div>
                </div>
                <div className={classes.MarketsPage__MainList}>
                    {
                        filteredProposals.length == 0 && (
                            <div className={classes.notFoundResults}>
                                <SentimentDissatisfiedIcon/>
                                <div>We couldn't find any markets that match your search, please try another time</div>
                            </div>
                        )
                    }
                    {filteredProposals && filteredProposals.length > 0 && (
                        <div
                            className={clsx(classes.MarketsList, {
                                [classes.MarketsList__ListView]:
                                get(filterDetails, "view") === "list",
                            })}
                        >
                            {
                                filteredProposals.map((entry, index) => {
                                    return (
                                        <div key={`market-${entry.qid}`}>
                                            <Link
                                                to={`/governance/${entry.qid}`}
                                            >
                                                <GovernanceCard proposal={entry}/>
                                            </Link>
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
                        console.log("newDetails", newDetails);
                        setFilterDetails(newDetails);
                    }}
                    type={'proposal'}
                    categories={allCategories}
                />
            </div>
        </div>
    );
}

export default Markets;
