import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InventoryItem } from '@/types';
import { useInventory } from '@/hooks/useInventory';
import { useAuth } from '@/hooks/useAuth';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const Search = () => {
  console.log("Search: Component rendering - Simplified (Search Input Only)");

  const { user } = useAuth();
  const { items = [], isLoading: isInventoryLoading, error: inventoryError } = useInventory();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!items) return;
    setHasSearched(true);
    console.log(`Search: handleSearch (Simplified) - Searching with term: "${searchTerm}"`);

    const filteredResults = items.filter(item => {
        const productNameLower = item.product_name?.toLowerCase() || '';
        const skuLower = item.sku?.toLowerCase() || '';
        const searchTermLower = searchTerm.toLowerCase();

        const termMatch = !searchTerm ||
                          productNameLower.includes(searchTermLower) ||
                          skuLower.includes(searchTermLower);

        return termMatch;
    });

    console.log("Search: handleSearch (Simplified) - Filtered results:", filteredResults);
    setSearchResults(filteredResults);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <PageHeader title="Search Inventory" subtitle="Search for items in your inventory" />

      {/* Search Card - Simplified */}
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Enter search term</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Input Field - Takes more space */}
          <div className="flex-grow">
             <label htmlFor="searchInput" className="sr-only">Search by name or SKU</label>
             <Input
               id="searchInput"
               type="text"
               placeholder="Search by name or SKU..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onKeyDown={handleKeyDown}
               disabled={isInventoryLoading && !items.length}
             />
          </div>

          {/* Search Button */}
          <div>
             <Button onClick={handleSearch} disabled={isInventoryLoading && !items.length} className="w-full sm:w-auto">
                 {(isInventoryLoading && !items.length) ? (
                    <>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                       Loading...
                    </>
                 ) : (
                    <>
                       <SearchIcon className="mr-2 h-4 w-4" />
                       Search
                    </>
                 )}
             </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conditional rendering for results/loading/error (unmodified for now) */}
      {inventoryError && (
         <Card className="w-full mt-4">
           <CardContent className="p-6 text-center text-red-500">
             Error loading inventory: {inventoryError}
           </CardContent>
         </Card>
       )}

       {isInventoryLoading && !items.length && !inventoryError && (
         <Card className="w-full mt-4">
           <CardContent className="p-6 text-center">
             <Loader2 className="h-6 w-6 animate-spin inline-block mr-2" />
             Loading inventory...
           </CardContent>
         </Card>
       )}

       {!isInventoryLoading && !inventoryError && hasSearched && searchResults.length > 0 && (
        <Card className="w-full mt-4">
          {/* Results Header */}
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
            <CardDescription>Items matching "{searchTerm}"</CardDescription>
          </CardHeader>
          {/* Results Content */}
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map(item => (
                <Card key={item.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.product_name || 'N/A'}</CardTitle>
                    <CardDescription>SKU: {item.sku || 'N/A'}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-1 text-sm">
                    <p>Category: {item.category || 'N/A'}</p>
                    <p>Price: ${item.price != null ? item.price.toFixed(2) : 'N/A'}</p>
                    <p>Stock: {item.stock != null ? item.stock : 'N/A'}</p>
                    <p>Location: {item.location || 'N/A'}</p>
                    <p>Last Updated: {item.last_updated ? new Date(item.last_updated).toLocaleDateString() : 'N/A'}</p>
                  </CardContent>
                  <CardFooter>
                     {item.stock != null && (
                       <Badge variant={item.stock > 10 ? "secondary" : "destructive"}>
                         {item.stock > 10 ? 'In Stock' : 'Low Stock'}
                       </Badge>
                     )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isInventoryLoading && !inventoryError && hasSearched && searchResults.length === 0 && (
        <Card className="w-full mt-4">
          <CardContent className="p-6 text-center text-muted-foreground">
             No items found matching "{searchTerm}".
          </CardContent>
        </Card>
      )}

      {!isInventoryLoading && !inventoryError && !hasSearched && !items?.length && (
         <Card className="w-full mt-4">
           <CardContent className="p-6 text-center text-muted-foreground">
             Your inventory is currently empty. Add items on the Inventory page.
           </CardContent>
         </Card>
       )}

    </div>
  );
};

export default Search;
