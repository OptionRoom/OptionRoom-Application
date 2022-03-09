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

export const nftNames = {
    0: 'Fallen Oracle.',
    1: 'Room',
    2: 'Echeleon',
    3: 'pyramid',
    4: 'Citadel',
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

export const marketStatesDisplay = [
    {
        id: 'all',
        title: 'All',
        showInMarketsQuickFilter: true,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: true
    },
    {
        id: '3',
        title: 'Active',
        showInMarketsQuickFilter: true,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: false
    },
    {
        id: '0',
        title: 'Invalid',
        showInMarketsQuickFilter: false,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: false
    },
    {
        id: '1',
        title: 'Validating',
        showInMarketsQuickFilter: true,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: true
    },
    {
        id: '2',
        title: 'Rejected',
        showInMarketsQuickFilter: false,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: false
    },

    {
        id: '4',
        title: 'Inactive',
        showInMarketsQuickFilter: false,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: false
    },
    {
        id: '5',
        title: 'Resolving',
        showInMarketsQuickFilter: true,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: true
    },
    {
        id: '7',
        title: 'Dispute',
        showInMarketsQuickFilter: true,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: true
    },
    {
        id: '8',
        title: 'Resolve Again',
        showInMarketsQuickFilter: false,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: false
    },
    {
        id: '6',
        title: 'Resolved',
        showInMarketsQuickFilter: true,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: false
    },
    {
        id: '9',
        title: 'Force Resolved',
        hide: false,
        showInMarketsQuickFilter: false,
        showInMarketsFilterWidget: true,
        showInGovernanceFilterWidget: false
    }
];

/**
 * Active Market: #2ecc71
 Pending Market: #f1c40f
 Rejected: #c0392b
 Inactive: #34495e
 Resolved: #bdc3c7
 Resolving: #f39c12
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


export const courtStakeUnlockTimestamp = 1620914400;

export const ChainNetworks = {
    MAIN: 1,
    ROPSTEN: 3,
    KOVAN: 42,
    RINKEBY: 4,
    GOERLI: 5,
    BINANCE_SMART_CHAIN: 56,
    BINANCE_SMART_CHAIN_TESTNET: 97,
    LOCAL_CHAIN: 1337,
};

export const GovernanceTypes = {
    SURVEY: 'survey',
    MARKET: 'market',
    ORACLE: 'oracle',
    GOVERNANCE: 'governance'
};

export const FiltrationWidgetTypes = {
    MARKETS: 'markets',
    GOVERNANCE: 'governance'
};

export const marketDisputePeriod = 24 * 60 * 60;

export const ContractNames = {
    marketQueryV4: 'market_query_v4',
    marketControllerV4: 'market_controller_v4',
    usdt: 'usdt',
    room: 'room',
    orManager: 'or_manager',
    busd: 'busd',
    marketGovernance: 'market_governance',
    optionTokenV4: 'optionTokenV4',

};

export const MarketVotingTypes = {
    validating: 'validating',
    resolving: 'resolving',
    dispute: 'dispute'
};

export const MarketVotingTypesPerMarketAddress = {
    1: MarketVotingTypes.validating,
    5: MarketVotingTypes.resolving,
    8: MarketVotingTypes.resolving,
    7: MarketVotingTypes.dispute,
};
