import usdtAbi from './usdt.abi.json';
import matterCourtFarmingClaimAbi from './matter_court_farming_claim.abi.json';
import htCourtFarmingClaimAbi from './ht_court_farming_claim.abi.json';
import courtVoteStakeAbi from './court_vote_power_stake.abi.json';
import courtTokenContractAbi from './court_token_contract.abi.json';

const contractAddress = {
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
        court_token_contract: '0x75dcb13c357983b6281BDCD57d2D6e66f8c6086a',
    }
};

export const getContract = (chainId, web3, contractName) => {
    if (contractName === 'usdt') {
        return new web3.eth.Contract(usdtAbi, contractAddress[chainId].usdt);
    }

    if (contractName === 'ht_court_farming_claim') {
        return new web3.eth.Contract(htCourtFarmingClaimAbi, contractAddress[chainId].ht_court_farming_claim);
    }

    if (contractName === 'matter_court_farming_claim') {
        return new web3.eth.Contract(matterCourtFarmingClaimAbi, contractAddress[chainId].matter_court_farming_claim);
    }

    if (contractName === 'court_vote_stake') {
        return new web3.eth.Contract(courtVoteStakeAbi, contractAddress[chainId].court_vote_stake);
    }

    if (contractName === 'court_token') {
        return new web3.eth.Contract(courtTokenContractAbi, contractAddress[chainId].court_token_contract);
    }
};

export const getContractAddress = (chainId, contractName) => {
    return contractAddress[chainId][contractName];
};
