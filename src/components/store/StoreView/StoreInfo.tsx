
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link, Camera, MapPin, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface StoreData {
  name: string;
  address: string;
  logoImage: string;
  coverImage: string;
}

interface StoreInfoProps {
  storeData: StoreData;
  isStoreActive: boolean;
  handleCopyStoreLink: () => void;
  handleAddAddress: (address: string) => void;
  handleUpdateStoreName: (name: string) => void;
  handleToggleStoreStatus: () => void;
  handleUploadStoreLogo: (image: string) => void;
  handleUploadCoverImage: (image: string) => void;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
  storeData,
  isStoreActive,
  handleCopyStoreLink,
  handleAddAddress,
  handleUpdateStoreName,
  handleToggleStoreStatus,
  handleUploadStoreLogo,
  handleUploadCoverImage
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempName, setTempName] = useState(storeData.name);
  const [tempAddress, setTempAddress] = useState(storeData.address);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleUploadStoreLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleUploadCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const saveName = () => {
    handleUpdateStoreName(tempName);
    setIsEditingName(false);
  };
  
  const saveAddress = () => {
    handleAddAddress(tempAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="relative bg-gray-200 pb-6">
      {/* Cover Image with camera icon */}
      <div className="h-40 w-full flex items-center justify-center relative">
        {storeData.coverImage ? (
          <img 
            src={storeData.coverImage} 
            alt="Store Cover" 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-gray-300 h-full w-full flex items-center justify-center">
            <span className="text-gray-500">Add Cover Image</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-4 top-4 h-10 w-10 bg-white rounded-full flex items-center justify-center p-0"
          onClick={() => coverInputRef.current?.click()}
        >
          <Camera className="h-5 w-5" />
        </Button>
        <input 
          type="file" 
          ref={coverInputRef}
          className="hidden" 
          accept="image/*"
          onChange={handleCoverFileChange}
        />
      </div>
      
      {/* Store Logo/Avatar */}
      <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: "120px" }}>
        <div className="bg-white p-3 rounded-lg shadow-sm w-40 h-40 flex items-center justify-center relative">
          {storeData.logoImage ? (
            <img 
              src={storeData.logoImage} 
              alt="Store Logo" 
              className="w-full h-full object-contain"
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
              <path d="M12 3v6"/>
            </svg>
          )}
          <Button 
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8 bg-white rounded-full border border-gray-300 flex items-center justify-center p-0"
            onClick={() => logoInputRef.current?.click()}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <input 
            type="file" 
            ref={logoInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleLogoFileChange}
          />
        </div>
      </div>
      
      {/* Store Info Sections */}
      <div className="mt-24 pt-16">
        {/* Store Name */}
        <div className="text-center mb-6 px-4">
          {isEditingName ? (
            <div className="flex items-center justify-center space-x-2">
              <Input 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="max-w-xs"
              />
              <Button size="sm" onClick={saveName}>Save</Button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h2 className="font-medium text-xl">{storeData.name}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 h-6 w-6"
                onClick={() => setIsEditingName(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Address */}
        <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            {isEditingAddress ? (
              <div className="flex-1 flex items-center space-x-2">
                <Input 
                  value={tempAddress} 
                  onChange={(e) => setTempAddress(e.target.value)}
                  placeholder="Enter store address"
                  className="flex-1"
                />
                <Button size="sm" onClick={saveAddress}>Save</Button>
              </div>
            ) : (
              <div className="flex items-center">
                <span>{storeData.address || "Add address"}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2 h-6 w-6"
                  onClick={() => setIsEditingAddress(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Copy Store link */}
        <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
          <div className="flex items-center">
            <span>Copy Store link</span>
          </div>
          <Link className="h-5 w-5 cursor-pointer" onClick={handleCopyStoreLink} />
        </div>
        
        {/* Status */}
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
      </div>
    </div>
  );
};

export default StoreInfo;
