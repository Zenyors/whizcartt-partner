
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BalanceCardProps {
  totalEarnings: number;
  onWithdraw: () => void;
  onAddAmount: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  totalEarnings, 
  onWithdraw, 
  onAddAmount 
}) => {
  const navigate = useNavigate();
  
  const handleDownloadStatement = () => {
    navigate('/payments/statements');
  };
  
  return (
    <div className="p-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Account Balance</CardTitle>
          <CardDescription>Available for withdrawal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₹{totalEarnings.toFixed(2)}</div>
          
          <div className="flex space-x-3 mt-4">
            <Button 
              className="flex-1" 
              onClick={onWithdraw}
              disabled={totalEarnings < 500}
            >
              Withdraw Funds
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onAddAmount}
            >
              Add Amount
            </Button>
          </div>
          
          <div className="flex space-x-3 mt-3">
            <Button variant="outline" className="flex-1" onClick={handleDownloadStatement}>
              <Download className="h-4 w-4 mr-2" />
              Statement
            </Button>
          </div>
          
          {totalEarnings < 500 && (
            <div className="flex items-center mt-2 text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Minimum ₹500 required for withdrawal</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceCard;
