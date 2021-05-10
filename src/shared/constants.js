import { BigNumber } from "@ethersproject/bignumber";

export const colors = {
    primary: '#004BFF'
};

export const MaxUint256 = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
export const nftTires = [0, 1, 2, 3, 4];
export const allOfTires = {
    0: 75,
    1: 60,
    2: 45,
    3: 30,
    4: 12,
};

export const nftImages = {
    0: 'https://s3.amazonaws.com/www.optionroom.finance/nfts/fallen-oracle.jpg',
    1: 'https://s3.amazonaws.com/www.optionroom.finance/nfts/room.jpg',
    2: 'https://s3.amazonaws.com/www.optionroom.finance/nfts/echeleon.jpg',
    3: 'https://s3.amazonaws.com/www.optionroom.finance/nfts/pyramid.jpg',
    4: 'https://s3.amazonaws.com/www.optionroom.finance/nfts/citadel.jpg',
};

export const marketStates = {
    "0": "Invalid",
    "1": "Validating",
    "2": "Rejected",
    "3": "Active",
    "4": "Inactive",
    "5": "Resolving",
    "6": "Resolved",
    "7": "DisputePeriod",
    "8": "ResolvingAfterDispute",
};

export const marketStatesDisplay = {
    "0": "Invalid",
    "1": "Validating",
    "2": "Rejected",
    "3": "Active",
    "4": "Inactive",
    "5": "Resolving",
    "7": "Dispute",
    "6": "Resolved",
};

/**
 * Active Market: #2ecc71
 Pending Market: #f1c40f
 Rejected: #c0392b
 Inactive: #34495e
 Resolved: #bdc3c7
 Resolving: #f39c12
 * @type {{"0": string, "1": string, "2": string, "3": string, "4": string, "5": string, "6": string, "7": string, "8": string}}
 */
export const marketStateColors = {
    "0": "#",
    "1": "#f1c40f",
    "2": "#c0392b",
    "3": "#2ecc71",
    "4": "#34495e",
    "5": "#f39c12",
    "6": "#bdc3c7",
    "7": "#bdc3c7",
    "8": "#bdc3c7",
};

export const controlledNetworkId = 3;//"mainnet";
//export const controlledNetworkId = 3;//"ropsten";
