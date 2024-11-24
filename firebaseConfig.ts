import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth as firebaseGetAuth, setPersistence, browserSessionPersistence, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics, isSupported as analyticsIsSupported, Analytics } from "firebase/analytics";
import { getFirestore, Firestore, collection, CollectionReference } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1kw3Xyw2YfDexE_P23nZS4OIoaMnMKr0",
  authDomain: "myapp-cd268.firebaseapp.com",
  projectId: "myapp-cd268",
  storageBucket: "myapp-cd268.appspot.com",
  messagingSenderId: "1027477481413",
  appId: "1:1027477481413:web:57594601d4b1e80cff0dac",
  measurementId: "G-97KYY05FW9"
};

// Initialize Firebase app if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Custom getAuth function to wrap Firebase's getAuth
const getAuth = (): Auth => {
  return firebaseGetAuth(app); // Return the auth instance
};

// Initialize Firebase Auth with persistence
const auth: Auth = getAuth();  // Use the custom getAuth function
setPersistence(auth, browserSessionPersistence); // You can also use 'local' persistence if needed

// Initialize analytics (only if not already initialized)
let analytics: Analytics | undefined;
const initializeAnalytics = async () => {
  const isAnalyticsSupported = await analyticsIsSupported();
  if (isAnalyticsSupported && !analytics) {
    analytics = getAnalytics(app);
  }
};

initializeAnalytics(); // Initialize analytics asynchronously

// Initialize Firestore
const db: Firestore = getFirestore(app);

// Firestore collections for easy reference
export const usersRef: CollectionReference = collection(db, 'users');
export const roomRef: CollectionReference = collection(db, 'rooms');

// Export necessary modules for use
export { app, auth, analytics, db, signInWithEmailAndPassword, getAuth };
