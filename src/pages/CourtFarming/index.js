import React, { useContext, useEffect, useState, createRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import numeral from "numeral";
import Alert from '@material-ui/lab/Alert';

import Tooltip from "@material-ui/core/Tooltip";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import ConnectButton from "../../components/ConnectButton";
import InfoModal from "../../components/InfoModal";
import RoomLpStake from "../../components/RoomLpStake";
import NftStake from "../../components/NftStake";

import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import room_icon from "../../assets/room.svg";
import ht_icon from "../../assets/ht_icon.png";
import courtTokenIconImg from "../../assets/court.svg";
import courtEthLpIconImg from "../../assets/courtethlp.png";
import eth_icon from "../../assets/eth.svg";
import matter_icon from "../../assets/matter_icon.png";
import { getTokenPriceInUsd } from "../../shared/contracts/PoolsStatsAPIs";
import CourtAPIs from "../../shared/contracts/CourtAPIs";
import {
    fromWei,
    toWei,
    getOrRemoveRoiOfCourt,
    saveRoiOfCourt,
} from "../../shared/helper";

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

function CourtFarming() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [roiModalPool, setRoiModalPool] = useState(false);
    const [tokenPricesAndRewards, setTokenPricesAndRewards] = useState(false);
    const [
        courtFarmingTotalLockedValue,
        setCourtFarmingTotalLockedValue,
    ] = useState(0);

    const handleShowRoiModal = (pool) => {
        setRoiModalPool(pool.id);
        setIsInfoModalOpen(true);
    };

    const pools = [
        {
            id: "ROOM_COURT",
            title: "Deposit ROOM",
            decs: "Earn COURT",
            link: "/court-farming/court-room",
            icons: [room_icon],
            xUnit: "5x",
        },
        {
            id: "ROOM_ETH_LP_EARN_COURT",
            title: "Deposit ROOM-ETH LP",
            decs: "Earn COURT",
            link: "/court-farming/court-roomethlp",
            icons: [room_icon, eth_icon],
            xUnit: "7x",
        },
        {
            id: "HT_COURT",
            title: "Deposit HT",
            decs: "Earn COURT",
            link: "/court-farming/court-ht",
            icons: [ht_icon],
            xUnit: "1x",
        },
        {
            id: "MATTER_COURT",
            title: "Deposit MATTER",
            decs: "Earn COURT",
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

    const getTokensPerDay = (pool) => {
        if (!tokenPricesAndRewards) {
            return;
        }

        if (pool === "ROOM_COURT") {
            return 238.1;
        }

        if (pool === "ROOM_ETH_LP_EARN_COURT") {
            return 333.33;
        }

        if (pool === "HT_COURT") {
            return 47.62;
        }

        if (pool === "MATTER_COURT") {
            return 47.62;
        }
    };

    const updateLockedValue = async () => {
        const courtAPIs = new CourtAPIs();
        const courtFramingRoomLockedValue = await courtAPIs.getContractLockedValue(
            accountContext.account,
            "CourtFarming_RoomStake"
        );
        const courtFramingRoomEthLpLockedValue = await courtAPIs.getContractLockedValue(
            accountContext.account,
            "CourtFarming_RoomEthLpStake"
        );
        const courtFramingMatterLockedValue = await courtAPIs.getContractLockedValue(
            accountContext.account,
            "CourtFarming_MatterStake"
        );
        const courtFramingHtLockedValue = await courtAPIs.getContractLockedValue(
            accountContext.account,
            "CourtFarming_HtStake"
        );

        setCourtFarmingTotalLockedValue(
            courtFramingRoomLockedValue +
                courtFramingRoomEthLpLockedValue +
                courtFramingMatterLockedValue +
                courtFramingHtLockedValue
        );
    };

    useEffect(() => {
        let updateInfoIntervalId = null;

        async function init() {
            const courtAPIs = new CourtAPIs();
            const roiOfCourt = getOrRemoveRoiOfCourt();
            if (!roiOfCourt) {
                const roomTokenPrice = await getTokenPriceInUsd(
                    accountContext.account,
                    "room"
                );

                const roomTokenPer1000 = 1000 / roomTokenPrice;
                const roomTokensPerDay = await courtAPIs.getExpectedRewardsToday(
                    accountContext.account,
                    "CourtFarming_RoomStake",
                    toWei(roomTokenPer1000)
                );

                let tokenPricesAndRewards = {
                    room: {
                        price: roomTokenPrice,
                        per1000: roomTokenPer1000,
                        tokensPerDay: fromWei(roomTokensPerDay.incvReward),
                    },
                };

                setTokenPricesAndRewards(tokenPricesAndRewards);

                const roomEthLpTokenPrice = await getTokenPriceInUsd(
                    accountContext.account,
                    "room_eth_lp"
                );

                const roomEthLpTokensPer1000 = 1000 / roomEthLpTokenPrice;
                const roomEthLpTokensPerDay = await courtAPIs.getExpectedRewardsToday(
                    accountContext.account,
                    "CourtFarming_RoomEthLpStake",
                    toWei(roomEthLpTokensPer1000)
                );

                tokenPricesAndRewards = {
                    ...tokenPricesAndRewards,
                    room_eth_lp: {
                        price: roomEthLpTokenPrice,
                        per1000: roomEthLpTokensPer1000,
                        tokensPerDay: fromWei(roomEthLpTokensPerDay.incvReward),
                    },
                };

                setTokenPricesAndRewards(tokenPricesAndRewards);

                /*             console.log(
                "roomEthLpTokenPrice",
                roomEthLpTokenPrice,
                roomEthLpTokensPer1000,
                roomEthLpTokensPerDay.incvReward,
                fromWei(roomEthLpTokensPerDay.incvReward)
            ); */

                const htTokenPrice = await getTokenPriceInUsd(
                    accountContext.account,
                    "ht"
                );

                const htTokensPer1000 = 1000 / htTokenPrice;
                const htTokensPerDay = await courtAPIs.getExpectedRewardsToday(
                    accountContext.account,
                    "CourtFarming_HtStake",
                    toWei(htTokensPer1000)
                );

                tokenPricesAndRewards = {
                    ...tokenPricesAndRewards,
                    ht: {
                        price: htTokenPrice,
                        per1000: htTokensPer1000,
                        tokensPerDay: fromWei(htTokensPerDay.incvReward),
                    },
                };

                setTokenPricesAndRewards(tokenPricesAndRewards);

                /*             console.log(
                "htTokenPrice",
                htTokenPrice,
                htTokensPer1000,
                fromWei(htTokensPerDay.incvReward)
            ); */
                const matterTokenPrice = await getTokenPriceInUsd(
                    accountContext.account,
                    "matter"
                );
                const matterTokenPer1000 = 1000 / matterTokenPrice;
                const matterTokensPerDay = await courtAPIs.getExpectedRewardsToday(
                    accountContext.account,
                    "CourtFarming_MatterStake",
                    toWei(matterTokenPer1000)
                );

                tokenPricesAndRewards = {
                    ...tokenPricesAndRewards,
                    matter: {
                        price: matterTokenPrice,
                        per1000: matterTokenPer1000,
                        tokensPerDay: fromWei(matterTokensPerDay.incvReward),
                    },
                };

                setTokenPricesAndRewards(tokenPricesAndRewards);
                /*             console.log(
                    "matterTokenPrice",
                    matterTokenPrice,
                    matterTokenPer1000,
                    fromWei(matterTokensPerDay.incvReward)
                ); */
                saveRoiOfCourt(tokenPricesAndRewards);
            } else {
                setTokenPricesAndRewards(roiOfCourt);
            }
        }

        const initLockedValue = async () => {
            clearInterval(updateInfoIntervalId);
            updateInfoIntervalId = setInterval(updateLockedValue, 1000);
        };

        if (accountContext.account && accountContext.isChain('main')) {
            init();
            initLockedValue();
        }

        return () => {
            clearInterval(updateInfoIntervalId);
        };
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
                        {!!courtFarmingTotalLockedValue && (
                            <div
                                className={classes.CourtFarmingTotalLockedValue}
                            >
                                Court Farming has a total of{" "}
                                <span>
                                    {numeral(
                                        courtFarmingTotalLockedValue
                                    ).format("$0,0.00")}
                                </span>{" "}
                                locked value
                            </div>
                        )}
                        <div className={classes.Pools}>
                            {pools.map((pool) => (
                                <div
                                    className={clsx(classes.Pool, {
                                        [classes.Pool__CustomColor]:
                                            pool.id === "ROOM_COURT" ||
                                            pool.id ===
                                                "ROOM_ETH_LP_EARN_COURT",
                                    })}
                                    key={`Pool-${pool.id}`}
                                >
                                    <div
                                        className={clsx(
                                            classes.Pool__IconWrap,
                                            {
                                                [classes.Pool__IconWrap__Two]:
                                                    pool.icons.length > 1,
                                            }
                                        )}
                                    >
                                        {pool.icons.map((icon, index) => (
                                            <div
                                                key={`PoolIcon-${pool.id}-${index}`}
                                                className={
                                                    classes.Pool__IconWrap
                                                }
                                            >
                                                <div><img src={icon} /></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={classes.Pool__Title}>
                                        {pool.title}
                                    </div>
                                    <div className={classes.Pool__ExtraInfo}>
                                        <div
                                            className={
                                                classes.Pool__ExtraInfo__X
                                            }
                                        >
                                            {pool.xUnit}
                                            <HtmlTooltip
                                                title={
                                                    <React.Fragment>
                                                        The multiplier
                                                        represents the amount of
                                                        COURT rewards each farm
                                                        gets.
                                                        <br />
                                                        <br />
                                                        For example, if a 1x
                                                        farm was getting 1 COURT
                                                        per day, a 7x farm would
                                                        be getting 7 COURT per
                                                        day.
                                                    </React.Fragment>
                                                }
                                            >
                                                <span
                                                    className={
                                                        classes.Pool__ExtraInfo__Details
                                                    }
                                                >
                                                    ?
                                                </span>
                                            </HtmlTooltip>
                                        </div>
                                        <div
                                            className={
                                                classes.Pool__ExtraInfo__ROI
                                            }
                                            onClick={() =>
                                                handleShowRoiModal(pool)
                                            }
                                        >
                                            {getTokensPerDay(pool.id) ? (
                                                `${getTokensPerDay(
                                                    pool.id
                                                )} COURT/D`
                                            ) : (
                                                <Skeleton
                                                    width={30}
                                                    height={10}
                                                />
                                            )}
                                            <span
                                                className={
                                                    classes.Pool__ExtraInfo__Details
                                                }
                                            >
                                                <AttachMoneyIcon />
                                            </span>
                                        </div>
                                    </div>
                                    <div className={classes.Pool__Action}>
                                        <Link
                                            to={pool.link}
                                            className={
                                                classes.Pool__Action__Link
                                            }
                                        >
                                            <Button
                                                className={
                                                    classes.Pool__Action__Link__Btn
                                                }
                                                color="primary"
                                                size={"large"}
                                                fullWidth={true}
                                            >
                                                {pool.decs}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <InfoModal
                            open={isInfoModalOpen}
                            pool={roiModalPool}
                            info={tokenPricesAndRewards}
                            onClose={() => setIsInfoModalOpen(false)}
                        />
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
