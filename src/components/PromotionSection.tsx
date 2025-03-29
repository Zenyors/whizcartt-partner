
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Megaphone, Zap, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromotionSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Paid Ads Section */}
      <Card className="bg-white shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Megaphone className="h-6 w-6 mr-2" />
                <h3 className="font-semibold text-lg">Boost Your Sales</h3>
              </div>
              <Button 
                className="bg-white text-blue-600 hover:bg-blue-50" 
                size="sm"
                onClick={() => navigate('/advertisements')}
              >
                Create Ad
              </Button>
            </div>
            <p className="mt-2 text-sm opacity-90">
              Reach more customers with targeted advertisements
            </p>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Boost Product Visibility</p>
                  <p className="text-xs text-gray-500">Get more views on your top products</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <ShoppingBag className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Promote Special Offers</p>
                  <p className="text-xs text-gray-500">Highlight discounts and promotions</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionSection;
