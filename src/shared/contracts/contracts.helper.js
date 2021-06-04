import marketAbi from './market.abi';
import marketControllerAbi from './market-controller.abi';
import marketsQueryAbi from './markets-query.abi';
import optionTokenAbi from './option-token.abi';
import usdtAbi from './usdt.abi';
import roomAbi from './room-token.abi';
import matterCourtFarmingClaimAbi from './matter_court_farming_claim.abi.json';
import htCourtFarmingClaimAbi from './ht_court_farming_claim.abi.json';
import courtVoteStakeAbi from './court_vote_power_stake.abi.json';
import courtTokenContractAbi from './court_token_contract.abi.json';


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
        ht_court_farming_claim: htCourtFarmingClaimAbi,
        matter_court_farming_claim: matterCourtFarmingClaimAbi,
        court_vote_stake: courtVoteStakeAbi,
        court_token: courtTokenContractAbi,
    }
};

export const contractsAddresses = {
    default: {
        room: '0xc4be9C259B8f16e0f895217818fF47D737fCBcd7',
        market: '0xE3D765778D5498a8979D94A48b038FE3d062b08c',
        market_controller: '0x90435eCdB58B2E379AB6d540555DCEf3827D8C6A',
        markets_query: '0xDcB04413858aF86d0A9Fb9697DF944B97bF96Ae4',
        option_token: '0xf3ADc7F24611cd71D5008e91808B31C882d49D10',
        usdt: '0xF0cff8695AB20665Df983bcA363e75B206dB299a',
    },
    1: {
        usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        ht_court_farming_claim: '0x79dC7BBFD0c9088B0633556D292B24c6F2dAe33c',
        matter_court_farming_claim: '0xbb5cc0913afd3218bafc350e72b16304a026b47e'
    },
    3: {
        usdt: '0x3AeD0387917dd56B8c9C7a8bf02b2285aF7cFc13',
        ht_court_farming_claim: '0x3D7C9F5Bf0a753ebb7adE3e503706eFb19189491',
        matter_court_farming_claim: '0x67A21e6AEC690a9D9dd8e645F795a71385AAeEA7',
        court_vote_stake: '0x7943503f501E91057c65c40BF9333124305339F8',
    },
    56: {
        court_vote_stake: '0x3bd21a6d3925c8e7f20e1eb910d01c33b412e588',
        court_token: '0x75dcb13c357983b6281BDCD57d2D6e66f8c6086a',
    }
};

const walletHelperInstance = walletHelper();

const contractsInstances = {};

export const getContractAddress = (contractName) => {
    return contractsAddresses.default[contractName];
};

export const getContractAbi = (contractName) => {
    return contractsAbis.default[contractName];
};

export const getContract = (contractName) => {
    if (contractsInstances[contractName]) {
        return contractsInstances[contractName];
    }

    const web3 = walletHelperInstance.getWeb3();
    const newContract = new web3.eth.Contract(
        getContractAbi(contractName),
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
