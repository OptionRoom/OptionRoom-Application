import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import clsx from "clsx";
import { get } from "lodash";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

import { useStyles } from "./styles";
import OracleApis from "../../../shared/contracts/OracleApis";
import {useGetFilteredProposals} from "../hooks";
import {AccountContext} from "../../../shared/AccountContextProvider";
import GovernanceCard from "../../../components/GovernanceCard";
import {ChainNetworks} from "../../../shared/constants";
import ChainAlert from "../../../components/ChainAlert";
import OrLoader from "../../../components/OrLoader";

const supportedChains = [ChainNetworks.ROPSTEN];

function GovernanceOracle(props) {
    const classes = useStyles();
    const {
        filterDetails,
    } = props;
    const [markets, setMarkets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const accountContext = useContext(AccountContext);
    const filteredProposals = useGetFilteredProposals(markets, filterDetails.name, filterDetails.category, filterDetails.state, filterDetails.sort);

    const isChainSupported = () => {
        let isSupported = false;
        supportedChains.forEach((entry) => {
            if(accountContext.isChain(entry)) {
                isSupported = true;
            }
        });

        return isSupported;
    };

    useEffect(() => {
        const init = async () => {
            const oracleApis = new OracleApis();

            setIsLoading(true);
            const allCategories = await oracleApis.getAllCategories(accountContext.account);
            let marketsResult = await oracleApis.getAllQuestions(accountContext.account);
            marketsResult = marketsResult.map((entry) => {
                return {
                    ...entry,
                    cats: entry.categoriesIndices.map((entry1) => {
                        return allCategories[parseInt(entry1) - 1];
                    })
                };
            });

            setMarkets(marketsResult);
            setIsLoading(false);
        };

        if (accountContext.account && isChainSupported()) {
            init();
        }
    }, [accountContext.account, accountContext.chainId]);

    if(!isChainSupported()) {
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
        <div>
            {
                filteredProposals.length == 0 && (
                    <div className={classes.notFoundResults}>
                        <SentimentDissatisfiedIcon/>
                        <div>We couldn't find any markets that match your search, please try another time</div>
                    </div>
                )
            }
            {filteredProposals && filteredProposals.length > 0 && (
                <div
                    className={clsx(classes.MarketsList, {
                        [classes.MarketsList__ListView]:
                        get(filterDetails, "view") === "list",
                    })}
                >
                    {
                        filteredProposals.map((entry, index) => {
                            return (
                                <div key={`market-${entry.qid}`}>
                                    <Link
                                        to={`/governance/${entry.qid}`}
                                    >
                                        <GovernanceCard proposal={entry}/>
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default GovernanceOracle;
