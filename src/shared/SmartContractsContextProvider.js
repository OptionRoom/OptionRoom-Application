import React, {useState, useEffect, useContext} from "react";
import {
    set
} from 'lodash';

import {
    approveContractForSpender,
    getWalletAllowanceOfContractToSpender,
    getWalletAllowanceOfContractToSpenderWithAddress,
    getWalletBalanceOfContract,
    getWalletBalanceOfContractWithAddress
} from "../methods/shared.methods";
import {
    approveOptionTokenForMarket,
    getAccountBalances,
    getIsWalletOptionTokenApprovedForMarket,
    getIsWalletOptionTokenApprovedForMarketController, getMarketBalanceOf, getMarketInfo
} from "../methods/market-controller.methods";
import {AccountContext} from "./AccountContextProvider";
import {ContractNames} from "./constants";
import {getContractAddress, getTokensList} from "./contracts/contracts.helper";

export const SmartContractsContext = React.createContext({
    walletBalanceOfSomething: {},
    walletAllowanceOfSomething: {},
    isWalletOptionTokenApprovedForMarket: {},
    isWalletOptionTokenApprovedForMarketController: {},
    marketInfo: {},
    marketWalletData: {},
    executeFunction: () => {},
    loadWalletBalanceOfToken: () => {},
    loadMarketInfo: () => {},
    loadMarketWalletData: () => {},
    callApproveContractForSpender: () => {},
});

export const SmartContractsContextFunctions = {
  LOAD_WALLET_BALANCE_OF_TOKEN: 'LOAD_WALLET_BALANCE_OF_TOKEN',
  LOAD_WALLET_ALLOWANCE: 'LOAD_WALLET_ALLOWANCE',
  LOAD_OPTION_APPROVED_MARKET: 'LOAD_OPTION_APPROVED_MARKET',
  LOAD_OPTION_APPROVED_MARKET_CONTROLLER: 'LOAD_OPTION_APPROVED_MARKET_CONTROLLER',
  LOAD_MARKET_INFO: 'LOAD_MARKET_INFO',
  LOAD_MARKET_WALLET_DATA: 'LOAD_MARKET_WALLET_DATA',
  APPROVE_CONTRACT_TO_SPENDER: 'APPROVE_CONTRACT_TO_SPENDER',
  APPROVE_OPTION_TOKEN_TO_SPENDER: 'APPROVE_OPTION_TOKEN_TO_SPENDER',
};

export const formatAddress = (entry) => {
    return entry && entry.toLowerCase();
}

