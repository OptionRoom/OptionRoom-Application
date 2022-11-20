import React, {useContext, useEffect, useState} from "react";

import {useStyles} from "./styles";
import {get} from "lodash";
import Button from "./../../components/Button";
import {AccountContext} from "../../shared/AccountContextProvider";

import TradeInput from '../../components/TradeInput';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {
    useApproveToken,
    useBuyBetOption,
    useGetAccountAllowanceOfToken,
    useGetAccountBalanceOfToken,
} from "../apis";
import {fromWei, toWei} from "../../shared/helper";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function BuyBetModal(props) {
    const classes = useStyles();
    const [tradeInput, setTradeInput] = useState(0);
    const accountContext = useContext(AccountContext);
    const buyBetOption = useBuyBetOption();
    const approveToken = useApproveToken();

    const {
        data: accountBalance,
        isLoading: isLoadingAccountBalance,
        isError: isErrorLoadingAccountBalance,
        refetch: refetchAccountBalance,
        error: errorLoadingAccountBalance
    } = useGetAccountBalanceOfToken(props.baseToken);

    const {
        data: accountAllowance,
        isLoading: isLoadingAccountAllowance,
        isError: isErrorLoadingAccountAllowance,
        refetch: refetchAccountAllowance,
        error: errorLoadingAccountAllowance
    } = useGetAccountAllowanceOfToken(props.baseToken, props.betsContract);

    useEffect(() => {
        if(accountContext.account && accountContext.chainId) {
            refetchAccountAllowance();
            refetchAccountBalance();
        }
    }, [accountContext.account, accountContext.chainId]);

    const startTrade = async () => {
        if(parseFloat(accountAllowance) > 0) {
            console.log({
                betAddress: props.betAddress,
                choiceIndex: props.choice,
                amount: toWei(tradeInput)
            });

            await buyBetOption.mutateAsync({
                betAddress: parseInt(props.betAddress),
                choiceIndex: props.choice,
                amount: toWei(tradeInput)
            });
            props.onPurchase && props.onPurchase();
            handleClose();
        } else {
            await approveToken.mutateAsync({source: props.baseToken, spender: props.betsContract});
            await refetchAccountAllowance();
        }
    };

    const handleClose = () => {
        props.onClose();
        setTradeInput(0);
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
                    Buy {get(props.selectedOption, ['title'])} option
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
                            <span>{fromWei(accountBalance)}</span>
                        </div>
                        <div className={classes.BuySellWidgetAmount__InputWrap}>
                            <TradeInput max={fromWei(accountBalance)}
                                        min={0}
                                        value={tradeInput}
                                        onChange={(e) => {
                                            //clearTimeout(updateTradeInputInterval);
                                            //updateTradeInputInterval = setTimeout(() => {
                                                setTradeInput(e);
                                            //}, 100);
                                        }}
                            />
                        </div>
                    </div>
                    <Button color="primary"
                            size={"large"}
                            fullWidth={true}
                            onClick={startTrade}
                            isDisabled={approveToken.isLoading || buyBetOption.isLoading || isLoadingAccountBalance || isLoadingAccountAllowance}
                            isProcessing={approveToken.isLoading || buyBetOption.isLoading}>
                        {accountAllowance > 0 ? 'Buy' : 'Approve'}
                    </Button>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

export default BuyBetModal;
