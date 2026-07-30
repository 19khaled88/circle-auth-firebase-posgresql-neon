// test-login.ts (temporary)

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import dotenv from 'dotenv'

dotenv.config();


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

signInWithEmailAndPassword(auth,'test@gmail.com','testpassword')
    .then(async(cred)=>{
        const token = await cred.user.getIdToken();
        console.log(token)
    })