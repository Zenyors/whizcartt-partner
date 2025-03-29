
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Banknote, BadgeDollarSign, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreditCardOffers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-white shadow-sm overflow-hidden mt-4">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 mr-2" />
              <h3 className="font-semibold text-lg">ICICI Bank Card Offers</h3>
            </div>
            <Button 
              className="bg-white text-blue-600 hover:bg-blue-50" 
              size="sm"
              onClick={() => window.open('https://www.icicibank.com/business-banking/sme', '_blank')}
            >
              Apply Now
            </Button>
          </div>
          <p className="mt-2 text-sm opacity-90">
            Exclusive credit card offers for your business needs
          </p>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <BadgeDollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">5% Cashback on Business Supplies</p>
                <p className="text-xs text-gray-500">Save on office supplies and inventory purchases</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Banknote className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">No Annual Fee for First Year</p>
                <p className="text-xs text-gray-500">Plus flexible payment options for growing businesses</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Business Credit Score Boost</p>
                <p className="text-xs text-gray-500">Build your business credit profile while you spend</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center justify-center py-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center">
            Made in Northeast India <Heart className="h-3 w-3 ml-1 text-red-400" fill="currentColor" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCardOffers;
