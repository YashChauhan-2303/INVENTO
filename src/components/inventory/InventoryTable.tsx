
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { InventoryItem } from "@/types";
import { useState } from "react";

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (item: InventoryItem) => void;
}

const StockIndicator = ({ stock }: { stock: number }) => {
  let bgColor = "bg-green-100 text-green-700";
  if (stock <= 10) {
    bgColor = "bg-yellow-100 text-yellow-700";
  }
  if (stock <= 5) {
    bgColor = "bg-red-100 text-red-700";
  }

  return (
    <span className={`chip ${bgColor}`}>{stock}</span>
  );
};

const InventoryTable = ({ items, onEdit, onDelete }: InventoryTableProps) => {
  const [sortField, setSortField] = useState<keyof InventoryItem>('product_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle numeric values
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    // Handle string values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof InventoryItem }) => {
    if (field !== sortField) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="rounded-md border animate-fade-in">
      <Table className="w-full">
        <TableHeader className="bg-invento-600 text-white">
          <TableRow>
            <TableHead 
              className="cursor-pointer text-white hover:bg-invento-500 transition-colors"
              onClick={() => handleSort('product_name')}
            >
              Product Name <SortIcon field="product_name" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-white hover:bg-invento-500 transition-colors"
              onClick={() => handleSort('category')}
            >
              Category <SortIcon field="category" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-white hover:bg-invento-500 transition-colors"
              onClick={() => handleSort('sku')}
            >
              SKU <SortIcon field="sku" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-white hover:bg-invento-500 transition-colors"
              onClick={() => handleSort('price')}
            >
              Price <SortIcon field="price" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-white hover:bg-invento-500 transition-colors"
              onClick={() => handleSort('stock')}
            >
              Stock <SortIcon field="stock" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-white hover:bg-invento-500 transition-colors"
              onClick={() => handleSort('location')}
            >
              Location <SortIcon field="location" />
            </TableHead>
            <TableHead 
              className="cursor-pointer text-white hover:bg-invento-500 transition-colors"
              onClick={() => handleSort('last_updated')}
            >
              Last Updated <SortIcon field="last_updated" />
            </TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No inventory items found.
              </TableCell>
            </TableRow>
          ) : (
            sortedItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50 animate-fade-in">
                <TableCell className="font-medium">{item.product_name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                    {item.category}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">{item.sku}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <StockIndicator stock={item.stock} />
                </TableCell>
                <TableCell>
                  <span className="text-blue-500 text-sm">{item.location}</span>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">{item.last_updated}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
