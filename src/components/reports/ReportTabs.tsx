import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReportTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ReportTabs = ({ activeTab, onTabChange }: ReportTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full mb-6 animate-fade-in">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="sales">Sales</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ReportTabs;
