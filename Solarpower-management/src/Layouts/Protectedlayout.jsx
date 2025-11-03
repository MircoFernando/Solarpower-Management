import { useUser } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";

export const ProtectedLayout = () => {
    const { isSignedIn, isLoaded, user } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }
    return <Outlet />;
};

export default ProtectedLayout;