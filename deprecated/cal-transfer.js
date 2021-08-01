const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/2e181244f178448289be7be1460746ce`
));
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
        {id: 'transactionHash', title: 'transactionHash'},
        {id: 'blockNumber', title: 'blockNumber'},
        {id: 'from', title: 'from'},
        {id: 'to', title: 'to'},
        {id: 'value', title: 'value'},
    ]
});
const marketController = new web3.eth.Contract(
    [{"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
        }],
        "name": "decreaseAllowance",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
        }],
        "name": "increaseAllowance",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "recipient", "type": "address"}, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "sender", "type": "address"}, {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }]
    ,
    '0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64'
);

const allEvents = [];
let eventNumber = 0;

const init = async () => {
    const startBlockNumber = 11740308;
    const endBlockNumber = 12801954;

    const findNextEvents = async (blockNumber) => {
        const fromBlockToBlock = {
            fromBlock: blockNumber,
            toBlock: (blockNumber + 500) >= endBlockNumber ? endBlockNumber : (blockNumber + 500),
        };
        const events = await marketController
            .getPastEvents("Transfer", fromBlockToBlock);
        eventNumber = eventNumber + events.length;

        events.forEach((entry) => {
            allEvents.push({
                transactionHash: entry.transactionHash,
                blockNumber: entry.blockNumber,
                from: entry.returnValues.from,
                to: entry.returnValues.to,
                value: entry.returnValues.value,
            })
        });
    }


    let nextBlockNumber = startBlockNumber;
    let doIt = true;
    while (doIt) {
        console.log("nextBlockNumber", nextBlockNumber);
        await findNextEvents(nextBlockNumber);
        nextBlockNumber = nextBlockNumber + 501;
        if (nextBlockNumber > endBlockNumber) {
            doIt = false;
        }
    }

    console.log("allEvents", allEvents.length);
    console.log("eventNumber", eventNumber);

    csvWriter
        .writeRecords(allEvents)
        .then(() => console.log('The CSV file was written successfully'));
}

init();
