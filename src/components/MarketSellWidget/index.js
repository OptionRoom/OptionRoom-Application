import React, { useContext, useEffect, useState } from "react";
import numeral from "numeral";
import { useStyles } from "./styles";
import OptionBlock from "../OptionBlock";
import { get } from "lodash";
import Button from "../Button";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import { fromWei, toWei, formatTradeValue } from "../../shared/helper";
import { AccountContext } from "../../shared/AccountContextProvider";

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
import { ContractNames } from "../../shared/constants";
import { useGetBuyPrices } from "../MarketBuyWidget";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


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
    const maxTradeSize = useGetMaxTradeSize(accountContext.account, props.marketContractAddress, get(props.selectedOption, ['index']), props.walletBalanceOfCollateralToken);
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

    const handleClose = () => {
        props.onClose();
    };

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
                    Sell {get(props.selectedOption, ['title'])}
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
                            }} />
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
            </MuiDialogContent>
        </Dialog>
    );
}

export default MarketSellWidget;
