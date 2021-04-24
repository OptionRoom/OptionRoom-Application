import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";
import MarketCard from "../../components/MarketCard";
import {useStyles} from "./styles";
import {getMarketCategories, getMarkets, getIfWalletIsWhitelistedForBeta} from '../../shared/firestore.service';

import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";
import {Link} from "react-router-dom";
import Button from "../../components/Button";
import NotWhitelisted from "../../components/NotWhitelisted";

const walletHelperInsatnce = walletHelper();

const getNumberFromBigNumber = (bigNumber) => {
    return fromWei(bigNumber, "ether", 2);
};

const getBigNumberFromNumber = (number) => {
    return toWei(number, "ether");
};

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
            const cats = await getMarketCategories();
            const isWalletWhitelistedForBetaRes = await getIfWalletIsWhitelistedForBeta(accountContext.account);
            setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);
            setMarketCategories(cats);
            const result = await getMarkets();
            setMarkets(result);
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
