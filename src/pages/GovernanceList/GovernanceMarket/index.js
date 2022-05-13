import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import clsx from "clsx";
import { get } from "lodash";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

import { useStyles } from "./styles";
import {useGetFilteredMarkets} from '../../Markets/hooks';
import {AccountContext} from "../../../shared/AccountContextProvider";
import {ChainNetworks} from "../../../shared/constants";
import ChainAlert from "../../../components/ChainAlert";
import OrLoader from "../../../components/OrLoader";
import MarketCard from "../../../components/MarketCard";
import {useGetIsChainSupported} from "../../../shared/hooks";
import {getAllMarkets} from "../../../methods/market-controller.methods";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET, ChainNetworks.BINANCE_SMART_CHAIN, ChainNetworks.LOCAL_CHAIN];

function GovernanceMarket(props) {
    const classes = useStyles();
    const {
        filterDetails,
    } = props;
    const [markets, setMarkets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const accountContext = useContext(AccountContext);
    const tradedOnly = false;
    const [tradedByWallet, setTradedByWallet] = useState([]);

    const filteredProposals = useGetFilteredMarkets(
        markets,
        filterDetails.name,
        filterDetails.category,
        filterDetails.sort,
        tradedOnly,
        filterDetails.state.id,
        tradedByWallet
    );

    const isChainSupported = useGetIsChainSupported(supportedChains);

    useEffect(() => {
        const init = async () => {

            setIsLoading(true);
            const marketContracts = await getAllMarkets(
                accountContext.account,
                true,
                true,
                false,
                true,
                true
            );

            setMarkets(marketContracts);
            setIsLoading(false);
        };

        if (accountContext.account && isChainSupported) {
            init();
        }
    }, [accountContext.account, isChainSupported]);

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
                                <div key={`market-${entry.address}`}>
                                    <Link
                                        to={`/markets/${entry.address}`}
                                    >
                                        <MarketCard
                                            market={entry}
                                            isListView={
                                                get(filterDetails, "view") === "list"
                                            }
                                            isFeatured={get(entry, ['dbData', 'isFeatured'], false)}
                                        />
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

export default GovernanceMarket;
