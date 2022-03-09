import React, {useContext, useEffect, useState} from "react";
import numeral from "numeral";

import {useStyles} from "./styles";
import OptionBlock from "../OptionBlock";
import {get} from "lodash";
import Button from "../Button";
import {
    fromWei,
    toWei,
    formatTradeValue
} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";

import {
    approveContractForSpender,
    getContractAddress
} from '../../shared/contracts/contracts.helper';

import TradeInput from '../../components/TradeInput';
import {
    buyMarketOptions,
    getBuyAmount, getMarketPoolBalances
} from "../../methods/market-controller.methods";
import {
    ContractNames
} from "../../shared/constants";


export const useGetBuyPrices = (wallet, marketContractAddress) => {
    const [buySellDetails, setBuySellDetails] = useState([]);

    useEffect(() => {
        const init = async () => {
            const MarketOptionTokensPercentage = await getMarketPoolBalances(wallet, marketContractAddress);
            const totalCount = MarketOptionTokensPercentage.reduce((a, b) => a + parseFloat(b), 0);
            const formattedPrices = MarketOptionTokensPercentage.map((entry) => {
                return parseFloat(entry)/totalCount;
            });
            setBuySellDetails(formattedPrices);
        };

        if (wallet, marketContractAddress) {
            init();
        }

    }, [wallet, marketContractAddress]);

    return buySellDetails;
};

export const useGetBuySellPosition = (wallet, marketContractAddress, tradeAmount, option) => {
    const [buySellDetails, setBuySellDetails] = useState({
        averagePrice: 0,
        estShares: 0,
        maxRoi: 0
    });

    useEffect(() => {
        const init = async () => {
            const numberOfBoughtTokens = await getBuyAmount(
                wallet,
                marketContractAddress,
                getContractAddress(ContractNames.busd),
                toWei(tradeAmount),
                option
            );

            const averagePrice = parseFloat(tradeAmount) / fromWei(numberOfBoughtTokens);
            const estShares = fromWei(numberOfBoughtTokens);
            const maxRoi = (parseFloat(fromWei(numberOfBoughtTokens)) - parseFloat(tradeAmount)) / parseFloat(tradeAmount);

            setBuySellDetails({
                averagePrice,
                estShares,
                maxRoi
            });
        };

        if (wallet && marketContractAddress && (tradeAmount && tradeAmount >= 0) && (option || option === 0)) {
            init();
        }

    }, [wallet, marketContractAddress, tradeAmount, option]);

    return buySellDetails;
};

export const useGetMaxTradeSize = (wallet, marketContractAddress, tradeOption, walletBalanceOfCollateralToken) => {
    const [maxTradeSize, setMaxTradeSize] = useState(0);

    useEffect(() => {
        const init = async () => {
            setMaxTradeSize(parseFloat(fromWei(walletBalanceOfCollateralToken)));
        };

        init();

    }, [wallet, marketContractAddress, tradeOption, walletBalanceOfCollateralToken]);

    return maxTradeSize;
};


function MarketBuyWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    let updateTradeInputInterval = null;

    //Buy & Sell
    const [tradeInput, setTradeInput] = useState(0);
    const [selectedTradeOption, setSelectedTradeOption] = useState(0);
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);
    const [isTradeDisabled, setIsTradeDisabled] = useState(true);
    const buySellDetails = useGetBuySellPosition(accountContext.account, props.marketContractAddress, tradeInput, selectedTradeOption);
    const buyPrices = useGetBuyPrices(accountContext.account, props.marketContractAddress);
    const maxTradeSize = useGetMaxTradeSize(accountContext.account, props.marketContractAddress, selectedTradeOption, props.walletBalanceOfCollateralToken);

    const startTrade = async () => {
        setIsTradeInProgress(true);
        try {
            if (props.walletAllowanceOfCollateralToken == 0) {
                await approveContractForSpender(accountContext.account, ContractNames.busd, ContractNames.marketControllerV4);
                props.onApprove && props.onApprove('CollateralToken');
            } else {
                //wallet, marketAddress, tokenAddress, investmentAmount, outcomeIndex, minOutcomeTokensToBuy
                await buyMarketOptions(
                    accountContext.account,
                    props.marketContractAddress,
                    getContractAddress(ContractNames.busd),
                    toWei(tradeInput),
                    selectedTradeOption,
                    0
                );
                props.onTrade && props.onTrade();
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
                <div className={classes.Options__Header}>Buy</div>
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
                                onChange={(e) => {
                                    clearTimeout(updateTradeInputInterval);
                                    updateTradeInputInterval = setTimeout(() => {
                                        setTradeInput(e);
                                    }, 100);

                                    if (e == 0) {
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
                            title: 'Est. Shares',
                            value: numeral(get(buySellDetails, ['estShares']) || 0).format("0,0.00"),
                        },
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
                    props.walletAllowanceOfCollateralToken == 0 ? 'Approve' : 'Trade'
                }
            </Button>
        </div>
    );
}

export default MarketBuyWidget;
