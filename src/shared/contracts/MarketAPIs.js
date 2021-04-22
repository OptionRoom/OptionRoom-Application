import { walletHelper } from "../wallet.helper";
import { MaxUint256, controlledNetworkId } from "../../shared/constants";
import { getCollateralTokenContract } from "./CollateralTokenContract";
import { getMarketContract } from "./MarketContract";
import { getMarketRouterContract } from "./MarketRouterContract";
import { getGovernanceContract } from "./GovernanceContract";
import { getOptionTokenContract } from "./OptionTokenContract";

const walletHelperInstance = walletHelper();

const generateMarketContract = (marketId) => {
    return getMarketContract(walletHelperInstance.getWeb3(), marketId);
};

class MarketAPIs {
    constructor() {
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
        /**
         {
                    internalType: "uint256",
                    name: "investmentAmount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "minOutcomeTokensToBuy",
                    type: "uint256",
                },
         */
        const result = await generateMarketContract(marketId)
            .methods
            .buy(investmentAmount, outcomeIndex, 0)
            .send({
                from: wallet,
            });
        return result;
    }

    async getWalletMarketPastEvents(
        wallet,
        marketId) {
        /**
         {
                    internalType: "uint256",
                    name: "investmentAmount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "minOutcomeTokensToBuy",
                    type: "uint256",
                },
         */
        const result = await generateMarketContract(marketId)
            .getPastEvents("allEvents", {
                fromBlock: 1,
            });
        return result;
    }

    async sell(wallet, marketId, amount, sellIndex) {
        /*
                        {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "index",
                    type: "uint256",
                },
        */
        const result = await generateMarketContract(marketId)
            .methods
            .sell(amount, sellIndex)
            .send({
                from: wallet,
            });
        return result;
    }

    async getOptionTokensCountOfBuy(wallet, marketId, buyAmount, outcomeIndex) {
        /**
                {
                    internalType: "uint256",
                    name: "investmentAmount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "outcomeIndex",
                    type: "uint256",
                }
         */
        const result = await generateMarketContract(marketId)
            .methods
            .calcBuyAmount(buyAmount, outcomeIndex)
            .call({
                from: wallet,
            });

        return result;
    }

    async getCollateralTokensCountOfSell(wallet, marketId, sellAmount, inputIndex) {
        /**
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "inputIndex",
                    type: "uint256",
                },
         */
        const result = await generateMarketContract(marketId)
        .methods
            .calcSellReturnInv(sellAmount, inputIndex)
            .call({
                from: wallet,
            });

        return result;
    }

    async getWalletOptionTokensBalance(wallet, marketId) {
        /**
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                }
         */
        const result = await generateMarketContract(marketId)
        .methods
            .getBalances(wallet)
            .call({
                from: wallet,
            });

        return result;
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
        /*

                        {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
                */
        const result = await generateMarketContract(marketId)
            .methods
            .balanceOf(wallet)
            .call({
                from: wallet,
            });

        return result;
    }

    async addLiquidityToMarket(wallet, marketId, amount) {
        /*
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
        */
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
            .removeLiquidity(amount)
            .send({
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

    //Router functions
    async createMarket(wallet, question, endTimestamp, resolveTimestamp) {
        /*
                {
                    internalType: "string",
                    name: "marketQuestion",
                    type: "string",
                },
                {
                    internalType: "uint256",
                    name: "participationEndTime",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "resolvingPeriodInDays",
                    type: "uint256",
                },
        */
        const result = await this.marketRouterContract
            .methods
            .createMarketProposal(question, endTimestamp, resolveTimestamp)
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

    async getWalletAllowanceOfCollateralTokenForMarket(wallet, marketContractId) {
        const result = await this.collateralTokenContract
            .methods
            .allowance(wallet, marketContractId)
            .call({
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
}

export default MarketAPIs;
