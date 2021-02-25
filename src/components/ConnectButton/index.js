import React, {useContext} from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

import {useStyles} from './styles'
import {AccountContext} from "../../shared/AccountContextProvider";
import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";

function ConnectButton(props) {
    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);

    const classes = useStyles();
    const {
        title,
        details
    } = props;

    return (
        <div className={classes.ConnectBtnWrap}>
            <Button
                    className={clsx(classes.ConnectBtn, {
                        [classes.ConnectBtn___Black]: optionroomThemeContext.theme === 'black',
                    })}

                    onClick={() => {
                        accountContext.connect();
                    }}
                    variant="contained">Connect Wallet</Button>
        </div>
    );
}

export default ConnectButton;
