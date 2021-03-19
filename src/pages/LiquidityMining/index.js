import React, { useContext, useEffect, useState, createRef } from 'react';
import {Link} from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import ConnectButton from '../../components/ConnectButton';
import RoomLpStake from '../../components/RoomLpStake';
import NftStake from '../../components/NftStake';

import { useStyles } from './styles';
import { AccountContext } from "../../shared/AccountContextProvider";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";

function LiquidityMining() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme('primary');
    const pools = [
        {
            id: "ROOM_ETH_LP",
            title: 'Deposit ROOM-ETH LP',
            decs: 'Earn ROOM',
            link: '/liquidity-farming/room-roomethlp',
        },
        {
            id: "ROOM_COURT",
            title: 'Deposit ROOM',
            decs: 'Earn COURT',
            link: '/liquidity-farming/court-room',
        },
        {
            id: "ROOM_ETH_LP_EARN_COURT",
            title: 'Deposit ROOM-ETH LP',
            decs: 'Earn COURT',
            link: '/liquidity-farming/court-roomethlp',
        },
        {
            id: "COURT_ETH_LP_EARN_COURT",
            title: 'Deposit COURT-ETH LP',
            decs: 'Earn COURT',
            link: '/liquidity-farming/court-courtethlp',
        }
    ];

    return (
        <>
            <Navbar title={'Liquidity Farming'}
                details={'Earn ROOM tokens by providing liquidity to the ROOM/ETH pair on Uniswap and staking your LP tokens on this page.'} />

            <div className={classes.LiquidityMiningPage}>
                {
                    accountContext.account && (
                        <>
                            <div className={classes.Pools}>
                                {
                                    pools.map((pool) => (
                                        <div className={classes.Pool}
                                            key={`Pool-${pool.id}`}>
                                            <div className={classes.Pool__Icon}></div>
                                            <div className={classes.Pool__Title}>
                                                {pool.title}
                                            </div>
                                            <div className={classes.Pool__Action}>
                                                <Link to={pool.link}
                                                 className={classes.Pool__Action__Link}>
                                                    <Button
                                                        color="primary"
                                                        size={'large'}
                                                        fullWidth={true}>
                                                        {pool.decs}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
                {
                    !accountContext.account && (
                        <div className={classes.ConnectWrap}>
                            <ConnectButton />
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default LiquidityMining;
