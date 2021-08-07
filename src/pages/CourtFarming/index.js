import React, { useContext, useEffect, useState, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import swal from "sweetalert";

import Tooltip from "@material-ui/core/Tooltip";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import ConnectButton from "../../components/ConnectButton";

import {
    getWalletBalanceOfContract
} from '../../shared/contracts/contracts.helper';

import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import ht_icon from "../../assets/ht_icon.png";
import matter_icon from "../../assets/matter_icon.png";
import CourtAPIs from "../../shared/contracts/CourtAPIs";
import NewCourtClaimAPIs from "../../shared/contracts/NewCourtClaimAPIs";
import {
    fromWei,
    toWei,
    getOrRemoveRoiOfCourt,
    saveRoiOfCourt,
} from "../../shared/helper";
import ClaimCourtAPIs from "../../shared/contracts/ClaimCourtAPIs";
import {MaxUint256} from "../../shared/constants";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        //color: theme.palette.common.white,
    },
    tooltip: {
        padding: "10px",
        backgroundColor: "#fff",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}));

function HtmlTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip placement="top" arrow classes={classes} {...props} />;
}

const oldStakeContractsById = {
    "HT_COURT": "CourtFarming_HtStake",
    "MATTER_COURT": "CourtFarming_MatterStake"
};

const newStakeContractsById = {
    "HT_COURT": "CourtFarming_NoRoomStakeHT",
    "MATTER_COURT": "CourtFarming_NoRoomStakeMatter",
    "ROOM_COURT": "CourtFarming_RoomStakeNew",
    "ROOM_BNB_LP_COURT": "CourtFarming_RoomLPStake"
};

