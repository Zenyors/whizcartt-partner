
import React from 'react';
import { Order } from '@/services/orderService';
import OrderStatusChart from './analytics/OrderStatusChart';
import CategoryChart from './analytics/CategoryChart';
import OrderTrendChart from './analytics/OrderTrendChart';
import CustomerRetentionChart from './analytics/CustomerRetentionChart';
import TopCustomersTable from './analytics/TopCustomersTable';

interface OrderAnalyticsProps {
  orders: Order[];
}

const OrderAnalytics: React.FC<OrderAnalyticsProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {/* First row - 2 charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OrderStatusChart orders={orders} />
        <CategoryChart orders={orders} />
      </div>

      {/* Second row - Order trends over time */}
      <OrderTrendChart />

      {/* Third row - 2 charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomerRetentionChart />
        <TopCustomersTable />
      </div>
    </div>
  );
};

export default OrderAnalytics;
