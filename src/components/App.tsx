import { useState } from "react";
import AppRouter from "@components/Router";
import { authService } from "@/myFirebase.ts";

function App() {
  const isCurrentUser: boolean = authService.currentUser !== null;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isCurrentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} ttwitter</footer>
    </>
  );
}

export default App;
