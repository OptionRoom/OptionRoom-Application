import React, { useContext, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react-lite";


import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import Button from "../Button";

import MarketBuyWidget from '../MarketBuyWidget';
import MarketSellWidget from '../MarketSellWidget';
import {fromWei} from "../../shared/helper";
import {formatAddress} from "../../shared/SmartContractsContextProvider";
import {smartState} from "../../shared/SmartState";

function BuySellWidget2(props) {
    const classes = useStyles();
    const { marketInfo, marketContractAddress} = props;

    const accountContext = useContext(AccountContext);

    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const openBuyModal = (title, index) => {
        setSelectedOption({
            title: title,
            index: index
        });
        setIsBuyModalOpen(true);
    }

    const openSellModal = (title, index) => {
        setSelectedOption({
            title: title,
            index: index
        });
        setIsSellModalOpen(true);
    };

    const handleOnTrade = () => {
    };

    return (
        <div className={classes.BuySellWidget}>
            <div className={classes.Title}>Buy/Sell Options</div>
            <div className={classes.OptionContainer}>
                {
                    get(marketInfo, ['info', 'choices'], []).map((entry, index) => {
                        return (
                            <div className={classes.OptionBlock}
                                key={`OptionBlock-2-${index}`}>
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
                                        onClick={() => { openSellModal(entry, index) }}
                                        size={"small"}
                                        className={classes.BuySellBtn}>
                                        Sell ({fromWei(get(smartState, ['marketWalletData', formatAddress(marketContractAddress), formatAddress(accountContext.account), 'accountBalances', index], 0), null, 2)})
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <MarketBuyWidget
                open={isBuyModalOpen}
                onClose={() => {
                    setIsBuyModalOpen(false);
                }}
                selectedOption={selectedOption}
                marketInfo={marketInfo}
                onTrade={handleOnTrade}
                onApprove={(type) => {
                }}
                marketContractAddress={props.marketContractAddress} />
            <MarketSellWidget open={isSellModalOpen}
                onClose={() => {
                    setIsSellModalOpen(false);
                }}
                marketInfo={marketInfo}
                selectedOption={selectedOption}
                onTrade={handleOnTrade}
                onApprove={(type) => {
                }}
                marketContractAddress={props.marketContractAddress} />
        </div>
    );
}

export default observer(BuySellWidget2);