// Defining a simple HOC component
const SmartContractsContextProvider = (props) => {
    const accountContext = useContext(AccountContext);

    const [walletBalanceOfSomething, setWalletBalanceOfSomething] = useState({});
    const [walletAllowanceOfSomething, setWalletAllowanceOfSomething] = useState({});
    const [isWalletOptionTokenApprovedForMarket, setIsWalletOptionTokenApprovedForMarket] = useState({});
    const [isWalletOptionTokenApprovedForMarketController, setIsWalletOptionTokenApprovedForMarketController] = useState({});
    const [marketInfo, setMarketInfo] = useState({});
    const [marketWalletData, setMarketWalletData] = useState({});

    const loadWalletBalanceOfToken = async (wallet, token) => {
        const result = await getWalletBalanceOfContractWithAddress(wallet, token);
        setWalletBalanceOfSomething(
            (prev) => {
                const newState = set({...prev}, [formatAddress(wallet), formatAddress(token)], result);
                return newState;
            },
        );
    };

    const loadWalletBalanceOfTokenWithAddress = async (wallet, token) => {
        const result = await getWalletBalanceOfContractWithAddress(wallet, token);
        setWalletBalanceOfSomething(
            (prev) => {
                const newState = set({...prev}, [formatAddress(wallet), formatAddress(token)], result);
                return newState;
            },
        );
    };

    const loadWalletAllowance = async (wallet, source, spender) => {
        const sourceAddress = getContractAddress(source);
        const spenderAddress = getContractAddress(spender);
        const result = await getWalletAllowanceOfContractToSpender(wallet, source, spender);
        setWalletAllowanceOfSomething(
            (prev) => {
                const newState = set(prev, [formatAddress(wallet), formatAddress(sourceAddress), formatAddress(spenderAddress)], result);
                return newState;
            },
        );
    };

    const loadIsWalletOptionTokenApprovedForMarket = async (wallet, market) => {
        const result = await getIsWalletOptionTokenApprovedForMarket(wallet, market);
        setIsWalletOptionTokenApprovedForMarket(
            (prev) => {
                const newState = set(prev, [formatAddress(wallet), formatAddress(market)], result);
                return newState;
            },
        );
    }

    const loadIsWalletOptionTokenApprovedForMarketController = async (wallet) => {
        const result = await getIsWalletOptionTokenApprovedForMarketController(wallet);
        setIsWalletOptionTokenApprovedForMarketController(
            (prev) => {
                const newState = set(prev, [formatAddress(wallet)], result);
                return newState;
            },
        );
    }

    const loadMarketInfo = async (wallet, market) => {
        console.time('loadMarketInfo');

        const result = await getMarketInfo(wallet, market, true, true, true, true, true, true, true);
        setMarketInfo(
            (prev) => {
                const newState = set(prev, [formatAddress(market)], result);

                console.timeEnd('loadMarketInfo');
                return newState;
            },
        );
    }

    const loadMarketWalletData = async (wallet, market) => {
        console.time('loadMarketWalletData');
        const [accountBalances, marketBalanceOf, isWalletOptionTokenApprovedForMarket] = await Promise.all([getAccountBalances(wallet, market, wallet), getMarketBalanceOf(wallet, market, wallet), getIsWalletOptionTokenApprovedForMarket(wallet, market)]);

        setMarketWalletData(
            (prev) => {
                const newState = set(prev, [formatAddress(market), formatAddress(wallet)], {
                    accountBalances,
                    marketBalanceOf,
                    isWalletOptionTokenApprovedForMarket
                });

                console.timeEnd('loadMarketWalletData');
                return newState;
            },
        );
    }

    const callApproveContractForSpender = async (wallet, source, spender) => {
        console.log("wallet, source, spender", wallet, source, spender);
        await approveContractForSpender(wallet, source, spender);
        await loadWalletAllowance(wallet, source, spender);
    }

    const callApproveOptionTokenForSpender = async (wallet, market) => {
        await approveOptionTokenForMarket(wallet, market);
        await loadMarketWalletData(wallet, market);
    }

    const executeFunction = async (functionName, params) => {
        if(functionName === SmartContractsContextFunctions.LOAD_WALLET_BALANCE_OF_TOKEN) {
            return loadWalletBalanceOfToken(...params);
        }

        if(functionName === SmartContractsContextFunctions.LOAD_WALLET_ALLOWANCE) {
            return loadWalletAllowance(...params);
        }

        if(functionName === SmartContractsContextFunctions.LOAD_OPTION_APPROVED_MARKET) {
            return loadIsWalletOptionTokenApprovedForMarket(...params);
        }

        if(functionName === SmartContractsContextFunctions.LOAD_OPTION_APPROVED_MARKET_CONTROLLER) {
            return loadIsWalletOptionTokenApprovedForMarketController(...params);
        }

        if(functionName === SmartContractsContextFunctions.LOAD_MARKET_INFO) {
            return loadMarketInfo(...params);
        }

        if(functionName === SmartContractsContextFunctions.LOAD_MARKET_WALLET_DATA) {
            return loadMarketWalletData(...params);
        }

        if(functionName === SmartContractsContextFunctions.APPROVE_CONTRACT_TO_SPENDER) {
            return callApproveContractForSpender(...params);
        }

        if(functionName === SmartContractsContextFunctions.APPROVE_OPTION_TOKEN_TO_SPENDER) {
            return callApproveOptionTokenForSpender(...params);
        }
    };

    useEffect(() => {
        if(accountContext.account && accountContext.chainId) {
            loadIsWalletOptionTokenApprovedForMarketController(accountContext.account);

            const tokens = getTokensList();
            for(let token of tokens) {
                loadWalletBalanceOfTokenWithAddress(accountContext.account, token.address);
                loadWalletAllowance(accountContext.account, token.address, ContractNames.marketControllerV4);
            }
        }
    }, [accountContext.account, accountContext.chainId]);

    return (
        <SmartContractsContext.Provider
            value={{
                walletBalanceOfSomething: walletBalanceOfSomething,
                walletAllowanceOfSomething: walletAllowanceOfSomething,
                isWalletOptionTokenApprovedForMarket: isWalletOptionTokenApprovedForMarket,
                isWalletOptionTokenApprovedForMarketController: isWalletOptionTokenApprovedForMarketController,
                marketInfo: marketInfo,
                marketWalletData: marketWalletData,
                executeFunction: executeFunction,
                loadWalletBalanceOfToken: loadWalletBalanceOfToken,
                loadMarketInfo: loadMarketInfo,
                loadMarketWalletData: loadMarketWalletData,
                callApproveContractForSpender: callApproveContractForSpender,
            }}
        >
            {props.children}
        </SmartContractsContext.Provider>
    );
};

export default SmartContractsContextProvider;
