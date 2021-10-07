import {useState, useEffect} from 'react';
import {getMarketCategories} from "./firestore.service";
import {GovernanceTypes, FiltrationWidgetTypes} from './constants';
import OracleApis from "./contracts/OracleApis";

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
