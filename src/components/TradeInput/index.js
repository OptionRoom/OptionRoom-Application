import React, {useEffect, useState} from "react";
import clsx from "clsx";

import Tooltip from "@material-ui/core/Tooltip";
import TradeSlider2 from "../TradeSlider2";
import {useStyles} from "./styles";

export const useTooltipConfig = (value, min, max) => {
    const [tooltip, setTooltip] = useState({
        isOpen: false,
        content: ''
    });

    useEffect(() => {
        if (value == 0) {
            setTooltip({
                isOpen: false,
                content: ''
            })
        } else if (parseFloat(value) < min) {
            setTooltip({
                isOpen: true,
                tooltip: `Value can't be less than ${min}`
            })
        } else if (parseFloat(value) > max) {
            setTooltip({
                isOpen: true,
                tooltip: `Value can't be bigger than ${max}`
            })
        } else {
            setTooltip({
                isOpen: false,
                content: ''
            })
        }
    }, [value, max, min]);

    return tooltip;
};

function TradeInput(props) {

    const {
        min,
        max,
        value,
        onChange
    } = props;

    const classes = useStyles();

    const tooltipConfig = useTooltipConfig(value, min, max);
    const [tradeInputTrackChange, setTradeInputTrackChange] = useState(null);
    const [tradeInputPercentTrackChange, setTradeInputPercentTrackChange] = useState(null);
    const [tradeInputPercent, setTradeInputPercent] = useState(0);

    useEffect(() => {
        const newPercent = (tradeInputTrackChange / parseFloat(max)) * 100;
        setTradeInputPercent(newPercent);
    }, [tradeInputTrackChange]);

    useEffect(() => {
        const newTradeInput = (max * tradeInputPercentTrackChange) / 100;
        onChange(newTradeInput);
    }, [tradeInputPercentTrackChange]);

    useEffect(() => {
        if(value === 0) {
            setTradeInputPercent(0);
        }

        if (value == 0 || value > max || value < min) {
            props.onValidityUpdate && props.onValidityUpdate(false);
        } else {
            props.onValidityUpdate && props.onValidityUpdate(true);
        }

    }, [value]);

    return (
        <div className={classes.TradeInput}>
            <Tooltip open={tooltipConfig.isOpen}
                     placement={'top'}
                     arrow
                     title={tooltipConfig.tooltip}>
                <input value={value}
                       className={clsx({
                           [classes.BuySellWidgetAmount__InputFieldError]: tooltipConfig.isOpen
                       })}
                       onChange={(e) => {
                           onChange(e.target.value);
                           setTradeInputTrackChange(e.target.value);
                       }}
                       type='number'/>
            </Tooltip>
            <div>
                <TradeSlider2
                    value={tradeInputPercent}
                    onChange={(e, e2) => {
                        setTradeInputPercentTrackChange(e2);
                        setTradeInputPercent(e2);
                    }}
                ></TradeSlider2>
            </div>
        </div>
    );
}

export default TradeInput;
