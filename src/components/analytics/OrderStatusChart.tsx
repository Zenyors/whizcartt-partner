
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS, getStatusDistributionData } from './utils/dataProcessing';
import { Order } from '@/services/orderService';

interface OrderStatusChartProps {
  orders: Order[];
}

const OrderStatusChart: React.FC<OrderStatusChartProps> = ({ orders }) => {
  const pieData = getStatusDistributionData(orders);

  return (
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
            <ResponsiveContainer width="100%" height="100%">
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
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltipContent />
                <ChartLegendContent />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
