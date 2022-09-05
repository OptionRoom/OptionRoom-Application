import React, {useContext, useEffect, useState} from "react";
import Alert from '@material-ui/lab/Alert';

import {useStyles} from "./styles";
import {get} from "lodash";
import Button from "../Button";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import {AccountContext} from "../../shared/AccountContextProvider";
import {
    disputeMarket,
    getMarketDisputers,
    getResolvingOutcome,
} from "../../methods/or-market-governance.methods";


export const useGetCanDisputeMarket = (minHoldingsToDispute, userBalances, didDisputedMarket) => {
    const [canDisputeMarket, setCanDisputeMarket] = useState(0);
    useEffect(() => {
        if(didDisputedMarket) {
            setCanDisputeMarket(false);
        } else {
            if(get(userBalances, ['accountBalances'], []).some(el => parseFloat(el) > 0)) {
                setCanDisputeMarket(true);
            } else {
                setCanDisputeMarket(false);
            }
        }
    }, [minHoldingsToDispute, userBalances, didDisputedMarket]);

    return canDisputeMarket;
};

export const useGetMarketResolvingOutcome = (wallet, address, info) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const init = async () => {
            const data = await getResolvingOutcome(wallet, address, get(info, ['choices']).length);
            setData(data);
        }

        init();
    }, [wallet, address]);

    return data;
};

function DisputeWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    //Dispute
    const [isProcessing, setIsProcessing] = useState(false);
    const [minHoldingsToDispute, setMinHoldingsToDispute] = useState(null);
    const [walletDisputeVotes, setWalletDisputeVotes] = useState(false);
    const resolvingOutcome = useGetMarketResolvingOutcome(accountContext.account, props.marketContractAddress, props.info.info);
    const canDisputeMarket = useGetCanDisputeMarket(minHoldingsToDispute, props.marketWalletData, walletDisputeVotes);

    const handleDispute = async () => {
        setIsProcessing(true);

        try {
            await disputeMarket(accountContext.account, props.marketContractAddress, "N/A");
            loadWalletVotes();
            props.onDispute && props.onDispute();
        } catch (e) {

        } finally {
            setIsProcessing(false);
        }
    };

    const loadMarketMinHoldingsToDispute = async () => {
        const marketAPIs = new MarketAPIs(props.marketVersion);
        const result = await marketAPIs.getMarketMinHoldingsToDispute(accountContext.account, props.marketContractAddress);
        setMinHoldingsToDispute(result);
    };

    const loadWalletVotes = async () => {
        const result = await getMarketDisputers(accountContext.account, props.marketContractAddress);
        setWalletDisputeVotes(result);
    };

    useEffect(() => {
        if(accountContext.account && props.marketContractAddress && props.marketState == 7) {
            loadWalletVotes();
        }
    }, [accountContext.account, props.marketContractAddress, props.marketState]);

    return (
        <div className={classes.DisputeWidget}>
            <div className={classes.DisputeWidget__Header}>
                Dispute this market
            </div>
            <div className={classes.DisputeWidget__Body}>
                {
                    (get(props.info, 'info') && resolvingOutcome) && (
                        <div>The community resolved this market to <strong>{get(props.info, ['info', 'choices', resolvingOutcome['outComeIndex']])}</strong></div>
                    )
                }
                {
                    canDisputeMarket && (
                        <div>Do you believe that the market was resolved in a wrong outcome?</div>
                    )
                }
                {
                    walletDisputeVotes && (
                        <Alert style={{
                                   borderRadius: '16px',
                                    marginTop: '15px',

                               }}
                               severity="info">You already applied for a dispute on this market</Alert>
                    )
                }
            </div>
            {
                canDisputeMarket && (
                    <Button color="primary"
                            size={"large"}
                            onClick={handleDispute}
                            isDisabled={walletDisputeVotes}
                            isProcessing={isProcessing}
                            fullWidth={true}>Dispute</Button>
                )
            }
        </div>
    );
}

export default DisputeWidget;
