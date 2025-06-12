import { useAuth } from "../contexts/AuthContext";
import style from "./LoggedLayout.module.css";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Outlet, useNavigate } from "react-router-dom"

export const LoggedLayout = () => {

    const { clearAuth } = useAuth()

    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth();
        navigate("/login");
    }

    return(
        <main className={style.page}>
            <div className={style.logged_navbar}>
                <p>TaskManager</p>
                <button className={style.logout_button} onClick={handleLogout}> <ExitToAppIcon /> <p>Logout</p></button>
            </div>
            <Outlet />
        </main>
    )
}