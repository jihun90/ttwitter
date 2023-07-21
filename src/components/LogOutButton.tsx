import { AuthService } from '@/services/firebase/authService';
import { useNavigate, NavigateFunction } from 'react-router-dom';

function LogOutButton(): React.JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const onLogOutClick = () => {
        AuthService.GetInstance()
            .SignOut()
            .then(() => navigate('/'))
            .catch(() => {
                throw Error('SignOut Error');
            });
    };

    return <button onClick={onLogOutClick}>Log Out</button>;
}

export default LogOutButton;
