import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT))});
}

export const auth = admin.auth();
