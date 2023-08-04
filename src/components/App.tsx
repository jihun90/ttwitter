import { useEffect, useState } from 'react';
import AppRouter from '@/components/Router';
import { AuthService } from '@/services/firebase/authService';

function App() {
    const [init, setInit] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [, setDisplayName] = useState<string>('');
    const refreshDisplayName = (): void => setDisplayName(AuthService.GetInstance().user?.displayName ?? 'No Name');

    useEffect(() => {
        AuthService.GetInstance().OnAuthChanged(user => {
            if (!user) return; //ToDo user가 없을때 처리
            if (AuthService.GetInstance().IsUserInfo(user)) {
                setIsLoggedIn(true);
                setInit(true);
            }
        });
    }, []);

    return (
        <>
            {init ? <AppRouter refreshDisplayName={refreshDisplayName} isLoggedIn={isLoggedIn} /> : 'Initializing...'}
            <footer>&copy; {new Date().getFullYear()} ttwitter</footer>
        </>
    );
}

export default App;
