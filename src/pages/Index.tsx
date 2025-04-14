
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-invento-900 to-invento-700 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJWMGgydjM0em0tNCAwVjBoLTJ2MzRoMnptLTktMnYyaC0ydi0yaDJ6bS0yLTJ2MmgtMnYtMmgyek0zNiAzMnYyaC0ydi0yaDJ6bTQgMHYyaC0ydi0yaDJ6bS0yMiAydi0yaDJ2MmgtMnptMjYtMnYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>

        <div className="container mx-auto px-6 flex flex-col items-center justify-center h-full z-10 relative animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <Logo className="mx-auto mb-8 w-64 h-auto" />
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Intelligent Inventory Management
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/80">
              Streamline your operations with our powerful, intuitive inventory management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-invento-900 hover:bg-white/90 text-lg px-8 py-6"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate("/inventory")}
              >
                View Inventory
              </Button>
            </div>
          </div>
        </div>

        {/* Animated down arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in">
              <div className="w-14 h-14 bg-invento-100 text-invento-600 rounded-full flex items-center justify-center mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Dashboard</h3>
              <p className="text-gray-600">Real-time data visualization and analytics to keep track of your inventory at a glance.</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="w-14 h-14 bg-invento-100 text-invento-600 rounded-full flex items-center justify-center mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 8h14" />
                  <path d="M5 12h14" />
                  <path d="M5 16h14" />
                  <path d="M3 21h18" />
                  <path d="M3 3h18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inventory Management</h3>
              <p className="text-gray-600">Comprehensive tools to add, edit, and track your inventory with detailed information.</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="w-14 h-14 bg-invento-100 text-invento-600 rounded-full flex items-center justify-center mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Reports</h3>
              <p className="text-gray-600">Generate detailed reports and analytics to optimize your inventory operations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
