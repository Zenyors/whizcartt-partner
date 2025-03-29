
import React, { useState } from 'react';
import { Bell, User, Plus } from 'lucide-react';
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
      title: "Boost Your Sales!",
      description: "Create an ad to reach more customers and increase your sales",
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
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-whiz-green font-bold text-2xl">{companyName}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={handleNotification}
          >
            <Bell className="text-amber-400" />
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
