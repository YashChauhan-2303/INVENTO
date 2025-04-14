
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ActivityTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ActivityTabs = ({ activeTab, onTabChange }: ActivityTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6 animate-fade-in">
      <TabsList className="grid grid-cols-4 md:w-[400px]">
        <TabsTrigger value="all" className="text-xs md:text-sm">All Activity</TabsTrigger>
        <TabsTrigger value="inventory" className="text-xs md:text-sm">Inventory</TabsTrigger>
        <TabsTrigger value="transactions" className="text-xs md:text-sm">Transactions</TabsTrigger>
        <TabsTrigger value="system" className="text-xs md:text-sm">System</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ActivityTabs;
