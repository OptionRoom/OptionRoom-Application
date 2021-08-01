import React, {useContext, useEffect, useState} from "react";

import {useStyles} from "./styles";
import OptionBlock from "../OptionBlock";
import numeral from "numeral";
import {get} from "lodash";
import Button from "../Button";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei, toWei} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";
import OutcomeProgress from "../OutcomeProgress";

function RedeemMarketRewardsWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    //Vote
    const [isProcessing, setIsProcessing] = useState(false);
    const [marketInfo, setMarketInfo] = useState(null);

    const handleRedeem = async () => {
        setIsProcessing(true);
        const marketApis = new MarketAPIs(props.marketVersion);
        try {
            await marketApis.redeemMarketRewards(accountContext.account, props.marketContractAddress);
            props.onRedeem && props.onRedeem();
        } catch (e) {

        } finally {
            setIsProcessing(false);
        }
    };

    const loadMarketInfo = async () => {
        const marketAPIs = new MarketAPIs(props.marketVersion);
        const result = await marketAPIs.getMarketInfo(accountContext.account, props.marketContractAddress);
        setMarketInfo(result);
    };

    const getUserRewardsVal =  () => {
        if(!marketInfo || !props.walletOptionTokensBalance) {
            return;
        }

        if(marketInfo.resolvingVotesCount[0] > marketInfo.resolvingVotesCount[1]) {
            return props.walletOptionTokensBalance[0];
        }

        return props.walletOptionTokensBalance[1];
    };

    useEffect(() => {
        loadMarketInfo();
    }, []);

    return (
        <div className={classes.RedeemMarketRewardsWidget}>
            <div className={classes.RedeemMarketRewardsWidget__Header}>Redeem your rewards</div>
            <div className={classes.RedeemMarketRewardsWidget__Content}>
                {
                    marketInfo && (
                        <div>The community resolved this market to {marketInfo.resolvingVotesCount[0] > marketInfo.resolvingVotesCount[1] ? (<span className={classes.Yes}>Yes</span>) : (<span className={classes.No}>No</span>) }</div>
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
