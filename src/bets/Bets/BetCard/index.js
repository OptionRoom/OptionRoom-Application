import React, {useMemo} from "react";
import clsx from "clsx";
import { get, sum } from "lodash";
import numeral from "numeral";
import Countdown from "react-countdown";

import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { VolumeIcon } from "../../../shared/icons";

import {
    fromWei,
    truncateText,
} from "./../../../shared/helper";
import {betStates, betsStateColors} from "../../constants";

function BetCard(props) {
    const classes = useStyles();
    const { betData } = props;

    const voteHeadline = useMemo(() => {
        const marketStates = {
            [betStates.Invalid]: "You can't bet",
            [betStates.ActiveNotStarted]: "Starts in:",
            [betStates.ActiveBetting]: "Ends in:",
            [betStates.ActiveNoBetting]: "Waiting resolve",
            [betStates.Finished]: "It's Finished",
            [betStates.Canceled]: "It's Cancelled",
        };
        return marketStates[betData.state] || 'N/A';
    }, [betData.state]);

    const betStateText = useMemo(() => {
        const marketStates = {
            [betStates.Invalid]: "Invalid",
            [betStates.ActiveNotStarted]: "Active Not Started",
            [betStates.ActiveBetting]: "Active Betting",
            [betStates.ActiveNoBetting]: "Active No Betting",
            [betStates.Finished]: "Finished",
            [betStates.Canceled]: "Cancelled",
        };
        return marketStates[betData.state] || 'N/A';
    }, [betData.state]);

    const betStateColor = useMemo(() => {
        return betsStateColors[betData.state] || '#000';
    }, [betData.state]);

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        switch (betData.state) {
            case betStates.ActiveBetting:
            case betStates.ActiveNotStarted:
                return (
                    <div className={classes.CounterWrapper}>
                        <div>{voteHeadline}</div>
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
                )
            case betStates.Invalid:
            case betStates.ActiveNoBetting:
            case betStates.Finished:
            case betStates.Canceled:
                return <span>It ended!</span>;
            default:
                return null;
        }
    };

    const countDownEndTime = useMemo(() => {
        switch (betData.state) {
            case betStates.ActiveBetting:
                return parseInt(betData.endBetTime) * 1000;
            case betStates.ActiveNotStarted:
                return parseInt(betData.starBetTime) * 1000;
            case betStates.Invalid:
            case betStates.ActiveNoBetting:
            case betStates.Finished:
            case betStates.Canceled:
                return null;
            default:
                return null;
        }
    }, [betData.state]);

    return (
        <Link
            to={`/bets/${get(betData, ["address"])}`}
            className={clsx(classes.MarketCard2)}
        >
            <div className={classes.MainDetails}>
                <div className={classes.CatStateLine}>
                    <div className={classes.Cat}>
                        {betData.categories.join(", ")}
                    </div>
                    <div
                        className={classes.State}
                        style={{
                            backgroundColor: betStateColor,
                        }}
                    >
                        {betStateText}
                    </div>
                </div>
                <div className={classes.Title}>
                    {truncateText(get(betData, ["title"]), 50)}
                </div>
            </div>
            <div className={classes.SubDetails}>
                <div className={classes.VolumeWrap}>
                    <div className={classes.VolumeIcon}>
                        <VolumeIcon />
                    </div>
                    <div>
                        <div className={classes.Volume__Title}>Volume</div>
                        <div className={classes.Volume__Val}>
                            {numeral(fromWei(sum(betData.amounts.map(e => parseInt(e))))).format("0,0.00")}
                        </div>
                    </div>
                </div>
                <div className={classes.OptionsWrap}>
                    {`${betData.choicesCount} options`}
                </div>
            </div>
            <div className={classes.Countdown}>
                <Countdown
                    date={countDownEndTime}
                    renderer={renderer}
                />
            </div>
        </Link>
    );
}

export default BetCard;
