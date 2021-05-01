import React, {useContext, useEffect, useState} from "react";
import Alert from '@material-ui/lab/Alert';

import {useStyles} from "./styles";
import OptionBlock from "../OptionBlock";
import numeral from "numeral";
import {get} from "lodash";
import Button from "../Button";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {fromWei, toWei} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";
import OutcomeProgress from "../OutcomeProgress";


export const useGetCanDisputeMarket = (minHoldingsToDispute, userBalances, didDisputedMarket) => {
    const [canDisputeMarket, setCanDisputeMarket] = useState(0);

    useEffect(() => {
        if(didDisputedMarket) {
            setCanDisputeMarket(false);
        } else {
            if(minHoldingsToDispute && userBalances) {
                if((parseFloat(userBalances[0]) + parseFloat(userBalances[1])) >= parseFloat(minHoldingsToDispute)) {
                    setCanDisputeMarket(true);
                } else {
                    setCanDisputeMarket(false);
                }
            }
        }
    }, [minHoldingsToDispute, userBalances]);

    return canDisputeMarket;
};

export const useGetDidDisputedMarket = (votes) => {
    const [didDisputedMarket, setDidDisputedMarket] = useState(null);

    useEffect(() => {
        if(votes) {
            if(votes.totalBalances > 0) {
                setDidDisputedMarket(true);
            } else {
                setDidDisputedMarket(false);
            }
        }
    }, [votes]);

    return didDisputedMarket;
};

function DisputeWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    //Dispute
    const [isProcessing, setIsProcessing] = useState(false);
    const [minHoldingsToDispute, setMinHoldingsToDispute] = useState(null);
    const [walletDisputeVotes, setWalletDisputeVotes] = useState(null);
    const didDisputedMarket = useGetDidDisputedMarket(minHoldingsToDispute, props.walletOptionTokensBalance);
    const canDisputeMarket = useGetCanDisputeMarket(minHoldingsToDispute, props.walletOptionTokensBalance, didDisputedMarket);

    const handleDispute = async () => {
        setIsProcessing(true);
        const marketApis = new MarketAPIs();

        try {
            await marketApis.disputeMarket(accountContext.account, props.marketContractAddress, "Hello");
            loadWalletVotes();
            props.onDispute && props.onDispute();
        } catch (e) {

        } finally {
            setIsProcessing(false);
        }
    };

    const loadMarketMinHoldingsToDispute = async () => {
        const marketAPIs = new MarketAPIs();
        const result = await marketAPIs.getMarketMinHoldingsToDispute(accountContext.account, props.marketContractAddress);
        setMinHoldingsToDispute(result);
    };

    const loadWalletVotes = async () => {
        const marketAPIs = new MarketAPIs();
        const result = await marketAPIs.getWalletVotesOnMarket(accountContext.account, props.marketContractAddress, props.marketState);
        console.log("result", result);
        setWalletDisputeVotes(result);
    };

    useEffect(() => {
        if(accountContext.account && props.marketContractAddress && props.marketState == 7) {
            loadWalletVotes();
            loadMarketMinHoldingsToDispute();
        }
    }, [accountContext.account, props.marketContractAddress, props.marketState]);

    return (
        <div className={classes.DisputeWidget}>
            <div className={classes.DisputeWidget__Header}>
                <div>Dispute this market</div>
            </div>
            <div className={classes.DisputeWidget__Body}>
                <div>Do you believe that the market was resolved in a wrong outcome?</div>
                {
                    minHoldingsToDispute && (
                        <Alert severity="info">To dispute this market you must hold at least {fromWei(minHoldingsToDispute)} tokens of the market options</Alert>
                    )
                }
            </div>
            <Button color="primary"
                    size={"large"}
                    onClick={handleDispute}
                    isDisabled={!canDisputeMarket}
                    isProcessing={isProcessing}
                    fullWidth={true}>Dispute</Button>
        </div>
    );
}

export default DisputeWidget;
