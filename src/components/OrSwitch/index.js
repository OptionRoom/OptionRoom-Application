import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";


const OrSwitch = withStyles((theme) => ({
    root: {
        width: 34,
        height: 20,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        margin: '1.5px 0',
        transform: "translateX(2px)",
        "&$checked": {
            transform: "translateX(16px)",
            color: '#27AE60',
            "& + $track": {
                backgroundColor: "rgba(39, 174, 96, 0.3)",
                opacity: 1,
                border: "none",
            },
        },
/*         "&$focusVisible $thumb": {
            color: "#8b8888",
            border: "6px solid #fff",
        }, */
    },
    thumb: {
        width: 14,
        height: 14,
    },
    track: {
        borderRadius: '90px',
        border: `1px solid #EDF1F5`,
        backgroundColor: '#EDF1F5',
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

export default OrSwitch;
