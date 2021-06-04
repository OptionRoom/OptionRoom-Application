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
    const [voteInput, setVoteInput] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [marketVotes, setMarketVotes] = useState(null);
    const [walletVote, setWalletVote] = useState(null);

    const handleVote = async () => {
        setIsProcessing(true);
        const marketApis = new MarketAPIs();

        const voteVal = voteInput.toLowerCase() === 'yes' ? (props.marketState == 1 ? true : 0) : (props.marketState == 1 ? false : 1);

        try {
            await marketApis.addGovernanceVoteForMarket(accountContext.account, props.marketContractAddress, voteVal, props.marketState);
            loadVote();
            loadWalletVotes();
            props.onVote && props.onVote();
        } catch (e) {

        } finally {
            setIsProcessing(false);
        }
    };

    const handleWithdrawVote = async () => {
        setIsProcessing(true);
        const marketApis = new MarketAPIs();

        try {
            await marketApis.withdrawMarketVote(accountContext.account, props.marketContractAddress, props.marketState);
            loadVote();
            loadWalletVotes();
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

        if(props.marketState == 5 || props.marketState == 8) {
            return 'Your participation will help to resolve the market';
        }
    }

    const loadVote = async () => {
        const marketAPIs = new MarketAPIs();
        const votes = await marketAPIs.getMarketInfo(accountContext.account, props.marketContractAddress);
        console.log("votes", votes);
        if(props.marketState == 1) {
            const validatingVotesCount = votes.validatingVotesCount;
            const formattedVotes = [];
            formattedVotes[1] = (parseFloat(validatingVotesCount[0])/(parseFloat(validatingVotesCount[0]) + parseFloat(validatingVotesCount[1]))) * 100;
            formattedVotes[0] = (parseFloat(validatingVotesCount[1])/(parseFloat(validatingVotesCount[0]) + parseFloat(validatingVotesCount[1]))) * 100;
            setMarketVotes(formattedVotes);
        } else if(props.marketState == 5 || props.marketState == 8) {
            const validatingVotesCount = votes.resolvingVotesCount;
            const formattedVotes = [];
            formattedVotes[0] = (parseFloat(validatingVotesCount[0])/(parseFloat(validatingVotesCount[0]) + parseFloat(validatingVotesCount[1]))) * 100;
            formattedVotes[1] = (parseFloat(validatingVotesCount[1])/(parseFloat(validatingVotesCount[0]) + parseFloat(validatingVotesCount[1]))) * 100;
            setMarketVotes(formattedVotes);
        }
    };

    const loadWalletVotes = async () => {
        const marketAPIs = new MarketAPIs();
        const votes = await marketAPIs.getWalletVotesOnMarket(accountContext.account, props.marketContractAddress, props.marketState);
        console.log("votes", votes);
        setWalletVote(votes);
    };

    useEffect(() => {
        if(accountContext.account && props.marketContractAddress && (props.marketState !== null && props.marketState !== undefined)) {
            loadWalletVotes();
        }
    }, [accountContext.account, props.marketContractAddress, props.marketState]);

    const getWalletValidationTxt = () => {
        if(!walletVote || !walletVote.selection) {
            return;
        }

        if(props.marketState == 1) {
            return walletVote.selection == 1 ? 'Valid': 'Invalid';
        }

        if(props.marketState == 5 || props.marketState == 8) {
            return walletVote.selection == 0 ? 'Yes': 'No';
        }
    };

    useEffect(() => {
        loadVote();
    }, []);

    return (
        <div className={classes.VoteWidget}>
            <div className={classes.VoteWidget__Header}>Pick Outcome</div>
            {!!getHeaderTxt() && (
                <div className={classes.HeaderSubTxt}>{getHeaderTxt()}</div>
            )}
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
            {
                (!walletVote || !walletVote.voteFlag) ? (
                    <>
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
                                isDisabled={!voteInput}
                                isProcessing={isProcessing}
                                fullWidth={true}>Vote</Button>
                    </>
                ) : (
                    <>
                        <div className={classes.VoteWidget__Options}>
                            You voted on this market to {getWalletValidationTxt()}
                        </div>
                        <Button color="primary"
                                size={"large"}
                                onClick={handleWithdrawVote}
                                isProcessing={isProcessing}
                                fullWidth={true}>Withdraw</Button>
                    </>
                )
            }
        </div>
    );
}

export default VoteWidget;
