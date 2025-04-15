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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import InventoryTable from '@/components/inventory/InventoryTable';
import InventoryFormFields from '@/components/inventory/InventoryFormFields';
import { InventoryItem } from '@/types';
import { useInventory } from '@/hooks/useInventory';
import { Label } from '@/components/ui/label';

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
    console.log("Opening Add Item dialog");
    setCurrentItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    console.log("Opening Edit Item dialog for:", item.product_name);
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
    const isEditing = !!formData.id;

    console.log("Saving item:", formData);
    
    if (isEditing) {
      const { id, ...updateData } = formData;
      success = await updateItem(id!, updateData);
      if (success) {
        toast({
          title: "Item updated",
          description: `"${formData.product_name}" has been updated`,
        });
      }
    } else {
      const { id, ...addData } = formData;
      const newItem = await addItem(addData);
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
    } else {
      toast({
        title: isEditing ? "Update Failed" : "Add Failed",
        description: `Could not save "${formData.product_name}". Please try again.`,
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
  
    try {
      await signIn(email, password);
      toast({
        title: 'Login Successful',
        description: 'Redirecting to dashboard...',
        variant: 'default',
      });
      navigate('/dashboard'); // Ensure this redirects to the correct route
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddItem} className="flex items-center gap-2 animate-fade-in">
                <Plus size={16} />
                New Item
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {currentItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                </DialogTitle>
              </DialogHeader>
              
              <InventoryFormFields 
                item={currentItem} 
                onSave={handleSaveItem} 
                onCancel={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        }
      />
      
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
      
      <InventoryTable 
        items={filteredItems} 
        onEdit={handleEditItem} 
        onDelete={handleDeleteItem} 
      />
      
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

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Inventory;
