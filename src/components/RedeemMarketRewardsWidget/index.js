import React, {useContext, useEffect, useState} from "react";

import {useStyles} from "./styles";
import {get} from "lodash";
import Button from "../Button";
import {fromWei, toWei} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";
import {redeemMarketRewards} from "../../methods/market-controller.methods";
import {getResolvingOutcome} from "../../methods/or-market-governance.methods";
import {useGetWalletBalanceOfMarketOptions} from "../MarketSellWidget";

export const useGetMarketResolvingOutcome = (wallet, address, info) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const init = async () => {
            const data = await getResolvingOutcome(wallet, address, get(info, ['info', 'choices'], []).length);
            setData(data);
        }

        init();
    }, [wallet, address]);

    return data;
};

function RedeemMarketRewardsWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    const resolvingOutcome = useGetMarketResolvingOutcome(accountContext.account, props.marketContractAddress, props.info);
    const walletBalanceOfMarketOptions = useGetWalletBalanceOfMarketOptions(accountContext.account, props.marketContractAddress);

    const [isProcessing, setIsProcessing] = useState(false);

    const handleRedeem = async () => {
        setIsProcessing(true);
        try {
            await redeemMarketRewards(accountContext.account, props.marketContractAddress);
            props.onRedeem && props.onRedeem();
        } catch (e) {

        } finally {
            setIsProcessing(false);
        }
    };

    const getUserRewardsVal =  () => {
        if(resolvingOutcome === null || !walletBalanceOfMarketOptions || !walletBalanceOfMarketOptions.data || walletBalanceOfMarketOptions.data.length == 0) {
            return;
        }

        return walletBalanceOfMarketOptions.data[resolvingOutcome['outComeIndex']];
    };

    return (
        <div className={classes.RedeemMarketRewardsWidget}>
            <div className={classes.RedeemMarketRewardsWidget__Header}>Redeem your rewards</div>
            <div className={classes.RedeemMarketRewardsWidget__Content}>
                {
                    (resolvingOutcome) && (
                        <div>The community resolved this market to <strong>{get(props.info, ['info', 'choices', resolvingOutcome['outComeIndex']])}</strong></div>
                    )
                }
                {
                    getUserRewardsVal() > 0 ? `You have a total of ${fromWei(getUserRewardsVal(), null, 5)}` : null
                }
            </div>
            {
                getUserRewardsVal() > 0 && (
                    <Button color="primary"
                            size={"large"}
                            onClick={handleRedeem}
                            isProcessing={isProcessing}
                            fullWidth={true}>Redeem</Button>
                )
            }
        </div>
    );
}

export default RedeemMarketRewardsWidget;
