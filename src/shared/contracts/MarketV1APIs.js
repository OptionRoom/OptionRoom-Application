import {walletHelper} from "../wallet.helper";
import {MaxUint256} from "../../shared/constants";
import {getMarketContract} from "./MarketContract";
import {getContract} from "./contracts.helper";

import {marketStates, marketStatesDisplay} from '../constants';

const walletHelperInstance = walletHelper();

const generateMarketContract = (marketId) => {
    return getMarketContract(walletHelperInstance.getWeb3(), marketId);
};

class MarketV1APIs {
    constructor(version) {
        this.marketsQueryContract = getContract('markets_queryv1');
        this.marketControllerContract = getContract('market_controllerv1');
        this.collateralTokenContract = getContract('usdt');
        this.optionsTokenContract = getContract('option_tokenv1');
        this.roomTokenContract = getContract('room');
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


    async getWalletSharesOfMarket(wallet, marketId) {
        const result = await generateMarketContract(marketId)
            .methods
            .balanceOf(wallet)
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

    async getWalletSharesPercentageOfMarket(wallet, marketId) {
        const result = await generateMarketContract(marketId)
            .methods
            .getSharesPercentage(wallet)
            .call({
                from: wallet,
            });

        return result;
    }

    async removeLiquidityFromMarket(wallet, marketId, amount) {
        return this.marketControllerContract
            .methods
            .marketRemoveLiquidity(marketId, amount, true, false)
            .send({
                from: wallet,
            });
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

export default MarketV1APIs;
