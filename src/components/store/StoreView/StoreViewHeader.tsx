
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';

const StoreViewHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
        <div className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        </div>
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
