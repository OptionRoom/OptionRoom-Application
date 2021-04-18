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
            return res.status(200).json(body);
        }

        return res.status(status).json({msg});
    }

    try {
        return cors(req, res, async () => {
            functions.logger.log("1", req);

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
                functions.logger.log("2", {
                    is: web3.utils.isAddress(req.body.account)
                });

                return handleResponse(`${req.body.account} is not an account`, 400);
            }

            const account = web3.utils.toChecksumAddress(req.body.account);
            functions.logger.log("3", {
                account
            });
            const message = req.body.message;
            const signature = req.body.signature;

            const recover = await web3.eth.personal.ecRecover(message, signature);
            functions.logger.log("4", {
                recover
            });
            if (recover != account) {
                functions.logger.log("5", {
                    recover
                });
                return handleResponse("Invalid signature", 401); // Invalid signature
            }

            // On success return the Firebase Custom Auth Token.
            const firebaseToken = await admin.auth().createCustomToken(account);
            functions.logger.log("6", {
                firebaseToken
            });
            return handleResponse('address', 200, {token: firebaseToken});
        })
    } catch (error) {
        return handleError('auth error', error)
    }
});
