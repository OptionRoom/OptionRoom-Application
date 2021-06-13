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

import {
    TradeVolumeIcon,
    EndsAtIcon,
    LiquidityIcon,
} from '../../shared/icons';

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import {useStyles} from "./styles";
import BuySellWidget from "../../components/BuySellWidget";
import VoteWidget from "../../components/VoteWidget";
import DisputeWidget from "../../components/DisputeWidget";
import MarketLiquidityWidget from "../../components/MarketLiquidityWidget";
import RedeemMarketRewardsWidget from "../../components/RedeemMarketRewardsWidget";
import MarketOutcome from "../../components/MarketOutcome";
import MarketWalletPosition from "../../components/MarketWalletPosition";

import {getIfWalletIsWhitelistedForBeta, getMarketById} from "../../shared/firestore.service";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {MaxUint256} from '../../shared/constants';

import {
    useGetMarketBuyPrices,
    useGetMarketTradeVolume,
    useGetMarketState
} from './hooks';

import {
    getWalletAllowanceOfContractToSpender,
    getWalletBalanceOfContract
} from '../../shared/contracts/contracts.helper';
import {fromWei} from "../../shared/helper";

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
    const marketState = useGetMarketState(accountContext.account, marketContractAddress);
    const [marketContractData, setMarketContractData] = useState({});
    const marketTradeVolume = useGetMarketTradeVolume(accountContext.account, marketContractAddress, get(marketContractData, ['optionTokensPercentage']));



    const classes = useStyles();

    const [walletBalanceOfCollateralToken, setWalletBalanceOfCollateralToken] = useState(0);
    const [walletAllowanceOfCollateralToken, setWalletAllowanceOfCollateralToken] = useState(0);
    const [isWalletOptionTokenApprovedForMarket, setIsWalletOptionTokenApprovedForMarket] = useState(0);
    const [isWalletOptionTokenApprovedForMarketController, setIsWalletOptionTokenApprovedForMarketController] = useState(0);

    //Buy and sell
    const pricesOfBuy = useGetMarketBuyPrices(accountContext.account, marketContractAddress, get(marketContractData, ['optionTokensPercentage']));

    const loadWalletBalanceOfCollateralToken = async () => {
        const result = await getWalletBalanceOfContract(accountContext.account, 'usdt');
        setWalletBalanceOfCollateralToken(result);
    };

    const loadWalletAllowanceOfCollateralToken = async () => {
        const balanceOfAllowanceToken = await getWalletAllowanceOfContractToSpender(accountContext.account, 'usdt', 'market_controller');
        console.log("balanceOfAllowanceToken", balanceOfAllowanceToken);
        setWalletAllowanceOfCollateralToken(balanceOfAllowanceToken);
    };

    const loadWalletAllowanceOfOptionToken = async () => {
        const marketApis = new MarketAPIs();
        const isWalletOptionTokenApprovedForMarketRes = await marketApis.getIsWalletOptionTokenApprovedForMarket(accountContext.account, marketContractAddress);
        const isWalletOptionTokenApprovedForMarketController = await marketApis.getIsWalletOptionTokenApprovedForMarketController(accountContext.account);
        setIsWalletOptionTokenApprovedForMarket(isWalletOptionTokenApprovedForMarketRes);
        setIsWalletOptionTokenApprovedForMarketController(isWalletOptionTokenApprovedForMarketController);
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
        const marketTotalSupply = await marketApis.getMarketTotalSupply(wallet, marketContractAddress);
        const WalletOptionTokensBalance = await marketApis.getWalletOptionTokensBalance(wallet, marketContractAddress);
        const MarketOptionTokensPercentage = await marketApis.getMarketOptionTokensPercentage(wallet, marketContractAddress);
        const MarketOutcome = await marketApis.getMarketOutcome(wallet, marketContractAddress);
        const WalletSharesOfMarket = await marketApis.getWalletSharesOfMarket(wallet, marketContractAddress);
        const walletSharesPercentageOfMarket = await marketApis.getWalletSharesPercentageOfMarket(wallet, marketContractAddress);

        setMarketContractData({
            totalSupply: marketTotalSupply,
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
                    console.log("marketContractAddress", marketContractAddressVal);
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
        return true;
        return ["3", "5", "6"].indexOf(marketState) > -1;
    };

    const showTradeVolumeSection = () => {
        return ["3", "5", "6"].indexOf(marketState) > -1;
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

    const showVoteWidget = () => {
        //return true;
        return (["1", "5", "8"].indexOf(marketState) > -1);
    }

    const showDisputeWidget = () => {
        //return true;
        return (["7"].indexOf(marketState) > -1);
    }

    const showRedeemMarketRewardsWidget = () => {
        //return true;
        return (["6"].indexOf(marketState) > -1);
    }

    const showBuySellWidget = () => {
        //return true;
        return (["3"].indexOf(marketState) > -1);
    }

    console.log("marketState", marketState);

    return (
        <>
            <div className={classes.MarketsPage}>
                <div className={classes.MarketsPage__Header2}>
                    <div className={classes.MarketsPage__Header2Container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <div className={classes.Title}>{get(market, 'title')}</div>
                                <div className={classes.Cat}>{get(market, ['category', 'title'])}</div>
                                <div className={classes.Gallery}>
                                    <img src={get(market, ['image'])}
                                         alt={'Market'}/>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {
                                    showTradeVolumeSection() && (
                                        <div className={classes.TradeVolume}>
                                            <div className={classes.TradeVolume__Title}>Trade Volume</div>
                                            <div className={classes.TradeVolume__Details}>
                                                <TradeVolumeIcon/>
                                                <div className={classes.TradeVolume__DetailsVal}>
                                                    {numeral(marketTradeVolume).format("$0,0.00")}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className={classes.LiqEndBlock}>
                                    <div className={`${classes.LiqEndBlock__Icon} ${classes.LiqEndBlock__IconLiquidity}`}>
                                            <LiquidityIcon></LiquidityIcon>
                                        </div>
                                        <div className={classes.LiqEndBlock__Details}>
                                            <div className={classes.LiqEndBlock__DetailsTitle}>
                                                Liquidity
                                            </div>
                                            <div className={classes.LiqEndBlock__DetailsVal}>
                                                {numeral(fromWei(get(marketContractData, 'totalSupply') || 0)).format("$0,0.00")}
                                            </div>
                                        </div>
                                </div>
                                <div className={classes.LiqEndBlock}>
                                    <div className={`${classes.LiqEndBlock__Icon} ${classes.LiqEndBlock__IconEndsAt}`}>
                                        <EndsAtIcon></EndsAtIcon>
                                    </div>
                                    <div className={classes.LiqEndBlock__Details}>
                                        <div className={classes.LiqEndBlock__DetailsTitle}>
                                            Market Ends
                                        </div>
                                        <div className={classes.LiqEndBlock__DetailsVal}>
                                            {moment(get(market, 'endTimestamp') * 1000).format('MMMM Do YYYY, h:mm a')}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.MarketDetails}>
                    <div className={classes.MarketsPage__Header2Container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <div className={classes.MarketDetails__Body}>
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
                                            <MarketOutcome marketState={marketState}
                                                           optionTokensPercentage={get(marketContractData, ['optionTokensPercentage'])}
                                                           marketContractAddress={marketContractAddress}/>
                                        )
                                    }
                                    <MarketWalletPosition marketState={marketState}
                                                          optionTokensPercentage={get(marketContractData, ['optionTokensPercentage'])}
                                                          walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                                          marketContractAddress={marketContractAddress}/>
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
                                    {
                                        (market && market.wallet == accountContext.account) && (
                                            <div className={classes.CreatorWidegt}>
                                                <Alert icon={<FlareIcon fontSize="inherit" />}
                                                    style={{
                                                        borderRadius: '16px',
                                                        marginBottom: '15px'
                                                    }}
                                                    severity="info">You are the creator of this market</Alert>
                                            </div>
                                        )
                                    }
                                    <div className={classes.MarketWidgetWrap}>
                                        <MarketLiquidityWidget marketState={marketState}
                                                            marketLiquidity={get(marketContractData, 'totalSupply')}
                                                            marketContractAddress={marketContractAddress}

                                                            walletAllowanceOfCollateralToken={walletAllowanceOfCollateralToken}
                                                            walletBalanceOfCollateralToken={walletBalanceOfCollateralToken}
                                                            onApproveCollateralToken={(type) => {
                                                                setWalletAllowanceOfCollateralToken(MaxUint256);
                                                            }}
                                                            onAddLiquidity={handleOnAddLiquidityComplete}
                                                            isWalletOptionTokenApprovedForMarket={isWalletOptionTokenApprovedForMarket}

                                                            isWalletOptionTokenApprovedForMarketController={isWalletOptionTokenApprovedForMarketController}
                                                            onApproveOptionToken={(type) => {
                                                                if(type === 'market') {
                                                                    setIsWalletOptionTokenApprovedForMarket(true);
                                                                } else if(type=== 'market_controller') {
                                                                    setIsWalletOptionTokenApprovedForMarketController(true);
                                                                }
                                                            }}
                                                            walletSharesOfMarket={get(marketContractData, 'walletSharesOfMarket')}
                                                            walletSharesPercentageOfMarket={get(marketContractData, 'walletSharesPercentageOfMarket')}
                                                            onRemoveLiquidity={handleOnRemoveLiquidityComplete}

                                        />
                                    </div>
                                    {
                                        showVoteWidget() && (
                                            <div className={classes.MarketWidgetWrap}>
                                                <VoteWidget
                                                    marketState={marketState}
                                                    marketContractAddress={marketContractAddress}/>
                                            </div>
                                        )
                                    }
                                    {
                                        showDisputeWidget() && (
                                            <div className={classes.MarketWidgetWrap}>
                                                <DisputeWidget
                                                    walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                                    marketState={marketState}
                                                    onDispute={handleOnDispute}
                                                    marketContractAddress={marketContractAddress}/>
                                            </div>
                                        )
                                    }
                                    {
                                        showRedeemMarketRewardsWidget() && (
                                            <div className={classes.MarketWidgetWrap}>
                                                <RedeemMarketRewardsWidget
                                                    marketState={marketState}
                                                    walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                                    onRedeem={handleOnRedeem}
                                                    marketContractAddress={marketContractAddress}/>
                                            </div>
                                        )
                                    }
                                    {
                                        showBuySellWidget() && (
                                            <div className={classes.MarketWidgetWrap}>
                                                <BuySellWidget pricesOfBuy={pricesOfBuy}
                                                               onTrade={handleOnBuy}
                                                               onApprove={(type) => {
                                                                   if (type == 'CollateralToken') {
                                                                       setWalletAllowanceOfCollateralToken(MaxUint256);
                                                                   } else if(type === 'OptionToken') {
                                                                       setIsWalletOptionTokenApprovedForMarket(true);
                                                                   } else {
                                                                       setIsWalletOptionTokenApprovedForMarketController(true);
                                                                   }
                                                               }}
                                                               walletBalanceOfCollateralToken={walletBalanceOfCollateralToken}
                                                               walletAllowanceOfCollateralToken={walletAllowanceOfCollateralToken}
                                                               isWalletOptionTokenApprovedForMarket={isWalletOptionTokenApprovedForMarket}
                                                               isWalletOptionTokenApprovedForMarketController={isWalletOptionTokenApprovedForMarketController}
                                                               walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                                               marketContractAddress={marketContractAddress}/>
                                            </div>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Market;
