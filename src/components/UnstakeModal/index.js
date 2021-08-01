import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { BigNumber } from "@ethersproject/bignumber";
import Alert from '@material-ui/lab/Alert';

import Button from "../Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import RoomLPFarmingAPIs from "../../shared/contracts/RoomLPFarmingAPIs";
import CourtAPIs from "../../shared/contracts/CourtAPIs";
import {
    convertAmountToTokens,
    convertTokensToAmount, fromWei,
    toWei,
} from "../../shared/helper";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import Slide from "@material-ui/core/Slide";
import TradeInput from "../TradeInput";
import ClaimCourtAPIs from "../../shared/contracts/ClaimCourtAPIs";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function UnstakeModal(props) {
    const {
        stakedTokensBalance,
        type,
        nftTire
    } = props;

    const accountContext = useContext(AccountContext);

    const roomLPFarmingAPIs = new RoomLPFarmingAPIs();
    const courtAPIs = new CourtAPIs();
    const [amountToUnstake, setAmountToUnstake] = useState(0);
    const [claim, setClaim] = useState(true);
    const [exit, setExit] = useState(false);
    const [isInvalidAmountError, setIsInvalidAmountError] = useState(false);
    const [isUnstakeProcessing, setIsUnstakeProcessing] = useState(false);
    const [canTrade, setCanTrade] = useState(false);

    const classes = useStyles();

    const handleClose = () => {
        props.onClose();
    };

    const getModalHeaderText = () => {
        if (type === "market_liquidity") {
            return "Remove liquidity";
        }

        if (type === "court_power_stake") {
            return 'Withdraw Tokens';
        }

        return 'Unstake Tokens';
    };

    const getModalText = () => {
        if (type === "market_liquidity") {
            return "Remove liquidity from market";
        }

        if (type === "nftStake") {
            return "Unstake your ROOM tokens. Your NFT will be withdrawn with your tokens if you unstake your whole stake";
        }

        if (type === "court_power_stake") {
            return "Withdraw your COURT tokens";
        }

        if (type === "CourtFarming_RoomStake") {
            return "Unstake your ROOM tokens and claim rewards";
        }

        if (type === "RoomFarming_RoomEthLpStake") {
            return "Unstake your ROOM/ETH LP tokens and claim rewards";
        }

        if (type === "CourtFarming_RoomEthLpStake") {
            return "Unstake your ROOM/ETH LP tokens and claim rewards";
        }

        if (type === "CourtFarming_CourtEthLpStake") {
            return "Unstake your COURT/ETH LP tokens and claim rewards";
        }

        if (type === "CourtFarming_HtStake") {
            return "Unstake your HT tokens and claim rewards";
        }

        if (type === "CourtFarming_MatterStake") {
            return "Unstake your MATTER tokens and claim rewards";
        }
    };

    const handleConfirm = async () => {
        if (!checkValidAmount()) {
            return;
        }

        setIsUnstakeProcessing(true);

        try {
            const amountToUnstakeResult = convertTokensToAmount(
                amountToUnstake
            );

            if (type === "nftStake") {
                if (
                    BigNumber.from(amountToUnstakeResult).eq(
                        BigNumber.from(stakedTokensBalance)
                    )
                ) {
                    await roomLPFarmingAPIs.exitNftStakeContractForTire(
                        accountContext.account,
                        nftTire
                    );
                } else {
                    await roomLPFarmingAPIs.unstakeNftStakeContractForTire(
                        accountContext.account,
                        nftTire,
                        amountToUnstakeResult,
                        claim
                    );
                }
            } else if (type === "market_liquidity") {
                const marketAPIs = new MarketAPIs(props.marketVersion);
                await marketAPIs.removeLiquidityFromMarket(accountContext.account, props.marketContractId, toWei(amountToUnstake));
            } else if (type === "court_power_stake") {
                const claimCourtAPIs = new ClaimCourtAPIs();
                await claimCourtAPIs.withdrawCourtInPowerStakeContract(
                    accountContext.account,
                    amountToUnstakeResult
                );
            } else {
                await courtAPIs.unstackeTokens(
                    accountContext.account,
                    type,
                    amountToUnstakeResult,
                    claim
                );
            }

            props.onUnStake();
            props.onClose();
        } catch (e) {
        } finally {
            setIsUnstakeProcessing(false);
        }
    };

    const checkValidAmount = () => {
        const amountToUnstakeResult = convertTokensToAmount(amountToUnstake);
        if (
            amountToUnstake === 0 ||
            BigNumber.from(amountToUnstakeResult).gt(
                BigNumber.from(stakedTokensBalance)
            )
        ) {
            setIsInvalidAmountError(true);
            return false;
        }

        setIsInvalidAmountError(false);

        return true;
    };

    const handleSetMax = () => {
        const availableTokens = convertAmountToTokens(stakedTokensBalance);
        setAmountToUnstake(availableTokens);
    };

    const handleClaimChange = (event) => {
        setClaim(event.target.checked);
    };

   const claimableTypes = [
        'CourtFarming_MatterStake',
        'CourtFarming_HtStake',
        'CourtFarming_CourtEthLpStake',
        'CourtFarming_RoomEthLpStake',
        'RoomFarming_RoomEthLpStake',
        'CourtFarming_RoomStake',
        'nftStake',
    ];

    return (
        <Dialog
            classes={{
                paper: classes.paper,
            }}
            onClose={handleClose}
            aria-labelledby="UnstakeModal-dialog-title"
            open={props.open}
            disableBackdropClick={true}
            TransitionComponent={Transition}
            keepMounted
        >
            <MuiDialogTitle
                id="UnstakeModal-dialog-title"
                disableTypography
                className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle} variant="h6">
                    {getModalHeaderText(type)}
                </Typography>
                {handleClose && (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        disabled={isUnstakeProcessing}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div className={classes.Modal__Text}>
                    {getModalText(type, type)}
                </div>
                <div className={classes.Modal__TokensLabel}>
                    Tokens Available{" "}
                    <span className={classes.Modal__TokensLabel_Balance}>
                        {fromWei(stakedTokensBalance)}
                    </span>
                </div>
                <div className={classes.Modal__TokensInputWrap}>
                    <TradeInput max={fromWei(stakedTokensBalance)}
                                min={0}
                                value={amountToUnstake}
                                onValidityUpdate={(valid) => {
                                    setCanTrade(valid);
                                }}
                                onChange={(e)=> {
                                    setAmountToUnstake(e);
                                }}/>
                </div>
                {isInvalidAmountError && (
                    <div className={classes.Modal__TokensErrorHelp}>
                        {convertAmountToTokens(stakedTokensBalance) === "1.0" &&
                            `Invalid amount, it must be 1`}
                        {convertAmountToTokens(stakedTokensBalance) !== "1.0" &&
                            `Invalid amount, it must be between 1 and ${convertAmountToTokens(
                                stakedTokensBalance
                            )}`}
                    </div>
                )}
                {
                    claimableTypes.indexOf(type) > -1 && (
                        <div className={classes.ClaimWrap}>
                            <Checkbox
                                checked={claim}
                                onChange={handleClaimChange}
                                color="primary"
                                inputProps={{"aria-label": "claim rewards"}}
                            />
                            <span className={classes.ClaimLabel}>Claim rewards</span>
                        </div>
                    )
                }
            </MuiDialogContent>
            <MuiDialogActions className={classes.MuiDialogActions}>
                <Button
                    className={classes.MuiDialogActions__CancelBtn}
                    isDisabled={isUnstakeProcessing}
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
                    isProcessing={isUnstakeProcessing}
                    color={"primary"}
                    size={"small"}
                    isDisabled={!canTrade}
                >
                    Confirm
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}

export default UnstakeModal;
