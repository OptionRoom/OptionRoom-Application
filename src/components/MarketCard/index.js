import React from 'react';
import clsx from 'clsx';
import {useState, useContext} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import {useStyles} from './styles'
import ConnectButton from '../ConnectButton';
import {AccountContext} from '../../shared/AccountContextProvider';
import {OptionroomThemeContext} from '../../shared/OptionroomThemeContextProvider';
import {
    ellipseAddress,
    getAddressImgUrl
} from '../../shared/helper';
import Button from "../Button";

function MarketCard(props) {

    const classes = useStyles();
    const {
        title,
        details
    } = props;
    const accountContext = useContext(AccountContext);

    return (
        <div className={classes.MarketCard}>
            <div className={classes.AvatarWrap}>
                <div className={classes.Avatar}></div>
            </div>
            <div className={classes.Details}>
                <div className={classes.Details__Header}>
                    <div className={classes.Cat}>sports</div>
                    <div className={classes.Resolve}>Resolved</div>
                </div>
                <div className={classes.Title}>
                    Will Andrew Cuomo be Governor of New York on June 1, 2021?
                </div>
                <div className={classes.Details__Footer}>
                    <div className={classes.Volume}>
                        <span className={classes.Volume__Title}>Volume</span>
                        <span className={classes.Volume__Value}>$6,145,215</span>
                    </div>
                    <div className={classes.Options}>
                        <div className={classes.Option}>
                            <span className={classes.Option__Title}>Yes</span>
                            <span className={classes.Option__Value}>$6,145,215</span>
                        </div>
                        <div className={classes.Option}>
                            <span className={classes.Option__Title}>Yes</span>
                            <span className={classes.Option__Value}>$6,145,215</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketCard;
