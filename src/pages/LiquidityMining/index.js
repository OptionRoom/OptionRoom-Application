import React, {useContext, useEffect, useState, createRef} from 'react';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import ConnectButton from '../../components/ConnectButton';
import RoomLpStake from '../../components/RoomLpStake';
import NftStake from '../../components/NftStake';

import {useStyles} from './styles';
import {AccountContext} from "../../shared/AccountContextProvider";

function LiquidityMining() {
    const classes = useStyles();

    const [currentView, setCurrentView] = useState('ROOM_ETH_LP');
    const accountContext = useContext(AccountContext);
    accountContext.changeTheme('primary');
    const pools = [
        {
            id: "ROOM_ETH_LP",
            title: 'Deposit ROOM-ETH LP',
            decs: 'Earn ROOM'
        } ,
        {
            id: "NftStake",
            title: 'Deposit ROOM-NFT',
            decs: 'Earn ROOM'
        }
    ];

    return (
        <>
            <Navbar title={'Liquidity Farming'}
                    details={'Earn ROOM tokens by providing liquidity to the ROOM/ETH pair on Uniswap and staking your LP tokens on this page.'}/>

            <div className={classes.LiquidityMiningPage}>
                {
                    accountContext.account && (
                        <>
                            <div className={classes.Pools}>
                                {
                                    currentView === 'POOLS' && (
                                        pools.map((pool) => (
                                            <div className={classes.Pool}
                                                 key={`Pool-${pool.id}`}>
                                                <div className={classes.Pool__Icon}></div>
                                                <div className={classes.Pool__Title}>
                                                    {pool.title}
                                                </div>
                                                <div className={classes.Pool__Action}>
                                                    <Button className={classes.Pool__Action__Btn}
                                                            color="primary"
                                                            size={'large'}
                                                            fullWidth={true}
                                                            onClick={() => {
                                                                setCurrentView(pool.id);
                                                            }}>
                                                        {pool.decs}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                                {
                                    currentView === 'ROOM_ETH_LP' && (
                                        <>
                                            <RoomLpStake/>
                                        </>
                                    )
                                }
                                {
                                    currentView === 'NftStake' && (
                                        <>
                                            <NftStake/>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    )
                }
                {
                    !accountContext.account && (
                        <div className={classes.ConnectWrap}>
                            <ConnectButton/>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default LiquidityMining;
