
import React from 'react';
import { PaymentMethod } from '@/types/payment';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import PaymentMethodItem from './PaymentMethodItem';

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  onAddPaymentMethod: () => void;
  onSetPrimary: (id: string) => void;
  onDeletePaymentMethod: (id: string) => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ 
  paymentMethods, 
  onAddPaymentMethod,
  onSetPrimary,
  onDeletePaymentMethod 
}) => {
  return (
    <div className="px-4 mt-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Payment Methods</h2>
        <Button variant="ghost" size="sm" onClick={onAddPaymentMethod}>
          <PlusCircle className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {paymentMethods.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No payment methods added yet
        </div>
      ) : (
        paymentMethods.map(method => (
          <PaymentMethodItem 
            key={method.id} 
            method={method} 
            onSetPrimary={onSetPrimary}
            onDelete={onDeletePaymentMethod}
          />
        ))
      )}
    </div>
  );
};

export default PaymentMethodList;
