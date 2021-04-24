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



function VoteWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    //Vote
    const [voteInput, setVoteInput] = useState('yes');
    const [isProcessing, setIsProcessing] = useState(false);
    const [marketVotes, setMarketVotes] = useState(null);

    const handleVote = async () => {
        setIsProcessing(true);
        const marketApis = new MarketAPIs();

        const voteVal = voteInput.toLowerCase() === 'yes' ? (props.marketState == 1 ? true : 0) : (props.marketState == 1 ? false : 1);

        try {
            await marketApis.addGovernanceVoteForMarket(accountContext.account, props.marketContractAddress, voteVal, props.marketState);
            loadVote();
            props.onVote && props.onVote();
        } catch (e) {

        } finally {
            setIsProcessing(false);
        }
    };

    const getHeaderTxt = () => {
        if(props.marketState == 1) {
            return 'Your participation will help to approve or reject the market';
        }

        if(props.marketState == 5) {
            return 'Your participation will help to resolve the market';
        }
    }

    const loadVote = async () => {
        const marketAPIs = new MarketAPIs();
        const votes = await marketAPIs.getMarketVoting(accountContext.account, props.marketContractAddress, props.marketState);
        if(props.marketState == 1) {
            const formattedVotes = [];
            formattedVotes[0] = (parseFloat(votes[0])/(parseFloat(votes[0]) + parseFloat(votes[1]))) * 100;
            formattedVotes[1] = (parseFloat(votes[1])/(parseFloat(votes[0]) + parseFloat(votes[1]))) * 100;
            setMarketVotes(formattedVotes);
        } else {
            setMarketVotes(votes);
        }
    };

    useEffect(() => {
        loadVote();
    }, []);

    return (
        <div className={classes.VoteWidget}>
            <div className={classes.VoteWidget__Header}>
                <div>Pick Outcome</div>
                {!!getHeaderTxt() && (
                    <div>{getHeaderTxt()}</div>
                )}
            </div>
            <div className={classes.VoteWidget__Progress}>
                <div>
                    <OutcomeProgress title={'Yes'}
                                     percent={get(marketVotes, ['0'])}
                                     color={'#86DC8B'}/>
                </div>
                <div>
                    <OutcomeProgress title={'No'}
                                     percent={get(marketVotes, ['1'])}
                                     color={'#7084FF'}/>
                </div>
            </div>
            <div className={classes.VoteWidget__Options}>
                <div className={classes.Options__Options}>
                    {
                        ['Yes', 'No'].map((entry) => {
                            return (
                                <OptionBlock isSelected={voteInput === entry.toLowerCase()}
                                             onClick={(value) => {
                                                 setVoteInput(value.toLowerCase());
                                             }}
                                             title={entry}/>
                            )
                        })
                    }
                </div>
            </div>
            <Button color="primary"
                    size={"large"}
                    onClick={handleVote}
                    isProcessing={isProcessing}
                    fullWidth={true}>Vote</Button>
        </div>
    );
}

export default VoteWidget;
