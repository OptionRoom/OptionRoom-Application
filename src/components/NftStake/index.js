import React, { useEffect } from "react";
import clsx from "clsx";
import numeral from "numeral";

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { convertAmountToTokens } from "../../shared/helper";
import Button from "../Button";
import AddIcon from "@material-ui/icons/Add";
import DepositModal from "../DepositModal";
import UnstakeModal from "../UnstakeModal";
import RoomLPFarmingAPIs from "../../shared/contracts/RoomLPFarmingAPIs";
import CourtAPIs from "../../shared/contracts/CourtAPIs";
import swal from "sweetalert";
import { AccountContext } from "../../shared/AccountContextProvider";

import { nftTires, nftImages } from "../../shared/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConnectButton from "../ConnectButton";
import RoomIcon from "../../assets/room-icon.png";
import Room2Icon from "../../assets/room2.png";
import { getTotalValueStakedInNftStakingInUsd } from "../../shared/contracts/PoolsStatsAPIs";
import Alert from "@material-ui/lab/Alert";

function NftStake(props) {
    const accountContext = useContext(AccountContext);
    const classes = useStyles();
    const [isIniting, setIsIniting] = useState(true);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
    const [isHarvestInProgress, setIsHarvestInProgress] = useState(false);

    const [farmedRoomTokens, setFarmedRoomTokens] = useState(0);
    const [
        stackedRoomTokensWithNftStakeContract,
        setStackedRoomTokensWithNftStakeContract,
    ] = useState(0);

    const [
        isRoomTokenApprovedForNftStakeContract,
        setIsRoomTokenApprovedForNftStakeContract,
    ] = useState(false);
    const [
        isNftTokenApprovedForNftStakeContract,
        setIsNftTokenApprovedForNftStakeContract,
    ] = useState(false);

    const [
        isApprovingRoomTokenForNftStakeContract,
        setIsApprovingRoomTokenForNftStakeContract,
    ] = useState(false);
    const [
        isApprovingNftTokenForNftStakeContract,
        setIsApprovingNftTokenForNftStakeContract,
    ] = useState(false);

    const [userRoomTokenBalance, setUserRoomTokenBalance] = useState(0);
    const [userCurrentNftTire, setUserCurrentNftTire] = useState(-1);
    const [poolStats, setPoolStats] = useState({});

    const findUserCurrentNftTire = (
        userNftTireBalance,
        userNftStakeTireBalance
    ) => {
        if (userNftStakeTireBalance["4"] > 0) {
            return 4;
        }

        if (userNftStakeTireBalance["3"] > 0) {
            return 3;
        }

        if (userNftStakeTireBalance["2"] > 0) {
            return 2;
        }

        if (userNftStakeTireBalance["1"] > 0) {
            return 1;
        }

        if (userNftStakeTireBalance["0"] > 0) {
            return 0;
        }

        if (userNftTireBalance["4"] > 0) {
            return 4;
        }

        if (userNftTireBalance["3"] > 0) {
            return 3;
        }

        if (userNftTireBalance["2"] > 0) {
            return 2;
        }

        if (userNftTireBalance["1"] > 0) {
            return 1;
        }

        if (userNftTireBalance["0"] > 0) {
            return 0;
        }

        return -1;
    };

    const checkApproval = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        //Check if room is approved for nft stake contract
        const userRoomTokenAllowanceBalanceForNftStakeContract = await roomLPFarmingAPIs.getUserRoomTokenAllowanceBalanceForNftStakeContract(
            accountContext.account
        );
        if (userRoomTokenAllowanceBalanceForNftStakeContract > 0) {
            setIsRoomTokenApprovedForNftStakeContract(true);
        }

        const isNftTokenApprovedForNftStakeContract = await roomLPFarmingAPIs.isNftTokenApprovedForNftStakeContract(
            accountContext.account
        );

        setIsNftTokenApprovedForNftStakeContract(
            isNftTokenApprovedForNftStakeContract
        );
    };

    const loadCurrentUserNftTire = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        const UserNftTireBalance = await loadUserNftTireBalance(
            roomLPFarmingAPIs
        );
        const UserNftStakeTireBalance = await loadUserNftStakeTireBalance(
            roomLPFarmingAPIs
        );

        const userCurrentNftTire = findUserCurrentNftTire(
            UserNftTireBalance,
            UserNftStakeTireBalance
        );

        setUserCurrentNftTire(userCurrentNftTire);

        return userCurrentNftTire;
    };

    const initRoomLPPoolData = async () => {
        checkApproval();
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        //Get room tokens balance of a user
        const courtAPIs = new CourtAPIs();
        const userRoomBalance = await courtAPIs.getAddressTokenBalance(
            accountContext.account,
            "room"
        );
        setUserRoomTokenBalance(userRoomBalance);

        const userCurrentNftTire = await loadCurrentUserNftTire();
        if (userCurrentNftTire !== -1) {
            const stakedRoomTokensWithNftStakeContract = await roomLPFarmingAPIs.getUserNftStakeBalanceOfTire(
                accountContext.account,
                userCurrentNftTire
            );
            setStackedRoomTokensWithNftStakeContract(
                stakedRoomTokensWithNftStakeContract
            );
        }
    };

    const openUnstakeModal = () => {
        setIsUnstakeModalOpen(true);
    };

    const handleOnStake = async () => {
        initRoomLPPoolData();
    };

    const handleOnUnStake = async () => {
        initRoomLPPoolData();
    };

    const loadUserNftTireBalance = async (roomLPFarmingAPIs) => {
        const data = {};
        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getUserNftTokenBalanceOfTire(
                accountContext.account,
                nftTire
            );
            data[nftTire] = parseInt(res);
        }

        return data;
    };

    const loadUserNftStakeTireBalance = async (roomLPFarmingAPIs) => {
        const data = {};
        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getUserNftStakeBalanceOfTire(
                accountContext.account,
                nftTire
            );
            data[nftTire] = parseInt(res);
        }

        return data;
    };

    const handleApprovingRoomTokenForNftStakeContract = async () => {
        setIsApprovingRoomTokenForNftStakeContract(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs();
            await roomLPFarmingAPIs.approveUserRoomTokenForNftStakeContract(
                accountContext.account
            );
            setIsApprovingRoomTokenForNftStakeContract(true);
            setIsRoomTokenApprovedForNftStakeContract(true);
        } catch (e) {
        } finally {
            setIsApprovingRoomTokenForNftStakeContract(false);
        }
    };

    const handleApprovingNftTokenForNftTokenContract = async () => {
        setIsApprovingNftTokenForNftStakeContract(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs();
            await roomLPFarmingAPIs.approveUserNftTokenForNftStakeContract(
                accountContext.account
            );
            setIsApprovingNftTokenForNftStakeContract(true);
            setIsNftTokenApprovedForNftStakeContract(true);
        } catch (e) {
        } finally {
            setIsApprovingNftTokenForNftStakeContract(false);
        }
    };

    const handleHarvest = async () => {
        setIsHarvestInProgress(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs();
            await roomLPFarmingAPIs.claimNftStakeContractRewardsForTire(
                accountContext.account,
                userCurrentNftTire
            );
            const resultFarmedRoomTokens = await roomLPFarmingAPIs.getUserNftStakeRewardsBalanceOfTire(
                accountContext.account,
                userCurrentNftTire
            );
            setFarmedRoomTokens(resultFarmedRoomTokens);
        } catch (e) {
        } finally {
            setIsHarvestInProgress(false);
        }
    };

    const handleShowDepositModal = async () => {
        if (userRoomTokenBalance === 0) {
            swal(
                "Insufficient funds",
                `You must hold at least 1 ROOM Tokens`,
                "error"
            );
            return;
        }

        setIsDepositModalOpen(true);
    };

    const updateInfo = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();
        const pool0__staked = await getTotalValueStakedInNftStakingInUsd(
            accountContext.account,
            0
        );
        const pool1__staked = await getTotalValueStakedInNftStakingInUsd(
            accountContext.account,
            1
        );
        const pool2__staked = await getTotalValueStakedInNftStakingInUsd(
            accountContext.account,
            2
        );
        const pool3__staked = await getTotalValueStakedInNftStakingInUsd(
            accountContext.account,
            3
        );
        const pool4__staked = await getTotalValueStakedInNftStakingInUsd(
            accountContext.account,
            4
        );

        setPoolStats({
            0: pool0__staked,
            1: pool1__staked,
            2: pool2__staked,
            3: pool3__staked,
            4: pool4__staked,
        });
    };

    const updateStakedTokens = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        if (userCurrentNftTire !== -1) {
            const resultFarmedRoomTokens = await roomLPFarmingAPIs.getUserNftStakeRewardsBalanceOfTire(
                accountContext.account,
                userCurrentNftTire
            );
            setFarmedRoomTokens(resultFarmedRoomTokens);
        }
    }

    useEffect(() => {
        let updateInfoIntervalId = null;

        const init = async () => {
            clearInterval(updateInfoIntervalId);
            setIsIniting(true);
            await initRoomLPPoolData();
            setIsIniting(false);
            updateInfoIntervalId = setInterval(() => {
                updateInfo();
            }, 1000);
        };

        if (accountContext.account && accountContext.isChain('main')) {
            init();
        }

        return () => {
            clearInterval(updateInfoIntervalId);
        };
    }, [accountContext.account, accountContext.chainId]);

    useEffect(() => {
        let updateStakedTokensIntervalId = null;

        const init = async () => {
            clearInterval(updateStakedTokensIntervalId);
            updateStakedTokensIntervalId = setInterval(() => {
                updateStakedTokens();
            }, 1000);
        };

        if (accountContext.account && userCurrentNftTire != -1 && accountContext.isChain('main')) {
            init();
        }

        return () => {
            clearInterval(updateStakedTokensIntervalId);
        };
    }, [accountContext.account, userCurrentNftTire, accountContext.chainId]);

    return (
        <div className={classes.RoomLpStake}>
            {!accountContext.account && (
                <div className={classes.ConnectWrap}>
                    <ConnectButton />
                </div>
            )}
            {accountContext.account && (
                <>
                    {
                        !accountContext.isChain('main') && (
                            <Alert
                                elevation={6}
                                variant="filled"
                                style={{
                                    maxWidth: '500px',
                                    margin: '0 auto 15px'
                                }}
                                severity="error">Unsupported chain, supported chains are: 1 (Ethereum Mainnet)</Alert>
                        )
                    }
                    {isIniting && (
                        <div className={classes.IsInitingWrap}>
                            <CircularProgress />
                        </div>
                    )}
                    {!isIniting && (
                        <>
                            {userCurrentNftTire === -1 && (
                                <div className={classes.buyNftWrap}>
                                    <Link to="/nft" className={classes.buyNft}>
                                        Get NFTs to stake
                                    </Link>
                                </div>
                            )}
                            {userCurrentNftTire !== -1 && (
                                <>
                                    {poolStats && poolStats["0"] && (
                                        <div className={classes.Stats}>
                                            <div>
                                                Total value staked:{" "}
                                                {numeral(
                                                    poolStats["0"]
                                                        .totalStakedValue +
                                                        poolStats["1"]
                                                            .totalStakedValue +
                                                        poolStats["2"]
                                                            .totalStakedValue +
                                                        poolStats["3"]
                                                            .totalStakedValue +
                                                        poolStats["4"]
                                                            .totalStakedValue
                                                ).format("$0,0.00")}
                                            </div>
                                            <div>
                                                <b>
                                                    APY:{" "}
                                                    {numeral(
                                                        poolStats[
                                                            userCurrentNftTire
                                                        ].apy / 100
                                                    ).format("0%")}
                                                </b>
                                            </div>
                                        </div>
                                    )}
                                    <div className={classes.NftImgWrap}>
                                        <img
                                            src={nftImages[userCurrentNftTire]}
                                        />
                                    </div>
                                    <div className={classes.StakeCards}>
                                        <div
                                            className={classes.EarnCard}
                                            key={"ROOM-Earned"}
                                        >
                                            <div
                                                className={
                                                    classes.EarnCard__Icon
                                                }
                                            >
                                                <img
                                                    src={RoomIcon}
                                                    width={"100%"}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    classes.EarnCard__Title
                                                }
                                            >
                                                {convertAmountToTokens(
                                                    farmedRoomTokens
                                                )}
                                            </div>
                                            <div
                                                className={
                                                    classes.EarnCard__SubTitle
                                                }
                                            >
                                                ROOM Earned
                                            </div>
                                            <div
                                                className={
                                                    classes.EarnCard__Action
                                                }
                                            >
                                                <Button
                                                    classes={
                                                        classes.EarnCard__Action__Btn
                                                    }
                                                    isDisabled={
                                                        farmedRoomTokens == 0
                                                    }
                                                    isProcessing={
                                                        isHarvestInProgress
                                                    }
                                                    size={"large"}
                                                    fullWidth={true}
                                                    color="primary"
                                                    onClick={handleHarvest}
                                                >
                                                    Claim
                                                </Button>
                                            </div>
                                        </div>
                                        <div
                                            className={classes.EarnCard}
                                            key={"Staked-RoomLP"}
                                        >
                                            <div
                                                className={
                                                    classes.EarnCard__Icon
                                                }
                                            >
                                                <img
                                                    src={Room2Icon}
                                                    width={"100%"}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    classes.EarnCard__Title
                                                }
                                            >
                                                {convertAmountToTokens(
                                                    stackedRoomTokensWithNftStakeContract
                                                )}
                                            </div>
                                            <div
                                                className={
                                                    classes.EarnCard__SubTitle
                                                }
                                            >
                                                Staked Tokens
                                            </div>
                                            <div
                                                className={clsx(
                                                    classes.EarnCard__Action,
                                                    {
                                                        [classes.EarnCard__Action_Two]:
                                                            isRoomTokenApprovedForNftStakeContract &&
                                                            isNftTokenApprovedForNftStakeContract &&
                                                            stackedRoomTokensWithNftStakeContract >
                                                                0,
                                                    }
                                                )}
                                            >
                                                {isRoomTokenApprovedForNftStakeContract &&
                                                    isNftTokenApprovedForNftStakeContract && (
                                                        <>
                                                            {stackedRoomTokensWithNftStakeContract >
                                                                0 && (
                                                                <>
                                                                    <Button
                                                                        className={
                                                                            classes.EarnCard__Action__Btn
                                                                        }
                                                                        size={
                                                                            "large"
                                                                        }
                                                                        color="primary"
                                                                        isDisabled={
                                                                            stackedRoomTokensWithNftStakeContract ==
                                                                            0
                                                                        }
                                                                        onClick={
                                                                            openUnstakeModal
                                                                        }
                                                                    >
                                                                        Unstake
                                                                    </Button>
                                                                    <Button
                                                                        className={
                                                                            classes.EarnCard__Action__Btn_Add
                                                                        }
                                                                        size={
                                                                            "large"
                                                                        }
                                                                        onClick={
                                                                            handleShowDepositModal
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
                                                            {stackedRoomTokensWithNftStakeContract ==
                                                                0 && (
                                                                <Button
                                                                    size={
                                                                        "large"
                                                                    }
                                                                    color="primary"
                                                                    onClick={
                                                                        handleShowDepositModal
                                                                    }
                                                                    className={
                                                                        classes.EarnCard__Action__Btn
                                                                    }
                                                                    fullWidth={
                                                                        true
                                                                    }
                                                                >
                                                                    Stake
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                {!isRoomTokenApprovedForNftStakeContract ? (
                                                    <Button
                                                        size={"large"}
                                                        color="primary"
                                                        onClick={
                                                            handleApprovingRoomTokenForNftStakeContract
                                                        }
                                                        className={
                                                            classes.EarnCard__Action__Btn
                                                        }
                                                        fullWidth={true}
                                                        isProcessing={
                                                            isApprovingRoomTokenForNftStakeContract
                                                        }
                                                    >
                                                        Approve ROOM
                                                    </Button>
                                                ) : !isNftTokenApprovedForNftStakeContract ? (
                                                    <Button
                                                        size={"large"}
                                                        color="primary"
                                                        onClick={
                                                            handleApprovingNftTokenForNftTokenContract
                                                        }
                                                        className={
                                                            classes.EarnCard__Action__Btn
                                                        }
                                                        fullWidth={true}
                                                        isProcessing={
                                                            isApprovingNftTokenForNftStakeContract
                                                        }
                                                    >
                                                        Approve NFT
                                                    </Button>
                                                ) : null}
                                            </div>
                                        </div>
                                        <DepositModal
                                            open={isDepositModalOpen}
                                            onClose={() =>
                                                setIsDepositModalOpen(false)
                                            }
                                            onStake={handleOnStake}
                                            userRoomLPTokens={
                                                userRoomTokenBalance
                                            }
                                            nftTire={userCurrentNftTire}
                                            type={"nftStake"}
                                        />
                                        <UnstakeModal
                                            open={isUnstakeModalOpen}
                                            onClose={() =>
                                                setIsUnstakeModalOpen(false)
                                            }
                                            onUnStake={handleOnUnStake}
                                            stakedTokensBalance={
                                                stackedRoomTokensWithNftStakeContract
                                            }
                                            nftTire={userCurrentNftTire}
                                            type={"nftStake"}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default NftStake;
