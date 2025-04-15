import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Log the state received from useAuth
  console.log("ProtectedRoute (Restored):", { isLoading, userId: user?.id, path: location.pathname });

  useEffect(() => {
    // console.log("Protected route location changed:", location.pathname);
  }, [location]);

  if (isLoading) {
    console.log("ProtectedRoute (Restored): Showing loading spinner.");
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-invento-500 animate-spin" />
        <span className="ml-4 text-lg text-gray-600">Loading Authentication...</span>
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute (Restored): No user found, redirecting to login.");
    // Redirect to the login page with a return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute (Restored): User found, rendering Outlet.");
  // If loading is done and user exists, render the requested component
  return <Outlet />;
};

export default ProtectedRoute;
