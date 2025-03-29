
import React from 'react';
import { PaymentMethod } from '@/types/payment';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Smartphone, Star, StarOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentMethodItemProps {
  method: PaymentMethod;
  onSetPrimary: (id: string) => void;
  onDelete: (id: string) => void;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ 
  method, 
  onSetPrimary,
  onDelete
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`bg-gray-100 p-2 rounded-md mr-3 ${method.isPrimary ? 'bg-blue-100' : ''}`}>
              {method.type === 'bank' ? (
                <CreditCard className={`h-5 w-5 ${method.isPrimary ? 'text-blue-600' : ''}`} />
              ) : (
                <Smartphone className={`h-5 w-5 ${method.isPrimary ? 'text-blue-600' : ''}`} />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <p className="font-medium">{method.name}</p>
                {method.isPrimary && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    Primary
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{method.details}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            {!method.isPrimary && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => onSetPrimary(method.id)}
                title="Set as primary"
              >
                <Star className="h-4 w-4 text-gray-500" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(method.id)}
              title="Delete payment method"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodItem;
