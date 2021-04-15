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

function GovernanceCard(props) {

    const classes = useStyles();
    const {
        title,
        details
    } = props;
    const accountContext = useContext(AccountContext);

    return (
        <div className={classes.GovernanceCard}>
            {
                /**
                 <div className={classes.AvatarWrap}>
                 <div className={classes.Avatar}></div>
                 </div>
                 */
            }
            <div className={classes.Details}>
                <div className={classes.Details__Header}>
                    <div className={classes.Cat}>sports</div>
                </div>
                <div className={classes.Title}>
                    Will Andrew Cuomo be Governor of New York on June 1, 2021?
                </div>
                <div className={classes.Description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate elit id lobortis sodales. Aliquam lobortis eu lorem id mattis.</div>
                <div className={classes.Details__Footer}>
                    <div className={classes.PostedDate}>
                        <span className={classes.PostedDate__Title}>Posted</span>
                        <span className={classes.PostedDate__Value}>ARP, 2, 2021</span>
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

export default GovernanceCard;
