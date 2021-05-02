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
import FlareIcon from "@material-ui/icons/Flare";


export const useGetCanDisputeMarket = (minHoldingsToDispute, userBalances, didDisputedMarket) => {
    const [canDisputeMarket, setCanDisputeMarket] = useState(0);

    useEffect(() => {
        if(didDisputedMarket) {
            setCanDisputeMarket(false);
        } else {
            if(userBalances && (parseFloat(userBalances[0]) + parseFloat(userBalances[1])) > 0) {
                setCanDisputeMarket(true);
            } else {
                setCanDisputeMarket(false);
            }
        }
    }, [minHoldingsToDispute, userBalances, didDisputedMarket]);

    return canDisputeMarket;
};

export const useGetDidDisputedMarket = (walletDisputeVotes) => {
    const [didDisputedMarket, setDidDisputedMarket] = useState(null);

    useEffect(() => {
        if(walletDisputeVotes && walletDisputeVotes == 'N/A') {
            setDidDisputedMarket(true);
        } else {
            setDidDisputedMarket(false);
        }
    }, [walletDisputeVotes]);

    return didDisputedMarket;
};

function DisputeWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    //Dispute
    const [isProcessing, setIsProcessing] = useState(false);
    const [marketInfo, setMarketInfo] = useState(null);
    const [minHoldingsToDispute, setMinHoldingsToDispute] = useState(null);
    const [walletDisputeVotes, setWalletDisputeVotes] = useState(null);
    const didDisputedMarket = useGetDidDisputedMarket(walletDisputeVotes);
    const canDisputeMarket = useGetCanDisputeMarket(minHoldingsToDispute, props.walletOptionTokensBalance, didDisputedMarket);

    const isWalletEligibleToDispute = () => {
        return props.walletOptionTokensBalance && ((props.walletOptionTokensBalance[0] + props.walletOptionTokensBalance[1]) > 0);
    };

    const handleDispute = async () => {
        setIsProcessing(true);
        const marketApis = new MarketAPIs();

        try {
            await marketApis.disputeMarket(accountContext.account, props.marketContractAddress, "N/A");
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
        setWalletDisputeVotes(result);
    };

    const loadMarketInfo = async () => {
        const marketAPIs = new MarketAPIs();
        const result = await marketAPIs.getMarketInfo(accountContext.account, props.marketContractAddress);
        setMarketInfo(result);
    };

    useEffect(() => {
        if(accountContext.account && props.marketContractAddress && props.marketState == 7) {
            loadWalletVotes();
            loadMarketInfo();
            //loadMarketMinHoldingsToDispute();
        }
    }, [accountContext.account, props.marketContractAddress, props.marketState]);

    return (
        <div className={classes.DisputeWidget}>
            <div className={classes.DisputeWidget__Header}>
                <div>Dispute this market</div>
            </div>
            <div className={classes.DisputeWidget__Body}>
                {
                    marketInfo && (
                        <div>The community resolved this market to {marketInfo.resolvingVotesCount[0] > marketInfo.resolvingVotesCount[1] ? (<span className={classes.Yes}>Yes</span>) : (<span className={classes.No}>No</span>) }</div>
                    )
                }
                {
                    isWalletEligibleToDispute() && (
                        <div>Do you believe that the market was resolved in a wrong outcome?</div>
                    )
                }
                {
                    didDisputedMarket && (
                        <Alert style={{
                                   borderRadius: '16px',
                                    marginTop: '15px',

                               }}
                               severity="info">You already applied for a dispute on this market</Alert>
                    )
                }
            </div>
            {
                isWalletEligibleToDispute() && (
                    <Button color="primary"
                            size={"large"}
                            onClick={handleDispute}
                            isDisabled={didDisputedMarket}
                            isProcessing={isProcessing}
                            fullWidth={true}>Dispute</Button>
                )
            }
        </div>
    );
}

export default DisputeWidget;
