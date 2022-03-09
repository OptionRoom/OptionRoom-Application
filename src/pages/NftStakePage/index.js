import React from 'react';

import Navbar from '../../components/Navbar';
import NftStake from '../../components/NftStake';
import {useStyles} from './styles';


function NftStakePage() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.NftStakePage}>
                <Navbar title={'NFT Staking'}
                        details={'Earn ROOM by staking your NFT and ROOM tokens together.'}/>
                <NftStake/>
            </div>
        </>
    );
}

export default NftStakePage;
