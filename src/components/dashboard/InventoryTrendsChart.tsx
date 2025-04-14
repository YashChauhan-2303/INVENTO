
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { InventoryTrend } from '@/types';

interface InventoryTrendsChartProps {
  data: InventoryTrend[];
}

const InventoryTrendsChart = ({ data }: InventoryTrendsChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
      <h3 className="text-lg font-semibold mb-4">Inventory Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', borderColor: '#f0f0f0' }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#0062c5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryTrendsChart;
