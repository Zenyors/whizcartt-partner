
import React from 'react';
import { PaymentMethod } from '@/types/payment';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Smartphone } from 'lucide-react';

interface PaymentMethodItemProps {
  method: PaymentMethod;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ method }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-3">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-md mr-3">
            {method.type === 'bank' ? (
              <CreditCard className="h-5 w-5" />
            ) : (
              <Smartphone className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="font-medium">{method.name}</p>
            <p className="text-sm text-gray-500">{method.details}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodItem;
