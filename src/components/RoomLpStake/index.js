import numeral from "numeral";
import React, { useEffect } from "react";
import clsx from "clsx";
import { useState, useContext } from "react";

import { useStyles } from "./styles";
import { convertAmountToTokens } from "../../shared/helper";
import Button from "../Button";
import AddIcon from "@material-ui/icons/Add";
import DepositModal from "../DepositModal";
import UnstakeModal from "../UnstakeModal";
import CourtAPIs from "../../shared/contracts/CourtAPIs";
import { AccountContext } from "../../shared/AccountContextProvider";
import {
    getTotalValueLocked,
    getTotalLiquidity,
    getLpApy,
} from "../../shared/contracts/PoolsStatsAPIs";

import { timeConverter } from "../../shared/helper";

import room_eth_lp_staking from "../../assets/room_eth_lp_staking.png";
import ht_icon from "../../assets/ht_icon.png";
import matter_icon from "../../assets/matter_icon.png";
import room_icon from "../../assets/room.svg";
import courtTokenIconImg from "../../assets/court.svg";
import courtEthLpIconImg from "../../assets/courtethlp.png";

const getPoolConfig = (source, pool) => {
    if (source === "matter" && pool === "CourtFarming_RooStake") {
        return {
            earnedTokenName: "COURT Earned",
            stakeTokenTitle: "Stake MATTER",
            earnedTokenImg: courtTokenIconImg,
            stakeTokenImg: room_icon,
        };
    }

    if (source === "room" && pool === "CourtFarming_RoomStake") {
        return {
            earnedTokenName: "COURT Earned",
            stakeTokenTitle: "Stake ROOM",
            earnedTokenImg: courtTokenIconImg,
            stakeTokenImg: room_icon,
        };
    }

    if (source === "ht" && pool === "CourtFarming_HtStake") {
        return {
            earnedTokenName: "COURT Earned",
            stakeTokenTitle: "Stake HT",
            earnedTokenImg: courtTokenIconImg,
            stakeTokenImg: ht_icon,
        };
    }

    if (source === "matter" && pool === "CourtFarming_MatterStake") {
        return {
            earnedTokenName: "COURT Earned",
            stakeTokenTitle: "Stake MATTER",
            earnedTokenImg: courtTokenIconImg,
            stakeTokenImg: matter_icon,
        };
    }

    if (source === "room_eth_lp" && pool === "RoomFarming_RoomEthLpStake") {
        return {
            earnedTokenName: "ROOM Earned",
            stakeTokenTitle: "Stake ROOM/ETH LP",
            earnedTokenImg: room_icon,
            stakeTokenImg: room_eth_lp_staking,
        };
    }

    if (source === "room_eth_lp" && pool === "CourtFarming_RoomEthLpStake") {
        return {
            earnedTokenName: "COURT Earned",
            stakeTokenTitle: "Stake ROOM/ETH LP",
            earnedTokenImg: courtTokenIconImg,
            stakeTokenImg: room_eth_lp_staking,
        };
    }

    if (source === "court_eth_lp" && pool === "CourtFarming_CourtEthLpStake") {
        return {
            earnedTokenName: "COURT Earned",
            stakeTokenTitle: "Stake COURT/ETH LP",
            earnedTokenImg: courtTokenIconImg,
            stakeTokenImg: courtEthLpIconImg,
        };
    }
};

