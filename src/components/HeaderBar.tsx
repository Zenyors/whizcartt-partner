
import React, { useState } from 'react';
import { Bell, User, Plus, BadgeCheck } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import ProfileSidebar from './ProfileSidebar';
import { useNavigate } from 'react-router-dom';

interface HeaderBarProps {
  companyName?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  companyName = "Whizcartt"
}) => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
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
    navigate('/add-product');
  };

  return (
    <>
      <div className="flex items-center justify-between w-full p-4 bg-white shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={toggleSidebar}
        >
          <User className="text-gray-600" />
        </Button>
        
        <div className="flex items-center gap-1">
          <span className="text-whiz-green font-bold text-2xl">{companyName}</span>
          <BadgeCheck className="text-blue-500 h-5 w-5" />
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
