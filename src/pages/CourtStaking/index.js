import React, { useContext, useEffect, useState, createRef } from "react";
import clsx from "clsx";

import Navbar from "../../components/Navbar";
import ConnectButton from "../../components/ConnectButton";
import CourtVotePowerStaking from "../../components/CourtVotePowerStaking";


import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";

import CourtAPIs from "../../shared/contracts/CourtAPIs";
import DepositModal from "../../components/DepositModal";
import UnstakeModal from "../../components/UnstakeModal";

function CourtStaking() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");


    useEffect(() => {
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
    }, [accountContext.account]);

    return (
        <>
            <Navbar
                title={"Governance"}
                details={null}
            />
            <div className={classes.LiquidityMiningPage}>
                {accountContext.account && (
                    <>
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
                )}
                {!accountContext.account && (
                    <div className={classes.ConnectWrap}>
                        <ConnectButton />
                    </div>
                )}
            </div>
        </>
    );
}

export default CourtStaking;
