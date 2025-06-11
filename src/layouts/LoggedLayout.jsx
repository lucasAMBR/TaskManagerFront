import { Outlet } from "react-router-dom"

export const LoggedLayout = () => {

    return(
        <main>
            <Outlet />
        </main>
    )
}