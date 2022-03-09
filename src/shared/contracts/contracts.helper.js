import marketAbi from './market.abi';
import marketControllerAbi from './market-controller.abi';
import marketControllerV1Abi from './market-controllerv1.abi';
import marketControllerV2Abi from './market-controller_v2.abi';
import marketsQueryAbi from './markets-query.abi';
import optionTokenAbi from './option-token.abi';
import usdtAbi from './usdt.abi';
import roomAbi from './room-token.abi';
import matterCourtFarmingClaimAbi from './matter_court_farming_claim.abi.json';
import htCourtFarmingClaimAbi from './ht_court_farming_claim.abi.json';
import courtVoteStakeAbi from './court_vote_power_stake.abi.json';
import courtTokenContractAbi from './court_token_contract.abi.json';
import claimContractAbi from './claim_contract.abi.json';
import rewardProgramAbi from './reward_program.abi.json';
import CourtFarming_NoRoomStakeMatterAbi from './CourtFarming_NoRoomStakeMatter.abi.json';
import CourtFarming_NoRoomStakeHTAbi from './CourtFarming_NoRoomStakeHT.abi.json';
import CourtFarming_RoomStakeNewAbi from './CourtFarming_RoomStakeNew.abi.json';
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
import OROracleInfoContractAbi from './OROracleInfo.abi.json';
import JustForDebugAbi from './JustForDebug.abi.json';

//V4
import marketControllerV4Abi from '../../methods/abis/market-controller-v4.abi.json';
import orManagerAbi from '../../methods/abis/or-manager.abi.json';
import marketQueryV4Abi from '../../methods/abis/market-query-v4.abi.json';
import marketEntityAbi from '../../methods/abis/market-entity.abi.json';
import marketGovernanceAbi from '../../methods/abis/or-market-governance.abi.json';


import {walletHelper} from "../wallet.helper";
import {ChainNetworks, ContractNames, MaxUint256} from "../constants";

export const contractsAbis = {
    default: {
        [ContractNames.usdt]: usdtAbi,
        [ContractNames.room]: roomAbi,
        [ContractNames.busd]: usdtAbi,
        [ContractNames.marketControllerV4]: marketControllerV4Abi,
        [ContractNames.orManager]: orManagerAbi,
        [ContractNames.marketQueryV4]: marketQueryV4Abi,
        [ContractNames.marketGovernance]: marketGovernanceAbi,
        [ContractNames.optionTokenV4]: optionTokenAbi,

        claim_contract: claimContractAbi,
        market: marketAbi,
        market_controller: marketControllerAbi,
        markets_query: marketsQueryAbi,
        option_token: optionTokenAbi,
        ht_court_farming_claim: htCourtFarmingClaimAbi,
        matter_court_farming_claim: matterCourtFarmingClaimAbi,
        court_vote_stake: courtVoteStakeAbi,
        court_token: courtTokenContractAbi,
        reward_program: rewardProgramAbi,

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
        CourtFarming_NoRoomStakeMatter: CourtFarming_NoRoomStakeMatterAbi,
        CourtFarming_NoRoomStakeHT: CourtFarming_NoRoomStakeHTAbi,
        CourtFarming_RoomStakeNew: CourtFarming_RoomStakeNewAbi,
        CourtFarming_RoomLPStake: CourtFarming_RoomStakeNewAbi,
        OROracleInfo: OROracleInfoContractAbi,

        //V2 ABI
        market_controllerv2: marketControllerV2Abi,
        markets_queryv2: marketsQueryAbi,
        option_tokenv2: optionTokenAbi,

        //V1 ABI
        market_controllerv1: marketControllerV1Abi,
        markets_queryv1: marketsQueryAbi,
        option_tokenv1: optionTokenAbi,

        //Debug
        JustForDebug: JustForDebugAbi,
    }
};

