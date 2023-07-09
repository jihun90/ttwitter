import { FirebaseObject } from '@/myFirebase';
import { useNavigate, NavigateFunction } from 'react-router-dom';

function LogOutButton(): React.JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const onLogOutClick = () => {
        FirebaseObject.GetInstance()
            .Auth.SignOut()
            .then(() => navigate('/'))
            .catch(() => {
                throw Error('SignOut Error');
            });
    };

    return <button onClick={onLogOutClick}>Log Out</button>;
}

export default LogOutButton;
