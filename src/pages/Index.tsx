
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
    <div className="min-h-screen pb-16 bg-white">
      {/* Header with logo and icons */}
      <HeaderBar companyName="Whizcart" />
      
      {/* Store status controls */}
      <StoreStatus />
      
      {/* Stats dashboard */}
      <DashboardStats stats={stats} />
      
      {/* Orders list */}
      <OrdersList orders={orders} onStatusChange={refreshData} />
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
