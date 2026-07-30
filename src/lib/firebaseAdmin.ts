import {initializeApp,cert} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// const serviceAccountPath = path.resolve(
//     process.cwd(),
//     process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json'
// );

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Missing Firebase environment variables");
}

const app = initializeApp({
    // credential: cert(serviceAccountPath)
    credential: cert({
        projectId,
        clientEmail,
        privateKey,
    }),
});

export const auth = getAuth(app);
export const db = getFirestore(app);