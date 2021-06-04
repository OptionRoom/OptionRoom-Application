import marketAbi from './market.abi';
import marketControllerAbi from './market-controller.abi';
import marketsQueryAbi from './markets-query.abi';
import optionTokenAbi from './option-token.abi';
import usdtAbi from './usdt.abi';
import roomAbi from './room-token.abi';
import {walletHelper} from "../wallet.helper";
import {MaxUint256} from "../constants";

export const contractsAbis = {
    default: {
        market: marketAbi,
        market_controller: marketControllerAbi,
        markets_query: marketsQueryAbi,
        option_token: optionTokenAbi,
        usdt: usdtAbi,
        room: roomAbi,
    }
};

export const contractsAddresses = {
    default: {
        room    : '0xc4be9C259B8f16e0f895217818fF47D737fCBcd7',
        market: '0xE3D765778D5498a8979D94A48b038FE3d062b08c',
        market_controller: '0x90435eCdB58B2E379AB6d540555DCEf3827D8C6A',
        markets_query: '0xDcB04413858aF86d0A9Fb9697DF944B97bF96Ae4',
        option_token: '0xf3ADc7F24611cd71D5008e91808B31C882d49D10',
        usdt: '0xF0cff8695AB20665Df983bcA363e75B206dB299a',
    }
};

const walletHelperInstance = walletHelper();

const contractsInstances = {};

export const getContractAddress = (contractName) => {
    return contractsAddresses.default[contractName];
};


export const getContract = (contractName) => {
    if (contractsInstances[contractName]) {
        return contractsInstances[contractName];
    }

    const web3 = walletHelperInstance.getWeb3();
    const newContract = new web3.eth.Contract(
        contractsAbis.default[contractName],
        getContractAddress(contractName)
    );

    contractsInstances[contractName] = newContract;

    return contractsInstances[contractName];
};

export const getWalletBalanceOfContract = (wallet, contractName) => {
    const contract = getContract(contractName);

    return contract
        .methods
        .balanceOf(wallet)
        .call({
            from: wallet,
        });
};

export const getWalletAllowanceOfContractToSpender = (wallet, source, spender) => {
    const sourceContract = getContract(source);
    const spenderContractAddress = getContractAddress(spender);

    return sourceContract
        .methods
        .allowance(wallet, spenderContractAddress)
        .call({
            from: wallet,
        });
};

export const approveContractForSpender = (wallet, source, spender, amount) => {
    const sourceContract = getContract(source);
    const spenderContractAddress = getContractAddress(spender);

    return sourceContract
        .methods
        .approve(spenderContractAddress, amount ? amount : MaxUint256)
        .send({
            from: wallet,
        });
};
