import { 
  Package2, 
  ShoppingCart, 
  AlertTriangle, 
  LayoutGrid,
  Loader2,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import InventoryTrendsChart from '@/components/dashboard/InventoryTrendsChart';
import CategoryStockChart from '@/components/dashboard/CategoryStockChart';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import LowStockAlerts from '@/components/dashboard/LowStockAlerts';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Dashboard = () => {
  const { 
    inventoryTrends, 
    categoryStock, 
    recentActivities, 
    lowStockItems,
    totals,
    isLoading 
  } = useDashboard();
  
  const { user } = useAuth();
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'there';

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 text-invento-500 animate-spin mr-2" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Dashboard" 
          subtitle={`Welcome ${userName} to your Invento Management System`} 
        />
        
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-gray-500">Last updated: </span>
          <span className="font-medium">{new Date().toLocaleString()}</span>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Package2 className="h-6 w-6 text-blue-600" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                12%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Total Inventory</h3>
              <p className="text-2xl font-bold">{totals.totalInventory.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.1s"}}>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                8%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Monthly Orders</h3>
              <p className="text-2xl font-bold">{totals.monthlyOrders.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.2s"}}>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-amber-50 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <TrendingDown className="w-3 h-3 mr-1" />
                3%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
              <p className="text-2xl font-bold">{totals.lowStockCount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.3s"}}>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-purple-50 p-3 rounded-lg">
                <LayoutGrid className="h-6 w-6 text-purple-600" />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                5%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Active Categories</h3>
              <p className="text-2xl font-bold">{totals.activeCategories.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.4s"}}>
          <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200 pb-4">
            <div>
              <CardTitle>Inventory Trends</CardTitle>
              <CardDescription>Stock level changes over time</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <InventoryTrendsChart data={inventoryTrends} />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.5s"}}>
          <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200 pb-4">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest transactions and updates</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <RecentActivityCard activities={recentActivities} />
          </CardContent>
        </Card>
      </div>
      
      {/* Additional charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.6s"}}>
          <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200 pb-4">
            <div>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>Stock distribution by category</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CategoryStockChart data={categoryStock} />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "0.7s"}}>
          <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200 pb-4">
            <div>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardDescription>Items that need restocking</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <LowStockAlerts items={lowStockItems} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
