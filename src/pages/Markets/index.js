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
import {useGetFilteredMarkets} from './hooks';

const marketsContractData = {};

function Markets() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const [markets, setMarkets] = useState([]);
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
        }
    });

    const filteredMarkets = useGetFilteredMarkets(markets, marketsContractData, filterDetails.name, filterDetails.category, get(filterDetails, ['state', 'value']), filterDetails.sort);

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);

            const isWalletWhitelistedForBetaRes = await getIfWalletIsWhitelistedForBeta(accountContext.account);
            setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);

            const marketApis = new MarketAPIs();
            const createdContracts = await marketApis.getAllMarketContracts();

            const result = await getMarkets();
            const filteredMarkets = filter(result, (entry) => {
                return !!createdContracts[entry.id];
            });

            setMarkets(filteredMarkets);
            setIsLoading(false);
        };

        if (accountContext.account) {
            init();
        }
    }, [accountContext.account]);

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

    return (
        <div className={classes.MarketsPage}>
            <div className={classes.MarketsHeader}>
                <div className={classes.MarketsContainer}>
                    <div>
                        <h1>Markets</h1>
                        <p>Search, participate and create</p>
                    </div>
                    <Link to={`/markets/create`}
                          className={classes.CreateMarketLink}>
                        <Button
                            color="primary"
                            size={'medium'}>Create new market</Button>
                    </Link>
                </div>
            </div>
            <div className={classes.MarketsFiltrationWrap}>
                <div className={classes.MarketsContainer}>
                    <MarketsFiltration
                        filterDetails={filterDetails}
                        onFilterUpdate={(newDetails) => {
                            console.log("newDetails", newDetails);
                            setFilterDetails(newDetails);
                        }}/>
                </div>
            </div>
            <div className={classes.MarketsListnWrap}>
                <div className={classes.MarketsContainer}>
                    <div className={classes.MarketsList}>
                        {filteredMarkets.map((entry) => {
                            return (
                                <div key={`market-${entry.id}`}>
                                    <MarketCard market={entry}
                                                onMarketDataLoad={(e) => {
                                                    if (e && e.marketContractAddress) {
                                                        marketsContractData[e.marketId] = e;
                                                    }
                                                }}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Markets;
