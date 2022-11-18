export const betStates = {
    Invalid: '0',
    ActiveNotStarted: '1',
    ActiveBetting: '2',
    ActiveNoBetting: '3',
    Finished: '4',
    Canceled: '5',
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
