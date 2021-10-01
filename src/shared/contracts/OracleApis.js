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
            .createQuestion('Is Naser a hero 1?', ["Yes", "No", "Absolutely No"], toWei(1), (Math.floor(Date.now() / 1000) + (100 * 60)), 0, '0x0000000000000000000000000000000000000000', 0, [1], 'This is a test question')
            .send({
                from: wallet,
            });
        return result;
    }

    async vote(wallet, questionId, choice) {
        console.log("wallet, questionId, choice", wallet, questionId, choice);
        const result = await this.oracleInfoContract
            .methods
            .vote(toWei(questionId), choice)
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

    async getAllCategories(wallet) {
        const result = await this.oracleInfoContract
            .methods
            .getAllCategories()
            .call({
                from: wallet,
            });
        return result;
    }
}

export default OracleAPIs;
