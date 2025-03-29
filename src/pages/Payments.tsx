
import React, { useState } from 'react';
import { ArrowLeft, PlusCircle, CreditCard, Download, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BottomNav from '@/components/BottomNav';
import StatBox from '@/components/StatBox';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

// Withdrawal form schema
const withdrawalFormSchema = z.object({
  amount: z.string()
    .refine(val => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine(val => Number(val) > 0, { message: "Amount must be greater than 0" })
    .refine(val => Number(val) <= 1000, { message: "Amount must not exceed available balance" })
    .refine(val => Number(val) >= 500, { message: "Minimum withdrawal amount is ₹500" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
});

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  
  const totalEarnings = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  
  const pendingEarnings = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  
  const form = useForm<z.infer<typeof withdrawalFormSchema>>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      amount: "",
      accountNumber: "",
    },
  });

  const handleAddPaymentMethod = () => {
    setAddPaymentDialogOpen(true);
  };
  
  const handleWithdraw = () => {
    setWithdrawDialogOpen(true);
  };
  
  const handleDownloadStatement = () => {
    navigate('/payments/statements');
  };

  const onWithdrawSubmit = (values: z.infer<typeof withdrawalFormSchema>) => {
    // Add a new transaction for the withdrawal
    const newTransaction: Transaction = {
      id: `TRX${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      amount: Number(values.amount),
      type: 'debit',
      description: 'Withdrawal to Account',
      status: 'pending',
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    toast({
      title: "Withdrawal Requested",
      description: `₹${values.amount} withdrawal has been initiated and will be processed within 2-3 business days.`,
    });
    
    setWithdrawDialogOpen(false);
    form.reset();
  };

  const handleAddNewCard = () => {
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been successfully added.",
    });
    setAddPaymentDialogOpen(false);
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
              <Button 
                className="flex-1" 
                onClick={handleWithdraw}
                disabled={totalEarnings < 500}
              >
                Withdraw Funds
              </Button>
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
      
      {/* Withdraw Dialog */}
      <AlertDialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Withdraw Funds</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the amount you'd like to withdraw. Minimum withdrawal is ₹500.
              Available balance: ₹{totalEarnings.toFixed(2)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onWithdrawSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" {...field} type="number" min="500" max={totalEarnings} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Withdraw</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Payment Method Dialog */}
      <AlertDialog open={addPaymentDialogOpen} onOpenChange={setAddPaymentDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your payment details to add a new payment method.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Account Type</FormLabel>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 bg-blue-50 border-blue-300">Bank Account</Button>
                <Button variant="outline" className="flex-1">UPI</Button>
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel>Bank Name</FormLabel>
              <Input placeholder="Enter bank name" />
            </div>
            <div className="space-y-2">
              <FormLabel>Account Number</FormLabel>
              <Input placeholder="Enter account number" />
            </div>
            <div className="space-y-2">
              <FormLabel>IFSC Code</FormLabel>
              <Input placeholder="Enter IFSC code" />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddNewCard}>Add Payment Method</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
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
