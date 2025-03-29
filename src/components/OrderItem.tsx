
import React from 'react';
import { Button } from './ui/button';
import { Order, updateOrderStatus } from '../services/orderService';
import { useToast } from './ui/use-toast';

interface OrderItemProps {
  order: Order;
  onStatusChange: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onStatusChange }) => {
  const { toast } = useToast();

  const handleAccept = () => {
    updateOrderStatus(order.id, 'accepted');
    toast({
      title: "Order Accepted",
      description: `Order #${order.id} has been accepted`,
    });
    onStatusChange();
  };

  const handleDeny = () => {
    updateOrderStatus(order.id, 'denied');
    toast({
      title: "Order Denied",
      description: `Order #${order.id} has been denied`,
    });
    onStatusChange();
  };

  if (order.status !== 'pending') {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
      <p className="font-semibold">Order Id: {order.id}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <p>Total Items: {order.totalItems}</p>
        <p>Amount: ₹{order.amount.toFixed(2)}</p>
      </div>
      
      <div className="flex justify-between mt-3">
        <Button 
          variant="outline" 
          className="w-24"
          onClick={handleDeny}
        >
          Deny
        </Button>
        <Button 
          className="w-24 bg-whiz-green hover:bg-whiz-darkgreen"
          onClick={handleAccept}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
