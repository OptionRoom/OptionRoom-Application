import {walletHelper} from "../wallet.helper";
import {getCourtTokenContract} from "./CourtTokenContract";
import {fromWei} from '../helper';
import {MaxUint256, controlledNetworkId} from "../../shared/constants";
import swal from "sweetalert";

const walletHelperInstance = walletHelper();

class MarketAPIs {
    constructor() {
        this.courtTokenContract = getCourtTokenContract(
            controlledNetworkId,
            walletHelperInstance.getWeb3()
        );
    }

    async buy(marketId, buyIndex, buyAmount, wallet) {
        const result = await getContract()
            .methods.buy(
                questionId,
                buyIndex,
                buyAmount
            )
            .send({
                from: wallet,
            });
        return result;
    };

    async sell(marketId, sellIndex, sellAmount, wallet) {

        const result = await getContract()
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

    async getAllAccountsDollarBalance() {
        const result = await getContract().methods.dollar_balanceList().call({
            from: accountContext.account,
        });

        return result;
    };

    async getQuestionMarket() {
        const result = await getContract().methods.getMarket(questionId).call({
            from: accountContext.account,
        });

        return result;
    };

    async getQuestion_YesNo_BalanceList() {
        const result = await getContract()
            .methods.yesno_balanceList(questionId)
            .call({
                from: accountContext.account,
            });
        return result;

    };

    async getQuestion_YesNo_Percentage() {
        const result = await getContract()
            .methods.yesno_percentage(questionId)
            .call({
                from: accountContext.account,
            });

        return result;

    };

    async getQuestion_YesNo_BalancePool() {
        const result = await getContract()
            .methods.yesno_balancePool(questionId)
            .call({
                from: accountContext.account,
            });

        return result;

    };

    async getQuestion__Account_Share_Balance() {
        const result = await getContract()
            .methods.share_balance(questionId, mainAccount)
            .call({
                from: accountContext.account,
            });
        return result;

    };

    async getQuestion_Share_BalanceList() {
        const result = await getContract()
            .methods.share_balanceList(questionId)
            .call({
                from: accountContext.account,
            });

        return result;

    };

    asyncgetAccount__Question_YesNo_Balance() {
        const result = await getContract()
            .methods.yesno_balance(questionId, mainAccount)
            .call({
                from: accountContext.account,
            });

        return result;

    };

    asyncgetYesNoBalanceList() {
        const result = await getContract().methods.yesno_balanceList().call({
            from: accountContext.account,
        });

        return result;

    };

    async add__Market_Liquidity() {
        const result = await getContract()
            .methods.addLiquidity(
                questionId,
                getBigNumberFromNumber(add__Market_Liquidity__Input),
                mainAccount
            )
            .send({
                from: accountContext.account,
            });
        return result;

    };

    async remove__Market_Liquidity() {
        const result = await getContract()
            .methods.removeLiquidity(
                questionId,
                getBigNumberFromNumber(marketAccountShareBalanceInput),
                mainAccount
            )
            .send({
                from: accountContext.account,
            });
        return result;

    };

    async add__Account_DollarBalance() {
        const result = await getContract()
            .methods.dollar_mint(mainAccount, getBigNumberFromNumber(1000))
            .send({
                from: accountContext.account,
            });
        return result;

    };

    async get__Account_DollarBalance() {
        const result = await getContract()
            .methods.dollar_balance(mainAccount)
            .call({
                from: accountContext.account,
            });

        return result;

    };

    async getNumberOfTokensByAmount() {
        const result = await getContract()
            .methods.calcBuyAmount(
                questionId,
                getBigNumberFromNumber(buyAmount),
                buyIndex
            )
            .call({
                from: accountContext.account,
            });

        return result;

    };

    async getAmountByNumberOfTokens() {
        const result = await getContract()
            .methods.calcSellReturnInv(
                questionId,
                sellIndex,
                getBigNumberFromNumber(sellAmount)
            )
            .call({
                from: accountContext.account,
            });

        return result;

    };

    async resolveMarket() {
        const result = await getContract()
            .methods.resolve(questionId, resolveIndex)
            .send({
                from: accountContext.account,
            });
        return result;

    };

    async createMarket() {
        const result = await getContract()
            .methods.marketCreate(questionId)
            .send({
                from: accountContext.account,
            });

        return result;
    };
}

export default MarketAPIs;