function RoomLpStake(props) {
    const { source, pool } = props;

    const accountContext = useContext(AccountContext);
    const classes = useStyles();
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
    const [isHarvestInProgress, setIsHarvestInProgress] = useState(false);
    const [isIncvHarvestInProgress, setIsIncvHarvestInProgress] = useState(
        false
    );
    const [isApproveProcessing, setIsApproveProcessing] = useState(false);

    const [userDepositTokenAllowance, setUserDepositTokenAllowance] = useState(
        0
    );
    const [userDepositTokenBalance, setUserDepositTokenBalance] = useState(0);
    const [userFarmedTokenBalance, setUserFarmedTokenBalance] = useState(0);
    const [
        userFarmedIncvTokenBalance,
        setUserFarmedIncvTokenBalance,
    ] = useState(0);
    const [
        userDepositTokenStakedBalance,
        setUserDepositTokenStakedBalance,
    ] = useState(0);
    const [incvRewardInfo, setIncvRewardInfo] = useState(null);

    const [stats, setStats] = useState({});

    const initPoolData = async () => {
        try {
            const courtAPIs = new CourtAPIs();

            const result_UserDepositTokenBalance = await courtAPIs.getAddressTokenBalance(
                accountContext.account,
                source
            );
            console.log(
                "result_UserDepositTokenBalance",
                result_UserDepositTokenBalance
            );
            setUserDepositTokenBalance(result_UserDepositTokenBalance);

            const result_UserDepositTokenAllowance = await courtAPIs.getAddressAllowance(
                accountContext.account,
                source,
                pool
            );
            console.log(
                "result_UserDepositTokenAllowance",
                result_UserDepositTokenAllowance
            );
            setUserDepositTokenAllowance(result_UserDepositTokenAllowance);

            const result_UserDepositTokenStakedBalance = await courtAPIs.getAddressStakeBalance(
                accountContext.account,
                pool
            );
            console.log(
                "result_UserDepositTokenStakedBalance",
                result_UserDepositTokenStakedBalance
            );
            setUserDepositTokenStakedBalance(
                result_UserDepositTokenStakedBalance
            );

            const result_getIncvRewardInfo = await courtAPIs.getIncvRewardInfo(
                accountContext.account,
                pool
            );
            setIncvRewardInfo(result_getIncvRewardInfo);
        } catch (e) {
            console.log("e", e);
        }
    };

    const openUnstakeModal = () => {
        setIsUnstakeModalOpen(true);
    };

    const handleOnStake = async () => {
        initPoolData();
    };

    const handleOnUnStake = async () => {
        initPoolData();
    };

    const handleApproveDepositToken = async () => {
        setIsApproveProcessing(true);

        try {
            const courtAPIs = new CourtAPIs();
            await courtAPIs.approveAddressAllowance(
                accountContext.account,
                source,
                pool
            );
            const result_UserDepositTokenAllowance = await courtAPIs.getAddressAllowance(
                accountContext.account,
                source,
                pool
            );
            setUserDepositTokenAllowance(result_UserDepositTokenAllowance);
        } catch (e) {
        } finally {
            setIsApproveProcessing(false);
        }
    };

    const handleHarvest = async () => {
        setIsHarvestInProgress(true);

        try {
            const courtAPIs = new CourtAPIs();
            await courtAPIs.claimRewards(accountContext.account, pool);
            const userFarmedTokenBalance = await courtAPIs.getRewards(
                accountContext.account,
                pool
            );
            if (
                source === "room_eth_lp" &&
                pool === "RoomFarming_RoomEthLpStake"
            ) {
                setUserFarmedTokenBalance(userFarmedTokenBalance);
            } else {
                setUserFarmedTokenBalance(userFarmedTokenBalance.reward);
            }
        } catch (e) {
        } finally {
            setIsHarvestInProgress(false);
        }
    };

    const handleIncvHarvest = async () => {
        setIsIncvHarvestInProgress(true);

        try {
            const courtAPIs = new CourtAPIs();
            await courtAPIs.claimIncvRewards(accountContext.account, pool);
            const userFarmedTokenBalance = await courtAPIs.getRewards(
                accountContext.account,
                pool
            );
            setUserFarmedIncvTokenBalance(userFarmedTokenBalance.incvReward);
        } catch (e) {
        } finally {
            setIsIncvHarvestInProgress(false);
        }
    };

    const isIncvPool = () => {
        return pool !== "RoomFarming_RoomEthLpStake";
    };

    const updateInfo = async () => {
        const courtAPIs = new CourtAPIs();

        const userFarmedTokenBalance = await courtAPIs.getRewards(
            accountContext.account,
            pool
        );
        if (source === "room_eth_lp" && pool === "RoomFarming_RoomEthLpStake") {
            setUserFarmedTokenBalance(userFarmedTokenBalance);

            //Stats
            const roomTotalLockedValue = await getTotalValueLocked(
                accountContext.account
            );
            const roomTotalLiquidity = await getTotalLiquidity(
                accountContext.account
            );
            const roomApy = await getLpApy(accountContext.account);
            setStats({
                roomTotalLockedValue,
                roomTotalLiquidity,
                roomApy,
            });
        } else {
            setUserFarmedTokenBalance(userFarmedTokenBalance.reward);
            setUserFarmedIncvTokenBalance(userFarmedTokenBalance.incvReward);
        }
    };

    useEffect(() => {
        let updateInfoIntervalId = null;

        if (accountContext.account) {
            initPoolData();
            clearInterval(updateInfoIntervalId);
            updateInfoIntervalId = setInterval(updateInfo, 1000);
        }

        return () => {
            clearInterval(updateInfoIntervalId);
        };
    }, [accountContext.account]);

    return (
        <div className={classes.RoomLpStake}>
            {stats && (
                <div className={classes.Info}>
                    {stats.roomTotalLockedValue && (
                        <div>
                            This pool has a total of{" "}
                            <span>
                                {numeral(stats.roomTotalLockedValue).format(
                                    "$0,0.00"
                                )}
                            </span>{" "}
                            locked value
                        </div>
                    )}
                    {stats.roomTotalLiquidity && (
                        <div>
                            OptionRoom has a total of{" "}
                            <span>
                                {numeral(stats.roomTotalLiquidity).format(
                                    "$0,0.00"
                                )}
                            </span>{" "}
                            in liquidity
                        </div>
                    )}
                    {stats.roomApy && (
                        <div>
                            <b>
                                Current APY{" "}
                                <span>
                                    {numeral(stats.roomApy / 100).format("0%")}
                                </span>
                            </b>
                        </div>
                    )}
                </div>
            )}

            <div className={classes.RoomLpStake__Cards}>
                {isIncvPool() && (
                    <div className={classes.EarnCard} key={"ROOM-Earned2"}>
                        <div className={classes.EarnCard__Icon}>
                            <img
                                width={"100%"}
                                src={getPoolConfig(source, pool).earnedTokenImg}
                            />
                        </div>
                        <div className={classes.EarnCard__Title}>
                            {convertAmountToTokens(userFarmedIncvTokenBalance)}
                        </div>
                        <div
                            className={`${classes.EarnCard__SubTitle} ${classes.EarnCard__SubTitleIncv}`}
                        >
                            Unlocked on{" "}
                            {incvRewardInfo &&
                                timeConverter(
                                    incvRewardInfo.incvRewardLockTime
                                )}
                        </div>
                        <div className={classes.EarnCard__Action}>
                            <Button
                                classes={classes.EarnCard__Action__Btn}
                                isDisabled={
                                    (incvRewardInfo &&
                                        incvRewardInfo.incvRewardLockTime &&
                                        incvRewardInfo.incvRewardLockTime *
                                            1000 >
                                            new Date().getTime()) ||
                                    userFarmedIncvTokenBalance == 0
                                }
                                isProcessing={isIncvHarvestInProgress}
                                size={"large"}
                                fullWidth={true}
                                color="primary"
                                onClick={handleIncvHarvest}
                            >
                                Claim
                            </Button>
                        </div>
                    </div>
                )}
                {!isIncvPool() && (
                    <div className={classes.EarnCard} key={"ROOM-Earned"}>
                        <div className={classes.EarnCard__Icon}>
                            <img
                                width={"100%"}
                                src={getPoolConfig(source, pool).earnedTokenImg}
                            />
                        </div>
                        <div className={classes.EarnCard__Title}>
                            {convertAmountToTokens(userFarmedTokenBalance)}
                        </div>
                        <div className={classes.EarnCard__SubTitle}>
                            {getPoolConfig(source, pool).earnedTokenName}
                        </div>
                        <div className={classes.EarnCard__Action}>
                            <Button
                                classes={classes.EarnCard__Action__Btn}
                                isDisabled={userFarmedTokenBalance == 0}
                                isProcessing={isHarvestInProgress}
                                size={"large"}
                                fullWidth={true}
                                color="primary"
                                onClick={handleHarvest}
                            >
                                Claim
                            </Button>
                        </div>
                    </div>
                )}
                <div className={classes.EarnCard} key={"Staked-RoomLP"}>
                    <div className={classes.EarnCard__Icon}>
                        <img
                            width={"100%"}
                            src={getPoolConfig(source, pool).stakeTokenImg}
                        />
                    </div>
                    <div className={classes.EarnCard__Title}>
                        {convertAmountToTokens(userDepositTokenStakedBalance)}
                    </div>
                    <div className={classes.EarnCard__SubTitle}>
                        {getPoolConfig(source, pool).stakeTokenTitle}
                    </div>
                    <div
                        className={clsx(classes.EarnCard__Action, {
                            [classes.EarnCard__Action_Two]:
                                userDepositTokenAllowance > 0 &&
                                userDepositTokenStakedBalance > 0,
                        })}
                    >
                        {userDepositTokenAllowance <= 0 && (
                            <Button
                                size={"large"}
                                color="primary"
                                onClick={handleApproveDepositToken}
                                className={classes.EarnCard__Action__Btn}
                                fullWidth={true}
                                isProcessing={isApproveProcessing}
                            >
                                Approve
                            </Button>
                        )}
                        {userDepositTokenAllowance > 0 &&
                            userDepositTokenStakedBalance > 0 && (
                                <>
                                    <Button
                                        className={
                                            classes.EarnCard__Action__Btn
                                        }
                                        size={"large"}
                                        color="primary"
                                        isDisabled={
                                            userDepositTokenStakedBalance == 0
                                        }
                                        onClick={openUnstakeModal}
                                    >
                                        Unstake
                                    </Button>
                                    <Button
                                        className={
                                            classes.EarnCard__Action__Btn_Add
                                        }
                                        color={"black"}
                                        size={"large"}
                                        onClick={() =>
                                            setIsDepositModalOpen(true)
                                        }
                                    >
                                        <AddIcon
                                            className={
                                                classes.EarnCard__Action__Btn_Add__Icon
                                            }
                                        ></AddIcon>
                                    </Button>
                                </>
                            )}
                        {userDepositTokenAllowance > 0 &&
                            userDepositTokenStakedBalance == 0 && (
                                <Button
                                    size={"large"}
                                    color="primary"
                                    onClick={() => setIsDepositModalOpen(true)}
                                    className={classes.EarnCard__Action__Btn}
                                    fullWidth={true}
                                >
                                    Stake
                                </Button>
                            )}
                    </div>
                </div>
                <DepositModal
                    open={isDepositModalOpen}
                    onClose={() => setIsDepositModalOpen(false)}
                    onStake={handleOnStake}
                    userRoomLPTokens={userDepositTokenBalance}
                    source={source}
                    pool={pool}
                />
                <UnstakeModal
                    open={isUnstakeModalOpen}
                    onClose={() => setIsUnstakeModalOpen(false)}
                    onUnStake={handleOnUnStake}
                    stakedTokensBalance={userDepositTokenStakedBalance}
                    source={source}
                    pool={pool}
                />
            </div>
        </div>
    );
}

export default RoomLpStake;
