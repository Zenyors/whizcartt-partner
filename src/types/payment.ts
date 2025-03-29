
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface PaymentMethod {
  id: string;
  type: 'bank' | 'upi';
  name: string;
  details: string;
  isPrimary?: boolean;
}
