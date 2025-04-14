
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface ActivityFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    user: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
  }) => void;
  onExport: () => void;
}

const ActivityFilters = ({ onFilterChange, onExport }: ActivityFiltersProps) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [user, setUser] = useState('all');
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    updateFilters({ search: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateFilters({ category: value });
  };

  const handleUserChange = (value: string) => {
    setUser(value);
    updateFilters({ user: value });
  };

  const handleDateChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDate(range);
    updateFilters({ dateRange: range });
  };

  const updateFilters = (changedFilters: Partial<{
    search: string;
    category: string;
    user: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
  }>) => {
    onFilterChange({
      search,
      category,
      user,
      dateRange: date,
      ...changedFilters
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6 animate-fade-in">
      <div className="w-full md:w-64">
        <Input
          placeholder="Search activities"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="w-full md:w-48">
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="inventory">Inventory</SelectItem>
            <SelectItem value="transaction">Transaction</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-48">
        <Select value={user} onValueChange={handleUserChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="sarah">Sarah</SelectItem>
            <SelectItem value="john">John</SelectItem>
            <SelectItem value="maria">Maria</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-48">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                "Date Range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button 
        onClick={onExport}
        variant="outline"
        className="ml-auto"
      >
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default ActivityFilters;
