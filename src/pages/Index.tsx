
import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import StoreStatus from '../components/StoreStatus';
import DashboardStats from '../components/DashboardStats';
import OrdersList from '../components/OrdersList';
import BottomNav from '../components/BottomNav';
import { getOrders, getStats, DashboardStats as Stats, Order } from '../services/orderService';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PromotionSection from '../components/PromotionSection';
import CreditCardOffers from '../components/CreditCardOffers';
import SplashScreen from '../components/SplashScreen';

const Index: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>(getStats());
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  
  // Fetch initial data
  useEffect(() => {
    refreshData();
  }, []);
  
  const refreshData = () => {
    // Get only the most recent 3 orders
    setOrders(getOrders().slice(0, 3));
    setStats(getStats());
  };

  return (
    <>
      {showSplash && <SplashScreen onFinished={() => setShowSplash(false)} />}
      
      <div className="min-h-screen pb-20 bg-gray-50">
        {/* Header with logo and icons */}
        <HeaderBar companyName="Whizcartt" />
        
        <div className="p-4">
          {/* Store status controls */}
          <StoreStatus />
          
          {/* Stats dashboard */}
          <div className="mb-4">
            <DashboardStats stats={stats} />
          </div>
          
          {/* Orders list with view all button */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Live Orders</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 flex items-center"
                onClick={() => navigate('/orders')}
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <OrdersList orders={orders} onStatusChange={refreshData} />
          </div>
          
          {/* Promotions Section */}
          <PromotionSection />
          
          {/* ICICI Bank Credit Card Offers */}
          <CreditCardOffers />
          
          {/* Made in Northeast India text */}
          <div className="text-center mt-4 mb-8">
            <p className="text-xs text-gray-500 font-light flex items-center justify-center">
              Made in Northeast India <Heart className="h-3 w-3 ml-1 text-red-500" />
            </p>
          </div>
        </div>
        
        {/* Bottom navigation */}
        <BottomNav />
      </div>
    </>
  );
};

export default Index;
