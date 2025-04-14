
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { CategoryInventory } from '@/types';

interface InventoryLevelsChartProps {
  data: CategoryInventory[];
}

const InventoryLevelsChart = ({ data }: InventoryLevelsChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
      <div className="flex items-center mb-4">
        <svg className="h-5 w-5 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9.32L21.97 5.33M12 9.32V19.71M12 9.32L2.03 5.33M19 3.58L12 7.37L5 3.58M2.03 5.33L12 9.32L21.97 5.33M2.03 5.33V18.67L12 22.63L21.97 18.67V5.33M7 8.00L4 6.33M7 11.00L4 9.33M7 14.00L4 12.33" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="text-lg font-semibold">Inventory Levels</h3>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" stroke="#888" />
            <YAxis dataKey="category" type="category" stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', borderColor: '#f0f0f0' }}
            />
            <Legend />
            <Bar dataKey="current_stock" name="Current Stock" fill="#1eaedb" barSize={20} />
            <Bar dataKey="optimal_stock" name="Optimal Stock" fill="#4CAF50" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryLevelsChart;
