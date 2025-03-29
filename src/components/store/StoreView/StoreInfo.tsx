
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, Camera, MapPin } from 'lucide-react';

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
    <div className="relative bg-gray-200 pb-6">
      {/* Cover Image with camera icon */}
      <div className="h-40 w-full flex items-center justify-center relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-4 top-4 h-10 w-10 bg-white rounded-full flex items-center justify-center p-0"
          onClick={handleUploadCoverImage}
        >
          <Camera className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Store Logo/Avatar */}
      <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: "120px" }}>
        <div className="bg-white p-3 rounded-lg shadow-sm w-40 h-40 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
            <path d="M12 3v6"/>
          </svg>
          <Button 
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8 bg-white rounded-full border border-gray-300 flex items-center justify-center p-0"
            onClick={handleUploadStoreLogo}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Store Info Sections */}
      <div className="mt-24 pt-16">
        {/* Store Name */}
        <div className="text-center font-medium text-xl mb-6">
          Store Name
        </div>
        
        {/* Copy Store Link */}
        <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Address</span>
          </div>
        </div>
        
        {/* Copy Store Link */}
        <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
          <div className="flex items-center">
            <span>Copy Store link</span>
          </div>
          <Link className="h-5 w-5" onClick={handleCopyStoreLink} />
        </div>
        
        {/* Status */}
        <div className="flex justify-between items-center px-4 py-3 bg-white">
          <span>Status</span>
          <div className="flex items-center">
            <div className={`h-6 w-6 rounded-full ${isStoreActive ? "bg-whiz-green" : "bg-whiz-red"}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
