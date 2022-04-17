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
import {observer} from "mobx-react-lite";

import Button from "../Button";
import { fromWei, toWei, formatTradeValue } from "../../shared/helper";
import { AccountContext } from "../../shared/AccountContextProvider";

import {
    getDefaultCollateralToken
} from '../../shared/contracts/contracts.helper';

import {
    approveOptionTokenForMarketController,
    calcSellAmount, getAccountBalances,
    sellMarketOptions
} from "../../methods/market-controller.methods";

import TradeInput from "../TradeInput";
import {formatAddress, smartState} from "../../shared/SmartState";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export const useGetWalletBalanceOfMarketOptions = (wallet, marketContractAddress) => {
    return useQuery(["useGetWalletBalanceOfMarketOptions", wallet, marketContractAddress], () => getAccountBalances(wallet, marketContractAddress, wallet));
};

export const useGetSellAmount = (wallet, marketContractAddress, tradeOption, amountOut, selectedTokenAddress) => {
    const [maxTradeSize, setMaxTradeSize] = useState(0);

    useEffect(() => {
        const init = async () => {
            //wallet, marketAddress, tokenAddress, returnAmount, outcomeIndex
            const sellAmount = await calcSellAmount(wallet, marketContractAddress, selectedTokenAddress, amountOut, tradeOption);
            setMaxTradeSize(sellAmount);
        };

        if(wallet && marketContractAddress && (tradeOption || tradeOption == 0) && amountOut && selectedTokenAddress) {
            init();
        }
    }, [wallet, marketContractAddress, tradeOption, amountOut, selectedTokenAddress]);

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
    const defaultCollateralToken = getDefaultCollateralToken();
    const [selectedInToken, setSelectedInToken] = useState(defaultCollateralToken);
    const sellAmount = useGetSellAmount(accountContext.account, props.marketContractAddress, get(props.selectedOption, ['index']), toWei(tradeInput), get(selectedInToken, ['address']));
    const walletBalanceOfMarketOptions = get(smartState, ['marketWalletData', formatAddress(props.marketContractAddress), formatAddress(accountContext.account), 'accountBalances']);
    const isWalletOptionTokenApprovedForMarketController = get(smartState, ['isWalletOptionTokenApprovedForMarketController', formatAddress(accountContext.account)]);

    const startTrade = async () => {
        setIsTradeInProgress(true);
        try {
            if (isWalletOptionTokenApprovedForMarketController) {
                await sellMarketOptions(
                    accountContext.account,
                    props.marketContractAddress,
                    get(selectedInToken, ['address']),
                    toWei(tradeInput),
                    get(props.selectedOption, ['index']),
                    get(sellAmount, ['outcomeTokenSellAmount'], 0)
                );
                smartState.loadMarketWalletData(accountContext.account, props.marketContractAddress);
                smartState.loadWalletBalanceOfToken(accountContext.account, get(selectedInToken, ['address']));
                smartState.loadMarketInfo(accountContext.account, props.marketContractAddress);

                setTradeInput(0);

                props.onTrade && props.onTrade();
                handleClose();
            } else {
                await approveOptionTokenForMarketController(accountContext.account);
                await smartState.loadIsWalletOptionTokenApprovedForMarketController(accountContext.account);
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
                                    }}
                                    withTokenSelector={true}
                                    selectedToken={selectedInToken}
                                    handleSelectNewToken={(token) => {
                                        setSelectedInToken(token);
                                    }}
                        />
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
                        isWalletOptionTokenApprovedForMarketController ? 'Sell' : 'Approve Tokens to sell'
                    }
                </Button>
            </div>
            </MuiDialogContent>
        </Dialog>
    );
}

export default observer(MarketSellWidget);
