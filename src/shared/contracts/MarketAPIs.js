import {map, sum, sortBy, uniqBy, find} from 'lodash';

import {walletHelper} from "../wallet.helper";
import {MaxUint256} from "../../shared/constants";
import {getMarketContract} from "./MarketContract";
import {getContract} from "./contracts.helper";
import {fromWei, toWei} from "../helper";
import {
    getBuySellEventsOfMarket,
    getBuySellEventsOfWalletOnMarket,
    getMarkets
} from '../firestore.service';

import {marketStates, marketStatesDisplay} from '../constants';

const walletHelperInstance = walletHelper();

const generateMarketContract = (marketId) => {
    return getMarketContract(walletHelperInstance.getWeb3(), marketId);
};

const fromBlock = 8762783 - 4000;

class MarketAPIs {
    constructor(version) {
        this.marketsQueryContract = getContract(version === '1.0' ? 'markets_queryv1' : 'markets_query');
        this.marketControllerContract = getContract(version === '1.0' ? 'market_controllerv1' :  'market_controller');
        this.collateralTokenContract = getContract('usdt');
        this.optionsTokenContract = getContract(version === '1.0' ? 'option_tokenv1' :  'option_token');
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
        let buySellEvents = await getBuySellEventsOfMarket(marketId);
        buySellEvents = uniqBy(buySellEvents, (entry) => {
            return entry.transactionHash;
        });
        const sum3 = sum(map(buySellEvents, (entry) => {
            return entry.event == 'MCBuy' ? parseFloat(entry.returnValues.investmentAmount) : parseFloat(entry.returnValues.returnAmount);
        }));

        return sum3 / 1e18;
    }


    async getMarketCreationFees(wallet) {
        return this.marketControllerContract
            .methods
            .marketCreationFees()
            .call({
                from: wallet,
            });
    }

