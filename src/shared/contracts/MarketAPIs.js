import { walletHelper } from "../wallet.helper";
import { MaxUint256, controlledNetworkId } from "../../shared/constants";
import { getCollateralTokenContract } from "./CollateralTokenContract";
import { getMarketContract } from "./MarketContract";
import { getMarketRouterContract } from "./MarketRouterContract";
import { getGovernanceContract } from "./GovernanceContract";
import { getOptionTokenContract } from "./OptionTokenContract";
import {fromWei, toWei} from "../helper";
import {map, sum} from 'lodash';

const walletHelperInstance = walletHelper();

const generateMarketContract = (marketId) => {
    console.log("marketId", marketId);
    return getMarketContract(walletHelperInstance.getWeb3(), marketId);
};

class MarketAPIs {
    constructor() {
        /**
         demoGovernence.address (AAA0)
         0x717aee66574a72d83b7AcfD1BB8fA5e0b0A0A64A
         demoToken.address (AAA1)
         0xd07002ADEdc02797D383bc9C2B8A96822FB385b5
         condToken.address (AAA2)
         0x10496A2d0f07c5fa2C925B756CE8da95d5c5d86F
         factoryC.address (AAA3)
         0x47EBe7BcA2315dd91a58050Db4C4e991cC523C87
         */
        /*
            Repo:
            demoGovernence.address (AAA0)
0xE2527a3e890085513fDC4b7E8d97d314D9c2e81F
demoToken.address (AAA1)
0x604d5CE415dDbB3841bEECa9608fA5778C0b7e37
condToken.address (AAA2)
0x8eFDC7Bd87368DE1893CB44f72D0f8697a2A9618
factoryC.address (AAA3)
0xd9d28D8c09f85872AB04626D130D1F8fC07C8aa1
         */
        this.marketRouterContract = getMarketRouterContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.collateralTokenContract = getCollateralTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.governanceContract = getGovernanceContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );

        this.optionsTokenContract = getOptionTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
    }

    async buy(
        wallet,
        marketId,
        investmentAmount,
        outcomeIndex,
        minOutcomeTokensToBuy
    ) {
        const result = await generateMarketContract(marketId)
            .methods
            .buy(investmentAmount, outcomeIndex, 0)
            .send({
                from: wallet,
            });
        return result;
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
        }))

        return sum2;
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

        if(!buyEvents || buyEvents.length === 0) {
            return 0;
        }

        const totalPrices = sum(map(buyEvents, (entry) => {
            return parseFloat(entry.returnValues.investmentAmount)/parseFloat(entry.returnValues.outcomeTokensBought);
        }));

        /**
         * investmentAmount: "100000000000000000000"
         outcomeIndex: "0"
         outcomeTokensBought: "139418017682957753621"
         */
        return totalPrices/buyEvents.length;
    }

    async getWalletMarketBuyAndSellHistory(
        wallet,
        marketId) {
        const buyEvents = await generateMarketContract(marketId)
            .getPastEvents("FPMMBuy", {
                filter: {
                    buyer: wallet,
                    outcomeIndex: 0
                },
                fromBlock: 1
            });

        const sellEvents = await generateMarketContract(marketId)
            .getPastEvents("FPMMSell", {
                filter: {
                    buyer: wallet,
                    outcomeIndex: 0
                },
                fromBlock: 1
            });

        return buyEvents.concat(sellEvents);
    }

    async sell(wallet, marketId, amount, sellIndex) {
        const result = await generateMarketContract(marketId)
            .methods
            .sell(amount, sellIndex)
            .send({
                from: wallet,
            });
        return result;
    }

    async getPricesOfBuy(wallet, marketAddress) {
        const numberOfYes = await this.getOptionTokensCountOfBuy(wallet, marketAddress, toWei(1), 0);
        const numberOfNo = await this.getOptionTokensCountOfBuy(wallet, marketAddress, toWei(1), 1);

        const priceOfYes = 1/fromWei(numberOfYes);
        const priceOfNo = 1/fromWei(numberOfNo);

        return {
            priceOfYes,
            priceOfNo
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

    async getMarketState(wallet, marketId) {
        const result = await generateMarketContract(marketId)
        .methods
            .getCurrentState()
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

    async addLiquidityToMarket(wallet, marketId, amount) {
        const result = await generateMarketContract(marketId)
            .methods
            .addLiquidity(amount)
            .send({
                from: wallet,
            });
        return result;
    }

    async removeLiquidityFromMarket(wallet, marketId, amount) {
        const result = await generateMarketContract(marketId)
            .methods
            .removeLiquidity(amount, true)
            .send({
                from: wallet,
            });
        return result;
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

    async getMarketTotalSupply(wallet, marketId) {
        return await generateMarketContract(marketId)
        .methods
        .totalSupply()
        .call({
            from: wallet,
        });
    }

    async addGovernanceVoteForMarket(wallet, marketId, vote, state) {
        if(state == 1) {
            return await generateMarketContract(marketId)
                .methods
                .castGovernanceApprovalVote(vote)
                .send({
                    from: wallet,
                });
        }

        return await generateMarketContract(marketId)
            .methods
            .castGovernanceResolvingVote(vote)
            .send({
                from: wallet,
            });
    }

    async getMarketVoting(wallet, marketId, state) {
        if (state == 1) {
            return await generateMarketContract(marketId)
                .methods
                .getGovernanceVotingResults()
                .call({
                    from: wallet,
                });
        }

        return await generateMarketContract(marketId)
            .methods
            .getResolvingOutcome()
            .call({
                from: wallet,
            });
    }

    //Router functions
    async createMarket(wallet, question, endTimestamp, resolveTimestamp, collateralTokenAddress, initialLiquidity) {
        /**
         {
                    "internalType": "string",
                    "name": "marketQuestionID",
                    "type": "string"
                },
         {
                    "internalType": "uint256",
                    "name": "participationEndTime",
                    "type": "uint256"
                },
         {
                    "internalType": "uint256",
                    "name": "resolvingEndTime",
                    "type": "uint256"
                },
         {
                    "internalType": "contract IERC20",
                    "name": "collateralToken",
                    "type": "address"
                },
         {
                    "internalType": "uint256",
                    "name": "initialLiq",
                    "type": "uint256"
                }
         */
        const result = await this.marketRouterContract
            .methods
            .createMarketProposal(question, endTimestamp, resolveTimestamp, collateralTokenAddress, initialLiquidity)
            .send({
                from: wallet,
            });
        return result;
    }

    async getMarkets(wallet) {
        const result = await this.marketRouterContract
            .methods
            .getMarkets()
            .call({
                from: wallet,
            });

        return result;
    }

    async getMarketById(wallet, marketId) {
        const result = await this.marketRouterContract
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
            .allowance(wallet, this.marketRouterContract._address)
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
            .approve(this.marketRouterContract._address, MaxUint256)
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

    async getIsWalletOptionTokenApprovedForMarket(wallet, marketAddress) {
        const result = await this.optionsTokenContract
            .methods
            .isApprovedForAll(wallet, marketAddress)
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

    async redeemMarketRewards(wallet, marketAddress) {
        console.log("hello");
        const result = await this.optionsTokenContract
            .methods
            .redeem(marketAddress)
            .send({
                from: wallet,
            });

        console.log("dd", result);
        return result;
    }
}

export default MarketAPIs;
