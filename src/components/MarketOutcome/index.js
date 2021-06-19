import React, {useContext, useEffect, useState} from "react";
import { PieChart } from "react-minimal-pie-chart";
import {get} from "lodash";

import {useStyles} from "./styles";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei, toWei} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";
import {
    useGetMarketBuyPrices,
    useGetMarketBuySell,
} from '../../pages/Market/hooks';
import numeral from "numeral";

function OutcomeBlock(props) {
    const classes = useStyles();
    return (
        <div className={classes.OutcomeBlock}>
            <div className={classes.OutcomeBlock__Chart}>
                <PieChart style={{ height: '35px', width: '35px' }}
                          label={({ dataEntry, index }) => `${dataEntry.title}`}
                          labelStyle={{
                              fontSize: '30px',
                              fontWeight: '700',
                              fill: '#818B95',
                              textTransform: 'none',
                          }}
                          labelPosition={0}
                          data={
                              [
                                  {
                                      title: '',
                                      value: (100 - ((props.value || 0) * 100)),
                                      color: '#E9EEF3'
                                  },
                                  {
                                      title: `${props.label}`,
                                      value: ((props.value || 0) * 100),
                                      color: `${props.color}`
                                  },
                              ]
                          }
                          lineWidth={25}
                          rounded />
            </div>
            <div className={classes.OutcomeBlock__Val}>
                {numeral(props.value || 0).format("$0,0.00")}
            </div>
        </div>
    )
}

function MarketOutcome(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const pricesOfBuy = useGetMarketBuyPrices(accountContext.account, props.marketContractAddress, props.optionTokensPercentage);
    const marketBuySellHistory = useGetMarketBuySell(accountContext.account, props.marketContractAddress, props.optionTokensPercentage);

    //Vote
    const [isProcessing, setIsProcessing] = useState(false);

    const loadMarketInfo = async () => {
        const marketAPIs = new MarketAPIs();
        //const result = await marketAPIs.getMarketInfo(accountContext.account, props.marketContractAddress);
    };

    useEffect(() => {
        loadMarketInfo();
    }, []);

    return (
        <div className={classes.MarketOutcome}>
            <div className={classes.MarketOutcomeHeader}>
                <div className={classes.MarketOutcomeHeader__Val}>Outcome</div>
                <div className={classes.MarketOutcomeHeader__Progress}>
                    <OutcomeBlock label={'Yes'}
                                  value={pricesOfBuy[0]}
                                  color={'#2E6AFA'}/>
                    <OutcomeBlock label={'No'}
                                  value={pricesOfBuy[1]}
                                  color={'#EB5757'}/>
                </div>
            </div>
            <div className={classes.MarketOutcomeBody}></div>
        </div>
    );
}

export default MarketOutcome;
