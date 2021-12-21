import React, {useState, useContext, useEffect} from "react";
import {getMarketCategories} from "./firestore.service";
import {GovernanceTypes, FiltrationWidgetTypes} from './constants';
import OracleApis from "./contracts/OracleApis";
import {AccountContext} from "./AccountContextProvider";

export const useGetMarketCategories = (type, wallet) => {
    const [marketCategories, setMarketCategories] = useState([]);

    useEffect(() => {
        const init = async () => {
            if(type === GovernanceTypes.MARKET) {
                const cats = await getMarketCategories();
                setMarketCategories(cats);
            } else if(type === GovernanceTypes.ORACLE) {
                try {
                    const oracleApis = new OracleApis();
                    const allCategories = await oracleApis.getAllCategories(wallet);
                    setMarketCategories(allCategories);

                } catch (e) {

                }
            }
        }

        init();
    }, [type]);

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
