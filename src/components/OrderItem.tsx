
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Order, updateOrderStatus } from '../services/orderService';
import { useToast } from '@/hooks/use-toast';
import OrderDenyDialog from './OrderDenyDialog';

interface OrderItemProps {
  order: Order;
  onStatusChange: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onStatusChange }) => {
  const { toast } = useToast();
  const [isDenyDialogOpen, setIsDenyDialogOpen] = useState(false);

  const handleAccept = () => {
    updateOrderStatus(order.id, 'accepted');
    toast({
      title: "Order Accepted",
      description: `Order #${order.id} has been accepted`,
    });
    onStatusChange();
  };

  const handleDeny = (reason: string) => {
    updateOrderStatus(order.id, 'denied', reason);
    toast({
      title: "Order Denied",
      description: `Order #${order.id} has been denied`,
    });
    setIsDenyDialogOpen(false);
    onStatusChange();
  };

  // Don't render already processed orders in the pending view
  if (order.status !== 'pending' && window.location.pathname.includes('pending')) {
    return null;
  }

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
        <p className="font-semibold">Order Id: {order.id}</p>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Total Items: {order.totalItems}</p>
          <p>Amount: ₹{order.amount.toFixed(2)}</p>
        </div>
        
        {order.status === 'pending' && (
          <div className="flex justify-between mt-3">
            <Button 
              variant="outline" 
              className="w-24"
              onClick={() => setIsDenyDialogOpen(true)}
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
        )}
        
        {order.status !== 'pending' && (
          <div className="mt-3">
            <span className={`inline-block px-2 py-1 rounded text-xs ${
              order.status === 'accepted' ? 'bg-green-100 text-green-800' :
              order.status === 'denied' ? 'bg-red-100 text-red-800' :
              order.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            
            {order.reason && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">Reason:</span> {order.reason}
              </p>
            )}
          </div>
        )}
      </div>
      
      <OrderDenyDialog 
        isOpen={isDenyDialogOpen}
        onClose={() => setIsDenyDialogOpen(false)}
        onConfirm={handleDeny}
        orderId={order.id}
      />
    </>
  );
};

export default OrderItem;
