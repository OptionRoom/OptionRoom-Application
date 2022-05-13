//NotWhitelisted

import React from "react";
import clsx from "clsx";

import { useStyles } from "./styles";

function NotWhitelisted(props) {

    const classes = useStyles();

    return (
        <div className={classes.NotWhitelisted}>
            <div>Beta is closed</div>
            <div>contact <a href={'https://t.me/optionroomchatofficial'} target={'_blan'}>https://t.me/optionroomchatofficial</a> for more information </div>
        </div>
    );
}

export default NotWhitelisted;
