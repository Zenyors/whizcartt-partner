
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCustomerRetentionData } from './utils/dataProcessing';

const CustomerRetentionChart: React.FC = () => {
  const customerRetentionData = getCustomerRetentionData();

  return (
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerRetentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltipContent />
                <Legend />
                <Bar dataKey="newCustomers" fill="#0088FE" name="New Customers" />
                <Bar dataKey="returningCustomers" fill="#00C49F" name="Returning Customers" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerRetentionChart;
