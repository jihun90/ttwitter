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
import { App } from './appService';

type UserInfo = User;
class AuthService {
    private static sInstance: AuthService;
    private authService: Authorization;

    public static GetInstance(): AuthService {
        if (!AuthService.sInstance) {
            AuthService.sInstance = new AuthService();
        }
        return AuthService.sInstance;
    }

    constructor() {
        this.authService = getAuth(App.GetInstance().app);
    }

    get user() {
        return this.authService.currentUser;
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

    OnAuthChanged(observer: NextOrObserver<UserInfo>) {
        onAuthStateChanged(this.authService, observer);
    }

    IsUserInfo(user: unknown): user is UserInfo {
        return (user as UserInfo).uid != undefined;
    }
}

export { AuthService };
export type { UserInfo };
export type { AuthError, UserCredential, AuthProvider } from 'firebase/auth';
export { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
