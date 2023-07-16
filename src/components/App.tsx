import { useEffect, useState } from 'react';
import AppRouter from '@/components/Router';
import { AuthService, UserInfo } from '@/services/firebase/authService';

function App() {
    const [init, setInit] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        AuthService.GetInstance().OnAuthChanged(user => {
            const isUser = AuthService.GetInstance().IsUserInfo(user);
            setIsLoggedIn(isUser);
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
            <footer>&copy; {new Date().getFullYear()} ttwitter</footer>
        </>
    );
}

export default App;
