import React from "react";
import clsx from "clsx";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useStyles } from "./styles";
import {withStyles} from "@material-ui/core/styles";

const StyledTabs = withStyles({
    root: {
        padding: "27px 27px 0",
        minHeight: "auto",
    },
    indicator: {
        display: "none",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            display: "none",
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

const StyledTab = withStyles((theme) => ({
    root: {
        background: "#EDEFF4",
        color: "#8293A6",
        textTransform: "none",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: "14px",
        lineHeight: "24px",
        marginRight: "8px",
        height: "40px",
        padding: "0 16px",
        opacity: 1,
        borderRadius: "8px",
        "&.Mui-selected, &:focus": {
            background: "#004BFF",
            color: "#fff",
        },
    },
}))((props) => <Tab disableRipple {...props} />);


function OrTab(props) {
    const {
        ...rest
    } = props;

    return (
        <StyledTabs
            value={props.value}
            onChange={props.handleChange}
            aria-label="styled tabs example"
        >
            <StyledTab label="Seed"></StyledTab>
            <StyledTab label="Private"></StyledTab>
        </StyledTabs>
    );
}

export default OrTab;
