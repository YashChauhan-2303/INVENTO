
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActivityFilters from '@/components/history/ActivityFilters';
import ActivityTabs from '@/components/history/ActivityTabs';
import ActivityLogItem from '@/components/history/ActivityLogItem';
import { useActivityHistory } from '@/hooks/useActivityHistory';

const History = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    user: '',
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    }
  });

  const { activities, isLoading, fetchActivities } = useActivityHistory();
  const { toast } = useToast();

  useEffect(() => {
    // When tab changes, update the category filter and refetch
    let categoryFilter = '';
    if (activeTab === 'inventory') categoryFilter = 'inventory';
    else if (activeTab === 'transactions') categoryFilter = 'transaction';
    else if (activeTab === 'system') categoryFilter = 'system';

    setFilters(prev => ({ ...prev, category: categoryFilter }));
  }, [activeTab]);

  useEffect(() => {
    // Fetch activities when filters change
    fetchActivities(filters);
  }, [filters]);

  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: "Your activity logs are being prepared for download",
    });
    
    // In a real implementation, this would generate a CSV/PDF
    setTimeout(() => {
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Activity,Item,User,Date,Details\n";
      
      activities.forEach(activity => {
        const date = new Date(activity.timestamp).toLocaleString();
        const type = activity.type.replace('_', ' ');
        const item = activity.item_name || '';
        const user = activity.user_name || '';
        const quantity = activity.quantity ? `Quantity: ${activity.quantity}` : '';
        
        csvContent += `"${type}","${item}","${user}","${date}","${quantity}"\n`;
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "activity_logs.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export completed",
        description: "Activity logs have been exported successfully",
      });
    }, 1500);
  };

  const handleFilterChange = (newFilters: {
    search: string;
    category: string;
    user: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
  }) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader 
          title="Activity History" 
          subtitle="Track and review all system activities" 
        />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 text-invento-500 animate-spin mr-2" />
          <p>Loading activity history...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Activity History" 
        subtitle="Track and review all system activities" 
      />
      
      <ActivityTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <ActivityFilters 
        onFilterChange={handleFilterChange}
        onExport={handleExport}
      />
      
      <div className="bg-white rounded-lg shadow border border-gray-100 animate-fade-in overflow-hidden">
        {activities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No activity logs found matching your filters.</p>
          </div>
        ) : (
          activities.map(activity => (
            <ActivityLogItem key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
};

export default History;
