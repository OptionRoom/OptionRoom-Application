const functions = require("firebase-functions");

// metamask-auth
const Web3 = require('web3');
const speakeasy = require('speakeasy');
const secret = '';
const web3 = new Web3(new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${functions.config().infura.id}`
));

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});

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
