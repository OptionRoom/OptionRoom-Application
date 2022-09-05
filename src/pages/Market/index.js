import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {useHistory, useParams} from 'react-router-dom'
import {get, reduce} from 'lodash';
import moment from 'moment';
import numeral from "numeral";
import Alert from '@material-ui/lab/Alert';
import FlareIcon from '@material-ui/icons/Flare';
import { observer } from "mobx-react-lite";

import {
    TradeVolumeIcon,
    EndsAtIcon,
    LiquidityIcon,
} from '../../shared/icons';
import ChainAlert from '../../components/ChainAlert';
import ConnectButton from "../../components/ConnectButton";
import VoteWidget from "../../components/VoteWidget";
import DisputeWidget from "../../components/DisputeWidget";
import MarketLiquidityWidget from "../../components/MarketLiquidityWidget";
import RedeemMarketRewardsWidget from "../../components/RedeemMarketRewardsWidget";
import MarketOutcome from "../../components/MarketOutcome";
import MarketWalletPosition from "../../components/MarketWalletPosition";
import MarketStateWidget from "../../components/MarketStateWidget";
import OrLoader from "../../components/OrLoader";

import {ChainNetworks, ContractNames} from '../../shared/constants';
import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";

import {fromWei} from "../../shared/helper";
import {
    useGetIsChainSupported,
} from "../../shared/hooks";

import BuySellWidget2 from "../../components/BuySellWidget2";
import OptionsWidget from "../../components/OptionsWidget";
import {
    formatAddress,
    SmartContractsContextFunctions
} from "../../shared/SmartContractsContextProvider";
import {smartState} from "../../shared/SmartState";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET, ChainNetworks.LOCAL_CHAIN, ChainNetworks.BINANCE_SMART_CHAIN];

