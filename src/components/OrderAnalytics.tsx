
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Order } from '@/services/orderService';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface OrderAnalyticsProps {
  orders: Order[];
}

const OrderAnalytics: React.FC<OrderAnalyticsProps> = ({ orders }) => {
  // Calculate order statuses count for pie chart
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));
  
  // Calculate order amounts by count (simplified product categories for demo)
  const mockCategories = ['Food', 'Drinks', 'Snacks', 'Desserts', 'Others'];
  const ordersByCategory = mockCategories.map(category => ({
    name: category,
    orders: Math.floor(Math.random() * (orders.length + 1))
  })).sort((a, b) => b.orders - a.orders);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-md font-medium mb-2">Order Status Distribution</h3>
        <div className="h-64 w-full">
          <ChartContainer 
            config={{
              pending: { color: '#FFBB28' },
              accepted: { color: '#00C49F' },
              denied: { color: '#FF8042' },
              completed: { color: '#0088FE' }
            }}
          >
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-medium mb-2">Popular Categories</h3>
        <div className="h-64 w-full">
          <ChartContainer 
            config={{
              orders: { color: '#0088FE' },
            }}
          >
            <BarChart data={ordersByCategory}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="orders" fill="#0088FE" />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderAnalytics;
