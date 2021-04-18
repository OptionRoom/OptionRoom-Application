import {walletHelper} from "../wallet.helper";
import {getCourtTokenContract} from "./CourtTokenContract";
import {fromWei} from '../helper';
import {MaxUint256, controlledNetworkId} from "../../shared/constants";
import swal from "sweetalert";

const walletHelperInstance = walletHelper();

class MarketAPIs {
    constructor() {
        this.marketPlaceContract = null;
    }

    async buy(marketId, buyIndex, buyAmount, wallet) {
        const result = await this.marketPlaceContract
            .methods.buy(
                marketId,
                buyIndex,
                buyAmount
            )
            .send({
                from: wallet,
            });
        return result;
    };

    async sell(marketId, sellIndex, sellAmount, wallet) {

        const result = await this.marketPlaceContract
            .methods.sell(
                marketId,
                sellIndex,
                sellAmount
            )
            .send({
                from: wallet,
            });
        return result;
    };

    async getAllAccountsDollarBalance(wallet) {
        const result = await this.marketPlaceContract.methods.dollar_balanceList().call({
            from: wallet,
        });

        return result;
    };

    async getQuestionMarket(wallet, marketId) {
        const result = await this.marketPlaceContract.methods.getMarket(marketId).call({
            from: wallet,
        });

        return result;
    };

    async getQuestion_YesNo_BalanceList(wallet, marketId) {
        const result = await this.marketPlaceContract
            .methods.yesno_balanceList(marketId)
            .call({
                from: wallet,
            });
        return result;

    };

    async getQuestion_YesNo_Percentage(wallet, marketId) {
        const result = await this.marketPlaceContract
            .methods.yesno_percentage(marketId)
            .call({
                from: wallet,
            });

        return result;

    };

    async getQuestion_YesNo_BalancePool(wallet, marketId) {
        const result = await this.marketPlaceContract
            .methods.yesno_balancePool(marketId)
            .call({
                from: wallet,
            });

        return result;

    };

    async getQuestion__Account_Share_Balance(wallet, marketId) {
        const result = await this.marketPlaceContract
            .methods.share_balance(marketId)
            .call({
                from: wallet,
            });
        return result;

    };

    async getQuestion_Share_BalanceList(wallet, marketId) {
        const result = await this.marketPlaceContract
            .methods.share_balanceList(marketId)
            .call({
                from: wallet,
            });

        return result;

    };

    async getAccount__Question_YesNo_Balance(wallet, marketId) {
        const result = await this.marketPlaceContract
            .methods.yesno_balance(marketId)
            .call({
                from: wallet,
            });

        return result;

    };

    async getYesNoBalanceList(wallet,) {
        const result = await this.marketPlaceContract.methods.yesno_balanceList().call({
            from: wallet,
        });

        return result;

    };

    async add__Market_Liquidity(wallet, marketId,
                                add__Market_Liquidity__Input) {
        const result = await this.marketPlaceContract
            .methods.addLiquidity(
                marketId,
                add__Market_Liquidity__Input
            )
            .send({
                from: wallet,
            });
        return result;

    };

    async remove__Market_Liquidity(wallet, marketId, marketAccountShareBalanceInput) {
        const result = await this.marketPlaceContract
            .methods.removeLiquidity(
                marketId,
                marketAccountShareBalanceInput,
            )
            .send({
                from: wallet,
            });
        return result;

    };

    async add__Account_DollarBalance(wallet,) {
        const result = await this.marketPlaceContract
            .methods.dollar_mint(wallet, 1000)
            .send({
                from: wallet,
            });
        return result;

    };

    async get__Account_DollarBalance(wallet, mainAccount) {
        const result = await this.marketPlaceContract
            .methods.dollar_balance(mainAccount)
            .call({
                from: wallet,
            });

        return result;

    };

    async getNumberOfTokensByAmount(wallet, marketId,
                                    buyAmount,
                                    buyIndex) {
        const result = await this.marketPlaceContract
            .methods.calcBuyAmount(
                marketId,
                buyAmount,
                buyIndex
            )
            .call({
                from: wallet,
            });

        return result;

    };

    async getAmountByNumberOfTokens(wallet, marketId, sellIndex, sellAmount) {
        const result = await this.marketPlaceContract
            .methods.calcSellReturnInv(
                marketId,
                sellIndex,
                sellAmount
            )
            .call({
                from: wallet,
            });

        return result;

    };

    async resolveMarket(wallet, marketId, resolveIndex) {
        const result = await this.marketPlaceContract
            .methods.resolve(marketId, resolveIndex)
            .send({
                from: wallet,
            });

        return result;
    };

    async createMarket(wallet, marketId) {
        const result = await this.marketPlaceContract
            .methods.marketCreate(marketId)
            .send({
                from: wallet,
            });

        return result;
    };
}

export default MarketAPIs;
