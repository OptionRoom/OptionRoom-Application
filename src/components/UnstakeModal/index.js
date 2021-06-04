import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { BigNumber } from "@ethersproject/bignumber";

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const getModalHeaderText = (type) => {
    if (type === "market_liquidity") {
        return "Remove liquidity";
    }

    return 'Unstake Tokens';
};

const getModalText = (type, source, pool) => {
    if (type === "market_liquidity") {
        return "Remove liquidity from market";
    }

    if (type === "nftStake") {
        return "Unstake your ROOM tokens. Your NFT will be withdrawn with your tokens if you unstake your whole stake";
    }

    if (source === "room" && pool === "CourtFarming_RoomStake") {
        return "Unstake your ROOM tokens and claim rewards";
    }

    if (source === "room_eth_lp" && pool === "RoomFarming_RoomEthLpStake") {
        return "Unstake your ROOM/ETH LP tokens and claim rewards";
    }

    if (source === "room_eth_lp" && pool === "CourtFarming_RoomEthLpStake") {
        return "Unstake your ROOM/ETH LP tokens and claim rewards";
    }

    if (source === "court_eth_lp" && pool === "CourtFarming_CourtEthLpStake") {
        return "Unstake your COURT/ETH LP tokens and claim rewards";
    }

    if (source === "ht" && pool === "CourtFarming_HtStake") {
        return "Unstake your HT tokens and claim rewards";
    }

    if (source === "matter" && pool === "CourtFarming_MatterStake") {
        return "Unstake your MATTER tokens and claim rewards";
    }
};

function UnstakeModal(props) {
    const { stakedTokensBalance, type, nftTire, pool, source } = props;

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
                const marketAPIs = new MarketAPIs();
                await marketAPIs.removeLiquidityFromMarket(accountContext.account, props.marketContractId, toWei(amountToUnstake));
            } else {
                await courtAPIs.unstackeTokens(
                    accountContext.account,
                    pool,
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
                    {getModalText(type, source, pool)}
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
                {
                    type !== "market_liquidity" && (
                        <div className={classes.ClaimWrap}>
                            <Checkbox
                                checked={claim}
                                onChange={handleClaimChange}
                                color="primary"
                                inputProps={{ "aria-label": "claim rewards" }}
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
