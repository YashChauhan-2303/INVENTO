
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StockByCategory } from '@/types';

interface CategoryStockChartProps {
  data: StockByCategory[];
}

const CategoryStockChart = ({ data }: CategoryStockChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
      <h3 className="text-lg font-semibold mb-4">Stock by Category</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', borderColor: '#f0f0f0' }}
            />
            <Bar dataKey="count" fill="#1eaedb" barSize={40} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryStockChart;
