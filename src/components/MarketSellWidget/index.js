import React, {useContext, useEffect, useState} from "react";
import numeral from "numeral";
import {useStyles} from "./styles";
import OptionBlock from "../OptionBlock";
import {get} from "lodash";
import Button from "../Button";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei, toWei, formatTradeValue} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";

import {
    approveContractForSpender, getContractAddress
} from '../../shared/contracts/contracts.helper';

import TradeInput from '../../components/TradeInput';
import OrTab from "../OrTab";
import {
    approveOptionTokenForMarketController,
    buyMarketOptions,
    calcSellAmount,
    getBuyAmount,
    sellMarketOptions
} from "../../methods/market-controller.methods";
import {ContractNames} from "../../shared/constants";
import {useGetBuyPrices} from "../MarketBuyWidget";

export const useGetMaxTradeSize = (wallet, marketContractAddress, tradeOption, walletOptionTokensBalance) => {
    const [maxTradeSize, setMaxTradeSize] = useState(0);

    useEffect(() => {
        const init = async () => {
            setMaxTradeSize(parseFloat(fromWei(get(walletOptionTokensBalance, [tradeOption]) || 0)));
        };

        init();

    }, [wallet, marketContractAddress, tradeOption, walletOptionTokensBalance]);

    return maxTradeSize;
};


function MarketSellWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    let updateTradeInputInterval = null;

    //Buy & Sell
    const [tradeInput, setTradeInput] = useState(0);
    const [selectedTradeOption, setSelectedTradeOption] = useState(0);
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);
    const [isTradeDisabled, setIsTradeDisabled] = useState(true);
    const maxTradeSize = useGetMaxTradeSize(accountContext.account, props.marketContractAddress, selectedTradeOption, props.walletOptionTokensBalance);
    const buyPrices = useGetBuyPrices(accountContext.account, props.marketContractAddress);

    const startTrade = async () => {
        setIsTradeInProgress(true);
        try {
            if (props.isWalletOptionTokenApprovedForMarketController) {
                sellMarketOptions(
                    accountContext.account,
                    props.marketContractAddress,
                    getContractAddress(ContractNames.busd),
                    toWei(parseFloat(tradeInput) * get(buyPrices, [selectedTradeOption])),
                    selectedTradeOption,
                    toWei(tradeInput)
                );
                setTradeInput(0);
                props.onTrade && props.onTrade();
            } else {
                await approveOptionTokenForMarketController(accountContext.account);
                props.onApprove && props.onApprove('OptionToken__Controller');
            }
        } catch (e) {
            console.log("error in trade", e);
        } finally {
            setIsTradeInProgress(false);
        }
    };

    return (
        <div className={classes.BuySellWidget}>
            <div className={classes.BuySellWidget__Options}>
                <div className={classes.Options__Header}>
                    Sell
                </div>
                <div className={classes.Options__Options}>
                    {
                        get(props.marketInfo, ['choices'], []).map((entry, index) => {
                            const averagePrice = numeral(get(buyPrices, [index]) || 0).format("$0,0.00");
                            return (
                                <OptionBlock key={`OptionBlock-${index}`}
                                             isSelected={selectedTradeOption === index}
                                             onClick={(value) => {
                                                 setSelectedTradeOption(value);
                                             }}
                                             title={entry}
                                             showValueInChoice={true}
                                             value={averagePrice}
                                             optionValue={index}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.BuySellWidgetAmount}>
                <div className={classes.BuySellWidgetAmount__Header}>
                    <span>Amount</span>
                    <span>{formatTradeValue(maxTradeSize)}</span>
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
                    [
                        {
                            title: 'Total sell amount',
                            value: numeral(tradeInput ? (parseFloat(tradeInput) * get(buyPrices, [selectedTradeOption]) || 0) : 0).format("~0,0.00"),
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
            </div>
            <Button color="primary"
                    size={"large"}
                    fullWidth={true}
                    onClick={startTrade}
                    isDisabled={isTradeDisabled}
                    isProcessing={isTradeInProgress}>
                {
                    props.isWalletOptionTokenApprovedForMarketController ? 'Trade' : 'Approve Tokens'
                }
            </Button>
        </div>
    );
}

export default MarketSellWidget;
