import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { InventoryItem } from '@/types';
import { useInventory } from '@/hooks/useInventory';
import { Search as SearchIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
  const { items, isLoading, error } = useInventory();

  const handleSearch = () => {
    if (!items) return;

    const filteredResults = items.filter(item =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? item.category === categoryFilter : true) &&
      (locationFilter ? item.location === locationFilter : true)
    );

    setSearchResults(filteredResults);
  };

  const categories = [...new Set(items?.map(item => item.category) || [])];
  const locations = [...new Set(items?.map(item => item.location) || [])];

  return (
    <div>
      <PageHeader title="Search Inventory" subtitle="Search for items in your inventory" />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
          <CardDescription>Enter your search criteria</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Select onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearch}>
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
          </Button>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card className="w-full mt-4">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Items matching your search criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {searchResults.map(item => (
                <div key={item.id} className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold">{item.product_name}</h3>
                  <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                  <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                  <p className="text-sm text-muted-foreground">Price: ${item.price}</p>
                  <p className="text-sm text-muted-foreground">Stock: {item.stock}</p>
                  <p className="text-sm text-muted-foreground">Location: {item.location}</p>
                  <p className="text-sm text-muted-foreground">Last Updated: {item.last_updated}</p>
                  <Badge className="mt-2">{item.location}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchTerm && searchResults.length === 0 && (
        <Card className="w-full mt-4">
          <CardContent>
            <p>No items found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;
