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
    "1": "Pending",
    "2": "Rejected",
    "3": "Active",
    "4": "Inactive",
    "5": "Resolving",
    "6": "Resolved",
};

export const controlledNetworkId = 3;//"mainnet";
//export const controlledNetworkId = 3;//"ropsten";
