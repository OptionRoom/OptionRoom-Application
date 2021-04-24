import React, {useEffect} from 'react';
import {get} from 'lodash';
import {useState, useContext} from 'react';
import {
    Link,
} from "react-router-dom";
import {useStyles} from './styles'
import {AccountContext} from '../../shared/AccountContextProvider';

import MarketAPIs from "../../shared/contracts/MarketAPIs";
import numeral from "numeral";
import {fromWei} from "../../shared/helper";

function MarketCard(props) {

    const classes = useStyles();
    const {
        market
    } = props;
    const [pricesOfBuy, setPricesOfBuy] = useState(0);
    const [marketState, setMarketState] = useState(null);
    const [marketTradingVolume, setMarketTradingVolume] = useState(0);

    const accountContext = useContext(AccountContext);

    const handleInit = async () => {
        const marketAPIs = new MarketAPIs();
        //marketId, buyAmount, outcomeIndex
        const marketContractAddress = await marketAPIs.getMarketById(accountContext.account, get(market, ['id']));
        const pricesOfBuy = await marketAPIs.getPricesOfBuy(accountContext.account, marketContractAddress);
        setPricesOfBuy({
            'yes': pricesOfBuy.priceOfYes,
            'no': pricesOfBuy.priceOfNo,
        });

        const marketContractInState = await marketAPIs.getMarketState(accountContext.account, marketContractAddress);
        setMarketState(marketContractInState);

        //marketId, buyAmount, outcomeIndex
        const tradingVolume = await marketAPIs.getMarketTradingVolume(accountContext.account, marketContractAddress);
        setMarketTradingVolume(tradingVolume);
    };

    const getMarketStateText = () => {
        if(!marketState) {
            return null;
        }

        const states = {
            "0": "Invalid",
            "1": "Pending",
            "2": "Rejected",
            "3": "Active",
            "4": "Inactive",
            "5": "Resolving",
            "6": "Resolved",
        }

        return states[marketState];
    };


    useEffect(() => {
        handleInit();
    }, []);

    return (
        <div className={classes.MarketCard}>
            <div className={classes.AvatarWrap}>
                <div className={classes.Avatar} style={{
                    backgroundImage: `url(${get(market, ['image'])})`
                }}></div>
            </div>
            <div className={classes.Details}>
                <div className={classes.Details__Header}>
                    <div className={classes.Cat}>{get(market, ['category', 'label'])}</div>
                    <div className={classes.Resolve}>{getMarketStateText()}</div>
                </div>
                <Link className={classes.Title}
                      to={`/markets/${get(market, ['id'])}`}>{get(market, ['title'])}</Link>
                <div className={classes.Details__Footer}>
                    <div className={classes.Volume}>
                        <span className={classes.Volume__Title}>Volume</span>
                        <span className={classes.Volume__Value}>{numeral(fromWei(`${marketTradingVolume}`)).format("$0,0.00")}</span>
                    </div>
                    <div className={classes.Options}>
                        <div className={classes.Option}>
                            <span className={classes.Option__Title}>Yes</span>
                            <span className={classes.Option__Value}>{numeral(get(pricesOfBuy, 'yes') || 0).format("$0,0.00")}</span>
                        </div>
                        <div className={classes.Option}>
                            <span className={classes.Option__Title}>Yes</span>
                            <span className={classes.Option__Value}>{numeral(get(pricesOfBuy, 'no') || 0).format("$0,0.00")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketCard;