    async getMarketMinShareLiq(wallet) {
        return this.marketControllerContract
            .methods
            .marketMinShareLiq()
            .call({
                from: wallet,
            });
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
                fromBlock: fromBlock
            });

        if (!buyEvents || buyEvents.length === 0) {
            return 0;
        }

        const totalPrices = sum(map(buyEvents, (entry) => {
            return parseFloat(entry.returnValues.investmentAmount) / parseFloat(entry.returnValues.outcomeTokensBought);
        }));

        return totalPrices / buyEvents.length;
    }

    async getWalletMarketBuyAndSellHistory(
        wallet,
        marketId
    ) {

        const events = await getBuySellEventsOfWalletOnMarket(marketId, wallet);
        const allEvents = sortBy(events, (entry) => {
            return entry.returnValues.timestamp;
        });

        return allEvents;
    }

    async getMarketBuyAndSellHistory(
        wallet,
        marketId
    ) {

        const marketContract = generateMarketContract(marketId);

        const buyEvents = await marketContract
            .getPastEvents('FPMMBuy', {
                fromBlock: fromBlock
            });

        const sellEvents = await marketContract
            .getPastEvents('FPMMSell', {
                fromBlock: fromBlock
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

    async getMarketQuestionIdByMarketAddress(wallet, marketAddress) {
        const result = await generateMarketContract(marketAddress)
            .methods
            .getMarketQuestionID()
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

        if (state == 1) {
            return 0;
        }

        return await this.marketControllerContract
            .methods
            .getResolvingOutcome(marketId)
            .call({
                from: wallet,
            });
    }

    async getMarketInfo(wallet, marketId) {
        return await this.marketControllerContract
            .methods
            .getMarketInfo(marketId)
            .call({
                from: wallet,
            });
    }

    async getMarketsTradedByWallet(wallet) {
        const result = await this.marketControllerContract
            .methods
            .getMarketsByTrader(wallet)
            .call({
                from: wallet,
            });

        return result;
    }

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
        const marketsDontSupportWithdrawFees = [
            '0x902e2083446FeB52AB1558A6E9068266232F2073',
            '0x1e5383bA8ecA45b0B08347b7D9a6213dA6202ED6',
            '0xA90D8f060AE6a74c12AE6Bdbd04135B34ee46952',
            '0x64A8013D58C9f8D0C2ea5B7aaeaF30f736de6E14',
            '0x5377a9CbE8E8E32FE1296844b86be32889bC2639',
            '0x141a92f2Ab34CCA0fec2E615B8D13d847438B529',
        ];

        const withdrawFees = false;//marketsDontSupportWithdrawFees.indexOf(marketId) === -1 ? true : false;

        return this.marketControllerContract
            .methods
            .marketRemoveLiquidity(marketId, amount, true, withdrawFees)
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

    async getMarketiquidity(wallet, marketId) {
        return await generateMarketContract(marketId)
            .methods
            .getMarketCollateralTotalSupply()
            .call({
                from: wallet,
            });
    }

    async getMarketTotalSupply(wallet, marketId) {
        return await generateMarketContract(marketId)
            .methods
            .totalSupply()
            .call({
                from: wallet,
            });
    }

    //Router functions
    //(string memory question, string memory marketMetadatasID, uint256 participationEndTime, uint256 resolvingEndTime, IERC20 collateralToken, uint256 initialLiq, string memory resolveResources)
    async createMarket(wallet, question, marketMetadatasID, participationEndTime, resolvingEndTime, collateralTokenAddress, initialLiquidity, resolveResources) {
        const result = await this.marketControllerContract
            .methods
            .createMarketProposal(question, marketMetadatasID, participationEndTime, resolvingEndTime, collateralTokenAddress, initialLiquidity, resolveResources)
            .send({
                from: wallet,
            });
        return result;
    }

    async getAllMarkets(wallet, withInfo, withState, withPricesOfBuy, withDbData) {
        const result = await this.marketControllerContract
            .methods
            .getAllMarkets()
            .call({
                from: wallet,
            });

        let markets = result.map((e) => {
            return {
                address: e,
            }
        });

        if(withInfo) {
            for(const m of markets) {
                const marketInfo = await this.getMarketInfo(wallet, m.address);
                m.info = marketInfo;
            }
        }

        if(withState) {
            for(const m of markets) {
                const state = await this.getMarketState(wallet, m.address);
                m.state = state;
            }
        }

        if(withPricesOfBuy) {
            for(const m of markets) {
                const marketPricesOfBuy = await this.getPricesOfBuy(wallet, m.address);
                m.pricesOfBuy = {
                    yes: marketPricesOfBuy.priceOfYes,
                    no: marketPricesOfBuy.priceOfNo,
                };
            }
        }

        if(withDbData) {
            const result = await getMarkets('3.0');
            for(const m of markets) {
                m.dbData = find(result, {'id': m.info.metaDataID});
            }
        }

        return markets;
    }

    async getMarketsByState(wallet, state) {
        let result = {};
        if(state != 'all') {
            result = await this.marketsQueryContract
                .methods
                .getMarketsQuestionIDs(state, 0, -1)
                .call({
                    from: wallet,
                });
        } else {
            for (let marketSatetEntry in marketStatesDisplay) {
                if(marketStatesDisplay[marketSatetEntry].id != 'all') {
                    const re1 = await this.marketsQueryContract
                        .methods
                        .getMarketsQuestionIDs(marketStatesDisplay[marketSatetEntry].id, 0, -1)
                        .call({
                            from: wallet,
                        });
                    result.markets = result.markets || [];
                    result.questionsIDs = result.questionsIDs || [];
                    result.markets = result.markets.concat(re1.markets);
                    result.questionsIDs = result.questionsIDs.concat(re1.questionsIDs);
                }
            }
        }

        const markets = {};
        if(result && result.questionsIDs) {
            result.questionsIDs.forEach((entry, index) => {
                markets[entry] = result.markets[index];
            });
        }

        return markets;
    }

    async getAllMarketContracts(wallet) {
        let all = [];

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
