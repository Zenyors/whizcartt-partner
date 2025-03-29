
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';

interface SettingsLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ 
  children, 
  title = "Settings" 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">{title}</h1>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default SettingsLayout;
