import React, {useState, useContext, useEffect} from "react";
import {
    useQuery,
} from "react-query";
import {GovernanceTypes, FiltrationWidgetTypes} from './constants';
import OracleApis from "./contracts/OracleApis";
import {AccountContext} from "./AccountContextProvider";
import {getCategories} from "../methods/market-controller.methods";
import {getWalletAllowanceOfContractToSpender, getWalletBalanceOfContract} from "../methods/shared.methods";

export const useGetMarketCategories = (type, wallet) => {
    const [marketCategories, setMarketCategories] = useState([]);

    useEffect(() => {
        const init = async () => {
            if(type === GovernanceTypes.MARKET) {
                const cats = await getCategories(wallet);
                const mappedCats = cats.map((entry, index) => {
                    return {
                        id: index,
                        title: entry
                    };
                });

                setMarketCategories(mappedCats);
            } else if(type === GovernanceTypes.ORACLE) {
                try {
                    const oracleApis = new OracleApis();
                    const allCategories = await oracleApis.getAllCategories(wallet);
                    setMarketCategories(allCategories);
                } catch (e) {

                }
            }
        }

        if(type && wallet) {
            init();
        }
    }, [type, wallet]);

    return marketCategories;
}

export const useGetIsChainSupported = (supportedChains) => {
    const [isChainSupported, setIsChainSupported] = useState(false);
    const accountContext = useContext(AccountContext);

    useEffect(() => {
        let isSupported = false;
        supportedChains.forEach((entry) => {
            if(accountContext.isChain(entry)) {
                isSupported = true;
            }
        });

        setIsChainSupported(isSupported);

    }, [supportedChains, accountContext.chainId]);

    return isChainSupported;
}

export const useGetWalletBalanceOfToken = (wallet, token) => {
    return useQuery(["WalletBalanceOfToken", wallet, token], () => getWalletBalanceOfContract(wallet, token), {
        enabled: !!wallet && !!token,
    });
}

export const useGetWalletAllowanceOfContractToSpender = (wallet, source, spender) => {
    return useQuery(["WalletAllowanceOfContractToSpender", wallet, source, spender], () => getWalletAllowanceOfContractToSpender(wallet, source, spender), {
        enabled: !!wallet && !!source && !spender,
    });
}
