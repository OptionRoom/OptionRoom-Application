import React, {useContext, useEffect, useState, createRef} from 'react';

import Navbar from '../../components/Navbar';
import NftStake from '../../components/NftStake';
import {useStyles} from './styles';
import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";


function RoomCourtStakePage() {
    const classes = useStyles();
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme('black');

    return (
        <>
            <Navbar title={'NFT Staking'}
                    details={'Earn ROOM by staking you NFT and ROOM tokens together.'}/>
            <div className={classes.RoomCourtStakePage}>
                <NftStake/>
            </div>
        </>
    );
}

export default RoomCourtStakePage;