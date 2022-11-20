import {walletHelper} from "./../../shared/wallet.helper";
import {ChainNetworks} from "../../shared/constants";
import managerAbi from './abi/manager.json';
import marketsAbi from './abi/markets.json';

const walletHelperInstance = walletHelper();
export const contractName = {
    manager: 'manager',
    markets: 'markets',
    busd: 'busd'
}
export const contractsAbis = {
    [ChainNetworks.LOCAL_CHAIN]: {},
    [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET]: {
        [contractName.manager]: managerAbi,
        [contractName.markets]: marketsAbi,
        [contractName.busd]: marketsAbi,
    }
};

export const contractsAddresses = {
    [ChainNetworks.LOCAL_CHAIN]: {},
    [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET]: {
        [contractName.manager]: '0xbEd63701BA46d9B461b2A423723dea5796e82e5b',
        [contractName.markets]: '0x5bd84bE9367F331B3dF2C05F8e32AfCeb2A59595',
        [contractName.busd]: '0x51A4B023681Ac5D2C346efB2b8Eb4D250729c329',
    }
};
export const getContractAbi = (contractName) => {
    const chainId = walletHelperInstance.getChainId();
    if (!chainId || !contractsAbis[chainId][contractName]) {
        return;
    }
    return contractsAbis[chainId][contractName];
};

export const getContractAddress = (contractName) => {
    const chainId = walletHelperInstance.getChainId();
    if (!chainId | !contractsAddresses[chainId][contractName]) {
        return;
    }

    return contractsAddresses[chainId][contractName];
};

export const getContract = (contractName) => {
    const web3 = walletHelperInstance.getWeb3();
    const contractAbi = getContractAbi(contractName);
    const contractAddress = getContractAddress(contractName);
    if (!contractAbi || !contractAddress) {
        return;
    }

    const newContract = new web3.eth.Contract(
        contractAbi,
        contractAddress
    );

    return newContract;
};

export const createBet = async (starBetTime, endBetTime, resolveTime, title, description, choices, categories, baseToken) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    return betsContract.methods
        .createBet(starBetTime, endBetTime, resolveTime, title, description, choices, categories, baseToken)
        .send({
            from: account,
        });
};

export const buyBetOption = async (betAddress, choiceIndex, amount) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    return betsContract.methods
        .bet(betAddress, choiceIndex, amount, account)
        .send({
            from: account,
        });
};

export const redeem = async (betAddress) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    return betsContract.methods
        .redeem(betAddress)
        .send({
            from: account,
        });
};

export const getBetState = async (betIndex) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    return betsContract.methods
        .getBetState(betIndex)
        .call({
            from: account,
        });
}

export const getAccountRedeemStatus = async (betIndex) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    return betsContract.methods
        .redeemPerBetPerAccount(account, betIndex)
        .call({
            from: account,
        });
}

const formatBetResponse = (entry, betAddress) => {
    return {
        ...entry,
        address: betAddress,
        choices: entry.choices.slice(0, parseInt(entry.choicesCount)),
        categories: entry.categories.filter((entry) => entry != '0'),
    }
}
export const getBetAmounts = async (betIndex) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    return betsContract.methods
        .getBetsAmounts(betIndex)
        .call({
            from: account,
        });
}

export const getAccountBetAmountPerChoice = async (betIndex, choiceIndex) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    return betsContract.methods
        .amountsPerChicesPerBetsBerAccount(account, betIndex, choiceIndex)
        .call({
            from: account,
        });
}

export const getAccountBetAmounts = async (betAddress, choicesLength) => {
    const promiseArray = [];
    for(let i = 0; i<choicesLength; i++) {
        promiseArray.push(getAccountBetAmountPerChoice(betAddress, i));
    }

    const amounts = await Promise.all(promiseArray);

    return amounts;
}

export const getBets = async (withState, withAmounts) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    let bets = await betsContract
        .methods
        .getAllBets()
        .call({
            from: account,
        });
    bets = bets.map((entry, entryIndex) => {
        return formatBetResponse(entry, entryIndex);
    });

    if (withState) {
        try {
            const promiseArray = bets.map((entry) => {
                return getBetState(entry.address);
            })

            await Promise.all(promiseArray)
                .then(resolvedPromises => {
                    bets = bets.map((entry, index) => {
                        return {
                            ...entry,
                            state: resolvedPromises[index]
                        };
                    })
                });
        } catch (err) {
            console.warn(err);
        }
    }

    if (withAmounts) {
        try {
            const promiseArray = bets.map((entry) => {
                return getBetAmounts(entry.address);
            })

            await Promise.all(promiseArray)
                .then(resolvedPromises => {
                    bets = bets.map((entry, index) => {
                        return {
                            ...entry,
                            amounts: resolvedPromises[index]
                        };
                    })
                });
        } catch (err) {
            console.warn(err);
        }
    }

    return bets;
};


export const getBet = async (betAddress, withState, withAmounts) => {
    const account = walletHelperInstance.account;
    const betsContract = getContract(contractName.markets);
    let bet = await betsContract
        .methods
        .getBet(betAddress)
        .call({
            from: account,
        });

    bet = formatBetResponse(bet, betAddress);

    if (withState) {
        try {
            const state = await getBetState(bet.address);
            bet = {
                ...bet,
                state: state
            }
        } catch (err) {
            console.warn(err);
        }
    }

    if (withAmounts) {
        try {
            const amounts = await getBetAmounts(bet.address);
            bet = {
                ...bet,
                amounts: amounts
            }
        } catch (err) {
            console.warn(err);
        }

        try {
            const accountAmounts = await getAccountBetAmounts(bet.address, bet.choices.length);
            bet = {
                ...bet,
                accountAmounts: accountAmounts
            }
        } catch (err) {
            console.warn(err);
        }

        try {
            const accountRedeemStatus = await getAccountRedeemStatus(bet.address);
            bet = {
                ...bet,
                accountRedeemStatus: accountRedeemStatus
            }
        } catch (e) {
            console.warn(e)
        }
    }

    return bet;
};
