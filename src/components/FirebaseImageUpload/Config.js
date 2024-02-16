
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDVRj52WkivYHHPyvEBruujwdYq7sJwwoA",
    authDomain: "codezee-e4741.firebaseapp.com",
    projectId: "codezee-e4741",
    storageBucket: "codezee-e4741.appspot.com",
    messagingSenderId: "1094849168393",
    appId: "1:1094849168393:web:7b2c19cefb27bf4a9724d8"
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);