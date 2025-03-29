
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

interface Discount {
  enabled: boolean;
  type: 'percentage' | 'fixed';
  amount: string;
}

interface DiscountSectionProps {
  discount: Discount;
  expanded: boolean;
  toggleSection: () => void;
  toggleDiscount: () => void;
  updateDiscount: (field: 'type' | 'amount', value: string) => void;
}

const DiscountSection: React.FC<DiscountSectionProps> = ({
  discount,
  expanded,
  toggleSection,
  toggleDiscount,
  updateDiscount
}) => {
  return (
    <div>
      <button 
        onClick={toggleSection}
        className="w-full flex justify-between items-center"
      >
        <div>
          <h3 className="font-medium text-sm">Add Discount {discount.enabled ? `(${discount.amount}${discount.type === 'percentage' ? '%' : '₹'} Off)` : ''}</h3>
          <p className="text-xs text-gray-500">Add discount on your products like 20% off</p>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-3 pl-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={discount.enabled}
              onChange={toggleDiscount}
              className="mr-2"
            />
            <span>Enable discount</span>
          </div>
          
          {discount.enabled && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Discount Type</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={discount.type === 'percentage' ? 'default' : 'outline'}
                    onClick={() => updateDiscount('type', 'percentage')}
                    className="flex-1"
                  >
                    Percentage (%)
                  </Button>
                  <Button
                    type="button"
                    variant={discount.type === 'fixed' ? 'default' : 'outline'}
                    onClick={() => updateDiscount('type', 'fixed')}
                    className="flex-1"
                  >
                    Fixed Amount (₹)
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">
                  {discount.type === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                </label>
                <Input
                  type="number"
                  min="0"
                  placeholder={discount.type === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                  value={discount.amount}
                  onChange={(e) => updateDiscount('amount', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <Separator className="mt-3" />
    </div>
  );
};

export default DiscountSection;
