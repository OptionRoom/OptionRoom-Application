import React, {useContext, useEffect, useState} from "react";

import {useStyles} from "./styles";
import OptionBlock from "../OptionBlock";
import numeral from "numeral";
import {get} from "lodash";
import Button from "../Button";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei, toWei} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";
import {MaxUint256} from "../../shared/constants";


function BuySellWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    //Buy & Sell
    const [selectedTradeType, setSelectedTradeType] = useState('buy');
    const [tradeInput, setTradeInput] = useState(0);
    const [selectedTradeOption, setSelectedTradeOption] = useState('Yes');
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);
    const [buySellDetails, setBuySellDetails] = useState(null);

    const handleSetMaxTradeInput = () => {
        if(selectedTradeType === 'buy') {
            setTradeInput(fromWei(props.walletBalanceOfCollateralToken, null, 5));
            return;
        }

        setTradeInput(fromWei(get(props.walletOptionTokensBalance, [`${selectedTradeOption.toLowerCase() === 'yes' ? 0 : 1}`]), null, 5));
    };

    const getTradeInputAveragePrice = () => {
        return get(props.pricesOfBuy, selectedTradeOption.toLowerCase()) || 0;
    };

    const getBuyNumberOfShares = () => {
        return tradeInput && get(props.pricesOfBuy, selectedTradeOption.toLowerCase()) ? tradeInput / get(props.pricesOfBuy, selectedTradeOption.toLowerCase()) : 0;
    };

    const startTrade = async () => {
        const tradeOption = selectedTradeOption.toLowerCase() === 'yes' ? 0 : 1;
        const marketAPIs = new MarketAPIs();
        setIsTradeInProgress(true);
        try {
            if (selectedTradeType === 'buy') {
                if (props.walletAllowanceOfCollateralToken == 0) {
                    const marketAPIs = new MarketAPIs();
                    await marketAPIs.approveCollateralTokenForMarket(accountContext.account, props.marketContractAddress);
                    props.onApprove && props.onApprove('CollateralToken');
                } else {
                    await marketAPIs.buy(accountContext.account, props.marketContractAddress, toWei(tradeInput), tradeOption);
                }
            } else {
                if (props.isWalletOptionTokenApprovedForMarket) {
                    await marketAPIs.sell(accountContext.account, props.marketContractAddress, toWei(tradeInput), tradeOption);
                } else {
                    await marketAPIs.approveOptionTokenForMarket(accountContext.account, props.marketContractAddress);
                    props.onApprove && props.onApprove('OptionToken');
                }
            }

        } catch (e) {
            console.log("error in trade", e);
        } finally {
            setIsTradeInProgress(false);
        }

        props.onBuy && props.onBuy();
    };

    const getAvailableBalance = () => {
        if (selectedTradeType === 'buy' && props.walletBalanceOfCollateralToken) {
            return (<span>{fromWei(props.walletBalanceOfCollateralToken, null, 5)}</span>);
        }

        if (get(props.walletOptionTokensBalance, [`${selectedTradeOption.toLowerCase() === 'yes' ? 0 : 1}`])) {
            return (
                <span>
                    {fromWei(get(props.walletOptionTokensBalance, [`${selectedTradeOption.toLowerCase() === 'yes' ? 0 : 1}`]), null, 5)}
                </span>
            )
        }
    }

    const handleUpdateBuySellDetails = async () => {
        if(tradeInput && parseFloat(tradeInput) > 0) {
            const marketApis = new MarketAPIs();
            const buySellDeatils = {};

            for(let i in ["0", "1"]) {
                if(selectedTradeType === 'buy') {
                    const numberOfBoughtTokens = await marketApis.getOptionTokensCountOfBuy(
                        accountContext.account,
                        props.marketContractAddress,
                        toWei(tradeInput),
                        i
                    );

                    const averagePrice = parseFloat(tradeInput)/fromWei(numberOfBoughtTokens);
                    const estShares = fromWei(numberOfBoughtTokens);
                    const maxRoi = (parseFloat(fromWei(numberOfBoughtTokens)) - parseFloat(tradeInput)) / parseFloat(tradeInput);
                    buySellDeatils[i] = {
                        averagePrice,
                        estShares,
                        maxRoi
                    };
                } else {

                    const amountOfColletralTokenOutput = await marketApis.getCollateralTokensCountOfSell(
                        accountContext.account,
                        props.marketContractAddress,
                        toWei(tradeInput),
                        i
                    );

                    const averagePrice = parseFloat(fromWei(amountOfColletralTokenOutput))/parseFloat(tradeInput);
                    const totalSellPrice = fromWei(amountOfColletralTokenOutput);

                    buySellDeatils[i] = {
                        averagePrice,
                        totalSellPrice
                    };
                }
            }

            setBuySellDetails(buySellDeatils);
        }
    };

    useEffect(() => {
        handleUpdateBuySellDetails();
    }, [tradeInput]);

    const selectedTradeOptionIndex = selectedTradeOption === 'Yes' ? 0 : 1;
    return (
        <div className={classes.BuySellWidget}>
            <div className={classes.BuySellWidget__Nav}>
                <div data-selected={selectedTradeType === 'buy' ? 'true' : 'false'}
                     onClick={() => setSelectedTradeType('buy')}>Buy
                </div>
                <div data-selected={selectedTradeType === 'sell' ? 'true' : 'false'}
                     onClick={() => setSelectedTradeType('sell')}>Sell
                </div>
            </div>
            <div className={classes.BuySellWidget__Options}>
                <div className={classes.Options__Header}>
                    Pick Outcome
                </div>
                <div className={classes.Options__Options}>
                    {
                        ['Yes', 'No'].map((entry, index) => {
                            console.log("buySellDetails", buySellDetails);
                            const averagePrice = numeral(get(buySellDetails, [index , 'averagePrice'])).format("$0,0.00");
                            return (
                                <OptionBlock key={`OptionBlock-${index}`}
                                             isSelected={selectedTradeOption === entry}
                                             onClick={(value) => setSelectedTradeOption(value)}
                                             title={entry}
                                             value={averagePrice}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.BuySellWidgetAmount}>
                <div className={classes.BuySellWidgetAmount__Header}>
                    <span>How Much?</span>
                    {getAvailableBalance()}
                </div>
                <div className={classes.BuySellWidgetAmount__InputWrap}>
                    <input value={tradeInput}
                           onChange={(e) => {
                               setTradeInput(e.target.value)
                           }}
                           type='number'/>
                    <div onClick={handleSetMaxTradeInput}>Max</div>
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
                                        value: numeral(get(buySellDetails, [selectedTradeOptionIndex , 'averagePrice']) || 0).format("$0,0.00"),
                                    },
                                    {
                                        title: 'Est. Shares',
                                        value: numeral(get(buySellDetails, [selectedTradeOptionIndex , 'estShares']) || 0).format("0,0.00"),
                                    },
                                    {
                                        title: 'Max Winnings',
                                        value: numeral(get(buySellDetails, [selectedTradeOptionIndex ,'estShares']) || 0).format("$0,0.00"),
                                    },
                                    {
                                        title: 'Max ROI',
                                        value: numeral(get(buySellDetails, [selectedTradeOptionIndex , 'maxRoi']) || 0).format("0,0.00%"),
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
                                        value: numeral(get(buySellDetails, [selectedTradeOptionIndex ,'averagePrice']) || 0).format("$0,0.00"),
                                    },
                                    {
                                        title: 'Total sell amount',
                                        value: numeral(get(buySellDetails, [selectedTradeOptionIndex ,'totalSellPrice']) || 0).format("0,0.00"),
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
                    isProcessing={isTradeInProgress}>
                {
                    selectedTradeType === 'buy' && (
                        props.walletAllowanceOfCollateralToken == 0 ? 'Approve' : 'Trade'
                    )
                }
                {
                    selectedTradeType === 'sell' && (
                        props.isWalletOptionTokenApprovedForMarket ? 'Trade' : 'Approve'
                    )
                }

            </Button>
        </div>
    );
}

export default BuySellWidget;
