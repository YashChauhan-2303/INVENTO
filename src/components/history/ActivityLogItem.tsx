
import { 
  Package, 
  TruckIcon, 
  UserCheck, 
  BarChart, 
  Activity, 
  PencilLine,
  Clock
} from "lucide-react";
import { ActivityLog } from "@/types";
import { format } from "date-fns";

interface ActivityLogItemProps {
  activity: ActivityLog;
}

const getCategoryBadge = (type: ActivityLog['type']) => {
  const categories: Record<ActivityLog['type'], { label: string, className: string }> = {
    item_added: { label: 'Inventory', className: 'bg-blue-100 text-blue-700' },
    outbound_transaction: { label: 'Transaction', className: 'bg-green-100 text-green-700' },
    user_login: { label: 'System', className: 'bg-purple-100 text-purple-700' },
    stock_update: { label: 'Inventory', className: 'bg-blue-100 text-blue-700' },
    inbound_transaction: { label: 'Transaction', className: 'bg-green-100 text-green-700' },
    item_modified: { label: 'Inventory', className: 'bg-blue-100 text-blue-700' },
  };
  
  const category = categories[type];
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${category.className}`}>
      {category.label}
    </span>
  );
};

const getActivityIcon = (type: ActivityLog['type']) => {
  switch (type) {
    case 'item_added':
      return <Package className="h-5 w-5" />;
    case 'outbound_transaction':
      return <TruckIcon className="h-5 w-5" />;
    case 'user_login':
      return <UserCheck className="h-5 w-5" />;
    case 'stock_update':
      return <Activity className="h-5 w-5" />;
    case 'inbound_transaction':
      return <TruckIcon className="h-5 w-5" />;
    case 'item_modified':
      return <PencilLine className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};

const getActivityTitle = (activity: ActivityLog) => {
  switch (activity.type) {
    case 'item_added':
      return 'Item Added';
    case 'outbound_transaction':
      return 'Outbound Transaction';
    case 'user_login':
      return 'User Login';
    case 'stock_update':
      return 'Stock Update';
    case 'inbound_transaction':
      return 'Inbound Transaction';
    case 'item_modified':
      return 'Item Modified';
    default:
      return 'Activity';
  }
};

const getActivityDescription = (activity: ActivityLog) => {
  switch (activity.type) {
    case 'item_added':
      return `Added new item to inventory`;
    case 'outbound_transaction':
      return `Processed outbound transaction`;
    case 'user_login':
      return 'User logged into system';
    case 'stock_update':
      return 'Updated inventory stock levels';
    case 'inbound_transaction':
      return 'Processed inbound transaction';
    case 'item_modified':
      return 'Modified item details';
    default:
      return 'Activity performed';
  }
};

const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate);
  return {
    date: format(date, 'yyyy-MM-dd'),
    time: format(date, 'HH:mm:ss')
  };
};

const ActivityLogItem = ({ activity }: ActivityLogItemProps) => {
  const formattedDateTime = formatDateTime(activity.timestamp);
  const Icon = getActivityIcon(activity.type);
  
  return (
    <div className="flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fade-in">
      <div className="mr-4 p-2 bg-gray-100 rounded-full">
        {Icon}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <h3 className="text-lg font-medium mr-3">{getActivityTitle(activity)}</h3>
          {getCategoryBadge(activity.type)}
        </div>
        <p className="text-gray-600 mb-1">{getActivityDescription(activity)}</p>
        {activity.item_name && (
          <p className="text-sm text-gray-500">
            Item: {activity.item_name}
            {activity.quantity && ` (${activity.quantity > 0 ? '+' : ''}${activity.quantity})`}
          </p>
        )}
      </div>
      
      <div className="text-right">
        <p className="text-gray-900">{formattedDateTime.date}</p>
        <p className="text-gray-500 text-sm">{formattedDateTime.time}</p>
        {activity.user_name && (
          <p className="text-sm text-gray-600 mt-1">User: {activity.user_name}</p>
        )}
      </div>
    </div>
  );
};

export default ActivityLogItem;
