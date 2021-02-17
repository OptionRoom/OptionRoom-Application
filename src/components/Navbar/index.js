import React from 'react';
import clsx from 'clsx';
import {useState, useContext} from 'react';

import {useStyles} from './styles'
import ConnectButton from '../ConnectButton';
import {AccountContext} from '../../shared/AccountContextProvider';
import {
    ellipseAddress,
    getAddressImgUrl
} from '../../shared/helper';

function Navbar(props) {
    const accountContext = useContext(AccountContext);

    const classes = useStyles();
    const {
        title,
        details
    } = props;

    return (
        <div className={classes.Navbar}>
            <div className={classes.Title}>
                <h1 className={classes.Title__Head}>
                    {title}
                </h1>
                {
                    details && (
                        <div className={classes.Title__Details}>{details}</div>
                    )
                }
            </div>
            <div className={classes.Actions}>
                {
                    accountContext.account && (
                        <div className={classes.AccountHolder}>
                            <div className={classes.AccountHolder__Image}>
                                <img className={classes.AccountHolder__Image_Image}
                                     src={getAddressImgUrl(accountContext.account)}
                                      width="36px"
                                      height={'36px'}/>
                            </div>
                            <div className={classes.AccountHolder__Details}>
                                <div className={classes.AccountHolder__Details__Address}>
                                    {ellipseAddress(accountContext.account)}
                                </div>
                                <div className={classes.AccountHolder__Details__Disconnect}
                                     onClick={accountContext.disconnect}>
                                    Disconnect
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    !accountContext.account && (
                        <ConnectButton/>
                    )
                }
            </div>
        </div>
    );
}

export default Navbar;
