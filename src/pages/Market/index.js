import React, {useState, useContext, useEffect} from "react";
import {useQuery} from "react-query";
import Grid from "@material-ui/core/Grid";
import {useHistory, useParams} from 'react-router-dom'
import {get, reduce} from 'lodash';
import moment from 'moment';
import numeral from "numeral";
import Alert from '@material-ui/lab/Alert';
import FlareIcon from '@material-ui/icons/Flare';

import {
    TradeVolumeIcon,
    EndsAtIcon,
    LiquidityIcon,
} from '../../shared/icons';
import ChainAlert from '../../components/ChainAlert';
import ConnectButton from "../../components/ConnectButton";
import BuySellWidget from "../../components/BuySellWidget";
import VoteWidget from "../../components/VoteWidget";
import DisputeWidget from "../../components/DisputeWidget";
import MarketLiquidityWidget from "../../components/MarketLiquidityWidget";
import RedeemMarketRewardsWidget from "../../components/RedeemMarketRewardsWidget";
import MarketOutcome from "../../components/MarketOutcome";
import MarketWalletPosition from "../../components/MarketWalletPosition";
import MarketStateWidget from "../../components/MarketStateWidget";
import OrLoader from "../../components/OrLoader";

import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {ChainNetworks, ContractNames, MaxUint256} from '../../shared/constants';
import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";

import {
    useGetMarketBuyPrices,
    useGetMarketState
} from './hooks';

import {
    getWalletAllowanceOfContractToSpender,
    getWalletBalanceOfContract
} from '../../shared/contracts/contracts.helper';
import {fromWei} from "../../shared/helper";
import {
    useGetIsChainSupported,
    useGetWalletAllowanceOfContractToSpender,
    useGetWalletBalanceOfToken
} from "../../shared/hooks";
import {
    getAccountBalances, getIsWalletOptionTokenApprovedForMarketController,
    getMarketBalanceOf,
    getMarketInfo, getMarketLiquidity,
    getMarketPoolBalances,
    getMarketTotalSupply
} from "../../methods/market-controller.methods";
import MarketBuyWidget from "../../components/MarketBuyWidget";
import MarketSellWidget from "../../components/MarketSellWidget";
import SelectTokensModal from "../../components/SelectTokensModal";
import BuySellWidget2 from "../../components/BuySellWidget2";
const supportedChains = [ChainNetworks.LOCAL_CHAIN, ChainNetworks.BINANCE_SMART_CHAIN];

