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
    const [marketOutcomeResult, setMarketOutcomeResult] = useState(null);

    const handleRedeem = async () => {
        console.log("Dd");
        setIsProcessing(true);
        const marketApis = new MarketAPIs();
        try {
            await marketApis.redeemMarketRewards(accountContext.account, props.marketContractAddress);
            props.onRedeem && props.onRedeem();
        } catch (e) {

        } finally {
            setIsProcessing(false);
        }
    };

    const loadVote = async () => {
        const marketAPIs = new MarketAPIs();
        const outcome = await marketAPIs.getMarketVoting(accountContext.account, props.marketContractAddress, props.marketState);
        setMarketOutcomeResult(outcome);
    };

    const getUserRewardsVal =  () => {
        if(!marketOutcomeResult) {
            return 0;
        }

        if(!props.walletOptionTokensBalance || props.walletOptionTokensBalance.length === 0) {
            return 0;
        }

        if(marketOutcomeResult[0] == marketOutcomeResult[1]) {
            return (props.walletOptionTokensBalance[0] + props.walletOptionTokensBalance[1]) / 2;
        }

        if(marketOutcomeResult[0] > marketOutcomeResult[1]) {
            return props.walletOptionTokensBalance[0];
        }

        return props.walletOptionTokensBalance[1];
    };

    useEffect(() => {
        loadVote();
    }, []);

    return (
        <div className={classes.RedeemMarketRewardsWidget}>
            <div className={classes.RedeemMarketRewardsWidget__Header}>Redeem your rewards</div>
            <div className={classes.RedeemMarketRewardsWidget__Content}>
                You have a total of {fromWei(getUserRewardsVal(), null, 5)}
            </div>
            <Button color="primary"
                    size={"large"}
                    onClick={handleRedeem}
                    isProcessing={isProcessing}
                    isDisabled={getUserRewardsVal() === 0}
                    fullWidth={true}>Redeem</Button>
        </div>
    );
}

export default RedeemMarketRewardsWidget;
