import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {useParams} from "react-router-dom";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";
import {useStyles} from "./styles";
import VoteWidget from "../../components/VoteWidget";
import ChainAlert from "../../components/ChainAlert";
import OrLoader from "../../components/OrLoader";
import OracleApis from "../../shared/contracts/OracleApis";
import {useGetIsChainSupported} from "../../shared/hooks";
import {ChainNetworks} from "./../../shared/constants";
import GovernanceRewardsWidget from "../../components/GovernanceRewardsWidget";

const supportedChains = [ChainNetworks.ROPSTEN];

function Governance() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);
    const isChainSupported = useGetIsChainSupported(supportedChains);
    const [isLoading, setIsLoading] = useState(true);
    const [proposal, setProposal] = useState(null);
    const [categories, setCategories] = useState(null);
    const {governanceId} = useParams();

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            const oracleApis = new OracleApis();

            setIsLoading(true);
            const categories = await oracleApis.getAllCategories(accountContext.account, governanceId);
            setCategories(categories);
            const question = await oracleApis.getQuestionInfo(accountContext.account, governanceId);
            setProposal({
                ...question,
                cats: question.categoriesIndices.map((entry) => {
                    return categories[entry];
                })
            });
            setIsLoading(false);
        };

        if (accountContext.account && isChainSupported) {
            init();
        }
    }, [accountContext.account, isChainSupported]);

    if(!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    if(!isChainSupported) {
        return (
            <ChainAlert supportedChain={supportedChains.join(', ')}/>
        )
    }

    if(isLoading) {
        return (
            <div className={classes.LoadingWrapper}>
                <OrLoader width={400}
                          height={400}/>
            </div>
        )
    }

    return (
        <>
            <div className={classes.ProposalPage}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <div className={classes.MarketDetails}>
                            <div className={classes.Cat}>
                                {proposal.cats.join(', ')}
                            </div>
                            <div className={classes.Title}>{proposal.question}</div>
                            <div className={classes.About}>
                                <div className={classes.About__Header}>
                                    About
                                </div>
                                <div className={classes.About__Details}>
                                    {proposal.description}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.MarketSidebar}>
                            <VoteWidget
                                type={'proposal'}
                                marketState={5}
                                marketVersion={'2.0'}
                                showProgressPercentage={true}
                                showDonutOnOptionBlock={false}
                                marketContractAddress={governanceId}/>
                            <GovernanceRewardsWidget proposal={proposal}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Governance;
