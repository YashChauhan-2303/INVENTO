
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface TrendData {
  date: string;
  value: number;
  target: number;
}

interface RecentTrendsChartProps {
  data: TrendData[];
}

const RecentTrendsChart = ({ data }: RecentTrendsChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
      <div className="flex items-center mb-4">
        <svg className="h-5 w-5 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 15L12 10L17 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="text-lg font-semibold">Recent Trends</h3>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis yAxisId="left" stroke="#0F86DF" />
            <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', borderColor: '#f0f0f0' }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="value" 
              name="Actual"
              stroke="#0F86DF" 
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="target" 
              name="Target"
              stroke="#4CAF50" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RecentTrendsChart;
