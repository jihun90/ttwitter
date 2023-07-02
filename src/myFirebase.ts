import "firebase/auth"
import { Auth, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app: firebase.app.App = firebase.initializeApp(firebaseConfig);
const authService: Auth = getAuth(app);

async function CreateUser(email: string, password: string): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(authService, email, password);
}

async function SignIn(email: string, password: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(authService, email, password);
}

export { authService, CreateUser, SignIn }