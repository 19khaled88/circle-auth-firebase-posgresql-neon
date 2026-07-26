import {initializeApp,cert} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import path from 'path';

const serviceAccountPath = path.resolve(
    process.cwd(),
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json'
);


const app = initializeApp({
    credential: cert(serviceAccountPath)
});

export const auth = getAuth(app);
export const db = getFirestore(app);