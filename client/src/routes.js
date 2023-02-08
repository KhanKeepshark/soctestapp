import Admin from "./pages/Admin";
import AskForm from "./pages/Form";
import Auth from "./pages/Auth";
import Exit from "./pages/Exit";
import Menu from "./pages/Menu";
import Regions from "./pages/Regions";
import { ADMIN_ROUTE, FORM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, EXIT_ROUTE, MENU_ROUTE, REGIONS_ROUTE } from "./utils/consts";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: FORM_ROUTE,
        Component: AskForm
    },
    {
        path: MENU_ROUTE,
        Component: Menu
    },
    {
        path: REGIONS_ROUTE,
        Component: Regions
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: EXIT_ROUTE,
        Component: Exit
    },
]