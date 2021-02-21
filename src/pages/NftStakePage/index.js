import React, {useContext, useEffect, useState, createRef} from 'react';

import Navbar from '../../components/Navbar';
import NftStake from '../../components/NftStake';
import {useStyles} from './styles';
import {AccountContext} from "../../shared/AccountContextProvider";


function NftStakePage() {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    accountContext.changeTheme('black');

    return (
        <>
            <Navbar title={'NFT Staking'}
                    details={'Earn ROOM by staking you NFT and ROOM tokens together.'}/>
            <div className={classes.NftStakePage}>
                <NftStake/>
            </div>
        </>
    );
}

export default NftStakePage;
