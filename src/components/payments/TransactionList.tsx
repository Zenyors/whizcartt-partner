
import React from 'react';
import { Transaction } from '@/types/payment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
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
  );
};

export default TransactionList;
