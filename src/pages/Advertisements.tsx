
import React, { useState } from 'react';
import { ArrowLeft, Plus, Eye, Edit, Trash2, BarChart3, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';

interface Advertisement {
  id: string;
  title: string;
  image: string;
  status: 'active' | 'inactive' | 'scheduled';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
}

const mockAds: Advertisement[] = [
  {
    id: 'AD001',
    title: 'Summer Sale Campaign',
    image: '/placeholder.svg',
    status: 'active',
    startDate: '2023-05-01',
    endDate: '2023-05-30',
    budget: 1000,
    spent: 300,
    impressions: 15000,
    clicks: 450
  },
  {
    id: 'AD002',
    title: 'New Product Launch',
    image: '/placeholder.svg',
    status: 'scheduled',
    startDate: '2023-06-01',
    endDate: '2023-06-15',
    budget: 500,
    spent: 0,
    impressions: 0,
    clicks: 0
  },
  {
    id: 'AD003',
    title: 'Holiday Special',
    image: '/placeholder.svg',
    status: 'inactive',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    budget: 800,
    spent: 800,
    impressions: 20000,
    clicks: 600
  }
];

const Advertisements: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ads, setAds] = useState<Advertisement[]>(mockAds);
  
  const activeAds = ads.filter(ad => ad.status === 'active');
  const inactiveAds = ads.filter(ad => ad.status === 'inactive');
  const scheduledAds = ads.filter(ad => ad.status === 'scheduled');
  
  const handleCreateAd = () => {
    toast({
      title: "Create Ad",
      description: "This feature will be available soon",
    });
  };
  
  const handleEditAd = (id: string) => {
    toast({
      title: "Edit Ad",
      description: "This feature will be available soon",
    });
  };
  
  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
    toast({
      title: "Ad Deleted",
      description: "Advertisement has been deleted successfully",
    });
  };
  
  const handleViewStats = (id: string) => {
    toast({
      title: "Ad Statistics",
      description: "This feature will be available soon",
    });
  };

  const AdCard: React.FC<{ ad: Advertisement }> = ({ ad }) => {
    const getStatusBadge = (status: Advertisement['status']) => {
      switch (status) {
        case 'active':
          return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
        case 'inactive':
          return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
        case 'scheduled':
          return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>;
      }
    };
    
    const budgetProgress = Math.round((ad.spent / ad.budget) * 100);
    
    return (
      <Card className="mb-4 overflow-hidden">
        <div className="relative h-32">
          <img 
            src={ad.image} 
            alt={ad.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-2 right-2">
            {getStatusBadge(ad.status)}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium">{ad.title}</h3>
          
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{ad.startDate} - {ad.endDate}</span>
          </div>
          
          {ad.status !== 'scheduled' && (
            <>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget Spent:</span>
                  <span>${ad.spent} / ${ad.budget}</span>
                </div>
                <Progress value={budgetProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">Impressions</p>
                  <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">Clicks</p>
                  <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                </div>
              </div>
            </>
          )}
          
          <div className="flex justify-between mt-4">
            {ad.status !== 'scheduled' ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                onClick={() => handleViewStats(ad.id)}
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                View Stats
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                onClick={() => handleEditAd(ad.id)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
            )}
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => handleEditAd(ad.id)}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-red-500"
                onClick={() => handleDeleteAd(ad.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-medium text-lg ml-2">Advertisements</h1>
        </div>
        <Button size="sm" onClick={handleCreateAd}>
          <Plus className="h-4 w-4 mr-1" />
          Create Ad
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All
              <span className="ml-1 text-xs">({ads.length})</span>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              <span className="ml-1 text-xs">({activeAds.length})</span>
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              Scheduled
              <span className="ml-1 text-xs">({scheduledAds.length})</span>
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive
              <span className="ml-1 text-xs">({inactiveAds.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {ads.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            {activeAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-4">
            {scheduledAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-4">
            {inactiveAds.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Advertisements;
