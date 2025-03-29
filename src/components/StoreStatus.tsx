
import React, { useState } from 'react';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Store, Copy, BarChart } from 'lucide-react';
import { Switch } from './ui/switch';
import { useNavigate } from 'react-router-dom';

interface StoreStatusProps {
  initialStatus?: boolean;
}

const StoreStatus: React.FC<StoreStatusProps> = ({ initialStatus = false }) => {
  const [isOnline, setIsOnline] = useState(initialStatus);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleStatus = (checked: boolean) => {
    setIsOnline(checked);
    toast({
      title: `Store ${checked ? 'Online' : 'Offline'}`,
      description: `Your store is now ${checked ? 'visible' : 'hidden'} to customers`,
    });
  };

  const handleViewStore = () => {
    navigate('/store-view');
  };

  const handleCopyLink = () => {
    // In a real app, this would copy an actual URL
    navigator.clipboard.writeText('https://whizcart.partner/store/123')
      .then(() => {
        toast({
          title: "Link Copied",
          description: "Store link copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy link",
          variant: "destructive",
        });
      });
  };
  
  const handleAddAdvertisement = () => {
    navigate('/create-ad');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Switch 
              checked={isOnline} 
              onCheckedChange={toggleStatus}
              className={isOnline ? "bg-whiz-green" : "bg-whiz-red"}
            />
            <span className="text-sm font-normal text-gray-700">
              {isOnline ? 'Store Online' : 'Store Offline'}
            </span>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs font-normal px-3 py-2"
              onClick={handleViewStore}
            >
              <Store size={16} />
              View Store
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs font-normal px-3 py-2"
              onClick={handleCopyLink}
            >
              <Copy size={16} />
              Copy Link
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs font-normal px-3 py-2"
              onClick={handleAddAdvertisement}
            >
              <BarChart size={16} />
              Ads
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreStatus;