function Market() {

    const accountContext = useContext(AccountContext);
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const isChainSupported = useGetIsChainSupported(supportedChains);

    //Mrket
    const {marketId} = useParams();
    const [marketContractAddress, setMarketContractAddress] = useState(marketId);
    const marketState = useGetMarketState(accountContext.account, marketContractAddress);
    const [marketInfo, setMarketInfo] = useState(null);
    const [marketContractData, setMarketContractData] = useState({});

    const {
        data: walletBalanceOfCollateralToken,
        refetch: refetchWalletBalanceOfCollateralToken
    } = useGetWalletBalanceOfToken(accountContext.account, ContractNames.busd);
    const {
        data: walletAllowanceOfCollateralToken,
        refetch: refetchWalletAllowanceOfCollateralToken
    } = useGetWalletAllowanceOfContractToSpender(accountContext.account, ContractNames.busd, ContractNames.marketControllerV4);

    const [isWalletOptionTokenApprovedForMarket, setIsWalletOptionTokenApprovedForMarket] = useState(0);
    const [isWalletOptionTokenApprovedForMarketController, setIsWalletOptionTokenApprovedForMarketController] = useState(false);

    //Buy and sell
    const pricesOfBuy = useGetMarketBuyPrices(accountContext.account, marketContractAddress, get(marketContractData, ['optionTokensPercentage']));

    const loadWalletAllowanceOfOptionToken = async () => {
/*        const marketApis = new MarketAPIs(marketVersion);
        const isWalletOptionTokenApprovedForMarketRes = await marketApis.getIsWalletOptionTokenApprovedForMarket(accountContext.account, marketContractAddress);
        setIsWalletOptionTokenApprovedForMarket(isWalletOptionTokenApprovedForMarketRes);*/

        const isWalletOptionTokenApprovedForMarketController = await getIsWalletOptionTokenApprovedForMarketController(accountContext.account);
        setIsWalletOptionTokenApprovedForMarketController(isWalletOptionTokenApprovedForMarketController);
    };

    const handleOnTrade = () => {
        refetchWalletBalanceOfCollateralToken();
        loadPageDetails();
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

        const marketTotalSupply = await getMarketTotalSupply(wallet, marketContractAddress);
        const marketiquidity = await getMarketLiquidity(wallet, marketContractAddress);
        const WalletOptionTokensBalance = await getAccountBalances(wallet, marketContractAddress, wallet);
        const MarketOptionTokensPercentage = await getMarketPoolBalances(wallet, marketContractAddress);
        const WalletBalanceOfMarket = await getMarketBalanceOf(wallet, marketContractAddress, wallet);
        console.log({MarketOptionTokensPercentage});
        console.log({WalletOptionTokensBalance});
        console.log({WalletBalanceOfMarket});
        //const WalletSharesOfMarket = await marketApis.getWalletSharesOfMarket(wallet, marketContractAddress);
        //const walletSharesPercentageOfMarket = await marketApis.getWalletSharesPercentageOfMarket(wallet, marketContractAddress);

        setMarketContractData({
            totalSupply: marketTotalSupply,
            marketiquidity: marketiquidity,
            optionTokensPercentage: MarketOptionTokensPercentage,
            //walletSharesOfMarket: WalletSharesOfMarket,
            //walletSharesPercentageOfMarket: walletSharesPercentageOfMarket,
            walletOptionTokensBalance: WalletOptionTokensBalance,
            walletBalanceOfMarket: WalletBalanceOfMarket,
        });
    };

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);

            if (!marketInfo) {
                const marketInfoDetail = await getMarketInfo(accountContext.account, marketContractAddress);
                console.log({marketInfoDetail});
                setMarketInfo(marketInfoDetail);
            }

            setIsLoading(false);
            loadPageDetails();

            loadWalletAllowanceOfOptionToken();
        };

        if(isChainSupported && accountContext.account) {
            init();
        }

    }, [accountContext.account, isChainSupported]);

    //Liquidity stuff
    const handleOnAddLiquidityComplete = () => {
        refetchWalletBalanceOfCollateralToken();
        loadPageDetails();
    };

    const handleOnRemoveLiquidityComplete = () => {
        refetchWalletBalanceOfCollateralToken();
        loadPageDetails();
    };

    //UI stuff
    const showOutcomeSection = () => {
        return ["3", "5", "6"].indexOf(marketState) > -1;
    };

    const showTradeVolumeSection = () => {
        return ["3", "5", "6"].indexOf(marketState) > -1;
    };

    if(!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    if(!isChainSupported) {
        return (
            <ChainAlert/>
        )
    }

    if(isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <OrLoader width={400}
                          height={400}/>
            </div>
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
        return (["6", "9"].indexOf(marketState) > -1);
    }

    const showBuySellWidget = () => {
        //return true;
        return (["3"].indexOf(marketState) > -1);
    }

    return (
        <>
            <div className={classes.MarketsPage}>
                <div className={classes.MarketsPage__Header2}>
                    <div className={classes.MarketsPage__Header2Container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <div className={classes.Title}>{get(marketInfo, 'question')}</div>
                                <div className={classes.Cat}>{get(marketInfo, ['category', 'title'])}</div>
                                <div className={classes.Gallery}>
                                    <img src={get(marketInfo, ['imageURL'])}
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
                                                    {numeral((get(marketInfo, ['tradeVolume']) || 0)).format("$0,0.00")}
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
                                                {numeral(fromWei(get(marketContractData, 'marketiquidity') || 0)).format("$0,0.00")}
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
                                            {moment(get(marketInfo, 'participationEndTime') * 1000).format('MMMM Do YYYY, h:mm a')}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.MarketDetails}>
                    <div className={classes.MarketsPage__Header2Container}>
                        <div className={classes.MarketDetails__Body}>
                            <div className={classes.MarketWidgetWrap}>
                                <MarketStateWidget marketInfo={marketInfo}
                                                   state={marketState}/>
                            </div>
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

                            {
                                (get(marketInfo, ['creator']) == accountContext.account) && (
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
                                                       marketLiquidity={get(marketContractData, 'marketiquidity')}
                                                       marketContractAddress={marketContractAddress}

                                                       walletAllowanceOfCollateralToken={walletAllowanceOfCollateralToken}
                                                       walletBalanceOfCollateralToken={walletBalanceOfCollateralToken}
                                                       onApproveCollateralToken={(type) => {
                                                           refetchWalletAllowanceOfCollateralToken();
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
                                                       walletBalanceOfMarket={get(marketContractData, 'walletBalanceOfMarket')}
                                                       onRemoveLiquidity={handleOnRemoveLiquidityComplete}

                                />
                            </div>
                            {
                                showVoteWidget() && (
                                    <div className={classes.MarketWidgetWrap}>
                                        <VoteWidget
                                            marketInfo={marketInfo}
                                            marketState={marketState}
                                            showDonutOnOptionBlock={true}
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
                                    <div className={`${classes.MarketWidgetWrap}`}>
                                        <BuySellWidget2 marketInfo={marketInfo}/>
                                    </div>
                                )
                            }
                            <div className={classes.About}>
                                <div className={classes.About__Header}>
                                    About
                                </div>
                                <div
                                    className={classes.About__Details}>{get(marketInfo, 'description')}</div>
                            </div>
                            <div className={classes.Resolution}>
                                <div className={classes.Resolution__Header}>
                                    Resolution Source
                                </div>
                                <div className={classes.Resolution__Details}>
                                    {get(marketInfo, 'resolveResources', []).map((entry, index) => {
                                        return (
                                            <div key={`resolveResources-${index}`}
                                                 className={classes.ResolutionLink}>
                                                <a href={entry}
                                                   target={'_blank'}>{entry}</a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <SelectTokensModal open={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Market;
