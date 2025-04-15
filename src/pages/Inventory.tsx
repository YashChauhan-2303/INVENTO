import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import InventoryTable from '@/components/inventory/InventoryTable';
import InventoryForm from '@/components/inventory/InventoryForm';
import { InventoryItem } from '@/types';
import { useInventory } from '@/hooks/useInventory';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const categories = ['Electronics', 'Office', 'Furniture', 'Supplies', 'Equipment'];
const locations = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'];

const Inventory = () => {
  const { items, isLoading, addItem, updateItem, deleteItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);
  
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    category: '',
    price: '',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    
    toast({
      title: "Item Added",
      description: "New inventory item has been added successfully",
    });
    
    // Reset form and close dialog
    setFormData({
      name: '',
      description: '',
      quantity: '',
      category: '',
      price: '',
    });
    setIsFormOpen(false);
  };

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      searchTerm === '' || 
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || item.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleAddItem = () => {
    setCurrentItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (item: InventoryItem) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteItem = async () => {
    if (itemToDelete) {
      const success = await deleteItem(itemToDelete.id);
      if (success) {
        toast({
          title: "Item deleted",
          description: `"${itemToDelete.product_name}" has been removed from inventory`,
        });
      }
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveItem = async (formData: Omit<InventoryItem, 'id' | 'user_id'> & { id?: string }) => {
    let success = false;
    
    if (formData.id) {
      // Update existing item
      const { id, ...updateData } = formData;
      success = await updateItem(id, updateData);
      
      if (success) {
        toast({
          title: "Item updated",
          description: `"${formData.product_name}" has been updated`,
        });
      }
    } else {
      // Add new item
      const newItem = await addItem(formData);
      success = !!newItem;
      
      if (success) {
        toast({
          title: "Item added",
          description: `"${formData.product_name}" has been added to inventory`,
        });
      }
    }
    
    if (success) {
      setIsFormOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 text-invento-500 animate-spin mr-2" />
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Inventory Management" 
        subtitle="Manage and track your inventory items"
        action={
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter item name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Select category"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter item description"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Unit Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Item
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 animate-fade-in">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name or SKU"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full md:w-64">
          <Select 
            value={categoryFilter} 
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-64">
          <Select 
            value={locationFilter} 
            onValueChange={setLocationFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Table */}
      <InventoryTable 
        items={filteredItems} 
        onEdit={handleEditItem} 
        onDelete={handleDeleteItem} 
      />
      
      {/* Add/Edit Form Dialog */}
      <InventoryForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        item={currentItem}
        onSave={handleSaveItem}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the item 
              "{itemToDelete?.product_name}" from your inventory.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteItem}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Inventory;
