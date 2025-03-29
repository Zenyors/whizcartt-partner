
import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import StoreStatus from '../components/StoreStatus';
import DashboardStats from '../components/DashboardStats';
import OrdersList from '../components/OrdersList';
import BottomNav from '../components/BottomNav';
import { getOrders, getStats, DashboardStats as Stats, Order } from '../services/orderService';

const Index: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>(getStats());
  
  // Fetch initial data
  useEffect(() => {
    refreshData();
  }, []);
  
  const refreshData = () => {
    setOrders(getOrders());
    setStats(getStats());
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header with logo and icons */}
      <HeaderBar companyName="Whizcart" />
      
      <div className="max-w-md mx-auto px-4 py-4">
        {/* Store status controls */}
        <StoreStatus />
        
        {/* Stats dashboard */}
        <div className="mb-4">
          <DashboardStats stats={stats} />
        </div>
        
        {/* Orders list */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <OrdersList orders={orders} onStatusChange={refreshData} />
        </div>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
