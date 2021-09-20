const functions = require("firebase-functions");

// metamask-auth
const Web3 = require('web3');

// Firebase Setup
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const contractsWeb3 = require('./contracts');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const marketsDbName = 'markets-prod';


const callInit = async () => {

    const web3 = new Web3(new Web3.providers.HttpProvider(
        `https://apis.ankr.com/7ea3fe6eb7f74bb7ba5c5534568d32de/a62123c774713864d59cfbdcd123bdc6/binance/full/main`
    ));

    const db = admin.firestore();

    const getMarkets = async () => {
        const snapshot = await db.collection(marketsDbName)
            .where("version", "==", '2.0')
            .get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    };

    const marketsInDb = await getMarkets();
    const marketQueryContract = contractsWeb3.getMarketQueryContract(web3);

    const validatingMarkets = await marketQueryContract.methods
        .getMarkets(2, 0, -1)
        .call();

    for(let i = 0; i < validatingMarkets.length; i++) {
        const marketContract = contractsWeb3.getMarketContract(web3, validatingMarkets[i]);
        const marketQuestionId = await marketContract.methods.getMarketQuestionID().call();
        const marketInDb = marketsInDb.filter(market => market.id === marketQuestionId);
        console.log("marketQuestionId", validatingMarkets[i], marketQuestionId, marketInDb);
    }
}

callInit();
