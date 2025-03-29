
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, LinkIcon, MapPin, Package, Store } from 'lucide-react';

interface StoreInfoProps {
  isStoreActive: boolean;
  handleCopyStoreLink: () => void;
  handleAddAddress: () => void;
  handleUploadStoreLogo: () => void;
  handleUploadCoverImage: () => void;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
  isStoreActive,
  handleCopyStoreLink,
  handleAddAddress,
  handleUploadStoreLogo,
  handleUploadCoverImage
}) => {
  return (
    <div className="relative bg-gray-100">
      {/* Cover Image */}
      <div className="relative h-36 w-full bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Store className="h-16 w-16 text-gray-400" />
        </div>
        <Button 
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 bg-white rounded-full"
          onClick={handleUploadCoverImage}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Store Logo/Avatar (positioned to overlap cover and info) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ top: "36px" }}>
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-white bg-white">
            <AvatarFallback>
              <Package className="h-10 w-10 text-gray-400" />
            </AvatarFallback>
            <AvatarImage src="" />
          </Avatar>
          <Button 
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 h-6 w-6 bg-white rounded-full"
            onClick={handleUploadStoreLogo}
          >
            <Camera className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="pt-12 px-4 pb-4">
        {/* Store Link */}
        <div className="flex justify-between items-center mb-3 mt-2">
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
        
        {/* Address */}
        <div className="flex justify-between items-center mb-4">
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
        
        {/* Store Status - Display only, not switchable */}
        <div className="flex justify-end items-center">
          <span className="text-xs mr-2">Status</span>
          <div className={`h-4 w-4 rounded-full ${isStoreActive ? "bg-whiz-green" : "bg-whiz-red"}`}></div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
