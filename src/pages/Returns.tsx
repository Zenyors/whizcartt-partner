import React, { useState } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';

interface ReturnRequest {
  id: string;
  orderId: string;
  customer: string;
  items: { name: string; quantity: number }[];
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  total: number;
}

const mockReturns: ReturnRequest[] = [
  {
    id: 'RET001',
    orderId: 'ORD123',
    customer: 'Alice Johnson',
    items: [{ name: 'Organic Bananas', quantity: 2 }],
    reason: 'Product damaged during delivery',
    status: 'pending',
    date: '2023-05-15',
    total: 7.98
  },
  {
    id: 'RET002',
    orderId: 'ORD456',
    customer: 'Bob Smith',
    items: [{ name: 'Fresh Milk 1L', quantity: 1 }],
    reason: 'Received wrong product',
    status: 'approved',
    date: '2023-05-10',
    total: 1.99
  },
  {
    id: 'RET003',
    orderId: 'ORD789',
    customer: 'Carol Davis',
    items: [
      { name: 'Chicken Breast', quantity: 1 },
      { name: 'Tomatoes 1kg', quantity: 1 }
    ],
    reason: 'Changed mind',
    status: 'rejected',
    date: '2023-05-05',
    total: 10.28
  }
];

const Returns: React.FC = () => {
  const navigate = useNavigate();
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(mockReturns);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredReturns = returnRequests.filter(req => 
    req.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const pendingReturns = filteredReturns.filter(req => req.status === 'pending');
  const approvedReturns = filteredReturns.filter(req => req.status === 'approved');
  const rejectedReturns = filteredReturns.filter(req => req.status === 'rejected');
  
  const getStatusBadge = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    }
  };

  const handleUpdateStatus = (id: string, newStatus: ReturnRequest['status']) => {
    setReturnRequests(returnRequests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const ReturnRequestCard = ({ request }: { request: ReturnRequest }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm font-medium">{request.id}</p>
          <p className="text-xs text-gray-500">Order: {request.orderId}</p>
        </div>
        {getStatusBadge(request.status)}
      </div>
      
      <p className="text-sm font-medium mb-1">{request.customer}</p>
      
      <div className="border-t border-b py-2 my-2">
        {request.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.name} × {item.quantity}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Total Refund:</span>
        <span className="font-medium">₹{request.total.toFixed(2)}</span>
      </div>
      
      <p className="text-xs text-gray-600 mb-3">
        <span className="font-medium">Reason: </span>
        {request.reason}
      </p>
      
      {request.status === 'pending' && (
        <div className="flex gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
            onClick={() => handleUpdateStatus(request.id, 'approved')}
          >
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => handleUpdateStatus(request.id, 'rejected')}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">Return & Refund</h1>
      </div>
      
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search returns" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All
              <span className="ml-1 text-xs">({filteredReturns.length})</span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <span className="ml-1 text-xs">({pendingReturns.length})</span>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <span className="ml-1 text-xs">({approvedReturns.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <span className="ml-1 text-xs">({rejectedReturns.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {filteredReturns.map(request => (
              <ReturnRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            {pendingReturns.map(request => (
              <ReturnRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
          
          <TabsContent value="approved" className="mt-4">
            {approvedReturns.map(request => (
              <ReturnRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-4">
            {rejectedReturns.map(request => (
              <ReturnRequestCard key={request.id} request={request} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Returns;
