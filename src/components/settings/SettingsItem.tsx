
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingsItemProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  addon?: React.ReactNode;
  labelClass?: string;
  showChevron?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  label, 
  description, 
  onClick, 
  addon,
  labelClass,
  showChevron = true
}) => {
  return (
    <div 
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && <div className="mr-3">{icon}</div>}
        <div>
          <span className={`text-sm font-medium ${labelClass}`}>{label}</span>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
      
      {addon || (showChevron && <ChevronRight className="h-4 w-4 text-gray-400" />)}
    </div>
  );
};

export default SettingsItem;
