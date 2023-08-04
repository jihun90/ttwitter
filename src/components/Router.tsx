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
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
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
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile refreshDisplayName={refreshDisplayName} />} />
                    </div>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;
