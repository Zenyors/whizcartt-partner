
import React from 'react';
import OrderItem from './OrderItem';
import { Order } from '../services/orderService';

interface OrdersListProps {
  orders: Order[];
  onStatusChange: () => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onStatusChange }) => {
  const pendingOrders = orders.filter(order => order.status === 'pending');

  return (
    <div className="px-4 py-2">
      <h2 className="text-lg font-semibold mb-3">Orders</h2>
      
      {pendingOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No pending orders
        </div>
      ) : (
        pendingOrders.map(order => (
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
