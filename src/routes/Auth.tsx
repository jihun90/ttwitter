import AuthInput from '@/components/Auth/AuthInput';
import { UserCredential, AuthError, AuthService } from '@/services/firebase/authService';
import { useState } from 'react';
import { SocialButton, SocialType } from '@/components/Auth/SocialButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

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
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="3x" style={{ marginBottom: 30 }} />
            <form onSubmit={onSubmit} className="container">
                <AuthInput inputType={'email'} state={email} dispatch={setEmail} />
                <AuthInput inputType="password" state={password} dispatch={setPassword} />
                <input
                    type="submit"
                    value={isNewAccount ? 'Create Account' : 'Sign In'}
                    className="authInput authSubmit"
                />
            </form>
            {error && <span className="authError">{error}</span>}
            <span onClick={toggleAccount} className="authSwitch">
                {isNewAccount ? ' Sign In' : 'Create Account'}
            </span>
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
