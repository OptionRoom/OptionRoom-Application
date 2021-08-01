const Web3 = require('web3');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var init = async () => {
    const data = {};
    const marketId = "0x4d34C335b0372235E8D9d6C80B3Fb6A3Dc0400e8";
    const db = admin.firestore();
    const snapshot = await db.collection('markets-buy-sell-events').where('market', '==', marketId).get();
    console.log("dd", snapshot.docs.length);
    snapshot.docs.forEach(doc => {
        const docData = doc.data();
        data[docData.transactionHash] = docData;
    });

    Object.keys(data).forEach((entry) => {

    });
//    console.log("data", Object.keys(data).length);
}

init();
