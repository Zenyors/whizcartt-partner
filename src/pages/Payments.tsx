import React, { useState } from 'react';
import { ArrowLeft, PlusCircle, CreditCard, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';
import StatBox from '@/components/StatBox';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  { id: 'TRX001', date: '2023-05-15', amount: 125.50, type: 'credit', description: 'Order #ORD123', status: 'completed' },
  { id: 'TRX002', date: '2023-05-14', amount: 75.25, type: 'credit', description: 'Order #ORD456', status: 'completed' },
  { id: 'TRX003', date: '2023-05-10', amount: 50.00, type: 'debit', description: 'Withdrawal', status: 'completed' },
  { id: 'TRX004', date: '2023-05-05', amount: 200.00, type: 'credit', description: 'Order #ORD789', status: 'completed' },
  { id: 'TRX005', date: '2023-05-01', amount: 100.00, type: 'debit', description: 'Withdrawal', status: 'pending' },
];

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactions] = useState<Transaction[]>(mockTransactions);
  
  const totalEarnings = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  
  const pendingEarnings = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  
  const handleAddPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "This feature will be available soon",
    });
  };
  
  const handleWithdraw = () => {
    toast({
      title: "Withdraw Funds",
      description: "This feature will be available soon",
    });
  };
  
  const handleDownloadStatement = () => {
    toast({
      title: "Download Statement",
      description: "Your statement will be downloaded shortly",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">Payments</h1>
      </div>
      
      {/* Balance Card */}
      <div className="p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Account Balance</CardTitle>
            <CardDescription>Available for withdrawal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalEarnings.toFixed(2)}</div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <StatBox value={transactions.filter(t => t.type === 'credit' && t.status === 'completed').length} label="Payments" />
              <StatBox value={pendingEarnings} label="Pending" />
            </div>
            
            <div className="flex space-x-3 mt-4">
              <Button className="flex-1" onClick={handleWithdraw}>
                Withdraw Funds
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleDownloadStatement}>
                <Download className="h-4 w-4 mr-2" />
                Statement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Payment Methods */}
      <div className="px-4 mt-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Payment Methods</h2>
          <Button variant="ghost" size="sm" onClick={handleAddPaymentMethod}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        <Card className="mb-4">
          <CardContent className="p-3">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Bank Account</p>
                <p className="text-sm text-gray-500">XXXX XXXX XXXX 4321</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Transactions */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-medium mb-2">Transaction History</h2>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="credit">Credits</TabsTrigger>
            <TabsTrigger value="debit">Debits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {transactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>
          
          <TabsContent value="credit" className="mt-4">
            {transactions.filter(t => t.type === 'credit').map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>
          
          <TabsContent value="debit" className="mt-4">
            {transactions.filter(t => t.type === 'debit').map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { id, date, amount, type, description, status } = transaction;
  
  return (
    <div className="border-b py-3 flex justify-between items-center">
      <div>
        <p className="font-medium text-sm">{description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <span>{id}</span>
          <span className="mx-1">•</span>
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span className={status === 'pending' ? 'text-yellow-600' : ''}>
            {status === 'pending' ? 'Pending' : 'Completed'}
          </span>
        </div>
      </div>
      <span className={`font-medium ${type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'credit' ? '+' : '-'}₹{amount.toFixed(2)}
      </span>
    </div>
  );
};

export default Payments;
