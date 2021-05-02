import {getCollateralTokenContract} from "./contracts/CollateralTokenContract";
import {getGovernanceContract} from "./contracts/GovernanceContract";
import {getOptionTokenContract} from "./contracts/OptionTokenContract";

const ConfigHelper = {
    getInfuraAppId: () => process.env.REACT_APP_INFURA_ID,
    getFirebaseApiKey: () => process.env.REACT_APP_FIREBASE_API_KEY,
    getFirebaseAuthDomain: () => process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    getFirebaseProjectId: () => process.env.REACT_APP_FIREBASE_PROJECT_ID,
    getFirebaseStorageBucket: () => process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    getFirebaseMessagingSenderId: () => process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    getFirebaseAppId: () => process.env.REACT_APP_FIREBASE_APP_ID,
    getFirebaseMeasurementId: () => process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    getAuthSignMessage: () => process.env.REACT_APP_AUTH_SIGN_PASSWORD,
    getContractsAddresses: () => {
        /*
            ropsten contracts
            return {
                marketRouter: '0xd9d28D8c09f85872AB04626D130D1F8fC07C8aa1',
                collateralToken: '0x604d5CE415dDbB3841bEECa9608fA5778C0b7e37',
                governance: '0xE2527a3e890085513fDC4b7E8d97d314D9c2e81F',
                optionToken: '0x8eFDC7Bd87368DE1893CB44f72D0f8697a2A9618'
            }
        */

        /**
         ====================
         marketRouter: '0x662daaDAA022402C4d0b52E2c4370D0870576EDA',
         collateralToken: '0x2CCeb143bd43F59db1A9b958Bd2FeB873e095870',
         governance: '0x046Bf24d1D896Bb07143aBD50BEDde01632083cF',
         optionToken: '0xc5e0C945fa0978474B08405FbEc6aDaB1A4c0CE0'

         */

        ///New Ones
        /**
         demoGovernence.address (AAA0)
         0x5dA38971Bf7D81114917a0185eaC29627a3285f8
         demoToken.address (AAA1)
         0x7F23Fd51dBd23bfCC4187AB7B39778f4ce655d57
         condToken.address (AAA2)
         0x80B445eCf87a04a0A7B789E2b45d48E45671fAbE
         markettemplate.address (AAA4)
         0xdEa0667116A1779362B6CB0263A8685d40627F55
         factoryC.address (AAA3)
         0x762A45ecA58745C478d3D6278e3C8f5dB72970b0
         */
        return {
            marketRouter: '0x762A45ecA58745C478d3D6278e3C8f5dB72970b0',
            collateralToken: '0x7F23Fd51dBd23bfCC4187AB7B39778f4ce655d57',
            governance: '0x5dA38971Bf7D81114917a0185eaC29627a3285f8',
            optionToken: '0x80B445eCf87a04a0A7B789E2b45d48E45671fAbE'
        }
    },
};

export default ConfigHelper;