function CourtFarmingPool(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const [depositedTokens, setDepositedTokens] = useState(0);
    const [isWithdrawingTokens, setIsWithdrawingTokens] = useState(false);
    const [claimInfo, setClaimInfo] = useState({});
    const [usdtAllowanceForClaim, setUsdtAllowanceForClaim] = useState(0);

    const loadUsdtAllowanceOfClaimContract = async () => {
        const claimCourtAPIs = new ClaimCourtAPIs();
        const htUsdt = await claimCourtAPIs.getAddressUsdtAllowanceOfClaimContract(accountContext.account, newStakeContractsById[props.entryId]);
        setUsdtAllowanceForClaim(htUsdt);
    };

    const handleWithdrawTokens = async () => {
        setIsWithdrawingTokens(true);

        const courtAPIs = new CourtAPIs();

        await courtAPIs.unstackeTokens(
            accountContext.account,
            oldStakeContractsById[props.entryId],
            depositedTokens,
            false
        );

        setIsWithdrawingTokens(false);
    }

    const handleClaimCourt = async () => {
        setIsWithdrawingTokens(true);

        if(["ROOM_COURT", "ROOM_BNB_LP_COURT"].indexOf(props.entryId) > -1) {
            try {
                const newCourtClaimAPIs = new NewCourtClaimAPIs();
                await newCourtClaimAPIs.claimCourt(accountContext.account, newStakeContractsById[props.entryId], claimInfo.courtAmount);
                await loadClaimInfo();
            } catch (e) {

            } finally {
                setIsWithdrawingTokens(false);
            }
        } else {
            if (usdtAllowanceForClaim == 0) {
                const claimCourtAPIs = new ClaimCourtAPIs();
                await claimCourtAPIs.approveUsdtForClaimContract(accountContext.account, newStakeContractsById[props.entryId]);
                setUsdtAllowanceForClaim(MaxUint256);
                setIsWithdrawingTokens(false);
            } else {

                if(parseFloat(claimInfo.claimCost) > 0) {
                    const busdBalanceOfWallet = await getWalletBalanceOfContract(accountContext.account, 'usdt');
                    const costOfClaim = (parseFloat(claimInfo.claimCost)/1e18) * (parseFloat(claimInfo.courtAmount)/1e18);

                    if(parseFloat(busdBalanceOfWallet) < parseFloat(costOfClaim)) {
                        swal(
                            "Insufficient funds",
                            `You must hold at least ${fromWei(costOfClaim, 18, 2)} BUSD, your current balance is ${fromWei(busdBalanceOfWallet, null, 2)}`,
                            "error"
                        );
                        setIsWithdrawingTokens(false);

                        return;
                    }

                    swal({
                        title: "Confirm?",
                        text: `Claiming COURT will cost ${fromWei(costOfClaim, null, 2)} BUSD`,
                        buttons: true,
                    })
                        .then(async (confirmClaim) =>  {
                            if(confirmClaim) {
                                try {
                                    const newCourtClaimAPIs = new NewCourtClaimAPIs();
                                    await newCourtClaimAPIs.claimCourt(accountContext.account, newStakeContractsById[props.entryId], claimInfo.courtAmount);
                                    await loadClaimInfo();
                                } catch (e) {
                                    setIsWithdrawingTokens(false);
                                }
                            }

                            setIsWithdrawingTokens(false);
                        });
                }
            }
        }
    };

    const loadClaimInfo = async () => {
        loadUsdtAllowanceOfClaimContract();
        const newCourtClaimAPIs = new NewCourtClaimAPIs();

        const claimInfo = await newCourtClaimAPIs.getClaimInfo(
            accountContext.account,
            newStakeContractsById[props.entryId]
        );

        setClaimInfo(claimInfo);
    };

    useEffect(() => {

        const init = async () => {
            if(accountContext.isChain('main')) {
                const courtAPIs = new CourtAPIs();

                const htTokensCount = await courtAPIs.getAddressStakeBalance(
                    accountContext.account,
                    oldStakeContractsById[props.entryId]
                );
                setDepositedTokens(htTokensCount);

            } else if(accountContext.isChain('bsc')) {
                loadClaimInfo();
            }
        };

        if (accountContext.account) {
            init();
        }

        return () => {
        };
    }, [accountContext.account, accountContext.chainId]);

    return (
        <div className={classes.PoolWrap}>
            <div>{props.entryTitle}</div>
            {
                accountContext.isChain('main') && (
                    <div>
                        <span>{fromWei(depositedTokens, null, 2)}</span>
                        <Button
                            isProcessing={isWithdrawingTokens}
                            size={"small"}
                            color="primary"
                            onClick={handleWithdrawTokens}
                        >
                            Withdraw
                        </Button>
                    </div>
                )
            }
            {
                accountContext.isChain('bsc') && (
                    <>
                        <div>
                            <span>{["ROOM_COURT", 'ROOM_BNB_LP_COURT'].indexOf(props.entryId) > -1 ? fromWei(claimInfo.roomAmount || 0, null, 2) : 'N/A'}</span>
                        </div>
                        <div>
                            <span>{fromWei(claimInfo.courtAmount || 0, null, 2)}</span>
                        </div>
                        <div>
                            {
                                ((parseFloat(claimInfo.courtAmount) > 0) || (claimInfo.roomAmount && (parseFloat(claimInfo.roomAmount) > 0))) && (
                                    <Button
                                        isProcessing={isWithdrawingTokens}
                                        size={"small"}
                                        color="primary"
                                        onClick={handleClaimCourt}
                                    >
                                        {["ROOM_COURT", 'ROOM_BNB_LP_COURT'].indexOf(props.entryId) === -1 ? (usdtAllowanceForClaim == 0 ? 'Un-lock to claim': 'Claim') : 'Withdraw & Claim'}
                                    </Button>
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
}

function CourtFarming() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const pools = [
        {
            id: "ROOM_COURT",
            title: "ROOM",
            decs: "Get COURT",
            link: "/court-farming/court-room",
            xUnit: "5x",
        },
        {
            id: "ROOM_BNB_LP_COURT",
            title: "ROOM-BNB LP",
            decs: "Get COURT",
            link: "/court-farming/court-roomethlp",
            xUnit: "7x",
        },
        {
            id: "HT_COURT",
            title: "HT",
            decs: "Get COURT",
            link: "/court-farming/court-ht",
            icons: [ht_icon],
            xUnit: "1x",
        },
        {
            id: "MATTER_COURT",
            title: "MATTER",
            decs: "Get COURT",
            link: "/court-farming/court-matter",
            icons: [matter_icon],
            xUnit: "1x",
        },
        /*         {
            id: "COURT_ETH_LP_EARN_COURT",
            title: "Deposit COURT-ETH LP",
            decs: "Earn COURT",
            link: "/court-farming/court-courtethlp",
            icons: [courtTokenIconImg, eth_icon],
        }, */
    ];

    useEffect(() => {
    }, [accountContext.account, accountContext.chainId]);

    return (
        <>
            <div className={classes.LiquidityMiningPage}>
                <Navbar
                    title={"COURT Farming"}
                    details={
                        "Earn COURT tokens by providing liquidity to one of the pools on this page."
                    }
                />
                {accountContext.account && (
                    <>
                        <div className={classes.Pools}>
                            <div className={classes.PoolsTitle}>
                                <div>Pool</div>
                                {
                                    accountContext.isChain('bsc') && (
                                        <>
                                            <div>Deposited Tokens</div>
                                            <div>COURT</div>
                                            <div>Actions</div>
                                        </>
                                    )
                                }
                                {
                                    accountContext.isChain('main') && (
                                        <div>Deposited Tokens</div>
                                    )
                                }
                            </div>
                            {
                                pools
                                .filter((entry) => {
                                    if(["ROOM_COURT", "ROOM_BNB_LP_COURT"].indexOf(entry.id) > -1 && !accountContext.isChain('bsc')){
                                        return false;
                                    }

                                    return true;
                                })
                                .map((entry) => {
                                    return (
                                        <CourtFarmingPool key={entry.id}
                                                          entryTitle={entry.title}
                                                          entryId={entry.id}/>
                                    )
                                })
                            }
                        </div>
                    </>
                )}
                {!accountContext.account && (
                    <div className={classes.ConnectWrap}>
                        <ConnectButton />
                    </div>
                )}
            </div>
        </>
    );
}

export default CourtFarming;
