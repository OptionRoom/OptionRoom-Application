import React, { useEffect } from "react";
import clsx from "clsx";
import { get } from "lodash";
import numeral from "numeral";
import Countdown from 'react-countdown';

import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import {VolumeIcon} from '../../shared/icons';

import { fromWei, truncateText } from "../../shared/helper";
import { marketStateColors, marketStates } from "../../shared/constants";


function MarketStateWidget(props) {
    const classes = useStyles();
    const {
        marketInfo,
        state
    } = props;

    const getMarketStateText = () => {
        if (!state) {
            return null;
        }

        return marketStates[state];
    };

    const getMarketStateColor = () => {
        if (!state) {
            return null;
        }
        return marketStateColors[state];
    };

    const getMarketStateTxtColor = () => {
        const marketStateColors = {
            "0": "#",
            "1": "#000",
            "2": "#fff",
            "3": "#000",
            "4": "#fff",
            "5": "#000",
            "6": "#000",
            "7": "#000",
            "8": "#000",
        };

        return marketStateColors[state];
    };

    const getVoeteHeadline = () => {
        if (!state) {
            return null;
        }

        const marketStates = {
            "0": "This market was marked as invalid",
            "1": "Validating ends in:",
            "2": "This market was rejected",
            "3": "Market ends in:",
            "4": "This market is inactive",
            "5": "Resolving ends in:",
            "6": "This market was resolved",
            "7": "Disputing ends in:",
            "8": "This market was resolved",
        };

        return marketStates[state];
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (!state || ["0", "2", "4", "6", "8"].indexOf(`${state}`) > -1) {
            return null;
        }

        if (completed) {
            // Render a completed state
            return <span>You are good to go!</span>;
        } else {
            // Render a countdown
            return (
                <div className={classes.CounterWrapper}>
                    <div>
                        <span>{days}</span>
                        <span>days</span>
                    </div>
                    <div>
                        <span>{hours}</span>
                        <span>hours</span>
                    </div>
                    <div>
                        <span>{minutes}</span>
                        <span>minutes</span>
                    </div>
                </div>
            );
        }
    };

    const getCountDownEndTime = () => {

        if (!state || ["0", "2", "4", "6", "8"].indexOf(`${state}`) > -1) {
            return Date.now();
        }

        if(state == 1) {
            return parseInt(marketInfo.validatingEndTime) * 1000;
        }

        if(state == 3) {
            return parseInt(marketInfo.participationEndTime) * 1000;
        }

        if(state == 5) {
            return parseInt(marketInfo.resolvingEndTime) * 1000;
        }

        if(state == 7) {
            return parseInt(marketInfo.lastDisputeResolvingVoteTime) * 1000;
        }
    }

    return (
        <div className={classes.MarketStateWidget}
             style={{
                 backgroundColor: getMarketStateColor(),
                 color: getMarketStateTxtColor()
             }}>
            <div className={classes.MarketStateWidget__Header}>{getMarketStateText()}</div>
            <div>{getVoeteHeadline()}</div>
            {
                ["0", "2", "4", "6", "8"].indexOf(`${state}`) === -1 && (
                    <Countdown
                        date={getCountDownEndTime()}
                        renderer={renderer}
                    />
                )
            }
        </div>
    );
}

export default MarketStateWidget;
