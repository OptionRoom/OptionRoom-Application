const functions = require("firebase-functions");

// metamask-auth
const Web3 = require('web3');
const speakeasy = require('speakeasy');
const secret = '';
const web3 = new Web3(new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${functions.config().infura.id}`
));

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({ origin: true });

// Firebase Setup
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.auth = functions.https.onRequest((req, res) => {
    const handleError = (msg, error) => {
        console.error(msg, error);
        return res.sendStatus(500);
    }

    const handleResponse = (msg, status, body) => {
        if (body) {
            return res.status(200).json({ data: body });
        }

        return res.status(status).json({ data: msg });
    }

    try {
        return cors(req, res, async () => {
            if (req.method !== 'POST') {
                return handleResponse('post error', 403);
            }

            if (!req.body.account) {
                return handleResponse('account error', 400);
            }

            if (!req.body.signature) {
                return handleResponse('signature error', 400);
            }

            if (!req.body.message) {
                return handleResponse('message error', 400);
            }

            if (!web3.utils.isAddress(req.body.account)) {
                return handleResponse(`${req.body.account} is not an account`, 400);
            }

            const message = req.body.message;
            const signature = req.body.signature;
            const account = req.body.account;

            const recoveredAccount = web3.eth.accounts.recover(message, signature);

            if (recoveredAccount != account) {
                functions.logger.log(`Invalid login of ${recoveredAccount} ${account}`);
                return handleResponse("Invalid signature", 401); // Invalid signature
            }

            // On success return the Firebase Custom Auth Token.
            const firebaseToken = await admin.auth().createCustomToken(account);

            functions.logger.log(`Successful login of ${account}`);

            return handleResponse('Successful', 200, {
                token: firebaseToken
            });
        })
    } catch (error) {
        return handleError('auth error', error)
    }
});


exports.syncBuyAndSell = functions.pubsub.schedule('every 3 mins').onRun(async (context) => {
    const callInit = async () => {
        let syncedEventsCount = 0;
        const web3 = new Web3(new Web3.providers.HttpProvider(
            `https://bsc-dataseed1.ninicoin.io/`
        ));

        const db = admin.firestore();
        const generalRef = await db.collection('general').get();
        let generalDb = {};
        generalRef.forEach((doc) => {
            generalDb = {
                id: doc.id,
                data: doc.data()
            };
            console.log(doc.id, '=>', doc.data());
        });

        const latestSyncedBlockNumber = generalDb['data']['buySellBlockNumber'];
        functions.logger.log(`Start sync of block ${latestSyncedBlockNumber}`);

        const marketController = new web3.eth.Contract(
            [
                {
                    "inputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "disputer",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "disputeTotalBalances",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "reachThresholdFlag",
                            "type": "bool"
                        }
                    ],
                    "name": "DisputeSubmittedEvent",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "contract ORFPMarket",
                            "name": "fixedProductMarketMaker",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "contract ConditionalTokens",
                            "name": "conditionalTokens",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "contract IERC20",
                            "name": "collateralToken",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bytes32[]",
                            "name": "conditionIds",
                            "type": "bytes32[]"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "fee",
                            "type": "uint256"
                        }
                    ],
                    "name": "FixedProductMarketMakerCreation",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "oldGuardianAddress",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newGuardianAddress",
                            "type": "address"
                        }
                    ],
                    "name": "GovernorTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "oldGuardianAddress",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newGuardianAddress",
                            "type": "address"
                        }
                    ],
                    "name": "GuardianTransferred",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "buyer",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "investmentAmount",
                            "type": "uint256"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "outcomeIndex",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "outcomeTokensBought",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "name": "MCBuy",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "seller",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "returnAmount",
                            "type": "uint256"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "outcomeIndex",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "outcomeTokensSold",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "name": "MCSell",
                    "type": "event"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "FeeProposer",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "FeeProtocol",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "RP",
                    "outputs": [
                        {
                            "internalType": "contract IRewardProgram",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "buyRoomThreshold",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "ct",
                    "outputs": [
                        {
                            "internalType": "contract ConditionalTokens",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "disputeThreshold",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "feeMarketLP",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "fpMarkets",
                    "outputs": [
                        {
                            "internalType": "contract ORFPMarket",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getAllMarkets",
                    "outputs": [
                        {
                            "internalType": "contract ORFPMarket[]",
                            "name": "",
                            "type": "address[]"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getAllMarketsCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "governorAddress",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "guardianAddress",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "implementationMaster",
                    "outputs": [
                        {
                            "internalType": "contract ORFPMarket",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "marketCreationFees",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "marketDisputePeriod",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketDisputers",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "marketDisputersInfo",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "reason",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "marketMinShareLiq",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "marketReCastResolvingPeriod",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketResolvingVoters",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "marketResolvingVotersInfo",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "power",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "voteFlag",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint8",
                            "name": "selection",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "insertedFlag",
                            "type": "uint8"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "marketValidatingPeriod",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketValidatingVoters",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "marketValidatingVotersInfo",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "power",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "voteFlag",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint8",
                            "name": "selection",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "insertedFlag",
                            "type": "uint8"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "marketsCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketsLiquidityByUser",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketsProposedByUser",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketsTradeByUser",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "orGovernor",
                    "outputs": [
                        {
                            "internalType": "contract IORGovernor",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "",
                            "type": "bytes32"
                        }
                    ],
                    "name": "proposalIds",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "rewardCenterAddress",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "roomOracleAddress",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newGovernorAddress",
                            "type": "address"
                        }
                    ],
                    "name": "transferGovernor",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newGuardianAddress",
                            "type": "address"
                        }
                    ],
                    "name": "transferGuardian",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        }
                    ],
                    "name": "payoutsAction",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "getAccountInfo",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "canVote",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "votePower",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        }
                    ],
                    "name": "getMarketState",
                    "outputs": [
                        {
                            "internalType": "enum ORMarketLib.MarketState",
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "validationFlag",
                            "type": "bool"
                        }
                    ],
                    "name": "castGovernanceValidatingVote",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        }
                    ],
                    "name": "withdrawGovernanceValidatingVote",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint8",
                            "name": "outcomeIndex",
                            "type": "uint8"
                        }
                    ],
                    "name": "castGovernanceResolvingVote",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        }
                    ],
                    "name": "withdrawGovernanceResolvingVote",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "disputeReason",
                            "type": "string"
                        }
                    ],
                    "name": "disputeMarket",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "isValidatingVoter",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "power",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "voteFlag",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "selection",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "insertedFlag",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct ORMarketController.MarketVotersInfo",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "isResolvingVoter",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "power",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "voteFlag",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "selection",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "insertedFlag",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct ORMarketController.MarketVotersInfo",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        }
                    ],
                    "name": "getResolvingVotesCount",
                    "outputs": [
                        {
                            "internalType": "uint256[2]",
                            "name": "",
                            "type": "uint256[2]"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        }
                    ],
                    "name": "getResolvingOutcome",
                    "outputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "indexSet",
                            "type": "uint256[]"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "marketAddress",
                            "type": "address"
                        }
                    ],
                    "name": "getMarketInfo",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "createdTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "participationEndTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "resolvingEndTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lastResolvingVoteTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lastDisputeResolvingVoteTime",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "disputeTotalBalances",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256[2]",
                                    "name": "validatingVotesCount",
                                    "type": "uint256[2]"
                                },
                                {
                                    "internalType": "uint256[2]",
                                    "name": "resolvingVotesCount",
                                    "type": "uint256[2]"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "disputedFlag",
                                    "type": "bool"
                                }
                            ],
                            "internalType": "struct ORMarketController.MarketInfo",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "marketQuestionID",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "participationEndTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "resolvingEndTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "contract IERC20",
                            "name": "collateralToken",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialLiq",
                            "type": "uint256"
                        }
                    ],
                    "name": "createMarketProposal",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketAddLiquidity",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sharesAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "autoMerg",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "withdrawFees",
                            "type": "bool"
                        }
                    ],
                    "name": "marketRemoveLiquidity",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "investmentAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "outcomeIndex",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "minOutcomeTokensToBu",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketBuy",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "marketSell",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "erc20Address",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        }
                    ],
                    "name": "withdrawFees",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "trader",
                            "type": "address"
                        }
                    ],
                    "name": "getMarketsCountByTrader",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "trader",
                            "type": "address"
                        }
                    ],
                    "name": "getMarketsByTrader",
                    "outputs": [
                        {
                            "internalType": "address[]",
                            "name": "",
                            "type": "address[]"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "templateAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setTemplateAddress",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "orGovernorAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setIORGoverner",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "rewardProgramAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setRewardProgram",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "conditionalTokensAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setConditionalToken",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setRoomoracleAddress",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setRewardCenter",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "roomAddres",
                            "type": "address"
                        }
                    ],
                    "name": "setRoomAddress",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "newfees",
                            "type": "uint256"
                        }
                    ],
                    "name": "setMarketCreationFees",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "minLiq",
                            "type": "uint256"
                        }
                    ],
                    "name": "setMarketMinShareLiq",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "p",
                            "type": "uint256"
                        }
                    ],
                    "name": "setMarketValidatingPeriod",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "p",
                            "type": "uint256"
                        }
                    ],
                    "name": "setMarketDisputePeriod",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "p",
                            "type": "uint256"
                        }
                    ],
                    "name": "setMarketReCastResolvingPeriod",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "t",
                            "type": "uint256"
                        }
                    ],
                    "name": "setDisputeThreshold",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "numerator",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "denominator",
                            "type": "uint256"
                        }
                    ],
                    "name": "setFeeMarketLP",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "numerator",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "denominator",
                            "type": "uint256"
                        }
                    ],
                    "name": "setFeeProtocol",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "numerator",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "denominator",
                            "type": "uint256"
                        }
                    ],
                    "name": "setFeeProposer",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "bool",
                            "name": "plentyFlag",
                            "type": "bool"
                        }
                    ],
                    "name": "setpenaltyOnWrongResolving",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "token",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "allowdFlag",
                            "type": "bool"
                        }
                    ],
                    "name": "setCollateralAllowed",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "market",
                            "type": "address"
                        }
                    ],
                    "name": "marketStop",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "setBuyRoomThreshold",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getCurrentTime",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
            ,
            '0xC3B6D447D5d8869e4Eb1423bA5B8d0d6aFD7B6f6'
        );

        const callEvents = async (currentBlockNumber) => {
            const fromBlockToBlock = {
                fromBlock: (currentBlockNumber - 5000) < latestSyncedBlockNumber ? latestSyncedBlockNumber : (currentBlockNumber - 5000),
                toBlock: currentBlockNumber
            };

            const buyEvents = await marketController
                .getPastEvents("MCBuy", fromBlockToBlock);

            if (buyEvents && buyEvents.length > 0) {
                for (let entry of buyEvents) {
                    const entryParsed = JSON.parse(JSON.stringify(entry));
                    const docsThere = await db.collection('markets-buy-sell-events')
                    .where('transactionHash', '==', entryParsed.transactionHash)
                    .get();
                    if(docsThere.docs.length === 0) {
                        await db.collection('markets-buy-sell-events').add({
                            ...entryParsed,
                            market: entryParsed.returnValues.market,
                            wallet: entryParsed.returnValues.buyer,
                            createdAt: new Date().getTime()
                        });
                        syncedEventsCount +=1;
                    }
                }
            }

            const sellEvents = await marketController
                .getPastEvents("MCSell", fromBlockToBlock);

            if (sellEvents && sellEvents.length > 0) {
                for (let entry of sellEvents) {
                    const entryParsed = JSON.parse(JSON.stringify(entry));
                    const docsThere = await db.collection('markets-buy-sell-events')
                                            .where('transactionHash', '==', entryParsed.transactionHash)
                                            .get();
                    if(docsThere.docs.length === 0) {
                        await db.collection('markets-buy-sell-events').add({
                            ...entryParsed,
                            market: entryParsed.returnValues.market,
                            wallet: entryParsed.returnValues.seller,
                            createdAt: new Date().getTime()
                        });
                        syncedEventsCount +=1;
                    }
                }
            }
        }

        const currentBlockNumber = await web3.eth.getBlockNumber();
        let do1 = true;
        let nextBlockNumber = currentBlockNumber;

        while (do1) {
            await callEvents(nextBlockNumber);
            nextBlockNumber = nextBlockNumber - 5001;
            if (nextBlockNumber < latestSyncedBlockNumber) {
                do1 = false;
            }
        }

        functions.logger.log(`End sync of block ${latestSyncedBlockNumber} new block is ${currentBlockNumber}, synced events count is ${syncedEventsCount}`);

        await db.collection("general").doc(generalDb.id).update({ buySellBlockNumber: currentBlockNumber });
    }

    return await callInit();
});