export const contractsAddresses = {
    default: {
        market: '0xE3D765778D5498a8979D94A48b038FE3d062b08c',
        market_controller: '0x90435eCdB58B2E379AB6d540555DCEf3827D8C6A',
        markets_query: '0xDcB04413858aF86d0A9Fb9697DF944B97bF96Ae4',
        option_token: '0xf3ADc7F24611cd71D5008e91808B31C882d49D10',
    },
    [ChainNetworks.MAIN]: {
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
    [ChainNetworks.ROPSTEN]: {
        market: '0xE3D765778D5498a8979D94A48b038FE3d062b08c',
        market_controller: '0x377E6d09A0E4c325ca697B400d1AE937fFfC22B3',
        markets_query: '0xb94C7f331C711F9b118DA7ee0731fb1DADee4F02',
        option_token: '0x6485fb9C9C38B47815C25CCE6E54a8a3ad4C748f',
        claim_contract: '0xf57a6898f75fc8e9cbcd02f2777bd3642f1368b6',
        usdt: '0x4992f123281515DdC54E523cC16C79D37560b13e',
        ht_court_farming_claim: '0x79dC7BBFD0c9088B0633556D292B24c6F2dAe33c',
        matter_court_farming_claim: '0xbb5cc0913afd3218bafc350e72b16304a026b47e',
        room: '0x0A335B9D44D99ddb15bD90f0F1f0604b1C7f6756',
        court_token: "0x0538A9b4f4dcB0CB01A7fA34e17C0AC947c22553",
        reward_program: "0x924a0f72f5fcee64632011fa6d5bc9284e31fd0b",
        OROracleInfo: "0xc62Ffb4F3E82A1dA378450233976Dc6Cb6f2d66B",
        court_vote_stake: '0xedaa6c4d4f4923ab7b7bb8027839df7728012095',

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
        JustForDebug: "0x5659586fa5543e9c19250086035fa8c6099a6330",
    },
    [ChainNetworks.BINANCE_SMART_CHAIN]: {
        claim_contract: '0x8F58245B7cf498562d5de4E65f89286DDf5471e0',
        NftStakeContract: "0x1B161D12DC0bBEF6B28640F9D10F0f43f44885BA",

        court_vote_stake: '0x92Ca8A811B70bDb0dec6FA3b17912AEA1Fe8ed55',
        court_token: '0xEb804aE530Ed9D351374E865c110ed5ce172Cea0',

        market: '0x01102801C1556239e9EE7eE12194e9a138e7a5da',
        market_controller: '0x39cF7F5fc12309fB8E6cC5Ea53798CE962269edD',
        markets_query: '0xEa9864eE83e3D386c0d7FDDE35157E6621D9cC71',
        option_token: '0xfD8cb055567BCb6a39FA5142142021981fa0D7bC',

        usdt: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        room: '0x3C45A24d36Ab6fc1925533C1F57bC7e1b6fbA8a4',

        reward_program: "0x759AC111645C17F1388886dA3520725f9467f728",

        market_controllerv1: '0xbE227c937B87b6562d2cB5A5fCE51931C5397B09',
        market_controllerv2: '0xC3B6D447D5d8869e4Eb1423bA5B8d0d6aFD7B6f6',
        markets_queryv1: '0xf5637910a53379AF11237b2ef629220E79c5ECf6',
        markets_queryv2: '0x84287DD628f72Ce344524Dc31F9aD953BA42cD63',
        option_tokenv1: '0xB12045C83cEF8404A2f35d4188338503e20AE1a7',
        option_tokenv2: '0xB081caDb3f6Da14a22Fa0E1cFDb94e2561CC1C05',


        CourtFarming_NoRoomStakeMatter: '0xd45F3536DA6e796292b1ED1531Cf3f2Cd6CA1F32',
        CourtFarming_NoRoomStakeHT: '0xD3e1934c96763227639B9CD678722dc1534626C2',
        CourtFarming_RoomStakeNew: '0xcc8273b90d2b8dd557462b0935a5945040e35c87',
        CourtFarming_RoomLPStake: '0x497364aAdF12C594E5A5E9C2A76FdDad9261EF15',

        RoomLPStakingContract: "0x082A88370DF7355071532680EF129491236a5f37",
        RoomLPTokenContract: "0x84d15c02acd9fb9e0266d4075e7207db11a15cb3",
        OROracleInfo: "0x928e0868a3ea99273bcff5aca26ef6e2668cf4b5",
    },
    [ChainNetworks.LOCAL_CHAIN]: {
        market: '0xE3D765778D5498a8979D94A48b038FE3d062b08c',
        market_controller: '0xbe35e9712762D41328f536fCBEea62055fC86d66',
        markets_query: '0x68ee49f5D704C70094D99C13B923E78bba2EaeF8',
        option_token: '0xdE1f725dEC62ed6A33DE44B5C832CAee3543bBEE',
        claim_contract: '0xf57a6898f75fc8e9cbcd02f2777bd3642f1368b6',
        ht_court_farming_claim: '0x79dC7BBFD0c9088B0633556D292B24c6F2dAe33c',
        matter_court_farming_claim: '0xbb5cc0913afd3218bafc350e72b16304a026b47e',
        court_token: "0x0538A9b4f4dcB0CB01A7fA34e17C0AC947c22553",
        reward_program: "0x5aee05529C22376DE324f3916EEBB293390478C6",

        CourtEthLpTokenContract: "0x2dddc662114499d765b3a61f63139e7aee8cc138",
        CourtFarming_CourtEthLpStake: "0xaa0e0811ca1eb5dbdc128f2de7fff3e17b3b8feb",
        CourtFarming_HtStakeContract: "0x56cA5FAF9F40254e093D99B6381ccce8D8d78212",
        CourtFarming_MatterStakeContract: "0x3bF32bb284a038Fd40E6DC022fddc87F894bF148",
        CourtFarming_RoomEthLpStakeContract: "0xFec868e10C859383a714cA71Ff2016E5d4E22664",
        CourtFarming_RoomStake: "0x46Ea1Fc2a4beBBe9C66639F91Dbec19eD02d3a4e",
        HtTokenContract: "0x6f259637dcd74c767781e37bc6133cd6a68aa161",
        MatterTokenContract: "0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f",
        NftStakeContract: "0xD9036755366B750AA3b0870aaec6FC3094a7F6Ac",
        NftTokenContract: "0x8fDa42090a5AC9Dde01Fd2bA0431fE22FC72dc65",
        RoomLPStakingContract: "0x94c238362a5217545a7e2c96fa571471265cc1bc",
        RoomLPTokenContract: "0xBE55c87dFf2a9f5c95cB5C07572C51fd91fe0732",
        WethTokenContract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",

        [ContractNames.usdt]: '0x3Db9fbC0F2f9dfEDCCbd8ce8b3C66b4101a711B8',
        [ContractNames.room]: '0xB6bb2DC39230adC0289725753bB36DD4f1910C28',
        [ContractNames.marketControllerV4]: "0x41a87EA37804E6cf9FF2FD4D79b9FF634E9Bb8d6",
        [ContractNames.orManager]: "0xa69fccc11BcE9b69e52FF1D7724510702032A9C5",
        [ContractNames.marketQueryV4]: "0x0244047E1875CcBfef5E2E60ECb264DE9cF0f414",
        [ContractNames.busd]: "0x3Db9fbC0F2f9dfEDCCbd8ce8b3C66b4101a711B8",
        [ContractNames.marketGovernance]: "0xBDbcc26A3c30cb62E875d6C2eA873fc7CB67af3a",
        [ContractNames.optionTokenV4]: "0xF8aC027e3372aD93602d95FA3305cAe2d4D0bc1A",
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

export const getMarketEntityContract = (wallet, marketAddress) => {
    const web3 = walletHelperInstance.getWeb3();
    const newContract = new web3.eth.Contract(
        marketEntityAbi,
        marketAddress
    );

    return newContract;
}

export const getTokenContract = (contractAddress) => {
    const web3 = walletHelperInstance.getWeb3();
    const newContract = new web3.eth.Contract(
        getContractAbi(ContractNames.busd),
        contractAddress
    );

    return newContract;
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

export const mintRoomDemoTokenToWallet = (wallet, amount) => {
    const sourceContract = getContract(ContractNames.room);

    return sourceContract
        .methods
        .mintTokensTo(wallet, amount)
        .send({
            from: wallet,
        });
};
