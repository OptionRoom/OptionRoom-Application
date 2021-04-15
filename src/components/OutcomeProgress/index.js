import React from "react";
import clsx from "clsx";

import { useStyles } from "./styles";

function OutcomeProgress(props) {
    const {
        children,
        className,
        ...rest
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.OutcomeOption}>
            <div className={classes.OutcomeOption__Header}>
                <span className={classes.OutcomeOption__HeaderTitle}>{props.title}</span>
                <span>
                    {
                        props.count && (
                            <span className={classes.OutcomeOption__HeaderCount}>({props.count})</span>
                        )
                    }
                    {
                        props.percent && (
                            <span className={classes.OutcomeOption__HeaderPercent}>{props.percent}</span>
                        )
                    }
                </span>
            </div>
            <div className={classes.OutcomeOption__Value}>
                <div style={{
                    backgroundColor: `${props.color}`,
                    width: `${props.percent}%`
                }}></div>
            </div>
        </div>
    );
}

export default OutcomeProgress;
