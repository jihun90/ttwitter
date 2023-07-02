import { CreateUser, SignIn } from "@/myFirebase";
import { AuthError, UserCredential } from "firebase/auth";
import { useState } from "react";

function Auth(): React.ReactElement {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isNewAccount, setIsNewAccount] = useState<boolean>(true);
    const [error, SetError] = useState<string>("");

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let data: Promise<UserCredential>;

        if (isNewAccount) {
            data = CreateUser(email, password);
        } else {
            data = SignIn(email, password);
        }

        data.then((userCredential: UserCredential) => {
            const user: UserCredential = userCredential;
        }).catch((error: AuthError) => {
            SetError(error.message);
        });

        console.log(data);
    }

    function toggleAccount() {
        setIsNewAccount((prev: boolean) => !prev);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={isNewAccount ? "Create Account" : "Sign In"}
                />
            </form>
            {error}
            <span onClick={toggleAccount}>{isNewAccount ? " Sign In" : "Create Account"}</span>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;
