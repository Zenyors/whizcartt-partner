
import React from 'react';
import { Transaction } from '@/types/payment';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
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

export default TransactionItem;
