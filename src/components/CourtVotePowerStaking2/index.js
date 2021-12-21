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
import {ChainNetworks, MaxUint256} from "../../shared/constants";
import {useGetIsChainSupported} from "../../shared/hooks";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN, ChainNetworks.ROPSTEN];

function CourtVotePowerStaking2(props) {
    const {
    } = props;
    const accountContext = useContext(AccountContext);
    const isChainSupported = useGetIsChainSupported(supportedChains);

    const classes = useStyles();
    const [isApprovingCourtForPowerStake, setIsApprovingCourtForPowerStake] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
    const [allowance, setAllowance] = useState(null);
    const [stakeBalance, setStakeBalance] = useState(0);
    const [votePower, setVotePower] = useState(0);
    const [courtTokenBalance, setCourtTokenBalance] = useState(0);

    const loadWalletAllowance = async () => {
        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const allowance = await claimCourtAPIs.getWalletCourtAllowanceOfPowerStakeContract(accountContext.account);
            setAllowance(allowance);
        } catch (e) {

        }
    };

    const loadWalletStakeBalance = async () => {
        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const result = await claimCourtAPIs.getWalletStakedCourtInPowerStakeContract(accountContext.account);
            setStakeBalance(result);
        } catch (e) {

        }
    };

    const loadWalletVotePower = async () => {
        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const result = await claimCourtAPIs.getVotePower(accountContext.account);
            setVotePower(result);
        } catch (e) {

        }
    };

    const loadWalletCourtBalance = async () => {
        try {
            const claimCourtAPIs = new ClaimCourtAPIs();
            const result = await claimCourtAPIs.getAddressTokenBalance(accountContext.account, 'court');
            setCourtTokenBalance(result);
        } catch (e) {

        }
    };

    const handleDeposit = async () => {
        if(!isChainSupported) {
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
            setIsApprovingCourtForPowerStake(false);
        }
    };

    const handleOnDeposit = async () => {
        loadWalletVotePower();
        loadWalletCourtBalance();
        loadWalletStakeBalance();
    };

    useEffect(() => {
        if(accountContext.account && isChainSupported) {
            loadWalletAllowance();
            loadWalletStakeBalance();
            loadWalletVotePower();
            loadWalletCourtBalance();
        }
    }, [accountContext.account, isChainSupported]);

    return (
        <>
            <div className={classes.CourtVotePowerStaking}>
                <div className={classes.InfoWrap}>
                    <div className={classes.InfoBlock}>
                        <span>Staked COURT</span>
                        <span>{fromWei(stakeBalance, null, 2)}</span>
                    </div>
                    <div className={classes.InfoBlock}>
                        <span>Voting Power</span>
                        <span>{fromWei(votePower, null, 2)}</span>
                    </div>
                </div>
                <div className={classes.Actions}>
                    <Button size={'small'}
                            className={clsx(classes.ActionBtn, {
                                [classes.ActionBtn__StakeEnable]: allowance <=0
                            })}
                            isProcessing={isApprovingCourtForPowerStake}
                            onClick={handleDeposit}
                            color={'primary'}>
                        {allowance > 0 ? "+" : <span className={classes.ActionBtnHelper}>Enable Stake</span>}
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
