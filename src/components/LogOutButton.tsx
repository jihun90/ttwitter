import { authService } from "@/myFirebase";
import { useNavigate } from "react-router-dom";

function LogOutButton(): React.JSX.Element {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut().then(() => navigate("/"));
    };

    return <button onClick={onLogOutClick}>Log Out</button>;
}

export default LogOutButton;
