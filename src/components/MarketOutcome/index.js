import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { get, sortBy } from "lodash";
import numeral from "numeral";

import LinearChart from '../LinearChart';

import { useStyles } from "./styles";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import { fromWei, toWei } from "../../shared/helper";
import { AccountContext } from "../../shared/AccountContextProvider";
import {
    useGetMarketBuyPrices,
    useGetMarketOptionsGraphItems,
} from "../../pages/Market/hooks";

import { getDataRan } from './generate-data';

const colors = ["#2E6AFA", "#EB5757", "#EB5751", "#EB5752", "#EB5753", "#EB5754", "#EB5755", "#EB5756", "#EB5757", "#EB5757"];

function OutcomeBlock(props) {
    const classes = useStyles();
    return (
        <div className={classes.OutcomeBlock}>
            <div className={classes.OutcomeBlock__Square}
                 style={
                     {
                         backgroundColor: props.backgroundColor
                     }
                 }></div>
            <div className={classes.OutcomeBlock__Title}>{props.label}</div>
        </div>
    );
}

function MarketOutcome(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const pricesOfBuy = useGetMarketBuyPrices(
        accountContext.account,
        props.marketContractAddress,
        props.optionTokensPercentage
    );
    const marketOptionsGraphItems = useGetMarketOptionsGraphItems(
        accountContext.account,
        props.marketContractAddress,
        '1h'
    );

    const getSeries = () => {
        if(marketOptionsGraphItems && Object.keys(marketOptionsGraphItems).length > 0) {
            let pricesArray = [];
            Object.keys(marketOptionsGraphItems).forEach((entry) => {
                pricesArray.push({
                    x: parseInt(entry),
                    y: marketOptionsGraphItems[entry]
                })
            });

            pricesArray = sortBy(pricesArray, 'x')

            const yesSeries = {
                name: 'Yes',
                data: pricesArray
            };

            const noSeries = {
                name: 'No',
                data: pricesArray.map((entry) => {
                    return {
                        x: entry.x,
                        y: 1-entry.y
                    }
                })
            };

            return [yesSeries, noSeries];
        }

        return [];
    };

    //Vote
    const [isProcessing, setIsProcessing] = useState(false);

    const loadMarketInfo = async () => {
    };

    useEffect(() => {
        loadMarketInfo();
    }, []);

    return (
        <div className={classes.MarketOutcome}>
            <div className={classes.MarketOutcomeHeader}>
                <div className={classes.MarketOutcomeHeader__Val}>Outcome</div>
                <div className={classes.MarketOutcomeHeader__Progress}>
                    {
                        get(props, ['marketInfo','choices'], []).map((entry, index) => {
                            return (
                                <OutcomeBlock
                                    key={`OutcomeBlock-${index}`}
                                    label={entry}
                                    backgroundColor={colors[index]}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.MarketOutcomeBody}>
                <LinearChart
                        series={getSeries()}
                    />
            </div>
        </div>
    );
}

export default MarketOutcome;
