import AuthInput from '@/components/Auth/AuthInput';
import { FirebaseObject, UserCredential, AuthError } from '@/myFirebase';
import { useState } from 'react';
import { SocialButton, SocialType } from '@/components/Auth/SocialButton';

function Auth(): React.JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isNewAccount, setIsNewAccount] = useState<boolean>(true);
    const [error, SetError] = useState<string>('');

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let data: Promise<UserCredential>;

        if (isNewAccount) {
            data = FirebaseObject.GetInstance().Auth.CreateUser(email, password);
        } else {
            data = FirebaseObject.GetInstance().Auth.SignIn(email, password);
        }

        data.then((userCredential: UserCredential) => {
            const user: UserCredential = userCredential;
        }).catch((error: AuthError) => {
            SetError(error.message);
        });

        console.log(data);
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

export default Auth;
