
import { supabase } from '@/integrations/supabase/client';
import { InventoryItem, Transaction, ActivityLog } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// This function checks if a user already has inventory items and seeds the database if they don't
export const seedInventory = async (userId: string) => {
  const { data: existingItems } = await supabase
    .from('inventory_items')
    .select('id')
    .eq('user_id', userId)
    .limit(1);

  // Only seed if user has no inventory items
  if (!existingItems || existingItems.length === 0) {
    console.log('Seeding initial inventory data for new user...');
    await seedItemsForUser(userId);
    await seedTransactionsForUser(userId);
    await seedActivityForUser(userId);
    console.log('Seed completed successfully');
  }
};

const seedItemsForUser = async (userId: string) => {
  const initialInventory: Omit<InventoryItem, 'id' | 'created_at' | 'user_id'>[] = [
    {
      product_name: 'Laptop',
      category: 'Electronics',
      sku: 'EL-LP-001',
      price: 1200,
      stock: 50,
      location: 'Warehouse A',
      last_updated: new Date().toISOString().split('T')[0],
    },
    {
      product_name: 'Office Chair',
      category: 'Furniture',
      sku: 'FU-CH-002',
      price: 300,
      stock: 100,
      location: 'Warehouse B',
      last_updated: new Date().toISOString().split('T')[0],
    },
    {
      product_name: 'Notebook',
      category: 'Office Supplies',
      sku: 'OS-NB-003',
      price: 5,
      stock: 500,
      location: 'Warehouse C',
      last_updated: new Date().toISOString().split('T')[0],
    },
  ];

  // Insert the initial inventory items into the database
  const inventoryItems = initialInventory.map(item => ({
    id: uuidv4(),
    user_id: userId,
    created_at: new Date().toISOString().split('T')[0],
    ...item,
  }));

  const { error } = await supabase
    .from('inventory_items')
    .insert(inventoryItems);

  if (error) {
    console.error('Error seeding inventory items:', error);
  }
};

const seedTransactionsForUser = async (userId: string) => {
  const initialTransactions: Omit<Transaction, 'id' | 'created_at' | 'user_id'>[] = [
    {
      item_id: 'replace-with-laptop-id',
      type: 'inbound',
      quantity: 20,
      date: new Date().toISOString().split('T')[0],
    },
    {
      item_id: 'replace-with-chair-id',
      type: 'outbound',
      quantity: 5,
      date: new Date().toISOString().split('T')[0],
    },
  ];

  // Fetch the IDs of the seeded inventory items for the user
  const { data: inventoryItems, error: inventoryError } = await supabase
    .from('inventory_items')
    .select('id, product_name')
    .eq('user_id', userId);

  if (inventoryError) {
    console.error('Error fetching inventory items:', inventoryError);
    return;
  }

  if (!inventoryItems || inventoryItems.length === 0) {
    console.warn('No inventory items found for the user. Skipping transaction seeding.');
    return;
  }

  // Map product names to IDs for transaction seeding
  const itemMap: { [key: string]: string } = {};
  inventoryItems.forEach(item => {
    itemMap[item.product_name] = item.id;
  });

  // Replace the item_id placeholders with actual item IDs
  const transactions = initialTransactions.map(transaction => {
    let itemId = '';
    if (transaction.item_id === 'replace-with-laptop-id') {
      itemId = itemMap['Laptop'];
    } else if (transaction.item_id === 'replace-with-chair-id') {
      itemId = itemMap['Office Chair'];
    }

    return {
      id: uuidv4(),
      user_id: userId,
      item_id: itemId,
      created_at: new Date().toISOString().split('T')[0],
      type: transaction.type,
      quantity: transaction.quantity,
      date: transaction.date
    };
  });

  // Insert the transactions into the database
  const { error } = await supabase
    .from('transactions')
    .insert(transactions);

  if (error) {
    console.error('Error seeding transactions:', error);
  }
};

const seedActivityForUser = async (userId: string) => {
  // Fetch the IDs of the seeded inventory items for the user
  const { data: inventoryItems, error: inventoryError } = await supabase
    .from('inventory_items')
    .select('id, product_name')
    .eq('user_id', userId);

  if (inventoryError) {
    console.error('Error fetching inventory items:', inventoryError);
    return;
  }

  if (!inventoryItems || inventoryItems.length === 0) {
    console.warn('No inventory items found for the user. Skipping activity seeding.');
    return;
  }

  // Map product names to IDs for activity seeding
  const itemMap: { [key: string]: string } = {};
  inventoryItems.forEach(item => {
    itemMap[item.product_name] = item.id;
  });

  const initialActivity: Omit<ActivityLog, 'id' | 'timestamp' | 'user_id'>[] = [
    {
      type: 'inventory_update',
      item_id: itemMap['Laptop'],
      item_name: 'Laptop',
      quantity: 20,
      details: 'Initial stock added for Laptop',
    },
    {
      type: 'inventory_update',
      item_id: itemMap['Office Chair'],
      item_name: 'Office Chair',
      quantity: 5,
      details: '5 Office Chairs removed from stock',
    },
  ];

  // Insert the activity log entries into the database
  const activityLogs = initialActivity.map(activity => ({
    id: uuidv4(),
    user_id: userId,
    timestamp: new Date().toISOString(),
    ...activity,
  }));

  const { error } = await supabase
    .from('activity_logs')
    .insert(activityLogs);

  if (error) {
    console.error('Error seeding activity log:', error);
  }
};
