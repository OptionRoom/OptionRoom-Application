import React from 'react';
import clsx from 'clsx';
import {get} from 'lodash';
import {useState, useContext} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import {
    Link,
} from "react-router-dom";
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
        market
    } = props;

    const accountContext = useContext(AccountContext);

    return (
        <div className={classes.MarketCard}>
            <div className={classes.AvatarWrap}>
                <div className={classes.Avatar} style={{
                    backgroundImage: `url(${get(market, ['image'])})`
                }}></div>
            </div>
            <div className={classes.Details}>
                <div className={classes.Details__Header}>
                    <div className={classes.Cat}>{get(market, ['category', 'label'])}</div>
                    {
                        /**
                         <div className={classes.Resolve}>Resolved</div>

                         */
                    }
                </div>
                <Link className={classes.Title}
                      to={`/markets/${get(market, ['id'])}`}>{get(market, ['title'])}</Link>
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
                            <span className={classes.Option__Value}>$2,145,215</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketCard;
