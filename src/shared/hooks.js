import {useState, useEffect} from 'react';
import {getMarketCategories} from "./firestore.service";

export const useGetMarketCategories = () => {
    const [marketCategories, setMarketCategories] = useState([]);

    useEffect(() => {
        const init = async () => {
            const cats = await getMarketCategories();
            setMarketCategories(cats);
        }

        init();
    }, []);

    return marketCategories;
}
