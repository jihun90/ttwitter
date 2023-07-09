import { useEffect, useState } from 'react';
import AppRouter from '@/components/Router';
import { User, FirebaseObject } from '@/myFirebase.ts';

function App() {
    const [init, setInit] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        FirebaseObject.GetInstance().Auth.OnAuthChanged((user: User | null) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
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
