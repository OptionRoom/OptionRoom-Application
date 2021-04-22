import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

import ConfigHelper from "./config.helper";


const firebaseConfig = {
    apiKey: ConfigHelper.getFirebaseApiKey(),
    authDomain: ConfigHelper.getFirebaseAuthDomain(),
    projectId: ConfigHelper.getFirebaseProjectId(),
    storageBucket: ConfigHelper.getFirebaseStorageBucket(),
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const signInUserWithToken = async (token) => {
    return firebase.auth().signInWithCustomToken(token);
};

export const signoutUser = async () => {
    return firebase.auth().signOut();
};

export const watchUserSignIn =  () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("user", user);
        } else {
            // User is signed out
            console.log("User is signed out");
        }
    });
};

export const createAuthOnFirebase = async (account, message, signature) => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.onload = function () {
            if (req.status === 400 || req.status === 401) {
                reject('Invalid sign');
                return;
            }
            if (req.status !== 200) {
                reject('Invalid response from Firebase Cloud Function ' + req.status);
                return;
            }
            const data = JSON.parse(req.responseText);
            if(!data || !data.data || !data.data.token) {
                reject('Invalid response from Firebase Cloud Function see developer console for details');
                return;
            }

            resolve(data.data.token);
        };

        req.onerror = function () {
            reject('Network error in Firebase Cloud Function call see developer console for details');
        };

        const url = 'https://us-central1-' + ConfigHelper.getFirebaseProjectId() + '.cloudfunctions.net/auth';
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({
            account: account,
            message: message,
            signature: signature
        }));
    });
};

export const createMarket = async (wallet, category, description, endDate, image, sources, title) => {
    return db.collection('markets')
        .add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            wallet: wallet,
            category: category,
            description: description,
            endDate: endDate,
            image: image,
            sources: sources,
            title: title,
        });
};

export const getMarkets = async () => {
    const snapshot = await db.collection('markets').get();
    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });
};

export const getMarketById = async (marketId) => {
    const snapshot = await db.collection('markets').doc(marketId).get();
    return {
        id: snapshot.id,
        ...snapshot.data()
    };
};

export const getMarketCategories = async () => {
    const snapshot = await db.collection('market-categories').get();
    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });
};

export const uploadMarketImage = async (file, progressCb) => {
    return new Promise((resolve, reject) => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const uploadTask = storageRef.child(`market-thumbnail/${uuidv4()}.${file.name.split('.').pop()}`).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                progressCb && progressCb(progress);
            },(error) =>{
                reject(error);
            },() =>{
                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                    resolve(url);
                });

                uploadTask.snapshot.ref.getMetadata().then((url) =>{
                    console.log("url", url);
                });

                console.log("uploadTask.snapshot.ref", uploadTask.snapshot.ref.fullPath);
            }
        )
    });
};
