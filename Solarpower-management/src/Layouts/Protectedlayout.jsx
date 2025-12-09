import { useUser } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";
import { useEffect, useState } from "react";

export const ProtectedLayout = () => {
    const { isSignedIn, isLoaded, user } = useUser();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
    if (isLoaded && user) {
      // Check if user is admin
      setIsAuthorized(true);
    }
  }, [isLoaded, user]);

  // Show loading only on initial load
  if (!isLoaded || isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

    if (!isSignedIn || !isAuthorized) {
        return <Navigate to="/sign-in" replace />;
    } 
    return <Outlet />;
};

export default ProtectedLayout;