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
import claimContractAbi from './claim_contract.abi.json';

/////
/////d
/////d
import CourtEthLpTokenContractAbi from './CourtEthLpTokenContract.abi.json';
import CourtFarming_CourtEthLpStakeAbi from './CourtFarming_CourtEthLpStake.abi.json';
import CourtFarming_HtStakeContractAbi from './CourtFarming_HtStakeContract.abi.json';
import CourtFarming_MatterStakeContractAbi from './CourtFarming_MatterStakeContract.abi.json';
import CourtFarming_RoomEthLpStakeContractAbi from './CourtFarming_RoomEthLpStakeContract.abi.json';
import CourtFarming_RoomStakeAbi from './CourtFarming_RoomStake.abi.json';
import HtTokenContractAbi from './HtTokenContract.abi.json';
import MatterTokenContractAbi from './MatterTokenContract.abi.json';
import NftStakeContractAbi from './NftStakeContract.abi.json';
import NftTokenContractAbi from './NftTokenContract.abi.json';
import RoomLPStakingContractAbi from './RoomLPStakingContract.abi.json';
import RoomLPTokenContractAbi from './RoomLPTokenContract.abi.json';
import WethTokenContractAbi from './WethTokenContract.abi.json';


import {walletHelper} from "../wallet.helper";
import {MaxUint256} from "../constants";

export const contractsAbis = {
    default: {
        claim_contract: claimContractAbi,
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


        CourtEthLpTokenContract: CourtEthLpTokenContractAbi,
        CourtFarming_CourtEthLpStake: CourtFarming_CourtEthLpStakeAbi,
        CourtFarming_HtStakeContract: CourtFarming_HtStakeContractAbi,
        CourtFarming_MatterStakeContract: CourtFarming_MatterStakeContractAbi,
        CourtFarming_RoomEthLpStakeContract: CourtFarming_RoomEthLpStakeContractAbi,
        CourtFarming_RoomStake: CourtFarming_RoomStakeAbi,
        HtTokenContract: HtTokenContractAbi,
        MatterTokenContract: MatterTokenContractAbi,
        NftStakeContract: NftStakeContractAbi,
        NftTokenContract: NftTokenContractAbi,
        RoomLPStakingContract: RoomLPStakingContractAbi,
        RoomLPTokenContract: RoomLPTokenContractAbi,
        WethTokenContract: WethTokenContractAbi,
    }
};

/**

 Main Net:
 usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
 ht_court_farming_claim: '0x79dC7BBFD0c9088B0633556D292B24c6F2dAe33c',
 matter_court_farming_claim: '0xbb5cc0913afd3218bafc350e72b16304a026b47e',
 room: '0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64',
 court_token: "0x0538A9b4f4dcB0CB01A7fA34e17C0AC947c22553",

 CourtEthLpTokenContract: "0x2dddc662114499d765b3a61f63139e7aee8cc138",
 CourtFarming_CourtEthLpStake: "0xaa0e0811ca1eb5dbdc128f2de7fff3e17b3b8feb",
 CourtFarming_HtStakeContract: "0x56cA5FAF9F40254e093D99B6381ccce8D8d78212",
 CourtFarming_MatterStakeContract: "0x3bF32bb284a038Fd40E6DC022fddc87F894bF148",
 CourtFarming_RoomEthLpStakeContract: "0xFec868e10C859383a714cA71Ff2016E5d4E22664",
 CourtFarming_RoomStake: "0x46Ea1Fc2a4beBBe9C66639F91Dbec19eD02d3a4e",
 HtTokenContract: "0x6f259637dcd74c767781e37bc6133cd6a68aa161",
 MarketContract: "",
 MatterTokenContract: "0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f",
 NftStakeContract: "0xD9036755366B750AA3b0870aaec6FC3094a7F6Ac",
 NftTokenContract: "0x8fDa42090a5AC9Dde01Fd2bA0431fE22FC72dc65",
 RoomLPStakingContract: "0x94c238362a5217545a7e2c96fa571471265cc1bc",
 RoomLPTokenContract: "0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732",
 WethTokenContract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",

 BSC:
 court_vote_stake: '0x3bd21a6d3925c8e7f20e1eb910d01c33b412e588',
 court_token: '0x75dcb13c357983b6281BDCD57d2D6e66f8c6086a',

 * @type {{"1": {CourtFarming_RoomStake: string, CourtFarming_CourtEthLpStake: string, CourtFarming_RoomEthLpStakeContract: string, NftTokenContract: string, CourtFarming_MatterStakeContract: string, CourtFarming_HtStakeContract: string, RoomLPStakingContract: string, room: string, CourtEthLpTokenContract: string, NftStakeContract: string, WethTokenContract: string, MatterTokenContract: string, MarketContract: string, matter_court_farming_claim: string, usdt: string, RoomLPTokenContract: string, ht_court_farming_claim: string, court_token: string, HtTokenContract: string}, "56": {court_vote_stake: string, court_token: string}, default: {market: string, market_controller: string, markets_query: string, option_token: string}, "3": {court_vote_stake: string, matter_court_farming_claim: string, usdt: string, ht_court_farming_claim: string}}}
 */
