
import React from 'react';
import StatBox from './StatBox';
import { DashboardStats as Stats } from '../services/orderService';

interface DashboardStatsProps {
  stats: Stats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="px-4 py-2">
      <h2 className="text-lg font-semibold mb-3">Daily Dashboard</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-3">
        <StatBox value={stats.ordered} label="Ordered" />
        <StatBox value={stats.dispatched} label="Dispatched" />
        <StatBox value={stats.delivered} label="Delivered" />
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <StatBox value={stats.cancelled} label="Cancelled" />
        <StatBox value={stats.totalOrders} label="Total Order" />
        <StatBox value={stats.dailyEarnings} label="Daily Earnings" isHighlighted />
      </div>
    </div>
  );
};

export default DashboardStats;
