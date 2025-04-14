
import { Progress } from "@/components/ui/progress";
import { InventoryItem } from "@/types";

interface LowStockAlertsProps {
  items: InventoryItem[];
}

const LowStockAlerts = ({ items }: LowStockAlertsProps) => {
  const lowStockItems = items.filter(item => item.stock < 10);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-5 h-full">
      <h3 className="text-lg font-semibold mb-4">Low Stock Alerts</h3>
      {lowStockItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No low stock items found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div key={item.id} className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 animate-fade-in">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium text-gray-800">{item.product_name}</h4>
                <span className="text-sm font-medium text-yellow-600">{item.stock} / 10</span>
              </div>
              <Progress 
                value={item.stock * 10} 
                className="h-2 bg-yellow-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowStockAlerts;
