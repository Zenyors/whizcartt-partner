
import React, { useState } from 'react';
import { Bell, User, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import ProfileSidebar from './ProfileSidebar';

interface HeaderBarProps {
  companyName: string;
  partnerText?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  companyName, 
  partnerText = "Partner" 
}) => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleNotification = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  const handleNewAction = () => {
    toast({
      title: "New Action",
      description: "Add new functionality coming soon",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between w-full p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={toggleSidebar}
        >
          <User className="text-gray-600" />
        </Button>
        
        <div className="flex flex-col items-center">
          <span className="text-whiz-green font-bold text-2xl">{companyName}</span>
          {partnerText && <span className="text-sm text-gray-500 font-light">{partnerText}</span>}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={handleNotification}
          >
            <Bell className="text-gray-600" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={handleNewAction}
          >
            <Plus className="text-gray-600" />
          </Button>
        </div>
      </div>
      
      <ProfileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default HeaderBar;
