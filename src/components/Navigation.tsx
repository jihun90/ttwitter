import { AuthService } from '@/services/firebase/authService';
import { Link } from 'react-router-dom';

function Navigation(): JSX.Element {
    const displayName =
        AuthService.GetInstance().user?.displayName ?? AuthService.GetInstance().user?.email ?? 'no Name';
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{displayName + `'s`} Profile</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
