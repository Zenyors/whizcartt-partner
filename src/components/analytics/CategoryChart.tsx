
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryData } from './utils/dataProcessing';
import { Order } from '@/services/orderService';

interface CategoryChartProps {
  orders: Order[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ orders }) => {
  const categoryData = getCategoryData(orders);

  return (
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltipContent />
                <Bar dataKey="orders" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
