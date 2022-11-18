import {makeAutoObservable} from "mobx";
import {
    set
} from 'lodash';

import {
    approveContractForSpender,
    getWalletAllowanceOfContractToSpender,
    getWalletBalanceOfContractWithAddress
} from "../methods/shared.methods";
import {
    approveOptionTokenForMarket,
    getAccountBalances,
    getIsWalletOptionTokenApprovedForFixRedeem,
    getIsWalletOptionTokenApprovedForMarket,
    getIsWalletOptionTokenApprovedForMarketController, getMarketBalanceOf, getMarketInfo
} from "../methods/market-controller.methods";
import {getContractAddress} from "./contracts/contracts.helper";

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

class SmartState {
    walletBalanceOfSomething = {};
    walletAllowanceOfSomething = {};
    isWalletOptionTokenApprovedForMarket = {};
    isWalletOptionTokenApprovedForMarketController = {};
    isWalletOptionTokenApprovedForFixRedeem = {};
    marketInfo = {};
    marketWalletData = {};

    constructor() {
        makeAutoObservable(this);
    }

    async loadWalletBalanceOfToken(wallet, token) {
        const result = await getWalletBalanceOfContractWithAddress(wallet, token);
        this.walletBalanceOfSomething = set({...this.walletBalanceOfSomething}, [formatAddress(wallet), formatAddress(token)], result);
    };

    async loadWalletBalanceOfTokenWithAddress(wallet, token) {
        const result = await getWalletBalanceOfContractWithAddress(wallet, token);
        this.walletBalanceOfSomething = set({...this.walletBalanceOfSomething}, [formatAddress(wallet), formatAddress(token)], result);
    };

    async loadWalletAllowance(wallet, source, spender) {
        const sourceAddress = getContractAddress(source);
        const spenderAddress = getContractAddress(spender);
        const result = await getWalletAllowanceOfContractToSpender(wallet, source, spender);
        this.walletAllowanceOfSomething = set({...this.walletAllowanceOfSomething}, [formatAddress(wallet), formatAddress(sourceAddress), formatAddress(spenderAddress)], result);
    };

    async loadIsWalletOptionTokenApprovedForMarket(wallet, market) {
        const result = await getIsWalletOptionTokenApprovedForMarket(wallet, market);
        this.isWalletOptionTokenApprovedForMarket = set({...this.isWalletOptionTokenApprovedForMarket}, [formatAddress(wallet), formatAddress(market)], result);
    }

    async loadIsWalletOptionTokenApprovedForMarketController(wallet) {
        const result = await getIsWalletOptionTokenApprovedForMarketController(wallet);
        this.isWalletOptionTokenApprovedForMarketController = set({...this.isWalletOptionTokenApprovedForMarketController}, [formatAddress(wallet)], result);
    }

    async loadIsWalletOptionTokenApprovedForFixRedeem(wallet) {
        try {
            const result = await getIsWalletOptionTokenApprovedForFixRedeem(wallet);
            this.isWalletOptionTokenApprovedForFixRedeem = set({...this.isWalletOptionTokenApprovedForFixRedeem}, [formatAddress(wallet)], result);
        } catch (e) {
            console.log("e", e);
        }
    }

    async loadMarketInfo(wallet, market) {
        const result = await getMarketInfo(wallet, market, true, true, true, true, true, true, true);
        this.marketInfo = set({...this.marketInfo}, [formatAddress(market)], result);
    }

    async loadMarketWalletData(wallet, market) {
        const [accountBalances, marketBalanceOf, isWalletOptionTokenApprovedForMarket] = await Promise.all([getAccountBalances(wallet, market, wallet), getMarketBalanceOf(wallet, market, wallet), getIsWalletOptionTokenApprovedForMarket(wallet, market)]);
        this.marketWalletData = set({...this.marketWalletData}, [formatAddress(market), formatAddress(wallet)], {
            accountBalances,
            marketBalanceOf,
            isWalletOptionTokenApprovedForMarket
        });
    }

    async callApproveContractForSpender(wallet, source, spender) {
        await approveContractForSpender(wallet, source, spender);
        await this.loadWalletAllowance(wallet, source, spender);
    }

    async callApproveOptionTokenForSpender(wallet, market) {
        await approveOptionTokenForMarket(wallet, market);
        await this.loadMarketWalletData(wallet, market);
    }

    async executeFunction(functionName, params) {
        if (functionName === SmartContractsContextFunctions.LOAD_WALLET_BALANCE_OF_TOKEN) {
            return this.loadWalletBalanceOfToken(...params);
        }

        if (functionName === SmartContractsContextFunctions.LOAD_WALLET_ALLOWANCE) {
            return this.loadWalletAllowance(...params);
        }

        if (functionName === SmartContractsContextFunctions.LOAD_OPTION_APPROVED_MARKET) {
            return this.loadIsWalletOptionTokenApprovedForMarket(...params);
        }

        if (functionName === SmartContractsContextFunctions.LOAD_OPTION_APPROVED_MARKET_CONTROLLER) {
            return this.loadIsWalletOptionTokenApprovedForMarketController(...params);
        }

        if (functionName === SmartContractsContextFunctions.LOAD_MARKET_INFO) {
            return this.loadMarketInfo(...params);
        }

        if (functionName === SmartContractsContextFunctions.LOAD_MARKET_WALLET_DATA) {
            return this.loadMarketWalletData(...params);
        }

        if (functionName === SmartContractsContextFunctions.APPROVE_CONTRACT_TO_SPENDER) {
            return this.callApproveContractForSpender(...params);
        }

        if (functionName === SmartContractsContextFunctions.APPROVE_OPTION_TOKEN_TO_SPENDER) {
            return this.callApproveOptionTokenForSpender(...params);
        }
    };
}

export const smartState = new SmartState();
