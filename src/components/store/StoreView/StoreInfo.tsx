
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Camera, LinkIcon, MapPin, Package } from 'lucide-react';

interface StoreInfoProps {
  isStoreActive: boolean;
  handleChangeStoreStatus: (checked: boolean) => void;
  handleCopyStoreLink: () => void;
  handleAddAddress: () => void;
  handleUploadStoreLogo: () => void;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
  isStoreActive,
  handleChangeStoreStatus,
  handleCopyStoreLink,
  handleAddAddress,
  handleUploadStoreLogo
}) => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm">Copy Store link</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8"
          onClick={handleCopyStoreLink}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Store Logo */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="h-24 w-24 bg-white rounded-md flex items-center justify-center">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <Button 
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full"
            onClick={handleUploadStoreLogo}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Address */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">Address</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8"
          onClick={handleAddAddress}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Store Name */}
      <div className="text-center font-medium text-lg mb-4">
        Store Name
      </div>
      
      {/* Store Status */}
      <div className="flex justify-end items-center">
        <span className="text-xs mr-2">Status</span>
        <Switch 
          checked={isStoreActive} 
          onCheckedChange={handleChangeStoreStatus}
          className={isStoreActive ? "bg-whiz-green" : "bg-gray-300"}
        />
      </div>
    </div>
  );
};

export default StoreInfo;
