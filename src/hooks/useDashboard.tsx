import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  InventoryTrend, 
  StockByCategory, 
  ActivityLog, 
  InventoryItem 
} from '@/types';

export const useDashboard = () => {
  const [inventoryTrends, setInventoryTrends] = useState<InventoryTrend[]>([]);
  const [categoryStock, setCategoryStock] = useState<StockByCategory[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([]);
  const [totals, setTotals] = useState({
    totalInventory: 0,
    monthlyOrders: 0,
    lowStockCount: 0,
    activeCategories: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch inventory items count
        const { count: inventoryCount, error: countError } = await supabase
          .from('inventory_items')
          .select('*', { count: 'exact', head: true });
        
        if (countError) throw countError;

        // Fetch low stock items (items with stock less than 10)
        const { data: lowStockData, error: lowStockError } = await supabase
          .from('inventory_items')
          .select('*')
          .lt('stock', 10)
          .order('stock', { ascending: true });
        
        if (lowStockError) throw lowStockError;
        
        // Fetch recent activities
        const { data: activitiesData, error: activitiesError } = await supabase
          .from('activity_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(5);
        
        if (activitiesError) throw activitiesError;

        // Fetch categories count
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('inventory_items')
          .select('category')
          .limit(1000);  // Practical limit
        
        if (categoriesError) throw categoriesError;

        // Get unique categories
        const uniqueCategories = new Set(categoriesData.map(item => item.category));
        
        // Count transactions in the current month
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        
        const { count: monthlyOrdersCount, error: ordersError } = await supabase
          .from('transactions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayOfMonth);
        
        if (ordersError) throw ordersError;

        // Fetch stock by category
        const { data: stockByCategoryData, error: stockByCategoryError } = await supabase
          .from('inventory_items')
          .select('category, stock');
        
        if (stockByCategoryError) throw stockByCategoryError;

        // Aggregate stock by category
        const stockByCategory: Record<string, number> = {};
        stockByCategoryData.forEach(item => {
          stockByCategory[item.category] = (stockByCategory[item.category] || 0) + item.stock;
        });

        const categoryStockData: StockByCategory[] = Object.entries(stockByCategory).map(
          ([category, count]) => ({ category, count })
        );

        // Instead of mock data:
        const inventoryTrends: InventoryTrend[] = [];  // You can implement real trend calculation here
        setInventoryTrends(inventoryTrends);

        setTotals({
          totalInventory: inventoryCount || 0,
          monthlyOrders: monthlyOrdersCount || 0,
          lowStockCount: lowStockData.length,
          activeCategories: uniqueCategories.size
        });
        
        setLowStockItems(lowStockData);
        setRecentActivities(activitiesData);
        setCategoryStock(categoryStockData);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return {
    inventoryTrends,
    categoryStock,
    recentActivities,
    lowStockItems,
    totals,
    isLoading,
    error
  };
};
