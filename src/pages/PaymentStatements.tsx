
import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, Calendar, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import BottomNav from '@/components/BottomNav';

interface Statement {
  id: string;
  period: string;
  dateGenerated: string;
  totalCredits: number;
  totalDebits: number;
  status: 'ready' | 'processing';
}

const mockStatements: Statement[] = [
  { 
    id: 'STMT001', 
    period: 'May 2023', 
    dateGenerated: '2023-06-01', 
    totalCredits: 400.75, 
    totalDebits: 150.00, 
    status: 'ready' 
  },
  { 
    id: 'STMT002', 
    period: 'April 2023', 
    dateGenerated: '2023-05-01', 
    totalCredits: 320.00, 
    totalDebits: 100.00, 
    status: 'ready' 
  },
  { 
    id: 'STMT003', 
    period: 'March 2023', 
    dateGenerated: '2023-04-01', 
    totalCredits: 250.50, 
    totalDebits: 75.50, 
    status: 'ready' 
  },
  { 
    id: 'STMT004', 
    period: 'February 2023', 
    dateGenerated: '2023-03-01', 
    totalCredits: 180.25, 
    totalDebits: 50.00, 
    status: 'ready' 
  },
  { 
    id: 'STMT005', 
    period: 'January 2023', 
    dateGenerated: '2023-02-01', 
    totalCredits: 150.00, 
    totalDebits: 25.00, 
    status: 'ready' 
  },
  { 
    id: 'STMT006', 
    period: 'June 2023', 
    dateGenerated: 'Processing...', 
    totalCredits: 0, 
    totalDebits: 0, 
    status: 'processing' 
  },
];

const PaymentStatements: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statements] = useState<Statement[]>(mockStatements);
  const [year, setYear] = useState<string>('2023');
  
  const handleDownloadStatement = (statementId: string, period: string) => {
    toast({
      title: "Statement Downloaded",
      description: `Your statement for ${period} has been downloaded.`,
    });
  };
  
  const handleGenerateNewStatement = () => {
    toast({
      title: "Statement Requested",
      description: "Your statement is being generated and will be available shortly.",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/payments')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">Payment Statements</h1>
      </div>
      
      {/* Filter and Actions */}
      <div className="p-4 bg-white shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm" onClick={handleGenerateNewStatement}>
            Generate Statement
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="px-4">
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="space-y-4">
            {statements.map(statement => (
              <StatementCard 
                key={statement.id} 
                statement={statement} 
                onDownload={handleDownloadStatement}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="quarterly" className="space-y-4">
            <StatementCard 
              statement={{
                id: 'QTR-2023-Q2',
                period: 'Q2 2023 (Apr-Jun)',
                dateGenerated: '2023-07-01',
                totalCredits: 720.75,
                totalDebits: 250.00,
                status: 'ready'
              }}
              onDownload={handleDownloadStatement}
            />
            <StatementCard 
              statement={{
                id: 'QTR-2023-Q1',
                period: 'Q1 2023 (Jan-Mar)',
                dateGenerated: '2023-04-01',
                totalCredits: 580.75,
                totalDebits: 150.50,
                status: 'ready'
              }}
              onDownload={handleDownloadStatement}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

const StatementCard: React.FC<{ 
  statement: Statement, 
  onDownload: (id: string, period: string) => void 
}> = ({ statement, onDownload }) => {
  const isProcessing = statement.status === 'processing';
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              <h3 className="font-medium">{statement.period}</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">Generated: {statement.dateGenerated}</p>
          </div>
          {isProcessing ? (
            <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
              Processing
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDownload(statement.id, statement.period)}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}
        </div>
        
        {!isProcessing && (
          <>
            <Separator className="my-3" />
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Credits</p>
                <p className="font-medium text-green-600">+₹{statement.totalCredits.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500">Debits</p>
                <p className="font-medium text-red-600">-₹{statement.totalDebits.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500">Net</p>
                <p className="font-medium">₹{(statement.totalCredits - statement.totalDebits).toFixed(2)}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentStatements;
