import React, {useEffect} from 'react';
import {get} from 'lodash';
import numeral from "numeral";
import {useState, useContext} from 'react';
import {
    Link,
} from "react-router-dom";
import {useStyles} from './styles'
import {AccountContext} from '../../shared/AccountContextProvider';

import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei, truncateText} from "../../shared/helper";
import {marketStateColors, marketStates} from '../../shared/constants';
import {useGetMarketTradeVolume} from "../../pages/Market/hooks";

function MarketCard(props) {
    const marketAPIs = new MarketAPIs();

    const classes = useStyles();
    const {
        market
    } = props;
    const [pricesOfBuy, setPricesOfBuy] = useState(0);
    const [marketState, setMarketState] = useState(null);
    const [marketContractAddress, setMarketContractAddress] = useState(null);
    const accountContext = useContext(AccountContext);
    const marketTradeVolume = useGetMarketTradeVolume(accountContext.account, marketContractAddress);

    const handleInit = async () => {
        //marketId, buyAmount, outcomeIndex
        const marketContractAddress = await marketAPIs.getMarketById(accountContext.account, get(market, ['id']));
        setMarketContractAddress(marketContractAddress);

        const pricesOfBuy = await marketAPIs.getPricesOfBuy(accountContext.account, marketContractAddress);
        setPricesOfBuy({
            'yes': pricesOfBuy.priceOfYes,
            'no': pricesOfBuy.priceOfNo,
        });

        const marketContractInState = await marketAPIs.getMarketState(accountContext.account, marketContractAddress);
        setMarketState(marketContractInState);
    };

    const getMarketStateText = () => {
        if (!marketState) {
            return null;
        }

        return marketStates[marketState];
    };

    const getMarketStateColor = () => {
        if (!marketState) {
            return null;
        }

        return marketStateColors[marketState];
    };


    useEffect(() => {
        handleInit();
    }, []);

    useEffect(() => {
        props.onMarketDataLoad && props.onMarketDataLoad({
            tradeVolume: marketTradeVolume,
            pricesOfBuy: pricesOfBuy,
            state: marketState,
            marketContractAddress: marketContractAddress,
            marketId: get(market, ['id']),
        });
    }, [marketContractAddress, marketTradeVolume, pricesOfBuy, marketState]);

    return (
        <Link to={`/markets/${get(market, ['id'])}`}
              style={{
                  borderRight: `5px solid ${getMarketStateColor()}`
              }}
              className={classes.MarketCard}>
            <div className={classes.Header}>
                <div className={classes.Avatar} style={{
                    backgroundImage: `url(${get(market, ['image'])})`
                }}></div>
                <div className={classes.HeaderSub}>
                    <div className={classes.Cat}>{get(market, ['category', 'title'])}</div>
                    <div className={classes.MarketState}
                         style={{
                             backgroundColor: `${getMarketStateColor()}`
                         }}>{getMarketStateText()}</div>
                </div>
            </div>
            <h1 className={classes.Title}>
                {truncateText(get(market, ['title']), 100)}
            </h1>
            <div className={classes.Details}>
                <div className={classes.Volume}>
                    <span className={classes.Volume__Title}>Volume</span>
                    <span className={classes.Volume__Value}>{numeral(marketTradeVolume).format("$0,0.00")}</span>
                </div>
                <div className={classes.Options}>
                    <div className={classes.Option}>
                        <span className={classes.Option__Title}>Yes</span>
                        <span
                            className={`${classes.Option__Value} ${classes.Option__ValueYes}`}>{numeral(get(pricesOfBuy, 'yes') || 0).format("$0,0.00")}</span>
                    </div>
                    <div className={classes.Option}>
                        <span className={classes.Option__Title}>No</span>
                        <span
                            className={`${classes.Option__Value} ${classes.Option__ValueNo}`}>{numeral(get(pricesOfBuy, 'no') || 0).format("$0,0.00")}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MarketCard;
