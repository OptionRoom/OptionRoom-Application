import React, {useContext, useEffect, useState} from 'react';
import {get} from 'lodash';
import swal from "sweetalert";

import {useStyles} from './styles'
import {useGetIsChainSupported} from "../../shared/hooks";
import {ChainNetworks} from "../../shared/constants";
import {AccountContext} from "../../shared/AccountContextProvider";
import OracleApis from "../../shared/contracts/OracleApis";
import Button from "../Button";
import {fromWei} from "../../shared/helper";
import NewCourtClaimAPIs from "../../shared/contracts/NewCourtClaimAPIs";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET, ChainNetworks.ROPSTEN];

function GovernanceRewardsWidget(props) {

    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [rewards, setRewards] = useState(null);

    const isChainSupported = useGetIsChainSupported(supportedChains);
    const {
        proposal
    } = props;

    const handleClaim = async () => {
        swal({
            title: "Confirm?",
            text: `This will claim all rewards on Oracle requests not only this proposal`,
            buttons: true,
        })
            .then(async (confirmClaim) =>  {
                if(confirmClaim) {
                    try {
                        setIsProcessing(true);
                        const oracleApis = new OracleApis();
                        await oracleApis.claimRewards(accountContext.account);
                        await handleLoadRewards();
                    } catch (e) {

                    } finally {
                        setIsProcessing(false);
                    }
                }
            });
    };

    const handleLoadRewards = async () => {
        const oracleApis = new OracleApis();
        const rewards = await oracleApis.getRewardInfoForQuestion(accountContext.account, proposal.qid);
        setRewards(rewards);
    };

    useEffect(() => {
        const init = async () => {
            handleLoadRewards();
        };

        if (accountContext.account && isChainSupported && proposal) {
            init();
        }
    }, [accountContext.account, isChainSupported, proposal]);


    return (
        <div className={classes.GovernanceRewardsWidget}>
            <div className={classes.GovernanceRewardsWidget__Header}>Redeem your rewards</div>
            <div className={classes.GovernanceRewardsWidget__Content}>
                <ul className={classes.RewardsList}>
                    <li>
                        <span>Claimable:</span>
                        <span>{fromWei(get(rewards, ['claimableRewards'], 0))} ROOM</span>
                    </li>
                    <li>
                        <span>Claimed:</span>
                        <span>{fromWei(get(rewards, ['claimedRewards'], 0))} ROOM</span>
                    </li>
                    <li>
                        <span>Expected Today:</span>
                        <span>{fromWei(get(rewards, ['expectedRewards'], 0))} ROOM</span>
                    </li>
                </ul>
                <Button color="primary"
                        size={"small"}
                        onClick={handleClaim}
                        isDisabled={get(rewards, ['claimableRewards'], 0) == 0}
                        isProcessing={isProcessing}>Redeem</Button>
            </div>
        </div>
    );
}

export default GovernanceRewardsWidget;
