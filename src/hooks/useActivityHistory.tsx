
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ActivityLog } from '@/types';

export const useActivityHistory = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchActivities = async (filters: {
    search?: string;
    category?: string;
    user?: string;
    dateRange?: {
      from?: Date;
      to?: Date;
    };
  } = {}) => {
    if (!user) {
      setActivities([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      // Apply search filter
      if (filters.search) {
        query = query.or(`item_name.ilike.%${filters.search}%,user_name.ilike.%${filters.search}%`);
      }

      // Apply category filter
      if (filters.category) {
        // Map category to activity types
        const categoryMap: Record<string, string[]> = {
          'inventory': ['item_added', 'stock_update', 'item_modified'],
          'transaction': ['inbound_transaction', 'outbound_transaction'],
          'system': ['user_login'],
        };

        if (categoryMap[filters.category]) {
          query = query.in('type', categoryMap[filters.category]);
        }
      }

      // Apply user filter
      if (filters.user) {
        query = query.eq('user_name', filters.user);
      }

      // Apply date range filter
      if (filters.dateRange?.from) {
        const fromDate = new Date(filters.dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        query = query.gte('timestamp', fromDate.toISOString());

        if (filters.dateRange?.to) {
          const toDate = new Date(filters.dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          query = query.lte('timestamp', toDate.toISOString());
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      setActivities(data || []);
    } catch (err: any) {
      console.error('Error fetching activities:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [user]);

  return {
    activities,
    isLoading,
    error,
    fetchActivities
  };
};
