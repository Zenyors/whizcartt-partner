
import React from 'react';
import OrderItem from './OrderItem';
import { Order } from '../services/orderService';
import { Card, CardContent } from './ui/card';

interface OrdersListProps {
  orders: Order[];
  onStatusChange: () => void;
  showOnlyPending?: boolean;
  maxDisplayCount?: number;
}

const OrdersList: React.FC<OrdersListProps> = ({ 
  orders, 
  onStatusChange, 
  showOnlyPending = false,
  maxDisplayCount
}) => {
  let filteredOrders = showOnlyPending ? orders.filter(order => order.status === 'pending') : orders;
  
  // If maxDisplayCount is provided, limit the number of orders displayed
  if (maxDisplayCount !== undefined) {
    filteredOrders = filteredOrders.slice(0, maxDisplayCount);
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No orders found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderItem 
                key={order.id} 
                order={order} 
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersList;
