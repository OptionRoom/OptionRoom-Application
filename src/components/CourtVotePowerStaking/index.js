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
import {MaxUint256, ChainNetworks} from "../../shared/constants";

function CourtVotePowerStaking(props) {
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
        if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
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
        if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
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
        if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
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
        if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
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
        if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
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
                <div className={classes.CourtVotePowerStaking_Txt}>
                    <HowToVoteIcon/>
                    <div>
                        Your voting power is: {fromWei(votePower, null, 2)}
                    </div>
                </div>
                <div className={classes.CourtVotePowerStaking_Txt2}>
                    <div>Staked COURT balance: {fromWei(stakeBalance, null, 2)}</div>
                    <Button size={'small'}
                            isProcessing={isApprovingCourtForPowerStake}
                            onClick={handleDeposit}
                            color={'primary'}>
                        {allowance > 0 ? "Deposit" : "Enable Deposit"}
                    </Button>
                    <Button size={'small'}
                            isDisabled={stakeBalance == 0}
                            onClick={()=> setIsUnstakeModalOpen(true)}
                            color={'black'}>Withdraw</Button>
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

export default CourtVotePowerStaking;
