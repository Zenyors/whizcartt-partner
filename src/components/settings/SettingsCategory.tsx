
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface SettingsCategoryProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SettingsCategory: React.FC<SettingsCategoryProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <div className="p-4">
        <h3 className="font-medium mb-1">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      
      <Separator />
      
      {children}
    </div>
  );
};

export default SettingsCategory;
