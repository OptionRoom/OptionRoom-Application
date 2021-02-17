import React, {useContext} from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

import {useStyles} from './styles'
import {AccountContext} from "../../shared/AccountContextProvider";

function ConnectButton(props) {
    const accountContext = useContext(AccountContext);

    const classes = useStyles();
    const {
        title,
        details
    } = props;

    return (
        <div className={classes.ConnectBtnWrap}>
            <Button className={classes.ConnectBtn}
                    onClick={() => {
                        accountContext.connect();
                    }}
                    variant="contained">Connect Wallet</Button>
        </div>
    );
}

export default ConnectButton;
