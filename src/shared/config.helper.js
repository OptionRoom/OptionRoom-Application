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
};

export default ConfigHelper;
