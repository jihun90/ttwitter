import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@routes/Auth";
import Home from "@routes/Home";

type LoginProps = {
    isLoggedIn: boolean;
};

function AppRouter({ isLoggedIn }: LoginProps): React.ReactElement {
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                    </>
                ) : (
                    <Route
                        path="/"
                        element={<Auth />}
                    />
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;
