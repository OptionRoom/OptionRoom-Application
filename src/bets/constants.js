export const betStates = {
    Invalid: '0',
    ActiveNotStarted: '1',
    ActiveBetting: '2',
    ActiveNoBetting: '3',
    Finished: '4',
    Canceled: '5',
};

export const betsStateColors = {
    [betStates.Invalid]: "#c0392b",
    [betStates.ActiveNotStarted]: "#bdc3c7",
    [betStates.ActiveBetting]: "#2ecc71",
    [betStates.ActiveNoBetting]: "#f39c12",
    [betStates.Finished]: "#34495e",
    [betStates.Canceled]: "#c0392b",
};

export const marketStatesDisplay = [
    {
        id: 'ALL',
        title: 'All'
    },
    {
        id: betStates.Invalid,
        title: 'Invalid'
    },
    {
        id: betStates.ActiveNotStarted,
        title: 'Active not started yet'
    },
    {
        id: betStates.ActiveBetting,
        title: 'Active'
    },
    {
        id: betStates.ActiveNoBetting,
        title: 'Active No Betting'
    },
    {
        id: betStates.Finished,
        title: 'Finished'
    },

    {
        id: betStates.Canceled,
        title: 'Canceled'
    },
];
