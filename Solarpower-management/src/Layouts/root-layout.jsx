import Navigation  from "../../src/components/ui/Layout/nav"
import { Outlet } from "react-router"

export const RootLayout = () => {
    return (
        <>
            <Navigation />
            <Outlet /> 
            {/* Renders the matched child route component like HomePage or DashBoardPage Placeholder for other layouts */}
        </>
    );
};

export default RootLayout;