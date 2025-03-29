
import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getOrders, Order } from '@/services/orderService';
import OrdersList from '@/components/OrdersList';
import OrderAnalytics from '@/components/OrderAnalytics';
import BottomNav from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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

  // Create arrays of order statuses for the grid layout
  const orderStatusRow1 = [
    { label: 'All', count: filteredOrders.length, value: 'all' },
    { label: 'Pending', count: pendingOrders.length, value: 'pending' },
    { label: 'Accepted', count: acceptedOrders.length, value: 'accepted' },
  ];
  
  const orderStatusRow2 = [
    { label: 'Dispatched', count: dispatchedOrders.length, value: 'dispatched' },
    { label: 'Delivered', count: deliveredOrders.length, value: 'delivered' },
    { label: 'Completed', count: completedOrders.length, value: 'completed' },
  ];

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
        
        {/* Search */}
        <div className="flex mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search orders" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        {/* Order Status Cards - First Row */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {orderStatusRow1.map((status) => (
            <Card key={status.value} className="shadow-sm">
              <CardContent className="p-3 text-center">
                <h3 className="text-sm font-medium">{status.label}</h3>
                <Badge variant="secondary" className="mt-1">{status.count}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Order Status Cards - Second Row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {orderStatusRow2.map((status) => (
            <Card key={status.value} className="shadow-sm">
              <CardContent className="p-3 text-center">
                <h3 className="text-sm font-medium">{status.label}</h3>
                <Badge variant="secondary" className="mt-1">{status.count}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="hidden">
            {/* Hidden but kept for functionality */}
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="dispatched">Dispatched</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={filteredOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={pendingOrders} onStatusChange={() => setOrders(getOrders())} showOnlyPending={true} />
            </div>
          </TabsContent>
          
          <TabsContent value="accepted" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={acceptedOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="dispatched" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={dispatchedOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="delivered" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <OrdersList orders={deliveredOrders} onStatusChange={() => setOrders(getOrders())} />
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
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
