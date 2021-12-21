import {getContract} from "./contracts.helper";


class BalanceDebugAPIs {
    constructor(version) {
        this.justForDebugContract = getContract('JustForDebug');
    }

    async getBalances(wallet) {
        try {
            const result = await this.justForDebugContract
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
}

export default BalanceDebugAPIs;
