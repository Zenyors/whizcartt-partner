
import React from 'react';
import OrderItem from './OrderItem';
import { Order } from '../services/orderService';

interface OrdersListProps {
  orders: Order[];
  onStatusChange: () => void;
  showOnlyPending?: boolean;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onStatusChange, showOnlyPending = false }) => {
  const filteredOrders = showOnlyPending ? orders.filter(order => order.status === 'pending') : orders;

  return (
    <div className="px-4 py-2">
      <h2 className="text-lg font-semibold mb-3">Orders</h2>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No orders found
        </div>
      ) : (
        filteredOrders.map(order => (
          <OrderItem 
            key={order.id} 
            order={order} 
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </div>
  );
};

export default OrdersList;
