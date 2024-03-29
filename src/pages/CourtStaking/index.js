import React, {useContext, useEffect, useState, createRef} from "react";
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import ConnectButton from "../../components/ConnectButton";
import CourtVotePowerStaking from "../../components/CourtVotePowerStaking";


import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";

import {ChainNetworks} from "../../shared/constants";

function CourtStaking() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);
    return (
        <>
            <div className={classes.LiquidityMiningPage}>
                {
                    accountContext.account && (
                        <>
                            <Navbar
                                title={"Governance"}
                                details={null}
                            />
                            {
                                !accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN) && (
                                    <Alert
                                        elevation={6}
                                        variant="filled"
                                        style={{
                                            maxWidth: '500px',
                                            margin: '0 auto 15px'
                                        }}
                                        severity="error">Unsupported chain, supported chains are: 56 (BSC)</Alert>
                                )
                            }
                            <CourtVotePowerStaking/>
                            <div className={classes.ComingSoon}>
                                Go to markets page for voting. <Link to="/markets" className={classes.MarketsLink}>click here</Link>
                            </div>
                        </>
                    )
                }
                {
                    !accountContext.account && (
                        <div className={classes.ConnectWrap}>
                            <ConnectButton/>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default CourtStaking;
