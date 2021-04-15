import {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import MarketCard from "../../components/MarketCard";
import OutcomeProgress from "../../components/OutcomeProgress";
import {useStyles} from "./styles";

import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";
import OptionBlock from "../../components/OptionBlock";

const walletHelperInsatnce = walletHelper();

const getNumberFromBigNumber = (bigNumber) => {
    return fromWei(bigNumber, "ether", 2);
};

const getBigNumberFromNumber = (number) => {
    return toWei(number, "ether");
};

function Market() {
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
                            <Grid item xs={8}>
                                <div className={classes.MarketDetails}>
                                    <div className={classes.Cat}>US Current Affairs</div>
                                    <div className={classes.Title}>Will Donald Trump be President of the USA on March
                                        31, 2021?
                                    </div>
                                    <div className={classes.Info}>
                                        <div className={classes.Info__Block}>
                                            <div className={classes.Info__BlockTitle}>Trade volume</div>
                                            <div className={classes.Info__BlockValue}>₮184,179</div>
                                        </div>
                                        <div className={classes.Info__Block}>
                                            <div className={classes.Info__BlockTitle}>Liquidity</div>
                                            <div className={classes.Info__BlockValue}>₮7,919</div>
                                        </div>
                                        <div className={classes.Info__Block}>
                                            <div className={classes.Info__BlockTitle}>Market ends on</div>
                                            <div className={classes.Info__BlockValue}>June 1, 2021</div>
                                        </div>
                                    </div>
                                    <div className={classes.Graph}>
                                        <div className={classes.Graph__Header}>
                                            <div className={classes.Graph__HeaderTitle}>History</div>
                                            <div className={classes.Graph__HeaderNav}>
                                                <div className={classes.Graph__HeaderNavOption}>24h</div>
                                                <div className={classes.Graph__HeaderNavOption}>7d</div>
                                                <div className={classes.Graph__HeaderNavOption}>30d</div>
                                                <div className={classes.Graph__HeaderNavOption}>all</div>
                                            </div>
                                        </div>
                                        <div className={classes.Graph__Deatils}>

                                        </div>
                                    </div>
                                    <div className={classes.Outcome}>
                                        <div className={classes.Outcome__Header}>
                                            Outcome
                                        </div>
                                        <div className={classes.Outcome__Details}>
                                            <div>
                                                <OutcomeProgress title={'Yes'}
                                                                 count={'50'}
                                                                 percent={50}
                                                                 color={'#86DC8B'}/>
                                            </div>
                                            <div>
                                                <OutcomeProgress title={'No'}
                                                                 count={'₮0.01'}
                                                                 percent={40}
                                                                 color={'#7084FF'}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.MarketPositions}>
                                        <div className={classes.MarketPositions__Header}>
                                            Market Positions
                                        </div>
                                        <div className={classes.MarketPositions__Details}>
                                            {
                                                [
                                                    {title: 'Outcome', value: 'Yes (14.58 Shares)'},
                                                    {title: 'Price: Average | Current', value: '₮0.46 | ₮0.21'},
                                                    {title: 'P/L: $ | %', value: '-3.66 | -5.428%'},
                                                    {title: 'Value: Inititial | Current', value: '₮6.75 | ₮3.09'},
                                                    {title: 'Max Payout', value: '₮14.58'},
                                                ].map((entry) => {
                                                    return (
                                                        <div className={classes.MarketPosition__Block}>
                                                            <span>{entry.title}</span>
                                                            <span>{entry.value}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
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
                                    <div className={classes.Resolution}>
                                        <div className={classes.Resolution__Header}>
                                            Resolution Source
                                        </div>
                                        <div className={classes.Resolution__Details}>
                                            {
                                                [
                                                    'https://history.house.gov/Institution/Presidents-Coinciding/Presidents-Coinciding/',
                                                    'https://www.loc.gov/rr/print/list/057_chron.html',
                                                ].map((entry) => {
                                                    return (
                                                        <div className={classes.ResolutionLink}>
                                                            {entry}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.MarketSidebar}>
                                    <div className={classes.BuySellWidget}>
                                        <div className={classes.BuySellWidget__Nav}>
                                            <div>Buy</div>
                                            <div>Sell</div>
                                        </div>
                                        <div className={classes.BuySellWidget__Options}>
                                            <div className={classes.Options__Header}>
                                                Pick Outcome
                                            </div>
                                            <div className={classes.Options__Options}>
                                                {
                                                    ['Yes', 'No'].map((entry) => {
                                                        return (
                                                            <OptionBlock title={entry} value={'5.6$'}/>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className={classes.BuySellWidgetAmount}>
                                            <div className={classes.BuySellWidgetAmount__Header}>How Much?</div>
                                            <div className={classes.BuySellWidgetAmount__InputWrap}>
                                                <input type='text'/>
                                                <div>Max</div>
                                            </div>
                                        </div>
                                        <div className={classes.BuySellWidgetInfo}>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Your Avg. Price</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>₮0.5274</div>
                                            </div>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Est. Shares</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>0.00</div>
                                            </div>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Max Winnings</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>₮0.5274</div>
                                            </div>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Max ROI</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>0.00%</div>
                                            </div>
                                        </div>
                                        <Button color="primary"
                                                size={"large"}
                                                fullWidth={true}>Trade</Button>
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

export default Market;
