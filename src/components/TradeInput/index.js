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
    const [tradeVal, setTradeVal] = useState(value);
    const [tradePercent, setTradePercent] = useState(value && max ? (value / parseFloat(max)) * 100 : 0);

    useEffect(() => {
        if(value != tradeVal) {
            setTradeVal(value);
            setTradePercent((value / parseFloat(max)) * 100);
        }
    }, [value]);

    useEffect(() => {
        if(tooltipConfig.isOpen) {
            props.onValidityUpdate && props.onValidityUpdate(false);
        } else {
            props.onValidityUpdate && props.onValidityUpdate(true);
        }
    }, [tooltipConfig]);

    return (
        <div className={classes.TradeInput}>
            <Tooltip open={tooltipConfig.isOpen}
                     placement={'top'}
                     arrow
                     title={tooltipConfig.tooltip}>
                <input value={tradeVal}
                       className={clsx({
                           [classes.BuySellWidgetAmount__InputFieldError]: tooltipConfig.isOpen
                       })}
                       onChange={(e) => {
                           setTradeVal(e.target.value);
                           setTradePercent((e.target.value / parseFloat(max)) * 100);
                           onChange(e.target.value);
                       }}
                       type='number'/>
            </Tooltip>
            <div>
                <TradeSlider2
                    value={tradePercent}
                    onChange={(e, e2) => {
                        setTradePercent(e2);
                        const newVal = ((e2 * max) / 100);
                        setTradeVal(newVal);
                        onChange && onChange(newVal);
                    }}
                ></TradeSlider2>
            </div>
        </div>
    );
}

export default TradeInput;
