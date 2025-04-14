import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { SalesData, CategoryInventory } from '@/types';

export const useReports = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [inventoryLevels, setInventoryLevels] = useState<CategoryInventory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReportData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);

        // Fetch inventory levels by category
        const { data: inventoryData, error: inventoryError } = await supabase
          .from('inventory_items')
          .select('category, stock');

        if (inventoryError) throw inventoryError;

        // Process inventory levels
        const categoryMap = new Map<string, { current: number; optimal: number }>();
        inventoryData.forEach(item => {
          const existing = categoryMap.get(item.category) || { current: 0, optimal: 0 };
          categoryMap.set(item.category, {
            current: existing.current + item.stock,
            // Set optimal stock as 20% more than current stock for this example
            optimal: existing.optimal + Math.ceil(item.stock * 1.2)
          });
        });

        const processedInventoryLevels: CategoryInventory[] = Array.from(categoryMap.entries())
          .map(([category, { current, optimal }]) => ({
            category,
            current_stock: current,
            optimal_stock: optimal
          }));

        // Fetch transactions for sales data
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: true });

        if (transactionsError) throw transactionsError;

        // Process transactions into monthly sales data
        const salesMap = new Map<string, { sales: number; expenses: number }>();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        transactionsData.forEach(transaction => {
          const date = new Date(transaction.created_at);
          const monthKey = months[date.getMonth()];
          const existing = salesMap.get(monthKey) || { sales: 0, expenses: 0 };

          if (transaction.type === 'outbound') {
            existing.sales += transaction.quantity * 100; // Example price calculation
          } else {
            existing.expenses += transaction.quantity * 50; // Example cost calculation
          }

          salesMap.set(monthKey, existing);
        });

        const processedSalesData: SalesData[] = months.map(month => {
          const data = salesMap.get(month) || { sales: 0, expenses: 0 };
          return {
            month,
            sales: data.sales,
            expenses: data.expenses,
            profit: data.sales - data.expenses
          };
        });

        setInventoryLevels(processedInventoryLevels);
        setSalesData(processedSalesData);
      } catch (err: any) {
        console.error('Error fetching report data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [user]);

  return {
    salesData,
    inventoryLevels,
    isLoading,
    error
  };
}; 