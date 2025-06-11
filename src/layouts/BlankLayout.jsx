import style from "./BlankLayout.module.css";

import { Outlet } from "react-router-dom"

export const BlankLayout = () => {

    return(
        <main className={style.page}>
            <Outlet />
        </main>
    )
}