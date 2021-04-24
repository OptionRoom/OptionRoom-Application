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
import {getMarketCategories, getMarkets, getIfWalletIsWhitelistedForBeta} from '../../shared/firestore.service';

import Button from "../../components/Button";
import NotWhitelisted from "../../components/NotWhitelisted";
import MarketAPIs from "../../shared/contracts/MarketAPIs";

function Markets() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const [marketCategories, setMarketCategories] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWalletWhitelistedForBeta, setIsWalletWhitelistedForBeta] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
/*            const cats = await getMarketCategories();
            setMarketCategories(cats);*/
            const isWalletWhitelistedForBetaRes = await getIfWalletIsWhitelistedForBeta(accountContext.account);
            setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);

            const marketApis = new MarketAPIs();
            const createdContracts = await marketApis.getAllMarketContracts();
            console.log("createdContracts", createdContracts);
            const result = await getMarkets();
            const filteredMarkets = filter(result, (entry) => {
                return !!createdContracts[entry.id];
            });

            setMarkets(filteredMarkets);
            setIsLoading(false);
        };

        if(accountContext.account) {
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
                                 (
                                 <Grid item xs={2}>
                                 <div className={classes.Sidebar}>
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
                                 </div>
                                 </Grid>
                                 )
                                 */
                            }
                            <Grid item xs={12}>
                                <div className={classes.MarketsWrap}>
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
                                                            {markets.map((entry) => {
                                                                return (
                                                                    <div>
                                                                        <MarketCard market={entry}/>
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
