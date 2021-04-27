import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {Link} from "react-router-dom";
import {filter} from 'lodash';

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
        state: '',
        sort: {
            by: 'volume',
            direction: 'down'
        }
    });

    const filteredMarkets = useGetFilteredMarkets(markets, marketsContractData, filterDetails.name, filterDetails.category, filterDetails.state, filterDetails.sort);

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

    return (
        <>
            <Navbar
                title={"Markets"}
            />
            <div className={classes.MarketsPage}>
                {accountContext.account && (
                    <div>
                        <Grid container spacing={3}>
                            {
                                /**
                                 <Grid item xs={3}>
                                 <div className={classes.Sidebar}>
                                 {
                                        !isLoading && (
                                            <>
                                                <div className={classes.Sidebar__Title}>
                                                    Categories
                                                </div>
                                                <div className={classes.Sidebar__Content}>
                                                    {
                                                        marketCategories.map((cat) => {
                                                            return (
                                                                <div className={classes.Cat}>
                                                                    <div className={classes.Cat__Name}>
                                                                        {cat.title}
                                                                    </div>
                                                                    {cat.count  && (
                                                                        <div className={classes.Cat__Count}>
                                                                            {cat.count}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
                                 {
                                        isLoading && (
                                            <>
                                                <Skeleton animation="wave" height={30} width="100%" />
                                                <Skeleton animation="wave" height={30} width="100%" />
                                                <Skeleton animation="wave" height={30} width="100%" />
                                                <Skeleton animation="wave" height={30} width="100%" />
                                                <Skeleton animation="wave" height={30} width="100%" />
                                                <Skeleton animation="wave" height={30} width="100%" />
                                            </>
                                        )
                                    }
                                 </div>
                                 </Grid>
                                 */
                            }
                            <Grid item xs={12}>
                                <div className={classes.MarketsWrap}>
                                    {
                                        isLoading && (
                                            <>
                                                <Skeleton animation="wave" height={30} width="100%"/>
                                                <Skeleton animation="wave" height={30} width="100%"/>
                                                <Skeleton animation="wave" height={30} width="100%"/>
                                                <Skeleton animation="wave" height={30} width="100%"/>
                                                <Skeleton animation="wave" height={30} width="100%"/>
                                                <Skeleton animation="wave" height={30} width="100%"/>
                                            </>
                                        )
                                    }
                                    {
                                        !isLoading && (
                                            <>
                                                {
                                                    !isWalletWhitelistedForBeta && (
                                                        <NotWhitelisted/>
                                                    )
                                                }
                                                {
                                                    isWalletWhitelistedForBeta && (
                                                        <>
                                                            <div className={classes.CreateMarketLinkWrap}>
                                                                <Link to={`/markets/create`}
                                                                      className={classes.CreateMarketLink}>
                                                                    <Button
                                                                        color="primary"
                                                                        size={'medium'}>Create new market</Button>
                                                                </Link>
                                                            </div>
                                                            <MarketsFiltration filterDetails={filterDetails}
                                                                               onFilterUpdate={(newDetails) => setFilterDetails(newDetails)}/>
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
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )}
                {!accountContext.account && (
                    <div className={classes.ConnectWrap}>
                        <ConnectButton/>
                    </div>
                )}
            </div>
        </>
    );
}

export default Markets;
