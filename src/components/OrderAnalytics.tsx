
import React from 'react';
import { Order } from '@/services/orderService';
import CategoryChart from './analytics/CategoryChart';
import OrderTrendChart from './analytics/OrderTrendChart';
import CustomerRetentionChart from './analytics/CustomerRetentionChart';

interface OrderAnalyticsProps {
  orders: Order[];
}

const OrderAnalytics: React.FC<OrderAnalyticsProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {/* Order trends over time */}
      <OrderTrendChart />

      {/* Second row - Category chart and Customer retention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategoryChart orders={orders} />
        <CustomerRetentionChart />
      </div>
    </div>
  );
};

export default OrderAnalytics;
