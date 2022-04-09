import React, { useContext, useEffect, useState } from "react";
import numeral from "numeral";
import { useStyles } from "./styles";
import { get } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { useQuery } from "react-query";

import Button from "../Button";
import { fromWei, toWei, formatTradeValue } from "../../shared/helper";
import { AccountContext } from "../../shared/AccountContextProvider";

import {
    approveContractForSpender,
    getContractAddress
} from '../../shared/contracts/contracts.helper';

import {
    approveOptionTokenForMarketController,
    buyMarketOptions,
    calcSellAmount, getAccountBalances,
    getBuyAmount,
    sellMarketOptions
} from "../../methods/market-controller.methods";
import { ContractNames } from "../../shared/constants";
import { useGetBuyPrices } from "../MarketBuyWidget";

import TradeInput from "../TradeInput";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export const useGetWalletBalanceOfMarketOptions = (wallet, marketContractAddress) => {
    return useQuery(["useGetWalletBalanceOfMarketOptions", wallet, marketContractAddress], () => getAccountBalances(wallet, marketContractAddress, wallet));
};

export const useGetSellAmount = (wallet, marketContractAddress, tradeOption, amountOut) => {
    const [maxTradeSize, setMaxTradeSize] = useState(0);

    useEffect(() => {
        const init = async () => {
            //wallet, marketAddress, tokenAddress, returnAmount, outcomeIndex
            const sellAmount = await calcSellAmount(wallet, marketContractAddress, getContractAddress(ContractNames.busd), amountOut, tradeOption);
            console.log({sellAmount});
            setMaxTradeSize(sellAmount);
        };

        if(wallet && marketContractAddress && (tradeOption || tradeOption == 0) && amountOut) {
            init();
        }
    }, [wallet, marketContractAddress, tradeOption, amountOut]);

    return maxTradeSize;
};


function MarketSellWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    let updateTradeInputInterval = null;

    //Buy & Sell
    const [tradeInput, setTradeInput] = useState(0);
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);
    const [isTradeDisabled, setIsTradeDisabled] = useState(true);
    const {
        data: walletBalanceOfMarketOptions
    } = useGetWalletBalanceOfMarketOptions(accountContext.account, props.marketContractAddress);
    const sellAmount = useGetSellAmount(accountContext.account, props.marketContractAddress, get(props.selectedOption, ['index']), toWei(tradeInput));

    const startTrade = async () => {
        setIsTradeInProgress(true);
        try {
            if (props.isWalletOptionTokenApprovedForMarketController) {
                await sellMarketOptions(
                    accountContext.account,
                    props.marketContractAddress,
                    getContractAddress(ContractNames.busd),
                    toWei(tradeInput),
                    get(props.selectedOption, ['index']),
                    get(sellAmount, ['outcomeTokenSellAmount'], 0)
                );
                setTradeInput(0);
                props.onTrade && props.onTrade();
                handleClose();
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

    const handleClose = (reason) => {
        props.onClose();
        setTradeInput(0);
    };

    const sellAmountI = fromWei(get(sellAmount, ['outcomeTokenSellAmount'], 0));
    const accountBalanceOfThisToken = fromWei(get(walletBalanceOfMarketOptions, [get(props.selectedOption, ['index'])], 0), null, 2);
    const youKeepVal = (accountBalanceOfThisToken || 0) - (sellAmountI || 0);

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            classes={{
                paper: classes.paper,
            }}
            onClose={handleClose}
            aria-labelledby="DepositModal-dialog-title"
            open={props.open}
            disableBackdropClick={true}
        >
            <MuiDialogTitle
                id="DepositModal-dialog-title"
                disableTypography
                className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle}
                    variant="h6">
                    Sell {get(props.selectedOption, ['title'])} option
                </Typography>
                {handleClose && (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
            <div className={classes.BuySellWidget}>
                <div className={classes.BuySellWidgetAmount}>
                    <div className={classes.BuySellWidgetAmount__Header}>
                        <span>How much you want to get from the sell?</span>
                    </div>
                    <div className={classes.BuySellWidgetAmount__InputWrap}>
                        <TradeInput max={100000000000000000000000000}
                                    hideSlider={true}
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
                                title: 'We will sell',
                                value: parseFloat(sellAmountI).toFixed(2),
                            },
                            {
                                title: 'You have',
                                value: accountBalanceOfThisToken,
                            },
                            {
                                title: 'You keep',
                                value: parseFloat(youKeepVal).toFixed(2),
                            }
                        ].map((entry, index) => {
                            return (
                                <div className={classes.BuySellWidgetInfo__Row}
                                     key={`Market-sell-${index}`}>
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
                        props.isWalletOptionTokenApprovedForMarketController ? 'Sell' : 'Approve Tokens to sell'
                    }
                </Button>
            </div>
            </MuiDialogContent>
        </Dialog>
    );
}

export default MarketSellWidget;
