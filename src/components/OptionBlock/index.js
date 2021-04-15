import React from "react";
import clsx from "clsx";

import { useStyles } from "./styles";

function OptionBlock(props) {
    const {
        children,
        className,
        ...rest
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.Options__OptionBlock}>
            <div className={classes.OptionBlock__Indicator}><div></div></div>
            <div className={classes.OptionBlock__Title}>{props.title}</div>
            {
                (props.value || props.value === 0) && (
                    <div className={classes.OptionBlock__Value}>{props.value}</div>
                )
            }
        </div>
    );
}

export default OptionBlock;
