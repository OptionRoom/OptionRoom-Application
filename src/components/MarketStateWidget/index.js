import React, { useEffect } from "react";
import Countdown from 'react-countdown';
import {get} from 'lodash';

import { useStyles } from "./styles";
import { marketStateColors, marketStates } from "../../shared/constants";
import {
    getMarketDisputeEndTime
} from '../../shared/helper';

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
            return <span>It ended!</span>;
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
            return parseInt(get(marketInfo, ['info', 'validatingEndTime'])) * 1000;
        }

        if(state == 3) {
            return parseInt(get(marketInfo, ['info', 'participationEndTime'])) * 1000;
        }

        if(state == 5) {
            return parseInt(get(marketInfo, ['info', 'resolvingEndTime'])) * 1000;
        }

        if(state == 7) {
            return parseInt(getMarketDisputeEndTime(parseInt(get(marketInfo, ['info', 'resolvingEndTime'])), parseInt(get(marketInfo, ['info', 'lastResolvingVoteTime'])))) * 1000;
        }
    }

    return (
        <div className={classes.MarketStateWidget}
             style={{
                 //backgroundColor: getMarketStateColor(),
                 color: getMarketStateColor()
             }}>
            <div className={classes.MarketStateWidget__Header}>
                {getVoeteHeadline()} {
                ["0", "2", "4", "6", "8"].indexOf(`${state}`) === -1 && (
                    <Countdown
                        date={getCountDownEndTime()}
                        renderer={renderer}
                    />
                )
            }</div>
        </div>
    );
}

export default MarketStateWidget;
