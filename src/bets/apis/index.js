import {useMutation, useQuery} from "react-query";
import {getBets, createBet} from "../methods";
import {walletHelper} from "../../shared/wallet.helper";

const walletHelperInstance = walletHelper();

export const useGetBets = () => {
    return useQuery(["getBets"], async () => await getBets(true, true), {
        enabled: !!walletHelperInstance.account
    });
};

export const useCreateBet = () => {
    return useMutation(["createBet"], ({starBetTime, endBetTime, resolveTime, title, description, choices, categories, baseToken}) => createBet(starBetTime, endBetTime, resolveTime, title, description, choices, categories, baseToken));
};
