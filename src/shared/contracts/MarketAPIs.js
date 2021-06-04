import {map, sum, sortBy} from 'lodash';

import {walletHelper} from "../wallet.helper";
import {MaxUint256, controlledNetworkId} from "../../shared/constants";
import {getMarketContract} from "./MarketContract";
import {getContract} from "./contracts.helper";
import {fromWei, toWei} from "../helper";

import {marketStates} from '../constants';

const walletHelperInstance = walletHelper();

const generateMarketContract = (marketId) => {
    return getMarketContract(walletHelperInstance.getWeb3(), marketId);
};

class MarketAPIs {
    constructor() {
        this.marketsQueryContract = getContract('markets_query');
        this.marketControllerContract = getContract('market_controller');
        this.collateralTokenContract = getContract('usdt');
        this.optionsTokenContract = getContract('option_token');
        this.roomTokenContract = getContract('room');
    }

    async buy(
        wallet,
        marketId,
        investmentAmount,
        outcomeIndex,
        minOutcomeTokensToBuy
    ) {
        return this.marketControllerContract
            .methods
            .marketBuy(marketId, investmentAmount, outcomeIndex, 0)
            .send({
                from: wallet,
            });
    }

    async getMarketTradingVolume(
        wallet,
        marketId) {
        const buyEvents = await generateMarketContract(marketId)
            .getPastEvents("FPMMBuy", {
                fromBlock: 1
            });

        const sum2 = sum(map(buyEvents, (entry) => {
            return parseFloat(entry.returnValues.investmentAmount);
        }));

        const sellEvents = await generateMarketContract(marketId)
            .getPastEvents("FPMMSell", {
                fromBlock: 1
            });
        const sum3 = sum(map(sellEvents, (entry) => {
            return parseFloat(entry.returnValues.returnAmount);
        }));

        return (sum2 + sum3) / 1e18;
    }

    async getWalletTradeOptionBuyPrice(
        wallet,
        marketId,
        tradeOption) {
        const buyEvents = await generateMarketContract(marketId)
            .getPastEvents("FPMMBuy", {
                filter: {
                    buyer: wallet,
                    outcomeIndex: 0
                },
                fromBlock: 1
            });

        if (!buyEvents || buyEvents.length === 0) {
            return 0;
        }

        const totalPrices = sum(map(buyEvents, (entry) => {
            return parseFloat(entry.returnValues.investmentAmount) / parseFloat(entry.returnValues.outcomeTokensBought);
        }));

        /**
         * investmentAmount: "100000000000000000000"
         outcomeIndex: "0"
         outcomeTokensBought: "139418017682957753621"
         */
        return totalPrices / buyEvents.length;
    }

    async getWalletMarketBuyAndSellHistory(
        wallet,
        marketId
    ) {

        const marketContract = generateMarketContract(marketId);

        const allEventsww = await marketContract
            .getPastEvents('allEvents', {
                filter: {
                    buyer: wallet
                },
                fromBlock: 1
            });

        const buyEvents = await marketContract
            .getPastEvents('FPMMBuy', {
                filter: {
                    buyer: wallet
                },
                fromBlock: 1
            });

        const sellEvents = await marketContract
            .getPastEvents('FPMMSell', {
                filter: {
                    seller: wallet
                },
                fromBlock: 1
            });

        let allEvents = buyEvents.concat(sellEvents);

        allEvents = sortBy(allEvents, ["blockNumber", "transactionIndex"]);

        return allEvents;
    }

    async getMarketBuyAndSellHistory(
        wallet,
        marketId
    ) {

        const marketContract = generateMarketContract(marketId);

        const buyEvents = await marketContract
            .getPastEvents('FPMMBuy', {
                fromBlock: 1
            });

        const sellEvents = await marketContract
            .getPastEvents('FPMMSell', {
                fromBlock: 1
            });

        let allEvents = buyEvents.concat(sellEvents);

        allEvents = sortBy(allEvents, ["blockNumber", "transactionIndex"]);

        return allEvents;
    }

    async sell(wallet, marketId, amount, sellIndex) {
        return this.marketControllerContract
            .methods
            .marketSell(marketId, amount, sellIndex)
            .send({
                from: wallet,
            });
    }

    async getPricesOfBuy(wallet, marketAddress) {
        const marketOutcome = await this.getMarketOptionTokensPercentage(wallet, marketAddress);

        return {
            priceOfYes: parseFloat(marketOutcome[0]) / 1000000,
            priceOfNo: parseFloat(marketOutcome[1]) / 1000000
        }
    }

    async getPricesOfSell(wallet, marketAddress) {
        const priceOfSellingYes = await this.getCollateralTokensCountOfSell(wallet, marketAddress, toWei(1), 0);
        const priceOfSellingNo = await this.getCollateralTokensCountOfSell(wallet, marketAddress, toWei(1), 1);

        return {
            yes: fromWei(priceOfSellingYes),
            no: fromWei(priceOfSellingNo)
        }
    }

