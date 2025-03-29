
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';
import { Transaction, PaymentMethod } from '@/types/payment';
import * as z from "zod";

// Import refactored components
import TransactionList from '@/components/payments/TransactionList';
import PaymentMethodList from '@/components/payments/PaymentMethodList';
import BalanceCard from '@/components/payments/BalanceCard';
import WithdrawDialog from '@/components/payments/WithdrawDialog';
import AddAmountDialog from '@/components/payments/AddAmountDialog';
import AddPaymentMethodDialog from '@/components/payments/AddPaymentMethodDialog';

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
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [addPaymentDialogOpen, setAddPaymentDialogOpen] = useState(false);
  const [addAmountDialogOpen, setAddAmountDialogOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'bank', name: 'Bank Account', details: 'XXXX XXXX XXXX 4321' }
  ]);
  
  const totalEarnings = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);

  const handleAddPaymentMethod = () => {
    setAddPaymentDialogOpen(true);
  };
  
  const handleWithdraw = () => {
    setWithdrawDialogOpen(true);
  };
  
  const handleAddAmount = () => {
    setAddAmountDialogOpen(true);
  };

  const onWithdrawSubmit = (values: z.infer<any>) => {
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
  };

  const onAddAmountSubmit = (values: z.infer<any>) => {
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
  };

  const handleAddNewPaymentMethod = (data: z.infer<any>) => {
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
      <BalanceCard 
        totalEarnings={totalEarnings}
        onWithdraw={handleWithdraw}
        onAddAmount={handleAddAmount}
      />
      
      {/* Payment Methods */}
      <PaymentMethodList 
        paymentMethods={paymentMethods}
        onAddPaymentMethod={handleAddPaymentMethod}
      />
      
      {/* Transactions */}
      <TransactionList transactions={transactions} />
      
      {/* Dialogs */}
      <WithdrawDialog 
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        totalEarnings={totalEarnings}
        onWithdrawSubmit={onWithdrawSubmit}
      />

      <AddAmountDialog 
        open={addAmountDialogOpen}
        onOpenChange={setAddAmountDialogOpen}
        onAddAmountSubmit={onAddAmountSubmit}
      />

      <AddPaymentMethodDialog 
        open={addPaymentDialogOpen}
        onOpenChange={setAddPaymentDialogOpen}
        onAddPaymentMethod={handleAddNewPaymentMethod}
      />
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Payments;
