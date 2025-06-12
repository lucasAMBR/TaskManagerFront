import { useEffect } from "react";
import style from "./BlankLayout.module.css";

import { Outlet, useLocation, useNavigate } from "react-router-dom"

export const BlankLayout = () => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(location.pathname == "/"){
            navigate("/login")
        }
    }, [])

    return(
        <main className={style.page}>
            <Outlet />
        </main>
    )
}