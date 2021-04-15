import {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import MarketCard from "../../components/MarketCard";
import {useStyles} from "./styles";
import OptionBlock from '../../components/OptionBlock';

import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";
import OutcomeProgress from "../../components/OutcomeProgress";

const walletHelperInsatnce = walletHelper();

const getNumberFromBigNumber = (bigNumber) => {
    return fromWei(bigNumber, "ether", 2);
};

const getBigNumberFromNumber = (number) => {
    return toWei(number, "ether");
};


function Governance() {
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
                title={"Governance"}
                details={
                    "Earn COURT tokens by providing liquidity to one of the pools on this page."
                }
            />
            <div className={classes.MarketsPage}>
                {accountContext.account && (
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <div className={classes.MarketDetails}>
                                    <div className={classes.Cat}>US Current Affairs</div>
                                    <div className={classes.Title}>Will Donald Trump be President of the USA on March
                                        31, 2021?
                                    </div>
                                    <div className={classes.About}>
                                        <div className={classes.About__Header}>
                                            About
                                        </div>
                                        <div className={classes.About__Details}>
                                            This is a market on if Donald Trump will be President of the United States
                                            on March 31, 2021, 12pm EST. This market will resolve to “Yes“ if, on the
                                            resolution date, Donald Trump is the current President of the United States,
                                            officially substantiated More
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.MarketSidebar}>
                                    <div className={classes.VoteWidget}>
                                        <div className={classes.VoteWidget__Header}>
                                            Pick Outcome
                                        </div>
                                        <div className={classes.VoteWidget__Progress}>
                                            <div>
                                                <OutcomeProgress title={'Yes'}
                                                                 count={'₮0.01'}
                                                                 percent={60}
                                                                 color={'#86DC8B'}/>
                                            </div>
                                            <div>
                                                <OutcomeProgress title={'No'}
                                                                 count={'₮0.01'}
                                                                 percent={40}
                                                                 color={'#7084FF'}/>
                                            </div>
                                        </div>
                                        <div className={classes.VoteWidget__Options}>
                                            <div className={classes.Options__Options}>
                                                {
                                                    ['Yes', 'No'].map((entry) => {
                                                        return (
                                                            <OptionBlock title={entry}/>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <Button color="primary"
                                                size={"large"}
                                                fullWidth={true}>Vote</Button>
                                    </div>
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

export default Governance;
