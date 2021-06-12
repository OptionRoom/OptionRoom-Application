import React from "react";
import clsx from "clsx";
import Select from "react-select";

import { useStyles } from "./styles";

function OrSelect(props) {
    const { className, ...rest } = props;

    const classes = useStyles();

    return <Select
        classNamePrefix={'OrSelect'}
        className={clsx(className, classes.OrSelect)}
        {...rest} />;
}

export default OrSelect;
