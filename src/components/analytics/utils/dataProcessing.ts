
import { Order } from '@/services/orderService';

// Calculate order statuses count for pie chart
export const getStatusDistributionData = (orders: Order[]) => {
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(statusCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));
};

// Calculate order amounts by category (mock data)
export const getCategoryData = (orders: Order[]) => {
  const mockCategories = ['Food', 'Drinks', 'Snacks', 'Desserts', 'Others'];
  return mockCategories.map(category => ({
    name: category,
    orders: Math.floor(Math.random() * (orders.length + 1))
  })).sort((a, b) => b.orders - a.orders);
};

// Create time series data for order trends
export const getTimeSeriesData = () => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return last7Days.map(date => ({
    date,
    orders: Math.floor(Math.random() * 10)
  }));
};

// Get customer retention data (mock)
export const getCustomerRetentionData = () => {
  return [
    { month: 'Jan', newCustomers: 20, returningCustomers: 10 },
    { month: 'Feb', newCustomers: 15, returningCustomers: 12 },
    { month: 'Mar', newCustomers: 25, returningCustomers: 15 },
    { month: 'Apr', newCustomers: 18, returningCustomers: 18 },
    { month: 'May', newCustomers: 22, returningCustomers: 20 },
  ];
};

// Get top customers (mock)
export const getTopCustomersData = () => {
  return [
    { id: 1, name: 'John Doe', orderCount: 7, totalSpent: 245.99 },
    { id: 2, name: 'Jane Smith', orderCount: 5, totalSpent: 189.50 },
    { id: 3, name: 'Robert Johnson', orderCount: 4, totalSpent: 156.25 },
  ];
};

export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#e91e63'];
