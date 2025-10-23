import { Outlet } from "react-router"
import Navigation  from "../../src/components/ui/Layout/nav"

export function MainLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
};

export default MainLayout;