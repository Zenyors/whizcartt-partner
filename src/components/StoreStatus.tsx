
import React, { useState } from 'react';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Store, Copy } from 'lucide-react';

interface StoreStatusProps {
  initialStatus?: boolean;
}

const StoreStatus: React.FC<StoreStatusProps> = ({ initialStatus = false }) => {
  const [isOnline, setIsOnline] = useState(initialStatus);
  const { toast } = useToast();

  const toggleStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    toast({
      title: `Store ${newStatus ? 'Online' : 'Offline'}`,
      description: `Your store is now ${newStatus ? 'visible' : 'hidden'} to customers`,
    });
  };

  const handleViewStore = () => {
    toast({
      title: "View Store",
      description: "Store preview functionality coming soon",
    });
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

  return (
    <div className="px-4 pb-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleStatus}
            className={`w-16 h-8 rounded-full relative ${
              isOnline ? 'bg-whiz-green' : 'bg-whiz-red'
            } transition-colors`}
          >
            <span className="absolute left-2 text-xs text-white font-semibold">
              {isOnline ? 'ON' : 'OFF'}
            </span>
          </button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs px-2"
              onClick={handleViewStore}
            >
              <Store size={16} />
              View Store
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs px-2"
              onClick={handleCopyLink}
            >
              <Copy size={16} />
              Copy Store link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreStatus;
