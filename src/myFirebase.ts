import {
    Auth as Authorization,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
    UserCredential,
    signInWithPopup,
    AuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
    Firestore,
    getFirestore,
    collection,
    doc,
    setDoc,
    DocumentData,
    getDocs,
    QuerySnapshot,
    Query,
    query,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

class FirebaseObject {
    private static sInstance: FirebaseObject;
    private app: FirebaseApp;

    public Auth: Auth;
    public DB: DB;

    private constructor() {
        this.app = initializeApp(firebaseConfig);
        this.Auth = new Auth(this.app);
        this.DB = new DB(this.app);
    }

    public static GetInstance(): FirebaseObject {
        if (!FirebaseObject.sInstance) {
            FirebaseObject.sInstance = new FirebaseObject();
        }

        return FirebaseObject.sInstance;
    }
}

class Auth {
    private authService: Authorization;
    constructor(app: FirebaseApp) {
        this.authService = getAuth(app);
    }

    async CreateUser(email: string, password: string): Promise<UserCredential> {
        return await createUserWithEmailAndPassword(this.authService, email, password);
    }

    async SignIn(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(this.authService, email, password);
    }

    async SignInWithPopup(provider: AuthProvider) {
        return await signInWithPopup(this.authService, provider);
    }

    async SignOut() {
        return await signOut(this.authService);
    }

    OnAuthChanged(observer: NextOrObserver<User>) {
        onAuthStateChanged(this.authService, observer);
    }
}

enum dbPath {
    ttweet = 'ttweet',
}

type ttweetData = {
    id: string;
    msg: string;
    createdAt: number;
};

class DB {
    private dbService: Firestore;
    constructor(app: FirebaseApp) {
        this.dbService = getFirestore(app);
    }

    async setCollection(msg: string): Promise<void> {
        const newDoc = doc(collection(this.dbService, dbPath.ttweet));
        await setDoc(newDoc, { msg, createdAt: Date.now() });
    }

    async getCollection(): Promise<QuerySnapshot<DocumentData, DocumentData>> {
        const queryData: Query<DocumentData, DocumentData> = query(collection(this.dbService, dbPath.ttweet));
        return await getDocs(queryData);
    }
}

export type { ttweetData };
export { FirebaseObject };
export type { User, AuthError, UserCredential, AuthProvider } from 'firebase/auth';
export { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
export type { DocumentSnapshot, DocumentData } from 'firebase/firestore';
