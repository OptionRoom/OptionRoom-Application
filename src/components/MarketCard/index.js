import React, { useEffect } from "react";
import clsx from "clsx";
import { get } from "lodash";
import numeral from "numeral";
/*
import {useState, useContext} from 'react';
*/
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import {VolumeIcon} from '../../shared/icons';
/*
import MarketAPIs from "../../shared/contracts/MarketAPIs";
*/
import { fromWei, truncateText } from "../../shared/helper";
import { marketStateColors, marketStates } from "../../shared/constants";
/*
import {useGetMarketTradeVolume} from "../../pages/Market/hooks";
*/




function MarketCard(props) {
    /*
    const marketAPIs = new MarketAPIs();
*/

    const classes = useStyles();
    const { market } = props;
    /*    const [pricesOfBuy, setPricesOfBuy] = useState(0);
    const [marketState, setMarketState] = useState(null);
    const [marketContractAddress, setMarketContractAddress] = useState(null);
    const accountContext = useContext(AccountContext);*/
    //const marketTradeVolume = useGetMarketTradeVolume(accountContext.account, marketContractAddress);

    const handleInit = async () => {
        //marketId, buyAmount, outcomeIndex
        /*const marketContractAddress = await marketAPIs.getMarketById(accountContext.account, get(market, ['id']));
        setMarketContractAddress(marketContractAddress);

        const pricesOfBuy = await marketAPIs.getPricesOfBuy(accountContext.account, marketContractAddress);
        setPricesOfBuy({
            'yes': pricesOfBuy.priceOfYes,
            'no': pricesOfBuy.priceOfNo,
        });*/
        /*        const marketContractInState = await marketAPIs.getMarketState(accountContext.account, marketContractAddress);
        setMarketState(marketContractInState);*/
    };

    const getMarketStateText = () => {
        if (!get(props, ["market", "state"])) {
            return null;
        }

        return marketStates[get(props, ["market", "state", "value"])];
    };

    const getMarketStateColor = () => {
        if (!get(props, ["market", "state"])) {
            return null;
        }
        return marketStateColors[get(props, ["market", "state", "value"])];
    };

    useEffect(() => {
        handleInit();
    }, []);

    /*    useEffect(() => {
        props.onMarketDataLoad && props.onMarketDataLoad({
            tradeVolume: marketTradeVolume,
            pricesOfBuy: pricesOfBuy,
            state: marketState,
            marketContractAddress: marketContractAddress,
            marketId: get(market, ['id']),
        });
    }, [marketContractAddress, marketTradeVolume, pricesOfBuy, marketState]);*/

    return (
        <Link
            to={`/markets/${get(market, ["id"])}`}
            style={
                props.isFeatured
                    ? {
                          backgroundImage: `url(${get(market, ["image"])})`,
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
                            {get(market, ["category", "title"])}
                        </div>
                        <div className={classes.State}>
                            {get(market, ["state", "title"])}
                        </div>
                    </div>
                    <div className={classes.Title}>
                        {truncateText(get(market, ["title"]), 60)}
                    </div>
                </div>
                <div
                    className={classes.Avatar}
                >
                    <img src={get(market, ["image"])}/>
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
                            {numeral(
                                get(props, ["market", "volume"]) || 0
                            ).format("$0,0.00")}
                        </div>
                    </div>
                </div>
                <div className={classes.OptionsWrap}>
                    <div className={classes.Option}>
                        <div className={classes.Option__Title}>YES</div>
                        <div className={classes.Option__Val}>
                            {numeral(
                                get(props, ["market", "priceOfBuy", "yes"]) || 0
                            ).format("$0,0.00")}
                        </div>
                    </div>
                    <div className={classes.Option}>
                        <div className={classes.Option__Title}>NO</div>
                        <div className={classes.Option__Val}>
                            {numeral(
                                get(props, ["market", "priceOfBuy", "no"]) || 0
                            ).format("$0,0.00")}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MarketCard;
