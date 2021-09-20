import React, {useContext, useEffect, useState} from "react";
import numeral from "numeral";
import Tooltip from '@material-ui/core/Tooltip';
import clsx from "clsx";

import {useStyles} from "./styles";
import OptionBlock from "../OptionBlock";
import {get} from "lodash";
import Button from "../Button";
import TradeSlider2 from "../TradeSlider2";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei, toWei} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";

import {
    approveContractForSpender
} from '../../shared/contracts/contracts.helper';

import TradeInput from '../../components/TradeInput';
import OrTab from "../OrTab";

export const useGetBuySellPosition = (wallet, marketContractAddress, tradeAmount, tradeType, option, marketVersion) => {
    const [buySellDetails, setBuySellDetails] = useState({
        averagePrice: 0,
        estShares: 0,
        maxRoi: 0
    });

    useEffect(() => {
        const init = async () => {
            const optionIndex = option.toLowerCase() === 'yes' ? 0 : 1;
            const marketApis = new MarketAPIs(marketVersion);
            if(tradeType === 'buy') {
                const numberOfBoughtTokens = await marketApis.getOptionTokensCountOfBuy(
                    wallet,
                    marketContractAddress,
                    toWei(tradeAmount),
                    optionIndex
                );

                const averagePrice = parseFloat(tradeAmount)/fromWei(numberOfBoughtTokens);
                const estShares = fromWei(numberOfBoughtTokens);
                const maxRoi = (parseFloat(fromWei(numberOfBoughtTokens)) - parseFloat(tradeAmount)) / parseFloat(tradeAmount);

                setBuySellDetails({
                    averagePrice,
                    estShares,
                    maxRoi
                });
            } else if(tradeType === 'sell') {
                const amountOfColletralTokenOutput = await marketApis.getCollateralTokensCountOfSell(
                    wallet,
                    marketContractAddress,
                    toWei(tradeAmount),
                    optionIndex
                );

                const averagePrice = parseFloat(fromWei(amountOfColletralTokenOutput))/parseFloat(tradeAmount);
                const totalSellPrice = fromWei(amountOfColletralTokenOutput);
                setBuySellDetails({
                    averagePrice,
                    totalSellPrice
                });
            }
        };

        if (wallet && marketContractAddress && (tradeAmount && tradeAmount >= 0) && option) {
            init();
        }

    }, [wallet, marketContractAddress, tradeAmount, option]);

    return buySellDetails;
};

export const useGetMaxTradeSize = (wallet, marketContractAddress, tradeType, tradeOption, walletBalanceOfCollateralToken, walletOptionTokensBalance) => {
    const [maxTradeSize, setMaxTradeSize] = useState(0);

    useEffect(() => {
        if (tradeType === 'buy') {
            setMaxTradeSize(parseFloat(fromWei(walletBalanceOfCollateralToken)));
        } else {
            setMaxTradeSize(parseFloat(fromWei(get(walletOptionTokensBalance, [tradeOption]) || 0)));
        }

    }, [wallet, marketContractAddress, tradeType, tradeOption, walletBalanceOfCollateralToken, walletOptionTokensBalance]);

    return maxTradeSize;
};


function BuySellWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    let updateTradeInputInterval = null;

    //Buy & Sell
    const [selectedTradeType, setSelectedTradeType] = useState('buy');
    const [tradeInput, setTradeInput] = useState(0);
    const [selectedTradeOption, setSelectedTradeOption] = useState('Yes');
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);
    const [isTradeDisabled, setIsTradeDisabled] = useState(true);
    const buySellDetails = useGetBuySellPosition(accountContext.account, props.marketContractAddress, tradeInput, selectedTradeType, selectedTradeOption, props.marketVersion);
    const maxTradeSize = useGetMaxTradeSize(accountContext.account, props.marketContractAddress, selectedTradeType, selectedTradeOption === 'Yes' ? 0 : 1 , props.walletBalanceOfCollateralToken, props.walletOptionTokensBalance);

    const handleChangeTradeType = (newType) => {
        setSelectedTradeType(newType);
        setTradeInput(0);
    };

    const startTrade = async () => {
        const tradeOption = selectedTradeOption.toLowerCase() === 'yes' ? 0 : 1;
        setIsTradeInProgress(true);
        try {
            if (selectedTradeType === 'buy') {
                if (props.walletAllowanceOfCollateralToken == 0) {
                    await approveContractForSpender(accountContext.account, 'usdt', 'market_controller');
                    props.onApprove && props.onApprove('CollateralToken');
                } else {
                    const marketAPIs = new MarketAPIs(props.marketVersion);
                    await marketAPIs.buy(accountContext.account, props.marketContractAddress, toWei(tradeInput), tradeOption);
                    props.onTrade && props.onTrade();
                }
            } else {
                const marketAPIs = new MarketAPIs(props.marketVersion);
                if (props.isWalletOptionTokenApprovedForMarketController) {
                    await marketAPIs.sell(accountContext.account, props.marketContractAddress, toWei(tradeInput), tradeOption);
                    setTradeInput(0);
                    props.onTrade && props.onTrade();
                } else {
                    await marketAPIs.approveOptionTokenForMarketController(accountContext.account, props.marketContractAddress);
                    props.onApprove && props.onApprove('OptionToken__Controller');
                }
            }

        } catch (e) {
            console.log("error in trade", e);
        } finally {
            setIsTradeInProgress(false);
        }
    };

    return (
        <div className={classes.BuySellWidget}>
            <div className={classes.BuySellWidget__Nav}>
                <OrTab tabs={[
                    {
                        id: 'buy',
                        label: 'buy'
                    },
                    {
                        id: 'sell',
                        label: 'sell'
                    }
                ]}
                       value={selectedTradeType}
                       handleChange={(entry) => {
                           handleChangeTradeType(entry);
                       }}/>

            </div>
            <div className={classes.BuySellWidget__Options}>
                <div className={classes.Options__Header}>
                    Pick Outcome
                </div>
                <div className={classes.Options__Options}>
                    {
                        ['Yes', 'No'].map((entry, index) => {
                            const averagePrice = numeral(get(props.pricesOfBuy, [index]) || 0).format("$0,0.00");
                            return (
                                <OptionBlock key={`OptionBlock-${index}`}
                                             isSelected={selectedTradeOption === entry}
                                             onClick={(value) => setSelectedTradeOption(value)}
                                             title={entry}
                                             showValueInChoice={true}
                                             value={averagePrice}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.BuySellWidgetAmount}>
                <div className={classes.BuySellWidgetAmount__Header}>
                    <span>Amount</span>
                    <span>{maxTradeSize}</span>
                </div>
                <div className={classes.BuySellWidgetAmount__InputWrap}>
                    <TradeInput max={maxTradeSize}
                                min={0}
                                value={tradeInput}
                                onValidityUpdate={(valid) => {
                                    //setIsTradeDisabled(!valid);
                                }}
                                onChange={(e)=> {
                                    clearTimeout(updateTradeInputInterval);
                                    updateTradeInputInterval = setTimeout(() => {
                                        setTradeInput(e);
                                    }, 100);

                                    if(e == 0) {
                                        setIsTradeDisabled(true);
                                    } else {
                                        setIsTradeDisabled(false);
                                    }
                                }}/>
                </div>
            </div>
            <div className={classes.BuySellWidgetInfo}>
                {
                    selectedTradeType === 'buy' && (
                        <>
                            {
                                [
                                    {
                                        title: 'Your Avg. Price',
                                        value: numeral(get(buySellDetails, ['averagePrice']) || 0).format("$0,0.00"),
                                    },
                                    {
                                        title: 'Est. Shares',
                                        value: numeral(get(buySellDetails, ['estShares']) || 0).format("0,0.00"),
                                    },
                                    {
                                        title: 'Max Winnings',
                                        value: numeral(get(buySellDetails, ['estShares']) || 0).format("$0,0.00"),
                                    },
                                    {
                                        title: 'Max ROI',
                                        value: numeral(get(buySellDetails, ['maxRoi']) || 0).format("0,0.00%"),
                                    }
                                ].map((entry) => {
                                    return (
                                        <div className={classes.BuySellWidgetInfo__Row}>
                                            <div className={classes.BuySellWidgetInfo__RowTitle}>{entry.title}</div>
                                            <div
                                                className={classes.BuySellWidgetInfo__RowValue}>{entry.value}</div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    )
                }
                {
                    selectedTradeType === 'sell' && (
                        <>
                            {
                                [
                                    {
                                        title: 'Your Avg. sell Price',
                                        value: numeral(get(buySellDetails, ['averagePrice']) || 0).format("$0,0.00"),
                                    },
                                    {
                                        title: 'Total sell amount',
                                        value: numeral(get(buySellDetails, ['totalSellPrice']) || 0).format("0,0.00"),
                                    }
                                ].map((entry) => {
                                    return (
                                        <div className={classes.BuySellWidgetInfo__Row}>
                                            <div className={classes.BuySellWidgetInfo__RowTitle}>{entry.title}</div>
                                            <div
                                                className={classes.BuySellWidgetInfo__RowValue}>{entry.value}</div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    )
                }
            </div>
            <Button color="primary"
                    size={"large"}
                    fullWidth={true}
                    onClick={startTrade}
                    isDisabled={isTradeDisabled}
                    isProcessing={isTradeInProgress}>
                {
                    selectedTradeType === 'buy' && (
                        props.walletAllowanceOfCollateralToken == 0 ? 'Approve' : 'Trade'
                    )
                }
                {
                    selectedTradeType === 'sell' && (
                        props.isWalletOptionTokenApprovedForMarketController ? 'Trade' : 'Approve Tokens'
                    )
                }
            </Button>
        </div>
    );
}

export default BuySellWidget;
