import { Outlet } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export default function AuthorizedLayout() {
    const { user } = useUser();

    if (!user || user?.publicMetadata?.role !== "admin") {
        return <div>Access Denied: You do not have permission to view this page.</div>;
        <Navigate to="/"/>;
    }


    return <Outlet />;
}