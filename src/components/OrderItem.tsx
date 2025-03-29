
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Order, updateOrderStatus } from '../services/orderService';
import { useToast } from '@/hooks/use-toast';
import OrderDenyDialog from './OrderDenyDialog';
import { Clock, Check, Truck, Package, X } from 'lucide-react';

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

  const getStatusDetails = () => {
    switch (order.status) {
      case 'pending':
        return {
          icon: <Clock className="h-4 w-4" />,
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-800',
          description: 'Waiting for approval'
        };
      case 'accepted':
        return {
          icon: <Check className="h-4 w-4" />,
          label: 'Accepted',
          color: 'bg-blue-100 text-blue-800',
          description: 'Ready to be dispatched'
        };
      case 'denied':
        return {
          icon: <X className="h-4 w-4" />,
          label: 'Denied',
          color: 'bg-red-100 text-red-800',
          description: 'Order not fulfilled'
        };
      case 'completed':
        return {
          icon: <Package className="h-4 w-4" />,
          label: 'Completed',
          color: 'bg-green-100 text-green-800',
          description: 'Successfully delivered'
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          label: 'Processing',
          color: 'bg-gray-100 text-gray-800',
          description: 'Order being processed'
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <>
      <Card className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Order Id: {order.id}</p>
            <div className="text-sm text-gray-600 mt-1">
              <p>Total Items: {order.totalItems}</p>
              <p>Amount: ₹{order.amount.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Ordered: {order.timestamp.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${statusDetails.color}`}>
              {statusDetails.icon}
              <span>{statusDetails.label}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{statusDetails.description}</p>
            
            {order.reason && (
              <p className="text-sm text-gray-600 mt-2 max-w-48 break-words">
                <span className="font-semibold">Reason:</span> {order.reason}
              </p>
            )}
          </div>
        </div>
        
        {order.status === 'pending' && (
          <div className="flex justify-between mt-3 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full"
              onClick={() => setIsDenyDialogOpen(true)}
            >
              <X className="h-4 w-4 mr-1" /> Deny
            </Button>
            <Button 
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleAccept}
            >
              <Check className="h-4 w-4 mr-1" /> Accept
            </Button>
          </div>
        )}
      </Card>
      
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
