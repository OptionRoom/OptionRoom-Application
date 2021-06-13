import React, {useContext, useEffect, useState} from "react";

import {get} from "lodash";

import {useStyles} from "./styles";
import {fromWei, toWei} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";
import {
    useGetMarketBuyPrices,
    useGetWalletBuySellPositions,
} from '../../pages/Market/hooks';
import numeral from "numeral";

function MarketWalletPosition(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const buySellHistoryOfWallet = useGetWalletBuySellPositions(accountContext.account, props.marketContractAddress, props.walletOptionTokensBalance);
    const pricesOfBuy = useGetMarketBuyPrices(accountContext.account, props.marketContractAddress, props.optionTokensPercentage);

    if(Object.keys(buySellHistoryOfWallet).length === 0) {
        return null;
    }

    return (
        <div className={classes.MarketPositions}>
            <div className={classes.MarketPositionsHeader}>
                Market Positions
            </div>
            <div className={classes.MarketPositionsBody}>
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
                            <div className={classes.MarketPositionBlock}>
{/*                                <div
                                    className={classes.MarketPositionBlock__Header}>
                                    Market Positions
                                </div>*/}
                                <div
                                    className={classes.MarketPositionBlock__Details}>
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
            </div>
        </div>
    );
}

export default MarketWalletPosition;
