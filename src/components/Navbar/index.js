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

function Navbar(props) {

    const classes = useStyles();
    const {
        title,
        details
    } = props;
    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);

    return (
        <div className={classes.Navbar}>
            <div className={classes.Title}>
                <h1 className={clsx(classes.Title__Head, {
                    [classes.Title__Head___Black]: optionroomThemeContext.theme === 'black',
                })}>
                    {title}
                </h1>
                {
                    details && (
                        <div className={classes.Title__Details}>{details}</div>
                    )
                }
            </div>
            <div className={classes.Actions}>
                <IconButton aria-label="delete"
                            className={clsx(classes.MenuBtn, {
                                [classes.MenuBtn___Black]: optionroomThemeContext.theme === 'black',
                            })}
                            onClick={() => {
                                optionroomThemeContext.changeSidebarIsOpen(true);
                            }}
                            color="primary">
                    <MenuIcon/>
                </IconButton>
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
                                <div className={clsx(classes.AccountHolder__Details__Address, {
                                         [classes.AccountHolder__Details__Address___Black]: optionroomThemeContext.theme === 'black',
                                     })}
                                >
                                    {ellipseAddress(accountContext.account)}
                                </div>
                                <div className={clsx(classes.AccountHolder__Details__Disconnect, {
                                    [classes.AccountHolder__Details__Disconnect__Black]: optionroomThemeContext.theme === 'black',
                                })}
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
