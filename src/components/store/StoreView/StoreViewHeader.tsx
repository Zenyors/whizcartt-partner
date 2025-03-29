
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Plus } from 'lucide-react';

const StoreViewHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex items-center">
        <span className="text-whiz-green font-bold text-xl">Whizcartt</span>
        <span className="text-gray-500 text-xs ml-1">Partner</span>
      </div>
      
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default StoreViewHeader;
