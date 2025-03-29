
import React from 'react';
import { useStore } from '@/contexts/StoreContext';

export const StoreBranding: React.FC = () => {
  const { storeData } = useStore();
  
  return (
    <div className="flex items-center">
      <span className="text-primary font-bold text-xl">
        {storeData.name || "Whizcartt"}
      </span>
      <span className="text-gray-500 text-xs ml-1">Partner</span>
    </div>
  );
};
