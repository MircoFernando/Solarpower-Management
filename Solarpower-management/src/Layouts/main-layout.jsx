import { Outlet } from "react-router"
import Navigation  from "../pages/home/components/navBar/NavBar"

export function MainLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
};

export default MainLayout;