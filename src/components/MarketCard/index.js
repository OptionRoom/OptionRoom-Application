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


function MarketCard(props) {
    const classes = useStyles();
    const { market } = props;

    const getMarketStateText = () => {
        if (!get(market, ["state"])) {
            return null;
        }

        return marketStates[get(market, ["state"])];
    };

    const getMarketStateColor = () => {
        if (!get(market, ["state"])) {
            return null;
        }
        return marketStateColors[get(market, ["state"])];
    };

    const getVoeteHeadline = () => {
        if (!get(market, ["state"])) {
            return null;
        }

        const marketStates = {
            "0": "N/A",
            "1": "Validating ends in",
            "2": "N/A",
            "3": "Market ends in",
            "4": "N/A",
            "5": "Resolving ends in",
            "6": "N/A",
            "7": "Disputing ends in",
            "8": "N/A",
        };

        return marketStates[get(market, ["state"])];
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (!get(market, ["state"]) || ["0", "2", "4", "6", "8"].indexOf(get(market, ["state"])) > -1) {
            return null;
        }

        if (completed) {
            // Render a completed state
            return <span>You are good to go!</span>;
        } else {
            // Render a countdown
            return (
                <div className={classes.CounterWrapper}>
                    <div>{getVoeteHeadline()}</div>
                    <div className={classes.CounterWrapperInner}>
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
                </div>
            );
        }
    };

    const getCountDownEndTime = () => {
        if (!get(market, ["state"]) || ["0", "2", "4", "6", "8"].indexOf(get(market, ["state"])) > -1) {
            return Date.now();
        }

        if(get(market, ["state"]) == 1) {
            return parseInt(market.info.validatingEndTime) * 1000;
        }

        if(get(market, ["state"]) == 3) {
            return parseInt(market.info.participationEndTime) * 1000;
        }

        if(get(market, ["state"]) == 5) {
            return parseInt(market.info.resolvingEndTime) * 1000;
        }

        if(get(market, ["state"]) == 7) {
            return parseInt(market.info.lastDisputeResolvingVoteTime) * 1000;
        }
    }

    return (
        <Link
            to={`/markets/${get(market, ["address"])}`}
            style={
                props.isFeatured
                    ? {
                          backgroundImage: `url(${get(market, ["dbData", "image"])})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                      }
                    : null
            }
            className={clsx(classes.MarketCard2, {
                [classes.MarketIsFeatured]: props.isFeatured,
                [classes.MarketIsListView]: props.isListView,
            })}
        >
            <div className={classes.MainDetails}>
                <div className={classes.TitleWrap}>
                    <div className={classes.CatStateLine}>
                        <div className={classes.Cat}>
                            {get(market, ["dbData", "category", "title"])}
                        </div>
                        <div className={classes.State}
                             style={
                                {
                                    backgroundColor: getMarketStateColor()
                                }
                             }>
                            {getMarketStateText()}
                        </div>
                    </div>
                    <div className={classes.Title}>
                        {truncateText(get(market, ["info", "question"]), 60)}
                    </div>
                </div>
                <div
                    className={classes.Avatar}
                >
                    <img src={get(market, ["dbData", "image"])}/>
                </div>
            </div>
            <div className={classes.SubDetails}>
                <div className={classes.VolumeWrap}>
                    <div className={classes.VolumeIcon}>
                        <VolumeIcon/>
                    </div>
                    <div>
                        <div className={classes.Volume__Title}>Volume</div>
                        <div className={classes.Volume__Val}>
                            {numeral(get(market, ["dbData", "tradeVolume"], 0)).format("$0,0.00")}
                        </div>
                    </div>
                </div>
                <div className={classes.OptionsWrap}>
                    <div className={classes.Option}>
                        <div className={classes.Option__Title}>YES</div>
                        <div className={classes.Option__Val}>
                            {numeral(
                                get(market, ["pricesOfBuy", "yes"], 0)
                            ).format("$0,0.00")}
                        </div>
                    </div>
                    <div className={classes.Option}>
                        <div className={classes.Option__Title}>NO</div>
                        <div className={classes.Option__Val}>
                            {numeral(
                                get(market, ["pricesOfBuy", "no"], 0)
                            ).format("$0,0.00")}
                        </div>
                    </div>
                </div>
            </div>
            {
                !props.isListView && (
                    <div className={classes.Countdown}>
                        <Countdown
                            date={getCountDownEndTime()}
                            renderer={renderer}
                        />
                    </div>
                )
            }
        </Link>
    );
}

export default MarketCard;