function Market() {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    const [isLoading, setIsLoading] = useState(true);
    const isChainSupported = useGetIsChainSupported(supportedChains);

    //Mrket
    const {marketId} = useParams();
    const [marketContractAddress, setMarketContractAddress] = useState(marketId);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            await smartState.executeFunction(SmartContractsContextFunctions.LOAD_MARKET_INFO, [accountContext.account, marketContractAddress]);
            await smartState.executeFunction(SmartContractsContextFunctions.LOAD_MARKET_WALLET_DATA, [accountContext.account, marketContractAddress]);
            setIsLoading(false);
        };

        if(isChainSupported && accountContext.account) {
            init();
        }

    }, [accountContext.account, isChainSupported]);

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

    const handleOnTrade = () => {
    };

    const handleOnRedeem = () => {
    };

    const handleOnDispute = () => {
    };

    //Liquidity stuff
    const handleOnAddLiquidityComplete = () => {
    };

    const handleOnRemoveLiquidityComplete = () => {
    };

    const getMarketState = () => {
        return get(smartState.marketInfo, [formatAddress(marketContractAddress), 'state']);
    };

    const getMarketInfo = () => {
        return get(smartState.marketInfo, [formatAddress(marketContractAddress)]);
    };

    const getMarketWalletData = () => {
        return get(smartState.marketWalletData, [formatAddress(marketContractAddress), formatAddress(accountContext.account)]);
    };

    //UI stuff
    const showOutcomeSection = () => {
        return false;
        return ["3", "5", "6"].indexOf(getMarketState()) > -1;
    };

    const showTradeVolumeSection = () => {
        return ["3", "5", "6"].indexOf(getMarketState()) > -1;
    };

    const showVoteWidget = () => {
        return (["1", "5", "8"].indexOf(getMarketState()) > -1);
    }

    const showOptionsWidget = () => {
        return (["1"].indexOf(getMarketState()) > -1);
    }

    const showDisputeWidget = () => {
        return (["7"].indexOf(getMarketState()) > -1);
    }

    const showRedeemMarketRewardsWidget = () => {
        //return true;
        return (["6", "9"].indexOf(getMarketState()) > -1);
    }

    const showBuySellWidget = () => {
        //return true;
        return (["3"].indexOf(getMarketState()) > -1);
    }

    return (
        <>
            <div className={classes.MarketsPage}>
                <div className={classes.MarketsPage__Header2}>
                    <div className={classes.MarketsPage__Header2Container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <div className={classes.Title}>{get(getMarketInfo(), ['info', 'question'])}</div>
                                <div className={classes.Cat}>{get(getMarketInfo(), ['categories'], []).join(', ')}</div>
                                <div className={classes.Gallery}>
                                    <img src={get(getMarketInfo(), ['info', 'imageURL'])}
                                         alt={'Market'}/>
                                </div>
                                <MarketStateWidget marketInfo={getMarketInfo()}
                                                   state={getMarketState()}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {
                                    showTradeVolumeSection() && (
                                        <div className={classes.TradeVolume}>
                                            <div className={classes.TradeVolume__Title}>Trade Volume</div>
                                            <div className={classes.TradeVolume__Details}>
                                                <TradeVolumeIcon/>
                                                <div className={classes.TradeVolume__DetailsVal}>
                                                    {numeral(get(getMarketInfo(), ["volume", "totalVolume"], 0)).format("$0,0.00")}
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
                                                {numeral(fromWei(get(getMarketInfo(), ['liquidity']) || 0)).format("$0,0.00")}
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
                                            {moment(get(getMarketInfo(), ['info', 'participationEndTime']) * 1000).format('MMMM Do YYYY, h:mm a')}
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
                            {
                                showOutcomeSection() && (
                                    <MarketOutcome marketState={getMarketState()}
                                                   marketInfo={getMarketInfo()}
                                                   marketContractAddress={marketContractAddress}
                                                   marketWalletData={getMarketWalletData()}
                                    />
                                )
                            }
                            {
                                showOptionsWidget() && (
                                    <div className={classes.MarketWidgetWrap}>
                                        <OptionsWidget marketInfo={getMarketInfo()}></OptionsWidget>
                                    </div>
                                )
                            }
                            {
                                showVoteWidget() && (
                                    <div className={classes.MarketWidgetWrap}>
                                        <VoteWidget
                                            marketInfo={getMarketInfo()}
                                            marketState={getMarketState()}
                                            showDonutOnOptionBlock={true}
                                            marketContractAddress={marketContractAddress}
                                            marketWalletData={getMarketWalletData()}
                                        />
                                    </div>
                                )
                            }
                            {
                                showDisputeWidget() && (
                                    <div className={classes.MarketWidgetWrap}>
                                        <DisputeWidget
                                            info={getMarketInfo()}
                                            marketState={getMarketState()}
                                            onDispute={handleOnDispute}
                                            marketContractAddress={marketContractAddress}
                                            marketWalletData={getMarketWalletData()}
                                        />
                                    </div>
                                )
                            }
                            {
                                showRedeemMarketRewardsWidget() && (
                                    <div className={classes.MarketWidgetWrap}>
                                        <RedeemMarketRewardsWidget
                                            info={getMarketInfo()}
                                            marketState={getMarketState()}
                                            onRedeem={handleOnRedeem}
                                            marketContractAddress={marketContractAddress}
                                            marketWalletData={getMarketWalletData()}
                                        />
                                    </div>
                                )
                            }
                            {
                                showBuySellWidget() && (
                                    <div className={`${classes.MarketWidgetWrap}`}>
                                        <BuySellWidget2 marketInfo={getMarketInfo()}
                                                        onTrade={handleOnTrade}
                                                        marketContractAddress={marketContractAddress}
                                        />
                                    </div>
                                )
                            }
{/*                            <MarketWalletPosition marketState={marketState}
                                                  optionTokensPercentage={get(marketContractData, ['optionTokensPercentage'])}
                                                  walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                                  marketContractAddress={marketContractAddress}/>*/}

                            {
                                (get(getMarketInfo(), ['creator']) == accountContext.account) && (
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
                                <MarketLiquidityWidget marketState={getMarketState()}
                                                       marketContractAddress={marketContractAddress}
                                                       onAddLiquidity={handleOnAddLiquidityComplete}
                                                       onRemoveLiquidity={handleOnRemoveLiquidityComplete}
                                                       marketWalletData={getMarketWalletData()}

                                />
                            </div>
                            <div className={classes.About}>
                                <div className={classes.About__Header}>
                                    About
                                </div>
                                <div
                                    className={classes.About__Details}>{get(getMarketInfo(), ['info', 'description'])}</div>
                            </div>
                            <div className={classes.Resolution}>
                                <div className={classes.Resolution__Header}>
                                    Resolution Source
                                </div>
                                <div className={classes.Resolution__Details}>
                                    {get(getMarketInfo(), ['info', 'resolveResources'], []).map((entry, index) => {
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(Market);
