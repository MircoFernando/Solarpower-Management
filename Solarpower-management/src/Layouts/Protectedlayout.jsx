import { useUser } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useGetSolarUnitsByClerkUserIdQuery } from "@/lib/redux/query";

export const ProtectedLayout = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [isAuthorized, setIsAuthorized] = useState(null);

  const {
    data: solarUnits,
    isLoading,
    isError,
    error,
  } = useGetSolarUnitsByClerkUserIdQuery(undefined, {
    skip: !isSignedIn,
  });

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user is admin
      setIsAuthorized(true);
    }
  }, [isLoaded, user]);

  if (user?.publicMetadata?.role == "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error fetching solar unitss: {error.toString()}
        </div>
      </div>
    );
  }
  // Show loading only on initial load
  if (!isLoaded || isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!solarUnits || solarUnits.length === 0) {
    return <Navigate to="/registration" replace />;
  }
  
  if (!isSignedIn || !isAuthorized) {
    return <Navigate to="/sign-in" replace />;
  }
  if (solarUnits.length > 0){
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