    async getOptionTokensCountOfBuy(wallet, marketId, buyAmount, outcomeIndex) {
        const result = await generateMarketContract(marketId)
            .methods
            .calcBuyAmount(buyAmount, outcomeIndex)
            .call({
                from: wallet,
            });

        return result;
    }

    async getCollateralTokensCountOfSell(wallet, marketId, sellAmount, inputIndex) {
        const result = await generateMarketContract(marketId)
            .methods
            .calcSellReturnInv(sellAmount, inputIndex)
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletOptionTokensBalance(wallet, marketId) {
        try {
            const result = await generateMarketContract(marketId)
                .methods
                .getBalances(wallet)
                .call({
                    from: wallet,
                });

            return result;
        } catch (e) {
            console.log("e", e);
        }
    }

    //Governance related
    async disputeMarket(wallet, marketId, disputeReason) {
        return await this.marketControllerContract
            .methods
            .disputeMarket(marketId, disputeReason)
            .send({
                from: wallet,
            });
    }

    async getMarketState(wallet, marketId) {
        const result = await this.marketControllerContract
            .methods
            .getMarketState(marketId)
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletVotesOnMarket(wallet, marketId, marketState) {
        //isPendingVoter

        if (marketState == 1) {
            return await this.marketControllerContract
                .methods
                .isValidatingVoter(marketId, wallet)
                .call({
                    from: wallet,
                });
        }

        if (marketState == 5 || marketState == 8) {
            return await this.marketControllerContract
                .methods
                .isResolvingVoter(marketId, wallet)
                .call({
                    from: wallet,
                });
        }

        if (marketState == 7) {
            return await this.marketControllerContract
                .methods
                .marketDisputersInfo(marketId, wallet)
                .call({
                    from: wallet,
                });
        }
    }

    async addGovernanceVoteForMarket(wallet, marketId, vote, state) {
        if (state == 1) {
            return await this.marketControllerContract
                .methods
                .castGovernanceValidatingVote(marketId, vote)
                .send({
                    from: wallet,
                });
        }

        if (state == 5 || state == 8) {
            return await this.marketControllerContract
                .methods
                .castGovernanceResolvingVote(marketId, vote)
                .send({
                    from: wallet,
                });
        }
    }

    async withdrawMarketVote(wallet, marketId, state) {
        if (state == 1) {
            return await this.marketControllerContract
                .methods
                .withdrawGovernanceValidatingVote(marketId)
                .send({
                    from: wallet,
                });
        }

        if (state == 5 || state == 8) {
            return await this.marketControllerContract
                .methods
                .withdrawGovernanceResolvingVote(marketId)
                .send({
                    from: wallet,
                });
        }
    }

    async getMarketVoting(wallet, marketId, state) {
        return 0;

        if (state == 1) {
            return 0;
            /*            return await this.governanceContract
                            .methods
                            .getApprovingResult(marketId)
                            .call({
                                from: wallet,
                            });*/
        }

        return await this.marketControllerContract
            .methods
            .getResolvingOutcome(marketId)
            .call({
                from: wallet,
            });
    }

    async getMarketInfo(wallet, marketId, state) {
        return await this.marketControllerContract
            .methods
            .getMarketInfo(marketId)
            .call({
                from: wallet,
            });
    }

    /////////
    /////////
    /////////
    /////////

    async getMarketOptionTokensPercentage(wallet, marketId) {
        const result = await generateMarketContract(marketId)
            .methods
            .getPercentage()
            .call({
                from: wallet,
            });

        return result;
    }

    async getMarketOutcome(wallet, marketId) {
        return 0;
        const result = await generateMarketContract(marketId)
            .methods
            .getResolvingOutcome()
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletSharesOfMarket(wallet, marketId) {
        const result = await generateMarketContract(marketId)
            .methods
            .balanceOf(wallet)
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletSharesPercentageOfMarket(wallet, marketId) {
        const result = await generateMarketContract(marketId)
            .methods
            .getSharesPercentage(wallet)
            .call({
                from: wallet,
            });

        return result;
    }


    async addLiquidityToMarket(wallet, marketId, amount) {
        return this.marketControllerContract
            .methods
            .marketAddLiquidity(marketId, amount)
            .send({
                from: wallet,
            });
    }

    async getMarketMinHoldingsToDispute(wallet, marketId) {
        const result = await generateMarketContract(marketId)
            .methods
            .minHoldingToDispute()
            .call({
                from: wallet,
            });
        return result;
    }

    async removeLiquidityFromMarket(wallet, marketId, amount) {
        return this.marketControllerContract
            .methods
            .marketRemoveLiquidity(marketId, amount, true)
            .send({
                from: wallet,
            });
    }

    async increaseTime(wallet, marketId, amount) {
        const result = await generateMarketContract(marketId)
            .methods
            .increaseTime(amount)
            .send({
                from: wallet,
            });
        return result;
    }

    async getMarketTime(wallet, marketId) {
        const result = await generateMarketContract(marketId)
            .methods
            .getCurrentTime()
            .call({
                from: wallet,
            });
        return result;
    }

    async getMarketCollateralTotalSupply(wallet, marketId) {
        return await generateMarketContract(marketId)
            .methods
            .getMarketCollateralTotalSupply()
            .call({
                from: wallet,
            });
    }

    //Router functions
    async createMarket(wallet, question, endTimestamp, resolveTimestamp, collateralTokenAddress, initialLiquidity) {
        const result = await this.marketControllerContract
            .methods
            .createMarketProposal(question, endTimestamp, resolveTimestamp, collateralTokenAddress, initialLiquidity)
            .send({
                from: wallet,
            });
        return result;
    }

    async getMarketsByState(wallet, state) {
        const result = await this.marketsQueryContract
            .methods
            .getMarketsQuestionIDs(state, 0, -1)
            .call({
                from: wallet,
            });

        const markets = {};
        result.questionsIDs.forEach((entry, index) => {
            markets[entry] = result.markets[index];
        });

        return markets;
    }

    async getAllMarketContracts(wallet) {
        let all = [];

        /**
         Invalid,
         Pending, // governance voting for validation
         Rejected,
         Active,
         Inactive,
         Resolving, // governance voting for result
         Resolved  // can redeem
         */
        for (let i in Object.keys(marketStates)) {
            const contracts = await this.marketsQueryContract
                .methods
                .getMarketsQuestionIDs(i, 0, -1)
                .call({
                    from: wallet,
                });

            const ids = {};
            for (let i = 0; i < contracts.questionsIDs.length; i++) {
                if (!contracts.questionsIDs[i]) {
                    break;
                }

                ids[contracts.questionsIDs[i]] = true;
            }

            all = {
                ...all,
                ...ids
            };
        }

        return all;
    }

    async getMarketById(wallet, marketId) {
        const result = await this.marketsQueryContract
            .methods
            .getMarket(marketId)
            .call({
                from: wallet,
            });

        return result;
    }

    // Collateral Token Contract
    async getWalletBalanceOfCollateralToken(wallet) {
        const result = await this.collateralTokenContract
            .methods
            .balanceOf(wallet)
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletAllowanceOfCollateralTokenForMarketRouter(wallet) {
        const result = await this.collateralTokenContract
            .methods
            .allowance(wallet, this.marketControllerContract._address)
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletAllowanceOfRoomTokenForMarketRouter(wallet) {
        const result = await this.roomTokenContract
            .methods
            .allowance(wallet, this.marketControllerContract._address)
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletAllowanceOfCollateralTokenForMarket(wallet, marketContractId) {
        const result = await this.collateralTokenContract
            .methods
            .allowance(wallet, marketContractId)
            .call({
                from: wallet,
            });

        return result;
    }

    async approveCollateralTokenForMarketRouter(wallet) {
        const result = await this.collateralTokenContract
            .methods
            .approve(this.marketControllerContract._address, MaxUint256)
            .send({
                from: wallet,
            });

        return result;
    }

    async approveRoomTokenForMarketRouter(wallet) {
        const result = await this.roomTokenContract
            .methods
            .approve(this.marketControllerContract._address, MaxUint256)
            .send({
                from: wallet,
            });

        return result;
    }

    async approveCollateralTokenForMarket(wallet, marketContractId) {
        const result = await this.collateralTokenContract
            .methods
            .approve(marketContractId, MaxUint256)
            .send({
                from: wallet,
            });

        return result;
    }

    async mintCollateralToken(wallet, amount) {
        const result = await this.collateralTokenContract
            .methods
            .mint(amount)
            .send({
                from: wallet,
            });

        return result;
    }

    //Option token related stuff
    async getIsWalletOptionTokenApprovedForMarket(wallet, marketAddress) {
        const result = await this.optionsTokenContract
            .methods
            .isApprovedForAll(wallet, marketAddress)
            .call({
                from: wallet,
            });

        return result;
    }

    async getIsWalletOptionTokenApprovedForMarketController(wallet) {
        const result = await this.optionsTokenContract
            .methods
            .isApprovedForAll(wallet, this.marketControllerContract._address)
            .call({
                from: wallet,
            });

        return result;
    }

    async approveOptionTokenForMarket(wallet, marketAddress) {
        const result = await this.optionsTokenContract
            .methods
            .setApprovalForAll(marketAddress, true)
            .send({
                from: wallet,
            });

        return result;
    }

    async approveOptionTokenForMarketController(wallet) {
        const result = await this.optionsTokenContract
            .methods
            .setApprovalForAll(this.marketControllerContract._address, true)
            .send({
                from: wallet,
            });

        return result;
    }

    async redeemMarketRewards(wallet, marketAddress) {
        const result = await this.optionsTokenContract
            .methods
            .redeem(marketAddress)
            .send({
                from: wallet,
            });

        return result;
    }
}

export default MarketAPIs;
