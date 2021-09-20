import React, {useContext, useEffect, useState} from "react";
import clsx from "clsx";
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import { useStyles } from "./styles";
import Button from "../Button";
import DepositModal from "../DepositModal";
import UnstakeModal from "../UnstakeModal";
import {fromWei} from "../../shared/helper";
import ClaimCourtAPIs from "../../shared/contracts/ClaimCourtAPIs";
import {AccountContext} from "../../shared/AccountContextProvider";
import {MaxUint256} from "../../shared/constants";

function CourtVotePowerStaking2(props) {
    const {
    } = props;
    const accountContext = useContext(AccountContext);

    const classes = useStyles();
    const [isApprovingCourtForPowerStake, setIsApprovingCourtForPowerStake] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
    const [allowance, setAllowance] = useState(null);
    const [stakeBalance, setStakeBalance] = useState(0);
    const [votePower, setVotePower] = useState(0);
    const [courtTokenBalance, setCourtTokenBalance] = useState(0);

    const loadWalletAllowance = async () => {
        if(!accountContext.isChain('bsc')) {
            return;
        }

        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const allowance = await claimCourtAPIs.getWalletCourtAllowanceOfPowerStakeContract(accountContext.account);
            setAllowance(allowance);
        } catch (e) {

        }
    };

    const loadWalletStakeBalance = async () => {
        if(!accountContext.isChain('bsc')) {
            return;
        }

        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const result = await claimCourtAPIs.getWalletStakedCourtInPowerStakeContract(accountContext.account);
            setStakeBalance(result);
        } catch (e) {

        }
    };

    const loadWalletVotePower = async () => {
        if(!accountContext.isChain('bsc')) {
            return;
        }

        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const result = await claimCourtAPIs.getVotePower(accountContext.account);
            setVotePower(result);
        } catch (e) {

        }
    };

    const loadWalletCourtBalance = async () => {
        if(!accountContext.isChain('bsc')) {
            return;
        }

        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const result = await claimCourtAPIs.getAddressTokenBalance(accountContext.account, 'court');
            setCourtTokenBalance(result);
        } catch (e) {

        }
    };

    const handleDeposit = async () => {
        if(!accountContext.isChain('bsc')) {
            return;
        }

        try {
            if(allowance == 0) {
                setIsApprovingCourtForPowerStake(true);
                const claimCourtAPIs = new ClaimCourtAPIs();
                await claimCourtAPIs.approveCourtForPowerStakeContract(accountContext.account);
                setAllowance(MaxUint256);
                setIsApprovingCourtForPowerStake(false);
                return;
            }

            setIsDepositModalOpen(true);
        } catch (e) {

        }
    };

    const handleOnDeposit = async () => {
        loadWalletVotePower();
        loadWalletCourtBalance();
        loadWalletStakeBalance();
    };

    useEffect(() => {
        if(accountContext.account) {
            loadWalletAllowance();
            loadWalletStakeBalance();
            loadWalletVotePower();
            loadWalletCourtBalance();
        }
    }, [accountContext.account]);

    return (
        <>
            <div className={classes.CourtVotePowerStaking}>
                <div className={classes.InfoWrap}>
                    <div className={classes.InfoBlock}>
                        <span>Stacked COURT</span>
                        <span>{fromWei(stakeBalance, null, 2)}</span>
                    </div>
                    <div className={classes.InfoBlock}>
                        <span>Voting Power</span>
                        <span>{fromWei(votePower, null, 2)}</span>
                    </div>
                </div>
                <div className={classes.Actions}>
                    <Button size={'small'}
                            className={classes.ActionBtn}
                            isProcessing={isApprovingCourtForPowerStake}
                            onClick={handleDeposit}
                            color={'primary'}>
                        {allowance > 0 ? "+" : "Enable +"}
                    </Button>
                    <Button size={'small'}
                            isDisabled={stakeBalance == 0}
                            className={classes.ActionBtn}
                            onClick={()=> setIsUnstakeModalOpen(true)}
                            color={'black'}>-</Button>
                </div>
            </div>
            <DepositModal
                open={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
                onStake={handleOnDeposit}
                userRoomLPTokens={courtTokenBalance}
                source={'court_power_stake'}
                pool={'court_power_stake'}
            />
            <UnstakeModal
                open={isUnstakeModalOpen}
                onClose={() => setIsUnstakeModalOpen(false)}
                onUnStake={handleOnDeposit}
                stakedTokensBalance={stakeBalance}
                type={'court_power_stake'}
            />
        </>
    );
}

export default CourtVotePowerStaking2;
