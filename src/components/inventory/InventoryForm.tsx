import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InventoryItem } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface InventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  item?: InventoryItem;
  onSave: (item: Omit<InventoryItem, 'id' | 'user_id'> & { id?: string }) => void;
}

const categories = ['Electronics', 'Office', 'Furniture', 'Supplies', 'Equipment'];
const locations = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'];

const defaultItem: Omit<InventoryItem, 'id' | 'user_id'> = {
  product_name: '',
  category: '',
  sku: '',
  price: 0,
  stock: 0,
  location: '',
  last_updated: new Date().toISOString().split('T')[0],
  created_at: new Date().toISOString().split('T')[0],
};

const InventoryForm = ({ isOpen, onClose, item, onSave }: InventoryFormProps) => {
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id' | 'user_id'> & { id?: string }>(defaultItem);
  const { toast } = useToast();

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(defaultItem);
    }
  }, [item, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.product_name || !formData.category || !formData.sku || !formData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Update the last_updated field
    const itemToSave = {
      ...formData,
      last_updated: new Date().toISOString().split('T')[0]
    };
    
    onSave(itemToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[500px] animate-fade-in">
        <DialogHeader>
          <DialogTitle>
            {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product_name">Product Name <span className="text-red-500">*</span></Label>
              <Input
                id="product_name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <Select 
                  value={formData.category || "select-category"} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select-category" disabled>Select category</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sku">SKU <span className="text-red-500">*</span></Label>
                <Input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. E-KB-001"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.location || "select-location"} 
                onValueChange={(value) => handleSelectChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="select-location" disabled>Select location</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {item ? 'Update Item' : 'Add Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;
