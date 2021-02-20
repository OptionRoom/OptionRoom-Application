import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '../Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './styles'
import {AccountContext} from "../../shared/AccountContextProvider";
import RoomLPFarmingAPIs from '../../shared/contracts/RoomLPFarmingAPIs';
import {convertAmountToTokens, convertTokensToAmount} from '../../shared/helper';

function UnstakeModal(props) {
    const {
        stakedTokensBalance
    } = props;

    const accountContext = useContext(AccountContext);

    const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
    const [amountToUnstake, setAmountToUnstake] = useState(0);
    const [claim, setClaim] = useState(true);
    const [isInvalidAmountError, setIsInvalidAmountError] = useState(false);
    const [isUnstakeProcessing, setIsUnstakeProcessing] = useState(false);

    const classes = useStyles();

    const handleClose = () => {
        props.onClose();
    };

    const handleConfirm = async () => {
        if (!checkValidAmount()) {
            return;
        }

        setIsUnstakeProcessing(true);

        try {
            const amountToUnstakeResult = convertTokensToAmount(amountToUnstake);
            await roomLPFarmingAPIs.unstackRoomLPTokens(accountContext.account, amountToUnstakeResult, claim);
            setIsUnstakeProcessing(false);
            props.onUnStake();
            props.onClose();
        } catch (e) {
            setIsUnstakeProcessing(false);
        }
    };

    const checkValidAmount = () => {
        const amountToUnstakeResult = convertTokensToAmount(amountToUnstake);

        if (amountToUnstakeResult === 0 || amountToUnstakeResult > stakedTokensBalance) {
            setIsInvalidAmountError(true);
            return false;
        }

        setIsInvalidAmountError(false);

        return true;
    }

    const handleSetMax = () => {
        const availableTokens = convertAmountToTokens(stakedTokensBalance);
        setAmountToUnstake(availableTokens);
    };

    const handleClaimChange = (event) => {
        setClaim(event.target.checked);
    };

    return (
        <Dialog classes={{
            paper: classes.paper,
        }}
                onClose={handleClose}
                aria-labelledby="UnstakeModal-dialog-title"
                open={props.open}
                disableBackdropClick={true}>
            <MuiDialogTitle id="UnstakeModal-dialog-title"
                            disableTypography
                            className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle}
                            variant="h6">
                    Unstake Tokens
                </Typography>
                {
                    handleClose && (
                        <IconButton aria-label="close"
                                    className={classes.closeButton}
                                    disabled={isUnstakeProcessing}
                                    onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    )
                }
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div className={classes.Modal__Text}>
                    When unreachable, forward calls to a specific number.
                </div>
                <div className={classes.Modal__TokensLabel}>
                    Tokens Available <span
                    className={classes.Modal__TokensLabel_Balance}>{convertAmountToTokens(stakedTokensBalance)}</span>
                </div>
                <div className={classes.Modal__TokensInputWrap}>
                    <input
                        value={amountToUnstake}
                        onChange={(e) => {
                            setAmountToUnstake(e.target.value);
                            checkValidAmount();
                        }}
                        className={clsx(classes.Modal__TokensInput, {
                            [classes.Modal__TokensInput__HasError]: isInvalidAmountError
                        })}
                        type={'number'}/>
                    <div className={classes.Modal__TokensInputMaxBtn}
                         onClick={handleSetMax}>Max
                    </div>
                </div>
                {
                    isInvalidAmountError && (
                        <div className={classes.Modal__TokensErrorHelp}>
                            Invalid amount, it must be between 1 and {convertAmountToTokens(stakedTokensBalance)}
                        </div>
                    )
                }
                <div className={classes.ClaimWrap}>
                    <Checkbox
                        checked={claim}
                        onChange={handleClaimChange}
                        color="primary"
                        inputProps={{'aria-label': 'claim rewards'}}
                    />
                    <span className={classes.ClaimLabel}>Claim rewards?</span>
                </div>
            </MuiDialogContent>
            <MuiDialogActions className={classes.MuiDialogActions}>
                <Button className={classes.MuiDialogActions__CancelBtn}
                        isDisabled={isUnstakeProcessing}
                        color={'gray'}
                        onClick={handleClose}
                        size={'small'}
                >
                    Cancel
                </Button>
                <Button autoFocus
                        onClick={handleConfirm}
                        className={classes.MuiDialogActions__ConfirmBtn}
                        isProcessing={isUnstakeProcessing}
                        color={'primary'}
                        size={'small'}
                >
                    Confirm
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}

export default UnstakeModal;
