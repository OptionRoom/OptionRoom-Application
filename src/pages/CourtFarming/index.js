import React, { useContext, useEffect, useState, createRef } from 'react';
import {Link} from 'react-router-dom';
import clsx from "clsx";

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import ConnectButton from '../../components/ConnectButton';
import RoomLpStake from '../../components/RoomLpStake';
import NftStake from '../../components/NftStake';

import { useStyles } from './styles';
import { AccountContext } from "../../shared/AccountContextProvider";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import room_icon from "../../assets/room.svg";
import ht_icon from "../../assets/ht_icon.png";
import courtTokenIconImg from "../../assets/court.svg";
import courtEthLpIconImg from "../../assets/courtethlp.png";
import eth_icon from "../../assets/eth.svg";
import matter_icon from "../../assets/matter_icon.png";

function CourtFarming() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme('primary');
    const pools = [
        {
            id: "ROOM_COURT",
            title: "Deposit ROOM",
            decs: "Earn COURT",
            link: "/court-farming/court-room",
            icons: [room_icon],
        },
        {
            id: "ROOM_ETH_LP_EARN_COURT",
            title: "Deposit ROOM-ETH LP",
            decs: "Earn COURT",
            link: "/court-farming/court-roomethlp",
            icons: [room_icon, eth_icon],
        },
        {
            id: "HT_COURT",
            title: "Deposit HT",
            decs: "Earn COURT",
            link: "/court-farming/court-ht",
            icons: [ht_icon],
        },
        {
            id: "MATTER_COURT",
            title: "Deposit MATTER",
            decs: "Earn COURT",
            link: "/court-farming/court-matter",
            icons: [matter_icon],
        },
        /*         {
            id: "COURT_ETH_LP_EARN_COURT",
            title: "Deposit COURT-ETH LP",
            decs: "Earn COURT",
            link: "/court-farming/court-courtethlp",
            icons: [courtTokenIconImg, eth_icon],
        }, */
    ];

    return (
        <>
            <Navbar
                title={"Liquidity Farming"}
                details={
                    "Earn COURT tokens by providing liquidity to one of the pools on this page."
                }
            />

            <div className={classes.LiquidityMiningPage}>
                {accountContext.account && (
                    <>
                        <div className={classes.Pools}>
                            {pools.map((pool) => (
                                <div
                                    className={classes.Pool}
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
                                                <img src={icon} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={classes.Pool__Title}>
                                        {pool.title}
                                    </div>
                                    <div className={classes.Pool__Action}>
                                        <Link
                                            to={pool.link}
                                            className={
                                                classes.Pool__Action__Link
                                            }
                                        >
                                            <Button
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
