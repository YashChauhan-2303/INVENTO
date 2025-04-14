
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { InventoryItem } from '@/types';

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user) {
        setItems([]);
        return;
      }

      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .order('product_name', { ascending: true });

      if (error) throw error;
      
      setItems(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: `Failed to fetch inventory: ${err.message}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item: Omit<InventoryItem, 'id' | 'user_id'>) => {
    try {
      if (!user) return null;

      const newItem = {
        ...item,
        user_id: user.id,
        last_updated: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('inventory_items')
        .insert([newItem])
        .select()
        .single();

      if (error) throw error;
      
      setItems(prev => [...prev, data]);
      return data;
    } catch (err: any) {
      toast({
        title: "Error",
        description: `Failed to add item: ${err.message}`,
        variant: "destructive"
      });
      return null;
    }
  };

  const updateItem = async (id: string, item: Partial<Omit<InventoryItem, 'id' | 'user_id'>>) => {
    try {
      if (!user) return false;

      const updates = {
        ...item,
        last_updated: new Date().toISOString()
      };

      const { error } = await supabase
        .from('inventory_items')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } as InventoryItem : i));
      return true;
    } catch (err: any) {
      toast({
        title: "Error",
        description: `Failed to update item: ${err.message}`,
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      if (!user) return false;

      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setItems(prev => prev.filter(i => i.id !== id));
      return true;
    } catch (err: any) {
      toast({
        title: "Error",
        description: `Failed to delete item: ${err.message}`,
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchInventory();
    } else {
      setItems([]);
      setIsLoading(false);
    }
  }, [user]);

  return {
    items,
    isLoading,
    error,
    fetchInventory,
    addItem,
    updateItem,
    deleteItem
  };
};
