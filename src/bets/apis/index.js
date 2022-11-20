import {useMutation, useQuery} from "react-query";
import {getBets, createBet, getBet, buyBetOption, redeem} from "../methods";
import {walletHelper} from "../../shared/wallet.helper";
import {
    approveTokenForSpenderWithAddress,
    getWalletAllowanceOfContractWithAddress,
    getWalletBalanceOfContractWithAddress
} from "../../methods/shared.methods";

const walletHelperInstance = walletHelper();

export const useGetAccountBalanceOfToken = (tokenAddress) => {
    return useQuery(["useGetAccountBalanceOfToken", tokenAddress], async () => await getWalletBalanceOfContractWithAddress(walletHelperInstance.account, tokenAddress), {
        enabled: !!walletHelperInstance.account && !!tokenAddress
    });
};

export const useGetAccountAllowanceOfToken = (source, spender) => {
    return useQuery(["useGetAccountAllowanceOfToken", source, spender], async () => await getWalletAllowanceOfContractWithAddress(walletHelperInstance.account, source, spender), {
        enabled: !!walletHelperInstance.account && !!source && !!spender
    });
};

export const useGetBet = (betAddress) => {
    return useQuery(["getBet", betAddress], async () => await getBet(betAddress, true, true), {
        enabled: !!walletHelperInstance.account
    });
};

export const useGetBets = () => {
    return useQuery(["getBets"], async () => await getBets(true, true), {
        enabled: !!walletHelperInstance.account
    });
};

export const useCreateBet = () => {
    return useMutation({
        mutationFn: ({
                         starBetTime,
                         endBetTime,
                         resolveTime,
                         title,
                         description,
                         choices,
                         categories,
                         baseToken
                     }) => createBet(starBetTime, endBetTime, resolveTime, title, description, choices, categories, baseToken)
    });
};

export const useBuyBetOption = () => {
    return useMutation({
        mutationFn: ({
                         betAddress,
                         choiceIndex,
                         amount
                     }) => buyBetOption(betAddress, choiceIndex, amount)
    });
};

export const useApproveToken = () => {
    return useMutation({
        mutationFn: ({
                         source,
                         spender
                     }) => approveTokenForSpenderWithAddress(walletHelperInstance.account, source, spender)
    });
};

export const useRedeemBet = () => {
    return useMutation({mutationFn: ({betAddress}) => redeem(betAddress)});
};
