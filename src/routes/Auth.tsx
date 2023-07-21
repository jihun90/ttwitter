import AuthInput from '@/components/Auth/AuthInput';
import { UserCredential, AuthError, AuthService } from '@/services/firebase/authService';
import { useState } from 'react';
import { SocialButton, SocialType } from '@/components/Auth/SocialButton';

function Auth(): React.JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isNewAccount, setIsNewAccount] = useState<boolean>(true);
    const [error, SetError] = useState<string>('');

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const [userCredential, errorMsg] = GetUserCredential(isNewAccount, email, password);
        SetError(errorMsg);
        console.log(userCredential);
    }

    const toggleAccount = () => setIsNewAccount((prev: boolean) => !prev);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <AuthInput inputType={'email'} state={email} dispatch={setEmail} />
                <AuthInput inputType="password" state={password} dispatch={setPassword} />
                <input type="submit" value={isNewAccount ? 'Create Account' : 'Sign In'} />
            </form>
            {error}
            <span onClick={toggleAccount}>{isNewAccount ? ' Sign In' : 'Create Account'}</span>
            <div>
                <SocialButton type={SocialType.Google} />
                <SocialButton type={SocialType.Github} />
            </div>
        </div>
    );
}

function GetUserCredential(isNewAccount: boolean, email: string, password: string): [UserCredential, string] {
    let promise: Promise<UserCredential>;
    if (isNewAccount) {
        promise = AuthService.GetInstance().CreateUser(email, password);
    } else {
        promise = AuthService.GetInstance().SignIn(email, password);
    }

    let user = {} as UserCredential;
    let errorMsg = '';
    promise
        .then((userCredential: UserCredential) => {
            user = userCredential;
        })
        .catch((error: AuthError) => {
            errorMsg = error.message;
        });

    return [user, errorMsg];
}

export default Auth;
