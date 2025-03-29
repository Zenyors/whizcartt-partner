
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus, ArrowLeft, Settings } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const StoreViewHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAddButtonClick = () => {
    navigate('/add-product');
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex items-center">
        <span className="text-primary font-bold text-xl">Whizcartt</span>
        <span className="text-gray-500 text-xs ml-1">Partner</span>
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <div className="py-2 px-3 text-center border-b">
              <p className="font-medium">Notifications</p>
            </div>
            <div className="p-4 text-center text-sm text-gray-500">
              <p>No new notifications</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem 
              className="cursor-pointer flex items-center"
              onClick={handleAddButtonClick}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer flex items-center"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Store Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default StoreViewHeader;
