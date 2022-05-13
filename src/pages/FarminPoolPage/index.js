import React, { useContext, useEffect, useState, createRef } from "react";
import Alert from '@material-ui/lab/Alert';

import Navbar from "../../components/Navbar";
import ConnectButton from "../../components/ConnectButton";
import RoomLpStake from "../../components/RoomLpStake";

import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import {ChainNetworks} from "../../shared/constants";

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
    const { source, pool, isDepositEnabled } = props;
    const accountContext = useContext(AccountContext);

    return (
        <>
            <div className={classes.LiquidityMiningPage}>
                <Navbar
                    title={getPageConfig(source, pool).title}
                    details={getPageConfig(source, pool).details}
                />
                {accountContext.account && (
                    <>
                        {
                            !accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN) && (
                                <Alert
                                    elevation={6}
                                    variant="filled"
                                    style={{
                                        maxWidth: '500px',
                                        margin: '0 auto 15px'
                                    }}
                                    severity="error">Unsupported chain, supported chains are: 56 (Smart Chain)</Alert>
                            )
                        }
                        <div className={classes.Pools}>
                            <RoomLpStake source={source}
                            isDepositEnabled={isDepositEnabled}
                            pool={pool} />
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
