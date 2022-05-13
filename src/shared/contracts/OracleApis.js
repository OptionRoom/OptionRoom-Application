import {getContract} from "./contracts.helper";
import {toWei} from "../helper";

class OracleAPIs {
    constructor() {
        this.oracleInfoContract = getContract('OROracleInfo');
    }

    async getAllQuestions(wallet) {
        const result = await this.oracleInfoContract
            .methods
            .getAllQuestions()
            .call({
                from: wallet,
            });
        return result;
    }

    async getQuestionInfo(wallet, questionId) {
        const result = await this.oracleInfoContract
            .methods
            .getQuestionInfo(questionId)
            .call({
                from: wallet,
            });
        return result;
    }

    async createQuestion(wallet) {
        const result = await this.oracleInfoContract
            .methods
            //createQuestion(string memory question, string[] memory choices, uint256 reward, uint256 rewardDistriputedEquallyPerc,uint256 duration, uint256 minPowerAboveDefault, address optionalERC20Address, uint256 minOptionalERC20Holding, uint256[] memory categoriesIndices, string memory description)
            .createQuestion('Should i invest in Bitcoin?', ["Yes", "No", "Absolutely No"], toWei(5), 50, (1*60*60) , 0, '0x0000000000000000000000000000000000000000', 0, [1], 'This is a test question 2')
            .send({
                from: wallet,
            });
        return result;
    }

    async vote(wallet, questionId, choice) {
        const result = await this.oracleInfoContract
            .methods
            .vote(questionId, choice)
            .send({
                from: wallet,
            });
        return result;
    }

    async getVoteCheck(wallet, questionId) {
        const result = await this.oracleInfoContract
            .methods
            .voteCheck(questionId, wallet)
            .call({
                from: wallet,
            });
        return result;
    }

    async getUserVote(wallet, questionId) {
        const result = await this.oracleInfoContract
            .methods
            .getUserVote(questionId, wallet)
            .call({
                from: wallet,
            });
        return result;
    }

    async getAllCategories(wallet) {
        const result = await this.oracleInfoContract
            .methods
            .getAllCategories()
            .call({
                from: wallet,
            });
        return result;
    }

    async getRewardInfoForQuestion(wallet, questionId) {
        const result = await this.oracleInfoContract
            .methods
            .getRewardInfoForQuestion(wallet, questionId)
            .call({
                from: wallet,
            });
        return result;
    }

    async claimRewards(wallet) {
        const result = await this.oracleInfoContract
            .methods
            .claimRewards()
            .send({
                from: wallet,
            });
        return result;
    }
}

export default OracleAPIs;
