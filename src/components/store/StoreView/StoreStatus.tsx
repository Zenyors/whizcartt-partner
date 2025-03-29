
import React from 'react';

interface StoreStatusProps {
  isStoreActive: boolean;
  handleToggleStoreStatus: () => void;
}

const StoreStatus: React.FC<StoreStatusProps> = ({
  isStoreActive,
  handleToggleStoreStatus
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white">
      <span>Status</span>
      <div className="flex items-center">
        <div 
          className={`h-6 w-12 rounded-full relative p-1 cursor-pointer transition-colors ${isStoreActive ? "bg-green-500" : "bg-gray-300"}`}
          onClick={handleToggleStoreStatus}
        >
          <div 
            className={`h-4 w-4 bg-white rounded-full absolute top-1 transition-transform ${isStoreActive ? "translate-x-6" : "translate-x-0"}`} 
          />
        </div>
      </div>
    </div>
  );
};

export default StoreStatus;
