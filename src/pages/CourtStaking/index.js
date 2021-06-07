import React, {useContext, useEffect, useState, createRef} from "react";
import Alert from '@material-ui/lab/Alert';

import Navbar from "../../components/Navbar";
import ConnectButton from "../../components/ConnectButton";
import CourtVotePowerStaking from "../../components/CourtVotePowerStaking";


import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";
import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";

import CourtAPIs from "../../shared/contracts/CourtAPIs";

function CourtStaking() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");


/*    useEffect(() => {
        let updateInfoIntervalId = null;

        async function init() {
            const courtAPIs = new CourtAPIs();

        }

        if (accountContext.account) {
            init();
        }

        return () => {
            clearInterval(updateInfoIntervalId);
        };
    }, [accountContext.chainId]);*/

    return (
        <>
            <Navbar
                title={"Governance"}
                details={null}
            />
            <div className={classes.LiquidityMiningPage}>
                {
                    accountContext.account && (
                        <>
                            {
                                !accountContext.isChain('bsc') && (
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
                                <h1>We are so close</h1>
                                <p>Follow us here: <a
                                    href="https://t.me/OptionRoom"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <i className="fa fa-telegram"></i>
                                </a>
                                    <a
                                        href="https://twitter.com/option_room"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa fa-twitter"></i>
                                    </a> for more information</p>
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
