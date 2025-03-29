
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import { Order } from '@/services/orderService';
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

  // Create time series data for order trends
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const timeSeriesData = last7Days.map(date => ({
    date,
    orders: Math.floor(Math.random() * 10)
  }));

  // Customer retention data
  const customerRetentionData = [
    { month: 'Jan', newCustomers: 20, returningCustomers: 10 },
    { month: 'Feb', newCustomers: 15, returningCustomers: 12 },
    { month: 'Mar', newCustomers: 25, returningCustomers: 15 },
    { month: 'Apr', newCustomers: 18, returningCustomers: 18 },
    { month: 'May', newCustomers: 22, returningCustomers: 20 },
  ];

  // Top customers mock data
  const topCustomers = [
    { id: 1, name: 'John Doe', orderCount: 7, totalSpent: 245.99 },
    { id: 2, name: 'Jane Smith', orderCount: 5, totalSpent: 189.50 },
    { id: 3, name: 'Robert Johnson', orderCount: 4, totalSpent: 156.25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#e91e63'];

  return (
    <div className="space-y-4">
      {/* First row - 2 charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ChartContainer 
                config={{
                  pending: { color: '#FFBB28' },
                  accepted: { color: '#00C49F' },
                  denied: { color: '#FF8042' },
                  completed: { color: '#0088FE' },
                  dispatched: { color: '#8884d8' },
                  delivered: { color: '#e91e63' }
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
                  <Legend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      {/* Second row - Order trends over time */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Order Trends (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ChartContainer 
              config={{
                orders: { color: '#0088FE' },
              }}
            >
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="orders" stroke="#0088FE" />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Third row - 2 charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer retention chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ChartContainer 
                config={{
                  newCustomers: { color: '#0088FE' },
                  returningCustomers: { color: '#00C49F' },
                }}
              >
                <BarChart data={customerRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="newCustomers" fill="#0088FE" name="New Customers" />
                  <Bar dataKey="returningCustomers" fill="#00C49F" name="Returning Customers" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top customers table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.orderCount}</TableCell>
                    <TableCell>₹{customer.totalSpent.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderAnalytics;
