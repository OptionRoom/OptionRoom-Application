import React, {useContext, useEffect, useState} from "react";
import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";
import {get} from "lodash";
import Button from "../Button";

import MarketBuyWidget from '../MarketBuyWidget';

function BuySellWidget2(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const {marketInfo} = props;
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const openBuyModal = (title, index) => {
        setSelectedOption({
            title: title,
            index: index
        });
        setIsBuyModalOpen(true);
    }
    return (
        <div className={classes.BuySellWidget}>
            <div className={classes.Title}>Buy/Sell Options</div>
            <div className={classes.OptionContainer}>
                {
                    get(marketInfo, ['choices'], []).map((entry, index) => {
                        return (
                            <div className={classes.OptionBlock}
                                 key={`OptionBlock-${index}`}>
                                <div className={classes.OptionName}>
                                    {entry}
                                </div>
                                <div className={classes.BuySellWrap}>
                                    <Button
                                        color="green"
                                        onClick={() => openBuyModal(entry, index)}
                                        size={"small"}
                                        className={classes.BuySellBtn}>
                                        Buy
                                    </Button>
                                    <Button
                                        color="red"
                                        onClick={() => { }}
                                        size={"small"}
                                        className={classes.BuySellBtn}>
                                        Sell
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <MarketBuyWidget open={isBuyModalOpen}
                             onClose={() => {
                                 setIsBuyModalOpen(false);
                             }}
                             selectedOption={selectedOption}
                             marketInfo={marketInfo}
                             pricesOfBuy={props.pricesOfBuy}
                             onTrade={props.handleOnTrade}
                             onApprove={(type) => {
                                 if (type == 'CollateralToken') {
                                     props.refetchWalletAllowanceOfCollateralToken();
                                 } else if (type === 'OptionToken') {
                                     props.setIsWalletOptionTokenApprovedForMarket(true);
                                 } else {
                                     props.setIsWalletOptionTokenApprovedForMarketController(true);
                                 }
                             }}
                             walletBalanceOfCollateralToken={props.walletBalanceOfCollateralToken}
                             walletAllowanceOfCollateralToken={props.walletAllowanceOfCollateralToken}
                             isWalletOptionTokenApprovedForMarket={props.isWalletOptionTokenApprovedForMarket}
                             isWalletOptionTokenApprovedForMarketController={props.isWalletOptionTokenApprovedForMarketController}
                             walletOptionTokensBalance={get(props.marketContractData, ['walletOptionTokensBalance'])}
                             marketContractAddress={props.marketContractAddress}/>
        </div>
    );
}

export default BuySellWidget2;
