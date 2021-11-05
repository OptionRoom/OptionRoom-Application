const functions = require("firebase-functions");

// metamask-auth
const Web3 = require('web3');

const {sendNotification} = require("./notifications.helper");

const web3 = new Web3(new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${functions.config().infura.id}`
));

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});

// Firebase Setup
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const contractsWeb3 = require('./contracts');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const marketsDbName = 'markets-prod';
exports.auth = functions.https.onRequest((req, res) => {
    const handleError = (msg, error) => {
        console.error(msg, error);
        return res.sendStatus(500);
    }

    const handleResponse = (msg, status, body) => {
        if (body) {
            return res.status(200).json({data: body});
        }

        return res.status(status).json({data: msg});
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
                functions.logger.warn(`Invalid login of ${recoveredAccount} ${account}`);
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


exports.syncBuyAndSell = functions.pubsub.schedule('every 2 minutes').onRun(async (context) => {

    const maxBlockCount = 2000;

    const callInit = async () => {

        let syncedEventsCount = 0;
        const web3 = new Web3(new Web3.providers.HttpProvider(
            `${functions.config().ankr.bsc_url}`
        ));

        const db = admin.firestore();
        const generalRef = await db.collection('general').get();
        let generalDb = {};
        generalRef.forEach((doc) => {
            generalDb = {
                id: doc.id,
                data: doc.data()
            };
        });


        const getMarkets = async () => {
            const snapshot = await db.collection(marketsDbName)
                .where("version", "==", '3.0')
                .get();
            return snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
        };

        const getEventInDbByHash = async (hash) => {
            const snapshot = await db.collection('markets-buy-sell-events')
                .where('transactionHash', '==', hash)
                .get();

            return snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
        }

        const marketsInDb = await getMarkets();
        const marketAddressOnId = {};
        const marketsNeedUpdateByAddress = {};
        const latestSyncedBlockNumber = generalDb['data']['buySellBlockNumber'];
        functions.logger.log(`Start sync`, latestSyncedBlockNumber);

        const marketController = contractsWeb3.getMarketControllerContract(web3);
        const marketQueryContract = contractsWeb3.getMarketQueryContract(web3);

        const getMarketById = async (marketId) => {
            const result = await marketQueryContract
                .methods
                .getMarket(marketId)
                .call();

            return result;
        }

        const getMarketQuestionIdByMarketAddress = async (marketAddress) => {
            const result = await marketController
                .methods
                .getMarketInfo(marketAddress)
                .call();

            return result.metaDataID;
        }

        const updateMarketTradeVolumeTemp = async (marketAddress, val) => {
            if (marketsNeedUpdateByAddress[marketAddress]) {
                marketsNeedUpdateByAddress[marketAddress] = marketsNeedUpdateByAddress[marketAddress] + (val / 1e18);
            } else {
                if (!marketAddressOnId[marketAddress]) {
                    const marketId = await getMarketQuestionIdByMarketAddress(marketAddress);
                    marketAddressOnId[marketAddress] = marketId;
                }
                const marketInDb = marketsInDb.find(m => m.id === marketAddressOnId[marketAddress]);
                marketsNeedUpdateByAddress[marketAddress] = (marketInDb.tradeVolume || 0) + (val / 1e18);
            }
        };

        const callEvents = async (fromBlock, toBlock) => {
            const fromBlockToBlock = {
                fromBlock: fromBlock,
                toBlock: toBlock
            };

            try {
                const buyEvents = await marketController
                    .getPastEvents("MCBuy", fromBlockToBlock);

                if (buyEvents && buyEvents.length > 0) {
                    for (let entry of buyEvents) {
                        const entryParsed = JSON.parse(JSON.stringify(entry));
                        const docsThere = await getEventInDbByHash(entryParsed.transactionHash);
                        if (docsThere.length === 0) {
                            const marketAddress = entryParsed.returnValues.market;
                            await db.collection('markets-buy-sell-events').add({
                                ...entryParsed,
                                market: marketAddress,
                                wallet: entryParsed.returnValues.buyer,
                                createdAt: new Date().getTime()
                            });

                            await updateMarketTradeVolumeTemp(marketAddress, parseFloat(entryParsed.returnValues.investmentAmount));
                            syncedEventsCount += 1;
                        }
                    }
                }

                functions.logger.log(`sycned MCBuy`, fromBlockToBlock, buyEvents.length);
            } catch (error) {
                functions.logger.error(`Failed sync MCBuy`, fromBlockToBlock, error);
            }

            try {
                const sellEvents = await marketController
                    .getPastEvents("MCSell", fromBlockToBlock);

                if (sellEvents && sellEvents.length > 0) {
                    for (let entry of sellEvents) {
                        const entryParsed = JSON.parse(JSON.stringify(entry));
                        const docsThere = await getEventInDbByHash(entryParsed.transactionHash);

                        if (docsThere.length === 0) {
                            const marketAddress = entryParsed.returnValues.market;
                            await db.collection('markets-buy-sell-events').add({
                                ...entryParsed,
                                market: marketAddress,
                                wallet: entryParsed.returnValues.seller,
                                createdAt: new Date().getTime()
                            });
                            await updateMarketTradeVolumeTemp(marketAddress, parseFloat(entryParsed.returnValues.returnAmount));
                            syncedEventsCount += 1;
                        }
                    }
                }

                functions.logger.log(`sycned MCSell`, fromBlockToBlock, sellEvents.length);
            } catch (error) {
                functions.logger.error(`Failed sync MCSell`, fromBlockToBlock, error);
            }
        }

        const currentBlockNumber = await web3.eth.getBlockNumber();
        if (latestSyncedBlockNumber < currentBlockNumber) {
            const nextBlock = (latestSyncedBlockNumber + maxBlockCount) < currentBlockNumber ? (latestSyncedBlockNumber + maxBlockCount) : currentBlockNumber;
            await callEvents(latestSyncedBlockNumber, nextBlock);

            await db.collection("general").doc(generalDb.id).update({buySellBlockNumber: nextBlock + 1});

            functions.logger.log(`New markets which need update`, marketsNeedUpdateByAddress);

            for (let marketAddress of Object.keys(marketsNeedUpdateByAddress)) {
                await db.collection(marketsDbName).doc(marketAddressOnId[marketAddress]).update({tradeVolume: marketsNeedUpdateByAddress[marketAddress]});
            }

            functions.logger.log(`End sync`, latestSyncedBlockNumber, nextBlock, syncedEventsCount);
        } else {
            functions.logger.log(`Up to date`);
        }
    }

    return await callInit();
});

const entityEventsDbName = 'entity-tracking-events';
const entityTrackDbName = 'entity-tracking';

exports.updateMarketsStatus = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
    const db = admin.firestore();

    const web3 = new Web3(new Web3.providers.HttpProvider(
        `${functions.config().ankr.bsc_url}`
    ));

    const marketController = contractsWeb3.getMarketControllerContract(web3);

    const getMarketInfo = async (marketId) => {
        return marketController
            .methods
            .getMarketInfo(marketId)
            .call();
    }

    const getMarketState = async (marketId) => {
        return marketController
            .methods
            .getMarketState(marketId)
            .call();
    }

    const getMarketsInDb = async () => {
        const snapshot = await db.collection(entityTrackDbName)
            .where("type", "==", 'market')
            .get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    };

    const getMarketsInContracts = async () => {

        const result = await marketController
            .methods
            .getAllMarkets()
            .call();

        let markets = result.map((e) => {
            return {
                address: e,
            }
        });

        for (const m of markets) {
            const marketInfo = await getMarketInfo(m.address);
            m.info = marketInfo;
        }

        for (const m of markets) {
            const state = await getMarketState(m.address);
            m.state = state;
        }

        return markets;
    };

    const addNewMarket = async (address, state, info) => {
        await db.collection(entityTrackDbName).add({
            address,
            state,
            info: {
                createdTime: info.createdTime,
                validatingEndTime: info.validatingEndTime,
                participationEndTime: info.participationEndTime,
                resolvingEndTime: info.resolvingEndTime,
                lastResolvingVoteTime: info.lastResolvingVoteTime,
                lastDisputeResolvingVoteTime: info.lastDisputeResolvingVoteTime,
                question: info.question,
                metaDataID: info.metaDataID,
                resolveResorces: info.resolveResorces,
            },
            createdAt: new Date().getTime(),
            type: 'market'
        });
    };

    const updateMarketStatus = async (marketId, state) => {
        await db.collection(entityTrackDbName).doc(marketId).update({state: state});
    };

    const marketStates = {
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

    const buildNotificationMessage = (entityType, entityContractAddress, entityTitle, newState, isNew) => {
        const link = `https://app.optionroom.finance/markets/${entityContractAddress}`;
        let message = '';

        if (isNew) {
            message = `A new market has been created: ${entityTitle}. Validate the market on this link: \n ${link}`;
        } else {
            message = `Market ${entityTitle} has been changed to ${marketStates[newState]}, check details\n ${link}`;
        }

        return message;
    };

    const addNewMarketEvent = async (contractAddress, state, title, isNew) => {
        const message = buildNotificationMessage('market', contractAddress, title, state, isNew);

        await db.collection(entityEventsDbName).add({
            contractAddress,
            type: 'market',
            state,
            message: message,
            createdAt: new Date().getTime()
        });

        sendNotification('telegram', message);
    };

    const checkContract = async (entityInContract, entityInDb) => {
        if (entityInContract && !entityInDb) {
            //contract is newly created
            await addNewMarket(entityInContract.address, entityInContract.state, entityInContract.info);
            await addNewMarketEvent(entityInContract.address, entityInContract.state, entityInContract.info.question, true);
        } else if (entityInContract.state != entityInDb.state) {
            await updateMarketStatus(entityInDb.id, entityInContract.state);
            await addNewMarketEvent(entityInContract.address, entityInContract.state, entityInContract.info.question, false);
        }
    };

    const callInit = async () => {
        const marketsInDb = await getMarketsInDb();
        const marketsInContracts = await getMarketsInContracts();

        for (const m of marketsInContracts) {
            const marketInContract = m;
            const marketInDb = marketsInDb.find((entry) => {
                return entry.address = m.address;
            });

            await checkContract(marketInContract, marketInDb);
        }
    };

    return await callInit();
});
