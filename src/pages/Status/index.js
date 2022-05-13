import React, {useContext} from "react";
import Navbar from "../../components/Navbar";
import {useStyles} from "./styles";

function Status() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.StatusPage}>
                <Navbar
                    title={"Status"}
                />
                <p className={classes.Text}>
                    Due to the <a href={"https://twitter.com/option_room/status/1413968601175019520"} target={'_blank'}>hack
                    incident</a> happened on ChainSwap, OptionRoom team has decied to stop operation at the moment. The
                    team has also started a recovery process in which all
                    ROOM token holders will get <a href={'https://twitter.com/option_room/status/1414006279778054144'}
                                                   target={'_blank'}>1:1 Airdrop</a>.
                </p>
                <p className={classes.Text}>The team is keeping an ongoing transparent announcements about the current
                    situation. Feel free to reach out on any of our official channels. <a
                        href="https://github.com/OptionRoom"
                        rel="noreferrer"
                        target="_blank"
                        className={classes.Social}
                    >
                        <i className="fa fa-github"></i>
                    </a>
                    <a
                        href="https://t.me/OptionRoom"
                        rel="noreferrer"
                        target="_blank" className={classes.Social}

                    >
                        <i className="fa fa-telegram"></i>
                    </a>
                    <a
                        href="https://twitter.com/option_room"
                        rel="noreferrer"
                        target="_blank" className={classes.Social}

                    >
                        <i className="fa fa-twitter"></i>
                    </a></p>
            </div>
        </>
    );
}

export default Status;
