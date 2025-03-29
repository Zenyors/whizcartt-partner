
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface SettingsCategoryProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SettingsCategory: React.FC<SettingsCategoryProps> = ({ 
  title, 
  description, 
  children,
  defaultOpen = true
}) => {
  if (!title) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-4">
        {children}
      </div>
    );
  }
  
  return (
    <Collapsible className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-4" defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="p-4 flex justify-between items-center">
          <div>
            <h3 className="font-medium mb-1 dark:text-white">{title}</h3>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
          <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 transform transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
        </div>
      </CollapsibleTrigger>
      
      <Separator className="dark:bg-gray-700" />
      
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SettingsCategory;
