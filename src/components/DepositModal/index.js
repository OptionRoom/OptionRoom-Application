import React, { useContext, useState } from "react";
import clsx from "clsx";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slide from '@material-ui/core/Slide';

import Button from "../Button";

import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import RoomLPFarmingAPIs from "../../shared/contracts/RoomLPFarmingAPIs";
import CourtAPIs from "../../shared/contracts/CourtAPIs";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {
    convertAmountToTokens,
    convertTokensToAmount, fromWei,
} from "../../shared/helper";
import TradeInput from "../TradeInput";
import ClaimCourtAPIs from "../../shared/contracts/ClaimCourtAPIs";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const getModalText = (type, source, pool) => {
    if (type === "Add_Market_Liquidity") {
        return "Add liquidity to this market";
    }

    if (type === "nftStake") {
        return "Deposit your ROOM tokens for staking";
    }

    if (source === "room" && pool === "CourtFarming_RoomStake") {
        return "Deposit your ROOM tokens for COURT staking";
    }

    if (pool === "court_power_stake") {
        return "Deposit your COURT tokens to get more voting power";
    }

    if (source === "room_eth_lp" && pool === "RoomFarming_RoomEthLpStake") {
        return "Deposit your ROOM-ETH LP tokens for ROOM staking";
    }

    if (source === "room_eth_lp" && pool === "CourtFarming_RoomEthLpStake") {
        return "Deposit your ROOM-ETH LP tokens for COURT staking";
    }

    if (source === "court_eth_lp" && pool === "CourtFarming_CourtEthLpStake") {
        return "Deposit your COURT-ETH LP tokens for COURT staking";
    }

    if (source === "ht" && pool === "CourtFarming_HtStake") {
        return "Deposit your HT tokens for COURT staking";
    }

    if (source === "matter" && pool === "CourtFarming_MatterStake") {
        return "Deposit your MATTER tokens for COURT staking";
    }
};

const getModalHeaderText = (type) => {
    if (type === "Add_Market_Liquidity") {
        return "Add liquidity";
    }

    return 'Deposit Tokens';
};

function DepositModal(props) {
    const { userRoomLPTokens, type, nftTire, source, pool } = props;

    const accountContext = useContext(AccountContext);
    const roomLPFarmingAPIs = new RoomLPFarmingAPIs();
    const courtAPIs = new CourtAPIs();
    const [tokensCount, setTokensCount] = useState(0);
    const [canTrade, setCanTrade] = useState(false);
    const [isConfirmProcessing, setIsConfirmProcessing] = useState(false);

    const classes = useStyles();

    const handleClose = () => {
        props.onClose();
    };

    const handleConfirm = async () => {
        setIsConfirmProcessing(true);

        try {
            const tokensAmount = convertTokensToAmount(tokensCount);
            if (type === "nftStake") {
                await roomLPFarmingAPIs.stakeNftStakeContractForTire(
                    accountContext.account,
                    nftTire,
                    tokensAmount
                );
            } else if(pool === 'court_power_stake') {
                const claimCourtAPIs = new ClaimCourtAPIs();
                await claimCourtAPIs.depositCourtInPowerStakeContract(
                    accountContext.account,
                    tokensAmount
                );
            } else if(type === 'Add_Market_Liquidity'){
                const marketAPIs = new MarketAPIs();
                await marketAPIs.addLiquidityToMarket(accountContext.account, props.marketContractId, tokensAmount);
            } else {
                await courtAPIs.stackeTokens(
                    accountContext.account,
                    pool,
                    tokensAmount
                );
            }

            setIsConfirmProcessing(false);
            props.onStake();
            props.onClose();
        } catch (e) {
            setIsConfirmProcessing(false);
        }
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            classes={{
                paper: classes.paper, // class name, e.g. `classes-nesting-root-x`
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
                <Typography className={classes.DialogTitle} variant="h6">
                    {getModalHeaderText(type)}
                </Typography>
                {handleClose && (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        disabled={isConfirmProcessing}
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
                        {fromWei(userRoomLPTokens)}
                    </span>
                </div>
                <div className={classes.Modal__TokensInputWrap}>
                    <TradeInput max={fromWei(userRoomLPTokens)}
                                min={0}
                                value={tokensCount}
                                onValidityUpdate={(valid) => {
                                    //setCanTrade(valid);
                                }}
                                onChange={(e)=> {
                                    setTokensCount(e);

                                    if(e == 0){
                                        setCanTrade(false);
                                    } else {
                                        setCanTrade(true);
                                    }
                                }}/>
                </div>
            </MuiDialogContent>
            <MuiDialogActions className={classes.MuiDialogActions}>
                <Button
                    className={classes.MuiDialogActions__CancelBtn}
                    isDisabled={isConfirmProcessing}
                    color={"gray"}
                    onClick={handleClose}
                    size={"small"}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    className={classes.MuiDialogActions__ConfirmBtn}
                    isProcessing={isConfirmProcessing}
                    isDisabled={!canTrade}
                    color={"primary"}
                    size={"small"}
                >
                    Confirm
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}

export default DepositModal;
