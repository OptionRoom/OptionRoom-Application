import React, {useContext, useEffect, useState} from "react";
import clsx from "clsx";
import Alert from '@material-ui/lab/Alert';
import swal from "sweetalert";

import Button from "../Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";
import CourtAPIs from "../../shared/contracts/CourtAPIs";
import {
    fromWei,
    toWei,
} from "../../shared/helper";
import ClaimCourtAPIs from "../../shared/contracts/ClaimCourtAPIs";


function PayAndClaimCourtModal(props) {
    const {
        pool,
        claimableTokensBalance
    } = props;

    let updateClaimCostInter = null;

    const accountContext = useContext(AccountContext);
    const [isInvalidAmountError, setIsInvalidAmountError] = useState(false);
    const [isClaimProcessing, setIsClaimProcessing] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [claimCostInfo, setClaimCostInfo] = useState(0);

    const classes = useStyles();

    const handleClose = () => {
        props.onClose();
    };

    const getModalText = () => {
        return "Withdraw your COURT tokens";
    };

    const getModalHeaderTxt = () => {
        return 'Withdraw Tokens';
    };

    const handleConfirm = async () => {
        if (!isValidAmount()) {
            return;
        }

        setIsClaimProcessing(true);

        try {
            const courtAPIs = new CourtAPIs();
            const walletBalanceOfUsdt = await courtAPIs.getAddressTokenBalance(accountContext.account, 'usdt');

            if(parseFloat(walletBalanceOfUsdt) < parseFloat(claimCostInfo)) {
                swal(
                    "Insufficient funds",
                    `You must hold at least ${fromWei(claimCostInfo, 'mwei')} USDT, your current balance is ${fromWei(walletBalanceOfUsdt, 'mwei')}`,
                    "error"
                );
            } else {
                await courtAPIs.payAndClaimRewards(accountContext.account, pool, toWei(withdrawAmount));
                props.onUnStake();
                props.onClose();
            }
        } catch (e) {
        } finally {
            setIsClaimProcessing(false);
        }
    };

    const isValidAmount = () => {
        return parseFloat(fromWei(claimableTokensBalance)) >= parseFloat(withdrawAmount);
    };

    const handleSetMax = () => {
        setWithdrawAmount(fromWei(claimableTokensBalance));
    };

    const loadClaimCost = async () => {
        const claimCourtAPIs = new ClaimCourtAPIs();
        const claimCost = await claimCourtAPIs.getCostOfCourtClaim(accountContext.account, toWei(withdrawAmount), pool);
        setClaimCostInfo(claimCost);
    };

    useEffect(() => {
        clearInterval(updateClaimCostInter);
        updateClaimCostInter =  setTimeout(() => {
            loadClaimCost();
        }, 100);
    }, [withdrawAmount]);

    return (
        <Dialog
            classes={{
                paper: classes.paper,
            }}
            onClose={handleClose}
            aria-labelledby="PayAndClaimCourtModal-dialog-title"
            open={props.open}
            disableBackdropClick={true}
        >
            <MuiDialogTitle
                id="PayAndClaimCourtModal-dialog-title"
                disableTypography
                className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle}
                            variant="h6">
                    {getModalHeaderTxt()}
                </Typography>
                {
                    handleClose && (
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            disabled={isClaimProcessing}
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    )
                }
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div className={classes.Modal__Text}>
                    {getModalText()}
                </div>
                <div className={classes.Modal__TokensLabel}>
                    Tokens Available{" "}
                    <span className={classes.Modal__TokensLabel_Balance}>
                        {fromWei(claimableTokensBalance)}
                    </span>
                </div>
                <div className={classes.Modal__TokensInputWrap}>
                    <input
                        value={withdrawAmount}
                        onChange={(e) => {
                            setWithdrawAmount(e.target.value);
                        }}
                        className={clsx(classes.Modal__TokensInput, {
                            [classes.Modal__TokensInput__HasError]: isInvalidAmountError,
                        })}
                        type={"number"}
                    />
                    <div
                        className={classes.Modal__TokensInputMaxBtn}
                        onClick={handleSetMax}
                    >
                        Max
                    </div>
                </div>
                {
                    !isValidAmount() && (
                        <div className={classes.Modal__TokensErrorHelp}>
                            Value must be less than {fromWei(claimableTokensBalance)}
                        </div>
                    )
                }
                <Alert severity="info"
                       style={{
                           marginTop: '10px'
                       }}>
                    The Withdraw will cost you <strong>{fromWei(claimCostInfo || 0, 'mwei')} USDT</strong>
                </Alert>
            </MuiDialogContent>
            <MuiDialogActions className={classes.MuiDialogActions}>
                <Button
                    className={classes.MuiDialogActions__CancelBtn}
                    isDisabled={isClaimProcessing}
                    color={"gray"}
                    onClick={handleClose}
                    size={"small"}
                >
                    Cancel
                </Button>
                <Button
                    autoFocus
                    onClick={handleConfirm}
                    className={classes.MuiDialogActions__ConfirmBtn}
                    isProcessing={isClaimProcessing}
                    isDisabled={(withdrawAmount == 0) || !isValidAmount()}
                    color={"primary"}
                    size={"small"}
                >
                    Confirm
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}

export default PayAndClaimCourtModal;
