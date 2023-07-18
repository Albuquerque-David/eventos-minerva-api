/* eslint-disable prettier/prettier */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import admin from 'firebase-admin';


// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
};

export function initializeFirebase() {
    const app = initializeApp(firebaseConfig);
    const appAdmin = admin.initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
}


