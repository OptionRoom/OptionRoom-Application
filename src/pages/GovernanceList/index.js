import React, { useState, useContext, useEffect } from "react";
import { get } from "lodash";
import clsx from "clsx";
import SearchIcon from '@material-ui/icons/Search';

import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import { useStyles } from "./styles";
import FiltrationWidget from "../../components/FiltrationWidget";
import GovernanceOracle from "./GovernanceOracle";
import GovernanceMarket from "./GovernanceMarket";

import { GridIcon, ListIcon } from "../../shared/icons";
import CourtVotePowerStaking2 from "../../components/CourtVotePowerStaking2";
import {
    ChainNetworks,
    GovernanceTypes,
    FiltrationWidgetTypes
} from "../../shared/constants";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN];

function Markets() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);

    const [isMinHeader, setIsMinHeader] = useState(false);
    const [isMarketsSidebarOpen, setIsMarketsSidebarOpen] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [selectedType, setSelectedType] = useState(GovernanceTypes.ORACLE);

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
        type: {
            id: GovernanceTypes.ORACLE,
            title: 'Oracle'
        }
    });

    const classes = useStyles();

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
                        filterDetails.type.id === GovernanceTypes.ORACLE && (
                            <GovernanceOracle filterDetails={filterDetails}/>
                        )
                    }
                    {
                        filterDetails.type.id === GovernanceTypes.MARKET_GOVERNANCE && (
                            <GovernanceMarket filterDetails={filterDetails}/>
                        )
                    }
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
                    type={FiltrationWidgetTypes.GOVERNANCE}
                />
            </div>
        </div>
    );
}

export default Markets;
