import React from "react";
import clsx from "clsx";

import {useStyles} from "./styles";
import {Button as MuiButton} from "@material-ui/core";

function OrTab(props) {
    const {
        ...rest
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.Tabs}>
            {
                props.tabs && props.tabs.map((entry, index) => {
                    return (
                        <div className={clsx(classes.Tab, {
                            [classes.TabSelected]: entry.id == props.value,
                        })}
                             onClick={() => {
                                 props.handleChange(entry.id);
                             }}>
                            {entry.label}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default OrTab;
