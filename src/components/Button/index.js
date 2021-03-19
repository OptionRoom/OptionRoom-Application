import React from "react";
import clsx from "clsx";
import { Button as MuiButton, CircularProgress } from "@material-ui/core";

import { useStyles } from "./styles";

function Button(props) {
    const {
        children,
        isProcessing,
        isDisabled,
        color,
        fullWidth,
        size,
        className,
        ...rest
    } = props;
    const classes = useStyles();

    return (
        <MuiButton
            disabled={isProcessing || isDisabled}
            className={clsx(classes.root, className, {
                [classes.Primary]: color === "primary",
                [classes.Black]: color === "black",
                [classes.Gray]: color === "gray",
                [classes.White]: color === "white",
                [classes.Disabled__Primary]: color === "primary" && isDisabled,
                [classes.Processing__Primary]:
                    color === "primary" && isProcessing,
                [classes.Disabled__Gray]: color === "gray" && isDisabled,
                [classes.Processing__Gray]: color === "gray" && isProcessing,
                [classes.Disabled__Black]: color === "black" && isDisabled,
                [classes.Processing__Black]: color === "black" && isProcessing,
                [classes.Disabled__White]: color === "white" && isDisabled,
                [classes.Processing__White]: color === "white" && isProcessing,
                [classes.FullWidth]: fullWidth,
                [classes.Size__Medium]: size === "medium",
                [classes.Size__Large]: size === "large",
                [classes.Size__Small]: size === "small",
            })}
            variant={"contained"}
            {...rest}
        >
            {isProcessing && (
                <div className={classes.Progress_StateWrap}>
                    <CircularProgress />
                    Processing...
                </div>
            )}
            {!isProcessing && children}
        </MuiButton>
    );
}

export default Button;
