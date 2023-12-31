import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '@/routes/Auth';
import Home from '@/routes/Home';
import Navigation from './Navigation';
import Profile from '@/routes/Profile';

type LoginProps = {
    refreshDisplayName: () => void;
    isLoggedIn: boolean;
};

function AppRouter({ refreshDisplayName, isLoggedIn }: LoginProps): React.ReactElement {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            {isLoggedIn && <Navigation />}
            <div
                style={{
                    maxWidth: 890,
                    width: '100%',
                    margin: '0 auto',
                    marginTop: 80,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile refreshDisplayName={refreshDisplayName} />} />
                        </>
                    ) : (
                        <Route path="/" element={<Auth />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;
