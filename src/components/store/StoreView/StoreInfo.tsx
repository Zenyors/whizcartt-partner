
import React from 'react';
import StoreCover from './StoreCover';
import StoreLogo from './StoreLogo';
import StoreName from './StoreName';
import StoreAddress from './StoreAddress';
import StoreLink from './StoreLink';
import StoreStatus from './StoreStatus';

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
  return (
    <div className="relative bg-gray-200 pb-6">
      {/* Cover Image with camera icon */}
      <StoreCover 
        coverImage={storeData.coverImage}
        handleUploadCoverImage={handleUploadCoverImage}
      />
      
      {/* Store Logo/Avatar */}
      <StoreLogo 
        logoImage={storeData.logoImage}
        handleUploadStoreLogo={handleUploadStoreLogo}
      />
      
      {/* Store Info Sections */}
      <div className="mt-24 pt-16">
        {/* Store Name */}
        <StoreName 
          name={storeData.name}
          handleUpdateStoreName={handleUpdateStoreName}
        />
        
        {/* Address */}
        <StoreAddress 
          address={storeData.address}
          handleAddAddress={handleAddAddress}
        />
        
        {/* Copy Store link */}
        <StoreLink handleCopyStoreLink={handleCopyStoreLink} />
        
        {/* Status */}
        <StoreStatus 
          isStoreActive={isStoreActive}
          handleToggleStoreStatus={handleToggleStoreStatus}
        />
      </div>
    </div>
  );
};

export default StoreInfo;
