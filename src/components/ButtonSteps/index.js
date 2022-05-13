//
import React from "react";
import clsx from "clsx";
import { Button as MuiButton, CircularProgress } from "@material-ui/core";

import { useStyles } from "./styles";

function ButtonSteps(props) {
    const {
        buttons
    } = props;

    const classes = useStyles();

    if(buttons.length === 1) {
        return buttons[0];
    }

    return (
        <div className={classes.ButtonSteps}>
            {
                buttons.map((entry, index) => {
                    return (
                        <div className={classes.Step}
                             key={`ButtonSteps-${index}`}>
                            <div className={classes.StepWrap}>
                                <div className={classes.StepTxt}>{index + 1}</div>
                            </div>
                            <div className={classes.ButtonWrap}>
                                {entry}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ButtonSteps;
