
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  iconBg = "bg-invento-100", 
  iconColor = "text-invento-600",
  change
}: StatCardProps) => {
  return (
    <div className="card-stats">
      <div className={cn("stat-icon mr-4", iconBg, iconColor)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p className={cn(
            "text-xs flex items-center mt-1",
            change.type === 'increase' ? 'text-green-500' : 'text-red-500'
          )}>
            {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}% from last month
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
