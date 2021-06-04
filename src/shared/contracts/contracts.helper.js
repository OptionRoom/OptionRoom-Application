import marketAbi from './market.abi';
import marketControllerAbi from './market-controller.abi';
import marketsQueryAbi from './markets-query.abi';
import optionTokenAbi from './option-token.abi';
import usdtAbi from './usdt.abi';
import roomAbi from './room-token.abi';
import {walletHelper} from "../wallet.helper";
import {MaxUint256} from "../constants";

/**
 * aaa0.address
 0x6644b9249669fdf8D33af4c55af9B1cCb6C95935
 aaa1.address (AAA1DemoToken1)
 0x5dDc9B7FA9C62429D1125F0051812F3eE1fbD41D
 aaa2.address
 0xA0831D0c628bB0C6d9b50cDB9A0F1C11fF5115AE
 aaa3.address (AAA3MarketController1)
 0x99223D3733e57201E0556D9FDcDeaB77b12ec9D9
 aaa4.address
 0x8783a01173DD2f32e3543318F906333af3509eCa
 aaa5.address
 0xD4F87e2c60998acB9B5e4a612627860ea49F0489
 aaa6.address
 0x1092E88673645B5583b03686A9bd11Dc32377Cb2
 aaa7.address
 0xC9250Ee6C11273352d8cb79368936626C7Ad1B08
 aaa8.address
 0x6A3b1791f714Ce28Cf67CFdca8C900760aC39B99
 aaa9.address AAA9ORMarketsQuery
 0x1bfdCB2247f503B44f9c5d0A28F9F58b995986fC
 aaa10.address
 0xA268e2aC372ac963132B306dA00818F3BbEB9FFE
 aaa11.address AAA11DemoRoom1
 0xf4E9FA804e14151e92666B57B6E0387725eaF812
 * @type {{default: {market: string, market_controller: string, markets_query: string, usdt: string, option_token: string}}}
 */

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

/**
 aaa0.address time control
 0x444E16e7Ac0Bf1Ba04Ad46e76D7099A70A6Af1C1
 aaa1.address (AAA1DemoToken1) --> Collatreal token
 0xF0cff8695AB20665Df983bcA363e75B206dB299a
 aaa2.address ConditnalToken --> Option Token
 0xf3ADc7F24611cd71D5008e91808B31C882d49D10
 aaa3.address MarketControllerContract
 0x90435eCdB58B2E379AB6d540555DCEf3827D8C6A
 aaa4.address --> MarketTemplate
 0xc068e3A50cF590F2c7473FFB498b3b0B216F2094
 aaa5.address --> RewardsPrograme
 0x1b14b7986B3aa4f78a474c19151Faec4d5A5cd07
 aaa6.address --> RewardsCenter
 0x2Cc055e58cc24917E5270Ff886eC7a1b52B43b96
 aaa7.address --> OrGovernor
 0x5B74ad7161D7860d1247363ff5a4fB3C00DD7071
 aaa8.address --> CourtStakeDummy
 0x4AC0017FAf698cC747ac14c4c42aadaaE58D9e57
 aaa9.address --> MarktesQuery
 0xDcB04413858aF86d0A9Fb9697DF944B97bF96Ae4
 aaa10.address --> OracelDummy, ROOM buy
 0x3dda6A68C9F2424FD5F65c9eb984D6C68753c69A
 aaa11.address --> ROOM Demo Token
 0xc4be9C259B8f16e0f895217818fF47D737fCBcd7
 */
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
