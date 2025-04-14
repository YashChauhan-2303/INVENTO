
import { Activity, Package, TruckIcon, UserCheck, AlertTriangle, BarChart } from 'lucide-react';
import { ActivityLog } from '@/types';

interface RecentActivityCardProps {
  activities: ActivityLog[];
}

const getActivityIcon = (type: ActivityLog['type']) => {
  switch (type) {
    case 'item_added':
      return <Package className="h-4 w-4 text-blue-500" />;
    case 'outbound_transaction':
      return <TruckIcon className="h-4 w-4 text-green-500" />;
    case 'user_login':
      return <UserCheck className="h-4 w-4 text-purple-500" />;
    case 'stock_update':
      return <Activity className="h-4 w-4 text-sky-500" />;
    case 'inbound_transaction':
      return <TruckIcon className="h-4 w-4 text-indigo-500" />;
    case 'item_modified':
      return <BarChart className="h-4 w-4 text-amber-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  }
};

const getActivityTitle = (activity: ActivityLog) => {
  switch (activity.type) {
    case 'item_added':
      return 'New shipment received';
    case 'outbound_transaction':
      return `Order #${Math.floor(Math.random() * 90000) + 10000} shipped`;
    case 'user_login':
      return 'User Login';
    case 'stock_update':
      return 'Inventory count updated';
    case 'inbound_transaction':
      return `New order #${Math.floor(Math.random() * 90000) + 10000} received`;
    case 'item_modified':
      return 'Item Modified';
    default:
      return 'Activity';
  }
};

const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  }
};

const RecentActivityCard = ({ activities }: RecentActivityCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-5 h-full">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start animate-fade-in">
            <div className="p-2 rounded-full bg-gray-100 mr-3">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{getActivityTitle(activity)}</p>
              <p className="text-sm text-gray-500">{getTimeAgo(activity.timestamp)}</p>
              {activity.item_name && <p className="text-xs text-gray-600 mt-1">Item: {activity.item_name}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
