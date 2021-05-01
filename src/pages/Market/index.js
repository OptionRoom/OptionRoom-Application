import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {useHistory, useParams} from 'react-router-dom'
import {get, reduce} from 'lodash';
import moment from 'moment';
import numeral from "numeral";
import NotWhitelisted from "../../components/NotWhitelisted";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@material-ui/lab/Alert';
import FlareIcon from '@material-ui/icons/Flare';

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";
import OutcomeProgress from "../../components/OutcomeProgress";
import {useStyles} from "./styles";
import BuySellWidget from "../../components/BuySellWidget";
import VoteWidget from "../../components/VoteWidget";
import DisputeWidget from "../../components/DisputeWidget";
import MarketLiquidityWidget from "../../components/MarketLiquidityWidget";
import RedeemMarketRewardsWidget from "../../components/RedeemMarketRewardsWidget";

import {
    fromWei,
} from "../../shared/helper";

import {getIfWalletIsWhitelistedForBeta, getMarketById} from "../../shared/firestore.service";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {MaxUint256} from '../../shared/constants';

import {
    useGetMarketBuyPrices,
    useGetWalletBuySellPositions,
    useGetMarketSellPrices,
    useGetMarketTradeVolume
} from './hooks';

function Market() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);

    const [isWalletWhitelistedForBeta, setIsWalletWhitelistedForBeta] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //Mrket
    const [market, setMarket] = useState(null);
    const {marketId} = useParams();
    const [marketContractAddress, setMarketContractAddress] = useState(null);
    const [marketContractData, setMarketContractData] = useState({});
    const marketTradeVolume = useGetMarketTradeVolume(accountContext.account, marketContractAddress, get(marketContractData, ['optionTokensPercentage']));



    const classes = useStyles();

    const [walletBalanceOfCollateralToken, setWalletBalanceOfCollateralToken] = useState(0);
    const [walletAllowanceOfCollateralToken, setWalletAllowanceOfCollateralToken] = useState(0);
    const [isWalletOptionTokenApprovedForMarket, setIsWalletOptionTokenApprovedForMarket] = useState(0);

    //Buy and sell
    const pricesOfBuy = useGetMarketBuyPrices(accountContext.account, marketContractAddress, get(marketContractData, ['optionTokensPercentage']));

    console.log("pricesOfBuy", pricesOfBuy, pricesOfBuy);

    const buySellHistoryOfWallet = useGetWalletBuySellPositions(accountContext.account, marketContractAddress, get(marketContractData, ['walletOptionTokensBalance']));

    const loadWalletBalanceOfCollateralToken = async () => {
        const marketApis = new MarketAPIs();
        const balanceOfColletralToken = await marketApis.getWalletBalanceOfCollateralToken(accountContext.account);
        setWalletBalanceOfCollateralToken(balanceOfColletralToken);
    };

    const loadWalletAllowanceOfCollateralToken = async () => {
        const marketApis = new MarketAPIs();
        const balanceOfAllowanceToken = await marketApis.getWalletAllowanceOfCollateralTokenForMarket(accountContext.account, marketContractAddress);
        setWalletAllowanceOfCollateralToken(balanceOfAllowanceToken);
    };

    const loadWalletAllowanceOfOptionToken = async () => {
        const marketApis = new MarketAPIs();
        const isWalletOptionTokenApprovedForMarketRes = await marketApis.getIsWalletOptionTokenApprovedForMarket(accountContext.account, marketContractAddress);
        setIsWalletOptionTokenApprovedForMarket(isWalletOptionTokenApprovedForMarketRes);
    };

    const loadWalletData = async () => {
        loadWalletBalanceOfCollateralToken();
    };


    useEffect(() => {
        if (accountContext.account && marketContractAddress) {
            loadWalletAllowanceOfOptionToken();
            loadWalletAllowanceOfCollateralToken();
            //getWalletMarketPastEvents
        }
    }, [accountContext.account, marketContractAddress]);

    const handleOnBuy = () => {
        loadPageDetails();
        loadWalletData();
    };

    const handleOnRedeem = () => {
        loadPageDetails();
    };

    const handleOnDispute = () => {
        loadPageDetails();
    };

    const loadPageDetails = () => {
        loadMarketContractData();
    };

    const loadMarketContractData = async () => {
        const wallet = accountContext.account;
        const marketApis = new MarketAPIs();
        const marketTotalSupply = await marketApis.getMarketCollateralTotalSupply(wallet, marketContractAddress);
        const marketState = await marketApis.getMarketState(wallet, marketContractAddress);
        const WalletOptionTokensBalance = await marketApis.getWalletOptionTokensBalance(wallet, marketContractAddress);
        const MarketOptionTokensPercentage = await marketApis.getMarketOptionTokensPercentage(wallet, marketContractAddress);
        const MarketOutcome = await marketApis.getMarketOutcome(wallet, marketContractAddress);
        const WalletSharesOfMarket = await marketApis.getWalletSharesOfMarket(wallet, marketContractAddress);
        const walletSharesPercentageOfMarket = await marketApis.getWalletSharesPercentageOfMarket(wallet, marketContractAddress);

        console.log("loadMarketContractData", {
            totalSupply: marketTotalSupply,
            state: marketState,
            optionTokensPercentage: MarketOptionTokensPercentage,
            outcome: MarketOutcome,
            walletSharesOfMarket: WalletSharesOfMarket,
            walletOptionTokensBalance: WalletOptionTokensBalance,
            walletSharesPercentageOfMarket: walletSharesPercentageOfMarket,
        });

        setMarketContractData({
            totalSupply: marketTotalSupply,
            state: marketState,
            optionTokensPercentage: MarketOptionTokensPercentage,
            outcome: MarketOutcome,
            walletSharesOfMarket: WalletSharesOfMarket,
            walletSharesPercentageOfMarket: walletSharesPercentageOfMarket,
            walletOptionTokensBalance: WalletOptionTokensBalance,
        });
    };

    useEffect(() => {
        if (accountContext.account) {
        }
    }, [accountContext.account]);

    useEffect(() => {
        if (marketContractAddress) {
            console.log("marketContractAddress", marketContractAddress);
            loadPageDetails();
        }
    }, [marketContractAddress]);

    useEffect(() => {
        const init = async () => {
            if (accountContext.account) {
                setIsLoading(true);
                const isWalletWhitelistedForBetaRes = await getIfWalletIsWhitelistedForBeta(accountContext.account);
                setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);
                if (!isWalletWhitelistedForBetaRes) {
                    setIsLoading(false);
                    return;
                }

                if (!market) {
                    const result = await getMarketById(marketId);
                    setMarket(result);
                }

                setIsLoading(false);

                loadWalletData();

                if (!marketContractAddress) {
                    const marketApis = new MarketAPIs();
                    const marketContractAddressVal = await marketApis.getMarketById(accountContext.account, marketId);
                    setMarketContractAddress(marketContractAddressVal);
                } else {
                    loadPageDetails();
                }
            }
        };

        init();

    }, [accountContext.account]);

    //Liquidity stuff


    const handleOnAddLiquidityComplete = () => {
        loadWalletBalanceOfCollateralToken();
        loadPageDetails();
    };

    const handleOnRemoveLiquidityComplete = () => {
        loadWalletBalanceOfCollateralToken();
        loadPageDetails();
    };

    //UI stuff
    const showOutcomeSection = () => {
        return ["3", "5", "6"].indexOf(get(marketContractData, 'state')) > -1;
    };

    const showTradeVolumeSection = () => {
        return ["3", "5", "6"].indexOf(get(marketContractData, 'state')) > -1;
    };
    //Buy adn sell stuff

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
        <>
            <div className={classes.MarketsPage}>
                <div className={classes.MarketsPage__Header}>
                    <div></div>
                    <div className={classes.MarketsPage__HeaderDeatils}>
                        <div className={classes.MarketDetails__HeaderAvatar}
                             style={{
                                 backgroundImage: `url(${get(market, ['image'])})`
                             }}></div>
                        <div>
                            <div
                                className={classes.Cat}>{get(market, ['category', 'title'])}</div>
                            <div
                                className={classes.Title}>{get(market, 'title')}</div>
                        </div>
                    </div>
                </div>
                <div className={classes.MarketDetails}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <div className={classes.MarketDetails__Body}>
                                <div className={classes.Info}>
                                    {
                                        showTradeVolumeSection() && (
                                            <div className={classes.Info__Block}>
                                                <div
                                                    className={classes.Info__BlockTitle}>Trade
                                                    volume
                                                </div>
                                                <div
                                                    className={classes.Info__BlockValue}>{numeral(marketTradeVolume).format("$0,0.00")}</div>
                                            </div>
                                        )
                                    }

                                    <div className={classes.Info__Block}>
                                        <div
                                            className={classes.Info__BlockTitle}>Liquidity
                                        </div>
                                        <div className={classes.Info__BlockValue}>
                                            {numeral(fromWei(get(marketContractData, 'totalSupply') || 0)).format("$0,0.00")}
                                        </div>
                                    </div>
                                    <div className={classes.Info__Block}>
                                        <div className={classes.Info__BlockTitle}>Market
                                            ends on
                                        </div>
                                        <div
                                            className={classes.Info__BlockValue}>{moment(get(market, 'endTimestamp') * 1000).format('MMMM Do YYYY, h:mm a')}</div>
                                    </div>
                                </div>
                                {
                                    /**
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
                                     */
                                }
                                {
                                    showOutcomeSection() && (
                                        <div className={classes.Outcome}>
                                            <div className={classes.Outcome__Header}>
                                                Outcome
                                            </div>
                                            <div className={classes.Outcome__Details}>
                                                <div>
                                                    <OutcomeProgress title={'Yes'}
                                                                     count={numeral(get(pricesOfBuy, 0) || 0).format("$0,0.00")}
                                                                     percent={(get(marketContractData, ['optionTokensPercentage', ['0']]) / 10000) || 0}
                                                                     color={'#86DC8B'}/>
                                                </div>
                                                <div>
                                                    <OutcomeProgress title={'No'}
                                                                     count={numeral(get(pricesOfBuy, 1) || 0).format("$0,0.00")}
                                                                     percent={(get(marketContractData, ['optionTokensPercentage', ['1']])/ 10000) || 0}
                                                                     color={'#7084FF'}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    Object.keys(buySellHistoryOfWallet).map((entry) => {
                                        /**
                                         averagePrice: 0,
                                         totalAmount: Web3.utils.toBN('0'),
                                         payingTokenAmount: Web3.utils.toBN('0')
                                         */
                                        const entryDetails = buySellHistoryOfWallet[entry];
                                        const optionName = entry == 0 ? 'Yes' : 'No';

                                        const currentPrice = get(pricesOfBuy, entry);
                                        const formattedCurrentShares = fromWei(get(entryDetails, 'totalAmount') || 0, null, 3);
                                        const averagePrice = numeral(get(entryDetails, 'averagePrice') || 0).format("$0,0.00");
                                        const currentVal = currentPrice * parseFloat(formattedCurrentShares);
                                        const profitVal = currentVal - parseFloat(fromWei(entryDetails.payingTokenAmount));
                                        const initialValue = fromWei(entryDetails.payingTokenAmount);
                                        const profitPercent = profitVal / parseFloat(initialValue);

                                        return (
                                            <div className={classes.MarketPositions}>
                                                <div
                                                    className={classes.MarketPositions__Header}>
                                                    Market Positions
                                                </div>
                                                <div
                                                    className={classes.MarketPositions__Details}>
                                                    {
                                                        [
                                                            {
                                                                title: 'Outcome',
                                                                value: `${optionName} (${formattedCurrentShares} Shares)`
                                                            },
                                                            {
                                                                title: 'Price: Average | Current',
                                                                value: `${averagePrice} | ${numeral(get(pricesOfBuy, entry) || 0).format("$0,0.00")}`
                                                            },
                                                            {
                                                                title: 'P/L: $ | %',
                                                                value: `${numeral(profitVal).format("$0,0.00")} | ${numeral(profitPercent).format("0%")}`
                                                            },
                                                            {
                                                                title: 'Value: Initial | Current',
                                                                value: `${numeral(initialValue).format("$0,0.00")} | ${numeral(currentVal).format("$0,0.00")}`
                                                            },
                                                            {
                                                                title: 'Max Payout',
                                                                value: `${numeral(formattedCurrentShares).format("$0,0.00")}`
                                                            },
                                                        ].map((entry) => {
                                                            return (
                                                                <div
                                                                    className={classes.MarketPosition__Block}>
                                                                    <span>{entry.title}</span>
                                                                    <span>{entry.value}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <div className={classes.About}>
                                    <div className={classes.About__Header}>
                                        About
                                    </div>
                                    <div
                                        className={classes.About__Details}>{get(market, 'description')}</div>
                                </div>
                                <div className={classes.Resolution}>
                                    <div className={classes.Resolution__Header}>
                                        Resolution Source
                                    </div>
                                    <div className={classes.Resolution__Details}>
                                        {get(market, 'sources') && get(market, 'sources').map((entry) => {
                                            return (
                                                <div className={classes.ResolutionLink}>
                                                    <a href={entry}
                                                       target={'_blank'}>{entry}</a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={classes.MarketDetails__Sidebar}>
                                <div className={classes.CreatorWidegt}>
                                    <Alert icon={<FlareIcon fontSize="inherit" />}
                                           style={{
                                               borderRadius: '16px',
                                               marginBottom: '15px'
                                           }}
                                           severity="info">You are the creator of this market</Alert>
                                </div>
                                <div className={classes.MarketLiquidityWidgetWrap}>
                                    <MarketLiquidityWidget marketState={get(marketContractData, 'state')}
                                                           marketLiquidity={get(marketContractData, 'totalSupply')}
                                                           marketContractAddress={marketContractAddress}

                                                           walletAllowanceOfCollateralToken={walletAllowanceOfCollateralToken}
                                                           walletBalanceOfCollateralToken={walletBalanceOfCollateralToken}
                                                           onApproveCollateralToken={(type) => {
                                                               setWalletAllowanceOfCollateralToken(MaxUint256);
                                                           }}
                                                           onAddLiquidity={handleOnAddLiquidityComplete}

                                                           isWalletOptionTokenApprovedForMarket={isWalletOptionTokenApprovedForMarket}
                                                           onApproveOptionToken={(type) => {
                                                               setIsWalletOptionTokenApprovedForMarket(true);
                                                           }}
                                                           walletSharesOfMarket={get(marketContractData, 'walletSharesOfMarket')}
                                                           walletSharesPercentageOfMarket={get(marketContractData, 'walletSharesPercentageOfMarket')}
                                                           onRemoveLiquidity={handleOnRemoveLiquidityComplete}

                                    />
                                </div>
                                {
                                    (["1", "5"].indexOf(get(marketContractData, 'state')) > -1) && (
                                        <VoteWidget
                                            marketState={get(marketContractData, 'state')}
                                            marketContractAddress={marketContractAddress}/>
                                    )
                                }
                                {
                                    (["7"].indexOf(get(marketContractData, 'state')) > -1) && (
                                        <DisputeWidget
                                            walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                            marketState={get(marketContractData, 'state')}
                                            onDispute={handleOnDispute}
                                            marketContractAddress={marketContractAddress}/>
                                    )
                                }
                                {
                                    (["6"].indexOf(get(marketContractData, 'state')) > -1) && (
                                        <RedeemMarketRewardsWidget
                                            marketState={get(marketContractData, 'state')}
                                            walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                            onRedeem={handleOnRedeem}
                                            marketContractAddress={marketContractAddress}/>
                                    )
                                }
                                {
                                    get(marketContractData, 'state') == 3 && (
                                        <BuySellWidget pricesOfBuy={pricesOfBuy}
                                                       onTrade={handleOnBuy}
                                                       onApprove={(type) => {
                                                           if (type == 'CollateralToken') {
                                                               setWalletAllowanceOfCollateralToken(MaxUint256);
                                                           } else {
                                                               setIsWalletOptionTokenApprovedForMarket(true);
                                                           }
                                                       }}
                                                       walletBalanceOfCollateralToken={walletBalanceOfCollateralToken}
                                                       walletAllowanceOfCollateralToken={walletAllowanceOfCollateralToken}
                                                       isWalletOptionTokenApprovedForMarket={isWalletOptionTokenApprovedForMarket}
                                                       walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                                       marketContractAddress={marketContractAddress}/>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default Market;
