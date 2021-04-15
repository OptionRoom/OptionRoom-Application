import {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";
import MarketCard from "../../components/MarketCard";
import {useStyles} from "./styles";

import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";

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

    const classes = useStyles();

    useEffect(() => {

    }, [accountContext.account]);

    const cats = [
        {
            name: 'All',
            count: '2',
        },
        {
            name: 'Business',
            count: '3',
        },
        {
            name: 'Coronavirus',
            count: '99',
        },
        {
            name: 'Crypto',
            count: '105',
        },
        {
            name: 'NFTs',
            count: '78',
        },
        {
            name: 'Pop Culture',
            count: '2',
        },
        {
            name: 'Science',
            count: '1',
        },
        {
            name: 'Sports',
            count: '65',
        },
        {
            name: 'Tech',
            count: '75',
        },
        {
            name: 'US Current Affairs',
            count: '82',
        },
    ];

    return (
        <>
            <Navbar
                title={"Claim"}
                details={
                    "Earn COURT tokens by providing liquidity to one of the pools on this page."
                }
            />
            <div className={classes.MarketsPage}>
                {accountContext.account && (
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <div className={classes.Sidebar}>
                                    <div className={classes.Sidebar__Title}>
                                        Categories
                                    </div>
                                    <div className={classes.Sidebar__Content}>
                                        {
                                            cats.map((cat) => {
                                                return (
                                                    <div className={classes.Cat}>
                                                        <div className={classes.Cat__Name}>
                                                            {cat.name}
                                                        </div>
                                                        <div className={classes.Cat__Count}>
                                                            {cat.count}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={9}>
                                <MarketCard/>
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
