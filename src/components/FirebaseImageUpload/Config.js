
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_APP_APIKEY}`,
    authDomain: `${process.env.FIREBASE_APP_AUTHDOMAIN}`,
    projectId: `${process.env.FIREBASE_APP_PROJECTID}`,
    storageBucket: `${process.env.FIREBASE_APP_STORAGEBUCKET}`,
    messagingSenderId: `${process.env.FIREBASE_APP_MESSAGINGSENDERID}`,
    appId: `${process.env.FIREBASE_APP_APPID}`
};
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);