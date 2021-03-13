import React, { useContext, useEffect, useState, createRef } from "react";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import ConnectButton from "../../components/ConnectButton";
import RoomLpStake from "../../components/RoomLpStake";
import NftStake from "../../components/NftStake";

import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";

const getPageConfig = (source, pool) => {
    if (source === "room" && pool === "CourtFarming_RoomStake") {
        return {
            title: "COURT Farming",
            details:
                "Earn COURT tokens by staking your ROOM tokens on this page.",
        };
    }

    if (source === "ht" && pool === "CourtFarming_HtStake") {
        return {
            title: "COURT Farming",
            details:
                "Earn COURT tokens by staking your HT tokens on this page.",
        };
    }

    if (source === "matter" && pool === "CourtFarming_MatterStake") {
        return {
            title: "COURT Farming",
            details:
                "Earn COURT tokens by staking your MATTER tokens on this page.",
        };
    }

    if (source === "room_eth_lp" && pool === "RoomFarming_RoomEthLpStake") {
        return {
            title: "Liquidity Farming",
            details:
                "Earn ROOM tokens by providing liquidity to the ROOM/ETH pair on Uniswap and staking your LP tokens on this page.",
        };
    }

    if (source === "room_eth_lp" && pool === "CourtFarming_RoomEthLpStake") {
        return {
            title: "COURT Farming",
            details:
                "Earn COURT tokens by providing liquidity to the ROOM/ETH pair on Uniswap and staking your LP tokens on this page.",
        };
    }

    if (source === "court_eth_lp" && pool === "CourtFarming_CourtEthLpStake") {
        return {
            title: "COURT Farming",
            details:
                "Earn COURT tokens by providing liquidity to the COURT/ETH pair on Uniswap and staking your LP tokens on this page.",
        };
    }
};

function FarminPoolPage(props) {
    const classes = useStyles();
    const { source, pool } = props;
    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");

    return (
        <>
            <Navbar
                title={getPageConfig(source, pool).title}
                details={getPageConfig(source, pool).details}
            />

            <div className={classes.LiquidityMiningPage}>
                {accountContext.account && (
                    <>
                        <div className={classes.Pools}>
                            <RoomLpStake source={source} pool={pool} />
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

export default FarminPoolPage;
