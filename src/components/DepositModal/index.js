import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';

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
import CourtAPIs from '../../shared/contracts/CourtAPIs';
import {convertAmountToTokens, convertTokensToAmount} from '../../shared/helper';

const getModalText = (type, source, pool) => {
    if(type=== 'nftStake') {
        return 'Deposit your ROOM tokens for staking';
    }

    if (source === 'room' && pool === "CourtFarming_RoomStake") {
        return 'Deposit your ROOM tokens for COURT staking';
    }

    if (source === 'room_eth_lp' && pool === "RoomFarming_RoomEthLpStake") {
        return 'Deposit your ROOM-ETH LP tokens for ROOM staking';
    }

    if (source === 'room_eth_lp' && pool === "CourtFarming_RoomEthLpStake") {
        return 'Deposit your ROOM-ETH LP tokens for COURT staking';
    }

    if (source === 'court_eth_lp' && pool === "CourtFarming_CourtEthLpStake") {
        return 'Deposit your COURT-ETH LP tokens for COURT staking';
    }
};

function DepositModal(props) {
    const {
        userRoomLPTokens,
        type,
        nftTire,
        source, 
        pool
    } = props;

    const accountContext = useContext(AccountContext);
    const roomLPFarmingAPIs = new RoomLPFarmingAPIs();
    const courtAPIs = new CourtAPIs();
    const [tokensCount, setTokensCount] = useState(0);
    const [isInvalidAmountError, setIsInvalidAmountError] = useState(false);
    const [isConfirmProcessing, setIsConfirmProcessing] = useState(false);

    const classes = useStyles();

    const handleClose = () => {
        props.onClose();
    };

    const handleConfirm = async () => {
        if (!checkValidAmount()) {
            return;
        }

        setIsConfirmProcessing(true);

        try {
            const tokensAmount = convertTokensToAmount(tokensCount);
            if (type === 'nftStake') {
                await roomLPFarmingAPIs.stakeNftStakeContractForTire(accountContext.account, nftTire, tokensAmount);
            } else {
                await courtAPIs.stackeTokens(accountContext.account, pool, tokensAmount);
            }

            setIsConfirmProcessing(false);
            props.onStake();
            props.onClose();

        } catch (e) {
            setIsConfirmProcessing(false);
        }
    };

    const checkValidAmount = () => {
        const availableTokens = convertAmountToTokens(userRoomLPTokens);

        if (tokensCount == 0 || parseFloat(tokensCount) > parseFloat(availableTokens)) {
            setIsInvalidAmountError(true);
            return false;
        }

        setIsInvalidAmountError(false);

        return true;
    };

    const handleSetMax = () => {
        const availableTokens = convertAmountToTokens(userRoomLPTokens);
        setTokensCount(availableTokens);
    };

    return (
        <Dialog classes={{
            paper: classes.paper, // class name, e.g. `classes-nesting-root-x`
        }}
                onClose={handleClose}
                aria-labelledby="DepositModal-dialog-title"
                open={props.open}
                disableBackdropClick={true}>
            <MuiDialogTitle id="DepositModal-dialog-title"
                            disableTypography
                            className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle}
                            variant="h6">
                    Deposit Tokens
                </Typography>
                {
                    handleClose && (
                        <IconButton aria-label="close"
                                    className={classes.closeButton}
                                    disabled={isConfirmProcessing}
                                    onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    )
                }
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div className={classes.Modal__Text}>
                    {getModalText(type, source, pool)}
                </div>
                <div className={classes.Modal__TokensLabel}>
                    Tokens Available <span
                    className={classes.Modal__TokensLabel_Balance}>{convertAmountToTokens(userRoomLPTokens)}</span>
                </div>
                <div className={classes.Modal__TokensInputWrap}>
                    <input
                        value={tokensCount}
                        onChange={(e) => {
                            setTokensCount(e.target.value);
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
                            Invalid amount, it must be between 1 and {convertAmountToTokens(userRoomLPTokens)}
                        </div>
                    )
                }
            </MuiDialogContent>
            <MuiDialogActions className={classes.MuiDialogActions}>
                <Button className={classes.MuiDialogActions__CancelBtn}
                        isDisabled={isConfirmProcessing}
                        color={'gray'}
                        onClick={handleClose}
                        size={'small'}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm}
                        className={classes.MuiDialogActions__ConfirmBtn}
                        isProcessing={isConfirmProcessing}
                        color={'primary'}
                        size={'small'}>
                    Confirm
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}

export default DepositModal;
