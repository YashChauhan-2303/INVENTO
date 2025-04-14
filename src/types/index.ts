
export interface InventoryItem {
  id: string;
  user_id: string;
  product_name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  location: string;
  last_updated: string;
  created_at: string;
}

export interface InventoryTrend {
  month: string;
  count: number;
}

export interface StockByCategory {
  category: string;
  count: number;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  user_name?: string;
  type: string;
  item_id?: string;
  item_name?: string;
  quantity?: number;
  timestamp: string;
  details?: string;
}

export interface SalesData {
  month: string;
  sales: number;
  expenses: number;
  profit: number;
}

export interface CategoryInventory {
  category: string;
  current_stock: number;
  optimal_stock: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  item_id: string;
  type: 'inbound' | 'outbound';
  quantity: number;
  date: string;
  created_at: string;
}

export interface Warning {
  id: string;
  user_id: string;
  item_id: string;
  quantity: number;
  created_at: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr' | 'de';
  autoBackup: boolean;
}