export const contractsAddresses = {
    default: {
        market: '0xE3D765778D5498a8979D94A48b038FE3d062b08c',
        market_controller: '0x90435eCdB58B2E379AB6d540555DCEf3827D8C6A',
        markets_query: '0xDcB04413858aF86d0A9Fb9697DF944B97bF96Ae4',
        option_token: '0xf3ADc7F24611cd71D5008e91808B31C882d49D10',
    },
    1: {
        claim_contract: '0xf57a6898f75fc8e9cbcd02f2777bd3642f1368b6',
        usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        ht_court_farming_claim: '0x79dC7BBFD0c9088B0633556D292B24c6F2dAe33c',
        matter_court_farming_claim: '0xbb5cc0913afd3218bafc350e72b16304a026b47e',
        room: '0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64',
        court_token: "0x0538A9b4f4dcB0CB01A7fA34e17C0AC947c22553",

        CourtEthLpTokenContract: "0x2dddc662114499d765b3a61f63139e7aee8cc138",
        CourtFarming_CourtEthLpStake: "0xaa0e0811ca1eb5dbdc128f2de7fff3e17b3b8feb",
        CourtFarming_HtStakeContract: "0x56cA5FAF9F40254e093D99B6381ccce8D8d78212",
        CourtFarming_MatterStakeContract: "0x3bF32bb284a038Fd40E6DC022fddc87F894bF148",
        CourtFarming_RoomEthLpStakeContract: "0xFec868e10C859383a714cA71Ff2016E5d4E22664",
        CourtFarming_RoomStake: "0x46Ea1Fc2a4beBBe9C66639F91Dbec19eD02d3a4e",
        HtTokenContract: "0x6f259637dcd74c767781e37bc6133cd6a68aa161",
        MarketContract: "",
        MatterTokenContract: "0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f",
        NftStakeContract: "0xD9036755366B750AA3b0870aaec6FC3094a7F6Ac",
        NftTokenContract: "0x8fDa42090a5AC9Dde01Fd2bA0431fE22FC72dc65",
        RoomLPStakingContract: "0x94c238362a5217545a7e2c96fa571471265cc1bc",
        RoomLPTokenContract: "0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732",
        WethTokenContract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
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
    },
    1337: {
        /**
         * aaa0.address time control
         0x8bcb66F1B339C0838ADb507e3774777e268cAf02
         aaa1.address (AAA1DemoToken1) --> Collatreal token
         0x9867a81Bc329ec16183609b14dcE041d2BF9F524
         aaa2.address ConditnalToken --> Option Token
         0xa29B19dCA9C63d884AAAd5560d58a18e997eF068
         aaa3.address MarketControllerContract
         0x0ab02b1699bC8ad1420f50c5Ab100d1218ff7A56
         aaa4.address --> MarketTemplate
         0x5042eEE35e948AA4dD244564b2B9154760C3A021
         aaa5.address --> RewardsPrograme
         0x87DecB1388bF851b92BCa6db6c8C443a02BA7126
         aaa6.address --> RewardsCenter
         0x9AE673CDbC53F07e93b4BB275dAAd060BB94bF26
         aaa7.address --> OrGovernor
         0xB5C87FCd10664cBa0aADa88A129487D10879CcA6
         aaa8.address --> CourtStakeDummy
         0xea88e2162F5442e51bb908a071A66Fe03E98Bf9a
         aaa9.address --> MarktesQuery
         0x390F0dBb191478DDBe4aF319ab80193FCec1B34d
         aaa10.address --> OracelDummy, ROOM buy
         0x4C5aBe74652d2feC570D3fE4fF53D9811023045e
         aaa11.address --> ROOM Demo Token
         0x7543Ff87eF161dDDa9F1d0B26792F0B98d6b5c35
         */
        market: '0xE3D765778D5498a8979D94A48b038FE3d062b08c',
        market_controller: '0x0ab02b1699bC8ad1420f50c5Ab100d1218ff7A56',
        markets_query: '0x390F0dBb191478DDBe4aF319ab80193FCec1B34d',
        option_token: '0xa29B19dCA9C63d884AAAd5560d58a18e997eF068',
        claim_contract: '0xf57a6898f75fc8e9cbcd02f2777bd3642f1368b6',
        usdt: '0x9867a81Bc329ec16183609b14dcE041d2BF9F524',
        ht_court_farming_claim: '0x79dC7BBFD0c9088B0633556D292B24c6F2dAe33c',
        matter_court_farming_claim: '0xbb5cc0913afd3218bafc350e72b16304a026b47e',
        room: '0x7543Ff87eF161dDDa9F1d0B26792F0B98d6b5c35',
        court_token: "0x0538A9b4f4dcB0CB01A7fA34e17C0AC947c22553",

        CourtEthLpTokenContract: "0x2dddc662114499d765b3a61f63139e7aee8cc138",
        CourtFarming_CourtEthLpStake: "0xaa0e0811ca1eb5dbdc128f2de7fff3e17b3b8feb",
        CourtFarming_HtStakeContract: "0x56cA5FAF9F40254e093D99B6381ccce8D8d78212",
        CourtFarming_MatterStakeContract: "0x3bF32bb284a038Fd40E6DC022fddc87F894bF148",
        CourtFarming_RoomEthLpStakeContract: "0xFec868e10C859383a714cA71Ff2016E5d4E22664",
        CourtFarming_RoomStake: "0x46Ea1Fc2a4beBBe9C66639F91Dbec19eD02d3a4e",
        HtTokenContract: "0x6f259637dcd74c767781e37bc6133cd6a68aa161",
        MarketContract: "",
        MatterTokenContract: "0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f",
        NftStakeContract: "0xD9036755366B750AA3b0870aaec6FC3094a7F6Ac",
        NftTokenContract: "0x8fDa42090a5AC9Dde01Fd2bA0431fE22FC72dc65",
        RoomLPStakingContract: "0x94c238362a5217545a7e2c96fa571471265cc1bc",
        RoomLPTokenContract: "0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732",
        WethTokenContract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    }
};

const walletHelperInstance = walletHelper();

const contractsInstances = {};

export const getContractAddress = (contractName) => {
    const chainId = walletHelperInstance.getChainId();

    return contractsAddresses[chainId][contractName];
};

export const getContractAbi = (contractName) => {
    return contractsAbis.default[contractName];
};

export const getContract = (contractName) => {
    const chainId = walletHelperInstance.getChainId();

    if (contractsInstances[chainId] && contractsInstances[chainId][contractName]) {
        return contractsInstances[chainId][contractName];
    }

    if(!getContractAbi(contractName) || !getContractAddress(contractName)) {
        return ;
    }
    const web3 = walletHelperInstance.getWeb3();
    const newContract = new web3.eth.Contract(
        getContractAbi(contractName),
        getContractAddress(contractName)
    );

    contractsInstances[chainId] = contractsInstances[chainId] || {};
    contractsInstances[chainId][contractName] = newContract;

    return contractsInstances[chainId][contractName];
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
