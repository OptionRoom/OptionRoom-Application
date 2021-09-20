import React from "react";
import Alert from '@material-ui/lab/Alert';

import { useStyles } from "./styles";

function ChainAlert(props) {
    const classes = useStyles();

    return (
        <div className={classes.ChainWrap}>
            <Alert
                elevation={6}
                variant="filled"
                style={{
                    maxWidth: '500px',
                    margin: '0 auto 15px'
                }}
                severity="error">
                Unsupported chain, supported chains are: {props.supportedChain || '56 (BSC)'}. How? check <a href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank">here</a>
            </Alert>
        </div>
    );
}

export default ChainAlert;
