import {
    GoogleAuthProvider,
    GithubAuthProvider,
    AuthProvider,
    UserCredential,
    AuthService,
} from '@/services/firebase/authService';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

enum SocialType {
    Google = 'Google',
    Github = 'Github',
}

function CreateProvider(type: SocialType): AuthProvider {
    if (type === SocialType.Google) {
        return new GoogleAuthProvider();
    } else if (type === SocialType.Github) {
        return new GithubAuthProvider();
    } else {
        throw Error('Can not find social Provider');
    }
}

type SocialButtonProps = {
    type: SocialType;
};

function SocialButton({ type }: SocialButtonProps) {
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const provider: AuthProvider = CreateProvider(type);
        const data: Promise<UserCredential> = AuthService.GetInstance().SignInWithPopup(provider);
    };

    return (
        <div className="authBtns">
            <button name={type.toString()} onClick={onClick} className="authBtn">
                {`Continue With ${type.toString()}`}{' '}
                {type == SocialType.Google ? <FontAwesomeIcon icon={faGoogle} /> : <FontAwesomeIcon icon={faGithub} />}
            </button>
        </div>
    );
}

export { SocialType };
export { SocialButton };
