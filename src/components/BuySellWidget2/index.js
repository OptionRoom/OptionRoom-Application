import React, {useContext, useEffect, useState} from "react";
import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";
import {get} from "lodash";

function BuySellWidget2(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const {marketInfo} = props;
    return (
        <div className={classes.BuySellWidget}>
            <div className={classes.Title}>Buy/Sell Options</div>
            <div>
                {
                    get(marketInfo, ['choices'], []).map((entry, index) => {
                        return (
                            <div className={classes.OptionBlock}
                                 key={`OptionBlock-${index}`}>
                                <div className={classes.OptionName}>
                                    {entry}
                                </div>
                                <div className={classes.BuySellWrap}>
                                    <div>Buy</div>
                                    <div>Sell</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default BuySellWidget2;
