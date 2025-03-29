
import React from 'react';
import { Bell, User, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface HeaderBarProps {
  companyName: string;
  partnerText?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  companyName, 
  partnerText = "Partner" 
}) => {
  const { toast } = useToast();
  
  const handleNotification = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };
  
  const handleProfile = () => {
    toast({
      title: "Profile",
      description: "Profile functionality coming soon",
    });
  };
  
  const handleNewAction = () => {
    toast({
      title: "New Action",
      description: "Add new functionality coming soon",
    });
  };

  return (
    <div className="flex items-center justify-between w-full p-4">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={handleProfile}
      >
        <User className="text-gray-600" />
      </Button>
      
      <div className="flex flex-col items-center">
        <span className="text-whiz-green font-bold text-2xl">{companyName}</span>
        {partnerText && <span className="text-sm text-gray-500">{partnerText}</span>}
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
  );
};

export default HeaderBar;
