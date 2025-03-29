
import React, { useState } from 'react';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getOrders, Order } from '@/services/orderService';
import OrdersList from '@/components/OrdersList';
import OrderAnalytics from '@/components/OrderAnalytics';
import BottomNav from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(getOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(true);
  
  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchQuery)
  );
  
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending');
  const completedOrders = filteredOrders.filter(order => order.status === 'completed');
  const deniedOrders = filteredOrders.filter(order => order.status === 'denied');
  const acceptedOrders = filteredOrders.filter(order => order.status === 'accepted');
  const dispatchedOrders = filteredOrders.filter(order => order.status === 'dispatched');
  const deliveredOrders = filteredOrders.filter(order => order.status === 'delivered');

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">Order History</h1>
      </div>
      
      {/* Analytics Toggle */}
      <div className="p-4">
        <Button
          variant="outline"
          className="w-full mb-4"
          onClick={() => setShowAnalytics(!showAnalytics)}
        >
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </Button>
        
        {/* Analytics Section */}
        {showAnalytics && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <OrderAnalytics orders={orders} />
          </div>
        )}
        
        {/* Search & Filter */}
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
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1">
            <TabsTrigger value="all" className="flex flex-col items-center px-2 py-1">
              <span>All</span>
              <Badge variant="secondary" className="mt-1">{filteredOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex flex-col items-center px-2 py-1">
              <span>Pending</span>
              <Badge variant="secondary" className="mt-1">{pendingOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex flex-col items-center px-2 py-1">
              <span>Accepted</span>
              <Badge variant="secondary" className="mt-1">{acceptedOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="dispatched" className="flex flex-col items-center px-2 py-1">
              <span>Dispatched</span>
              <Badge variant="secondary" className="mt-1">{dispatchedOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="delivered" className="flex flex-col items-center px-2 py-1">
              <span>Delivered</span>
              <Badge variant="secondary" className="mt-1">{deliveredOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex flex-col items-center px-2 py-1">
              <span>Completed</span>
              <Badge variant="secondary" className="mt-1">{completedOrders.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={filteredOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={pendingOrders} onStatusChange={() => setOrders(getOrders())} showOnlyPending={true} />
            </div>
          </TabsContent>
          
          <TabsContent value="accepted" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={acceptedOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="dispatched" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={dispatchedOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="delivered" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={deliveredOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={completedOrders} onStatusChange={() => setOrders(getOrders())} />
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
