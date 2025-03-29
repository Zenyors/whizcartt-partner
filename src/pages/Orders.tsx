
import React, { useState } from 'react';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getOrders, Order } from '@/services/orderService';
import OrdersList from '@/components/OrdersList';
import BottomNav from '@/components/BottomNav';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(getOrders());
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toString().includes(searchQuery)
  );
  
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending');
  const completedOrders = filteredOrders.filter(order => order.status === 'completed');
  const cancelledOrders = filteredOrders.filter(order => order.status === 'cancelled');

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">Order History</h1>
      </div>
      
      {/* Search & Filter */}
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search orders" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All
              <span className="ml-1 text-xs">({filteredOrders.length})</span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <span className="ml-1 text-xs">({pendingOrders.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              <span className="ml-1 text-xs">({completedOrders.length})</span>
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled
              <span className="ml-1 text-xs">({cancelledOrders.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={filteredOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={pendingOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={completedOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={cancelledOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Orders;
