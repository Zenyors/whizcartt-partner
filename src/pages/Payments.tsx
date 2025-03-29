
import React, { useState } from 'react';
import { ArrowLeft, PlusCircle, CreditCard, Download, AlertCircle, Smartphone } from 'lucide-react';
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
import { Label } from '@/components/ui/label';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

interface PaymentMethod {
  id: string;
  type: 'bank' | 'upi';
  name: string;
  details: string;
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

// Add amount form schema
const addAmountFormSchema = z.object({
  amount: z.string()
    .refine(val => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine(val => Number(val) > 0, { message: "Amount must be greater than 0" }),
});

// Payment method form schema
const paymentMethodFormSchema = z.object({
  type: z.enum(['bank', 'upi']),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  upiId: z.string().optional(),
});

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  const [addAmountDialogOpen, setAddAmountDialogOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'bank', name: 'Bank Account', details: 'XXXX XXXX XXXX 4321' }
  ]);
  const [selectedPaymentMethodType, setSelectedPaymentMethodType] = useState<'bank' | 'upi'>('bank');
  
  const totalEarnings = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);
  
  const withdrawForm = useForm<z.infer<typeof withdrawalFormSchema>>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      amount: "",
      accountNumber: "",
    },
  });

  const addAmountForm = useForm<z.infer<typeof addAmountFormSchema>>({
    resolver: zodResolver(addAmountFormSchema),
    defaultValues: {
      amount: "",
    },
  });

  const paymentMethodForm = useForm<z.infer<typeof paymentMethodFormSchema>>({
    resolver: zodResolver(paymentMethodFormSchema),
    defaultValues: {
      type: 'bank',
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
    },
  });

  const handleAddPaymentMethod = () => {
    setAddPaymentDialogOpen(true);
  };
  
  const handleWithdraw = () => {
    setWithdrawDialogOpen(true);
  };
  
  const handleAddAmount = () => {
    setAddAmountDialogOpen(true);
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
    withdrawForm.reset();
  };

  const onAddAmountSubmit = (values: z.infer<typeof addAmountFormSchema>) => {
    // Add a new transaction for the added amount
    const newTransaction: Transaction = {
      id: `TRX${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      amount: Number(values.amount),
      type: 'credit',
      description: 'Added to Balance',
      status: 'completed',
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    toast({
      title: "Amount Added",
      description: `₹${values.amount} has been added to your account balance.`,
    });
    
    setAddAmountDialogOpen(false);
    addAmountForm.reset();
  };

  const handleAddNewPaymentMethod = (data: z.infer<typeof paymentMethodFormSchema>) => {
    let newPaymentMethod: PaymentMethod;
    
    if (data.type === 'bank') {
      newPaymentMethod = {
        id: `pm-${Date.now()}`,
        type: 'bank',
        name: data.bankName || 'Bank Account',
        details: `${data.accountNumber?.substring(0, 4) || 'XXXX'} XXXX XXXX ${data.accountNumber?.slice(-4) || 'XXXX'}`
      };
    } else {
      newPaymentMethod = {
        id: `pm-${Date.now()}`,
        type: 'upi',
        name: 'UPI ID',
        details: data.upiId || 'example@upi'
      };
    }
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been successfully added.",
    });
    setAddPaymentDialogOpen(false);
    paymentMethodForm.reset();
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
            
            <div className="flex space-x-3 mt-4">
              <Button 
                className="flex-1" 
                onClick={handleWithdraw}
                disabled={totalEarnings < 500}
              >
                Withdraw Funds
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={handleAddAmount}
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
      
      {/* Payment Methods */}
      <div className="px-4 mt-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Payment Methods</h2>
          <Button variant="ghost" size="sm" onClick={handleAddPaymentMethod}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        {paymentMethods.map(method => (
          <Card key={method.id} className="mb-4">
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
        ))}
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
          <Form {...withdrawForm}>
            <form onSubmit={withdrawForm.handleSubmit(onWithdrawSubmit)} className="space-y-4">
              <FormField
                control={withdrawForm.control}
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
                control={withdrawForm.control}
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

      {/* Add Amount Dialog */}
      <AlertDialog open={addAmountDialogOpen} onOpenChange={setAddAmountDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Amount</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the amount you'd like to add to your account balance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...addAmountForm}>
            <form onSubmit={addAmountForm.handleSubmit(onAddAmountSubmit)} className="space-y-4">
              <FormField
                control={addAmountForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" {...field} type="number" min="1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Add Amount</AlertDialogAction>
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
          <Form {...paymentMethodForm}>
            <form onSubmit={paymentMethodForm.handleSubmit(handleAddNewPaymentMethod)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <div className="flex space-x-2">
                  <Button 
                    type="button"
                    variant="outline" 
                    className={`flex-1 ${selectedPaymentMethodType === 'bank' ? 'bg-blue-50 border-blue-300' : ''}`}
                    onClick={() => {
                      setSelectedPaymentMethodType('bank');
                      paymentMethodForm.setValue('type', 'bank');
                    }}
                  >
                    Bank Account
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className={`flex-1 ${selectedPaymentMethodType === 'upi' ? 'bg-blue-50 border-blue-300' : ''}`}
                    onClick={() => {
                      setSelectedPaymentMethodType('upi');
                      paymentMethodForm.setValue('type', 'upi');
                    }}
                  >
                    UPI
                  </Button>
                </div>
              </div>
              
              {selectedPaymentMethodType === 'bank' ? (
                <>
                  <FormField
                    control={paymentMethodForm.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input id="bank-name" placeholder="Enter bank name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={paymentMethodForm.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input id="account-number" placeholder="Enter account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={paymentMethodForm.control}
                    name="ifscCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC Code</FormLabel>
                        <FormControl>
                          <Input id="ifsc-code" placeholder="Enter IFSC code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <FormField
                  control={paymentMethodForm.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID</FormLabel>
                      <FormControl>
                        <Input id="upi-id" placeholder="Enter UPI ID (e.g. name@upi)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Add Payment Method</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
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
