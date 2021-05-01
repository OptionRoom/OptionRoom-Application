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
        </div>
    );
}

export default Navbar;
