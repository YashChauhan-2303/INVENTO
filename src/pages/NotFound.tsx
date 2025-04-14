
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center animate-fade-in">
        <Logo className="mx-auto h-16 w-auto" />
        
        <div className="relative">
          <div className="text-9xl font-bold text-invento-100">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-invento-700">Page Not Found</h1>
          </div>
        </div>
        
        <p className="mt-2 text-lg text-gray-600">
          We can't seem to find the page you're looking for.
        </p>
        
        <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-invento-600 hover:bg-invento-700"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="font-medium text-invento-600 hover:text-invento-500">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
