import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import ReportTabs from '@/components/reports/ReportTabs';
import SalesOverviewChart from '@/components/reports/SalesOverviewChart';
import InventoryLevelsChart from '@/components/reports/InventoryLevelsChart';
import RecentTrendsChart from '@/components/reports/RecentTrendsChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Share2, Loader2 } from 'lucide-react';
import { useReports } from '@/hooks/useReports';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { salesData, inventoryLevels, isLoading, error } = useReports();
  const { toast } = useToast();

  const handleDateRangeClick = () => {
    toast({
      title: "Coming Soon",
      description: "Date range filtering will be available in a future update.",
      variant: "default"
    });
  };

  const handleExport = () => {
    try {
      // Create data to export based on active tab
      let exportData;
      let filename;

      if (activeTab === 'sales') {
        exportData = salesData;
        filename = 'sales-report.json';
      } else if (activeTab === 'inventory') {
        exportData = inventoryLevels;
        filename = 'inventory-report.json';
      } else {
        exportData = {
          sales: salesData,
          inventory: inventoryLevels
        };
        filename = 'dashboard-report.json';
      }

      // Create blob and download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Report has been exported as ${filename}`,
        variant: "default"
      });
    } catch (err) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report.",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Inventory Report',
          text: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report from Invento`,
          url: window.location.href
        });
        
        toast({
          title: "Shared Successfully",
          description: "The report link has been shared.",
          variant: "default"
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Report link has been copied to clipboard.",
          variant: "default"
        });
      }
    } catch (err) {
      toast({
        title: "Share Failed",
        description: "There was an error sharing the report.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 text-invento-500 animate-spin mr-2" />
        <p>Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading reports: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Reports & Analytics" 
          subtitle="Access and generate detailed reports and analytics" 
        />
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleDateRangeClick}
          >
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      <ReportTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200">
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly revenue, expenses and profit</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <SalesOverviewChart data={salesData} />
            </CardContent>
          </Card> */}
          
          <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200">
              <CardTitle>Inventory Levels</CardTitle>
              <CardDescription>Current stock compared to optimal levels</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <InventoryLevelsChart data={inventoryLevels} />
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'inventory' && (
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200">
            <CardTitle>Inventory Analysis</CardTitle>
            <CardDescription>Current stock by category compared to optimal levels</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <InventoryLevelsChart data={inventoryLevels} />
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'sales' && (
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-invento-50 to-invento-100 border-b border-gray-200">
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly revenue, expenses and profit analysis</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SalesOverviewChart data={salesData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;
