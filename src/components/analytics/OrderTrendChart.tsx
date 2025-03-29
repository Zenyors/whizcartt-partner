
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTimeSeriesData } from './utils/dataProcessing';

const OrderTrendChart: React.FC = () => {
  const timeSeriesData = getTimeSeriesData();

  return (
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltipContent />
                <Line type="monotone" dataKey="orders" stroke="#0088FE" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrendChart;
