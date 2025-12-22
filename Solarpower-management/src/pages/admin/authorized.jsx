import { Outlet, Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

export default function AuthorizedLayout() {
  const { user, isLoaded } = useUser();


  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
