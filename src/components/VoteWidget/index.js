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
import OracleApis from "../../shared/contracts/OracleApis";
import clsx from "clsx";



function VoteWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    //Vote
    const [voteInput, setVoteInput] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [marketVotes, setMarketVotes] = useState(null);
    const [walletVote, setWalletVote] = useState(null);
    const [proposal, setProposal] = useState(null);

    const handleVote = async () => {
        setIsProcessing(true);


        try {
            if(props.type === 'proposal') {
                const oracleApis = new OracleApis();
                await oracleApis.vote(accountContext.account, props.marketContractAddress, voteInput);
            } else {
                let voteVal = voteInput;
                if(props.marketState == 1) {
                    voteVal = voteInput === 0 ? true : false;
                }
                const marketApis = new MarketAPIs(props.marketVersion);
                await marketApis.addGovernanceVoteForMarket(accountContext.account, props.marketContractAddress, voteVal, props.marketState);
            }

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
        const marketApis = new MarketAPIs(props.marketVersion);

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
        if(props.type === 'proposal') {
            const oracleApis = new OracleApis();
            const question = await oracleApis.getQuestionInfo(accountContext.account, props.marketContractAddress);
            setProposal(question);
            console.log("question", question);
            const formattedVotes = [];
            let totalVotes = 0;
            question.votesCounts.forEach((e) => {
                totalVotes += e;
            });
            question.votesCounts.forEach((e, index) => {
                formattedVotes[index] = e/totalVotes;
            });

            setMarketVotes(formattedVotes);
        } else {
            const marketAPIs = new MarketAPIs(props.marketVersion);
            const votes = await marketAPIs.getMarketInfo(accountContext.account, props.marketContractAddress);
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
        }
    };

    const loadWalletVotes = async () => {
        if(props.type === 'proposal') {
            const oracleApis = new OracleApis();
            const votes = await oracleApis.getVoteCheck(accountContext.account, props.marketContractAddress);
            setWalletVote(votes);
        } else {
            const marketAPIs = new MarketAPIs(props.marketVersion);
            const votes = await marketAPIs.getWalletVotesOnMarket(accountContext.account, props.marketContractAddress, props.marketState);
            setWalletVote(votes);
        }
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

    const getOptions = () => {
        if(props.type === 'proposal') {
            return (proposal && proposal.choices) || [];
        } else {
            return ['Yes', 'No'];
        }
    };

    const showVoteAction = () => {
        if(props.type === 'proposal') {
            return proposal && ((new Date(proposal.endTime * 1000).getTime()) > new Date().getTime());
        } else {
            return (!walletVote || !walletVote.voteFlag);
        }
    };

    const showVotedSection = () => {
        if(props.type === 'proposal') {

        } else {
            return walletVote && walletVote.voteFlag;
        }
    };

    const showWithdrawVoteSection = () => {
        if(props.type === 'proposal') {
            return false;
        }

        return true;
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
            {
                props.showProgressPercentage && (
                    <div className={classes.VoteWidget__Progress}>
                        {
                            getOptions().map((e, index) => {
                                return (
                                    <div key={`option-${index}`}>
                                        <OutcomeProgress title={e}
                                                         percent={get(marketVotes, [index])}
                                                         color={'#86DC8B'}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
            {
                showVoteAction() && (
                    <>
                        <div className={classes.VoteWidget__Options}>
                            <div className={clsx(classes.Options__Options, {
                                     [classes.Options__OptionsMarket] : props.type !== 'proposal',
                                 })}>
                                {
                                    getOptions().map((entry, index) => {
                                        return (
                                            <OptionBlock value={get(marketVotes, [index]) || 0}
                                                         isSelected={voteInput === index}
                                                         onClick={(value) => {
                                                             setVoteInput(index);
                                                         }}
                                                         showDonut={props.showDonutOnOptionBlock}
                                                         showValueInChoice={false}
                                                         title={entry}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <Button color="primary"
                                size={"large"}
                                onClick={handleVote}
                                isDisabled={voteInput === null}
                                isProcessing={isProcessing}
                                fullWidth={true}>Vote</Button>
                    </>
                )
            }
            {
                showVotedSection() && (
                    <>
                        <div className={classes.VoteWidget__Options}>
                            You voted on this market to {getWalletValidationTxt()}
                        </div>
                        {
                            showWithdrawVoteSection() && (
                                <Button color="primary"
                                        size={"large"}
                                        onClick={handleWithdrawVote}
                                        isProcessing={isProcessing}
                                        fullWidth={true}>Withdraw</Button>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}

export default VoteWidget;
