import React, {useEffect, useState} from "react";
import clsx from "clsx";

import Tooltip from "@material-ui/core/Tooltip";
import TradeSlider2 from "../TradeSlider2";
import {useStyles} from "./styles";
import {formatTradeValue} from '../../shared/helper';
import SelectTokensModal from "../SelectTokensModal";
import {getDefaultCollateralToken} from "../../shared/contracts/contracts.helper";

export const useTooltipConfig = (value, min, max) => {

    const [tooltip, setTooltip] = useState({
        isOpen: false,
        tooltip: ''
    });

    useEffect(() => {
        if (value == 0) {
            setTooltip({
                isOpen: false,
                tooltip: ''
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
                tooltip: ''
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
        onChange,
        hideSlider,
        withTokenSelector,
        handleSelectNewToken,
        selectedToken
    } = props;

    const classes = useStyles();

    const tooltipConfig = useTooltipConfig(value, min, max);
    const [tradeVal, setTradeVal] = useState(formatTradeValue(value));
    const [isSelectTokenModalOpen, setIsSelectTokenModalOpen] = useState(false);
    const [tradePercent, setTradePercent] = useState(value && max ? (value / parseFloat(max)) * 100 : 0);

    useEffect(() => {
        if(value != tradeVal) {
            setTradeVal(formatTradeValue(value));
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

    const handleSelectToken = (newToken) => {
        handleSelectNewToken && handleSelectNewToken(newToken);
    };

    return (
        <div className={classes.TradeInput}>
            <div className={classes.InputWrapper}>
                <Tooltip open={tooltipConfig.isOpen}
                         placement={'top'}
                         arrow
                         title={tooltipConfig.tooltip}>
                    <>

                        <input value={tradeVal}
                               className={clsx(classes.Input,{
                                   [classes.BuySellWidgetAmount__InputFieldError]: tooltipConfig.isOpen
                               })}
                               onChange={(e) => {
                                   setTradeVal(formatTradeValue(e.target.value));
                                   setTradePercent((e.target.value / parseFloat(max)) * 100);
                                   onChange(e.target.value);
                               }}
                               type='number'/>
                        {
                            withTokenSelector && (
                                <div className={classes.SelectedToken}
                                     onClick={() => {
                                         setIsSelectTokenModalOpen(true);
                                     }}>
                                    <div className={classes.SelectedToken__TokenImg}
                                         style={{
                                             backgroundImage: `url("${selectedToken.logoURI}")`
                                         }}></div>
                                    <div className={classes.SelectedToken__TokenSymbol}>{selectedToken.symbol}</div>
                                    <div className={classes.SelectedToken__SwitchIcon}>
                                        <i className={'fa fa-exchange'}></i>
                                    </div>
                                </div>
                            )
                        }
                    </>
                </Tooltip>
            </div>
            {
                !hideSlider && (
                    <div>
                        <TradeSlider2
                            value={tradePercent}
                            onChange={(e, e2) => {
                                setTradePercent(e2);
                                const newVal = ((e2 * max) / 100);
                                setTradeVal(formatTradeValue(newVal));
                                onChange && onChange(formatTradeValue(newVal));
                            }}
                        ></TradeSlider2>
                    </div>
                )
            }
            {
                withTokenSelector && (
                    <SelectTokensModal
                        onClose={() => {
                            setIsSelectTokenModalOpen(false);
                        }}
                        onSelectToken={handleSelectToken}
                        open={isSelectTokenModalOpen}/>
                )
            }
        </div>
    );
}

export default TradeInput;
