import { SignInWithPopup, GoogleAuthProvider, GithubAuthProvider, AuthProvider, UserCredential } from "@/myFirebase";
import { ReactElement } from "react";

enum SocialType {
    Google = "Google",
    Github = "Github",
}

function CreateProvider(type: SocialType): AuthProvider {
    if (type === SocialType.Google) {
        return new GoogleAuthProvider();
    } else if (type === SocialType.Github) {
        return new GithubAuthProvider();
    } else {
        throw Error("Can not find social Provider");
    }
}

type SocialButtonProps = {
    type: SocialType;
};

function SocialButton({ type }: SocialButtonProps) {
    const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const provider: AuthProvider = CreateProvider(type);
        const data: Promise<UserCredential> = SignInWithPopup(provider);
    };

    return (
        <button
            name={type.toString()}
            onClick={onClick}
        >{`Continue With ${type.toString()}`}</button>
    );
}

export { SocialType };
export { SocialButton };
