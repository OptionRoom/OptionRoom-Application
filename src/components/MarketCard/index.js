import React, { useEffect } from "react";
import clsx from "clsx";
import { get } from "lodash";
import numeral from "numeral";
import {useState, useContext} from 'react';

import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import {VolumeIcon} from '../../shared/icons';
import MarketAPIs from "../../shared/contracts/MarketAPIs";

import { fromWei, truncateText } from "../../shared/helper";
import { marketStateColors, marketStates } from "../../shared/constants";
/*
import {useGetMarketTradeVolume} from "../../pages/Market/hooks";
*/




function MarketCard(props) {
    const classes = useStyles();
    const { market } = props;
    const accountContext = useContext(AccountContext);
    const [marketState, setMarketState] = useState(null);

    const handleInit = async () => {
        const marketAPIs = new MarketAPIs();
        const marketContractInState = await marketAPIs.getMarketState(accountContext.account, props.marketContractAddress);
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
