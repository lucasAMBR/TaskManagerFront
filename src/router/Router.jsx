import { createBrowserRouter } from "react-router-dom";
import { BlankLayout } from "../layouts/BlankLayout";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { LoggedLayout } from "../layouts/LoggedLayout";
import { HomeDev } from "../pages/home_dev/HomeDev";
import { HomeMng } from "../pages/home_mng/HomeMng";
import { Projects } from "../pages/projects/Projects";
import { Team } from "../pages/team_details/Team";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <BlankLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/home",
        element: <LoggedLayout />,
        children: [
            {
                path: "/home/dev",
                element: <HomeDev />
            },
            {
                path: "/home/mng",
                element: <HomeMng />
            },
            {
                path: "/home/project/:projectId",
                element: <Projects />
            },
            {
                path: "/home/team/:teamId",
                element: <Team />
            }
        ]
    }
])