
import React from 'react';
import { useStore } from '@/contexts/StoreContext';
import { useNotificationService } from '@/services/notificationService'; 
import StoreCover from './StoreCover';
import StoreLogo from './StoreLogo';
import StoreName from './StoreName';
import StoreAddress from './StoreAddress';
import StoreLink from './StoreLink';
import StoreStatus from './StoreStatus';

interface StoreInfoProps {
  handleCopyStoreLink: () => void;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
  handleCopyStoreLink
}) => {
  const { 
    storeData, 
    isStoreActive, 
    setIsStoreActive,
    updateStoreName,
    updateStoreAddress,
    uploadStoreLogo,
    uploadCoverImage
  } = useStore();
  
  const { notifyStoreStatusChanged, notifyStoreUpdated } = useNotificationService();

  const handleToggleStoreStatus = () => {
    setIsStoreActive(!isStoreActive);
    notifyStoreStatusChanged(!isStoreActive);
  };

  const handleAddAddress = (address: string) => {
    updateStoreAddress(address);
    notifyStoreUpdated('Address');
  };

  const handleUpdateStoreName = (name: string) => {
    updateStoreName(name);
    notifyStoreUpdated('Name');
  };

  const handleUploadStoreLogo = (image: string) => {
    uploadStoreLogo(image);
    notifyStoreUpdated('Logo');
  };

  const handleUploadCoverImage = (image: string) => {
    uploadCoverImage(image);
    notifyStoreUpdated('Cover Image');
  };

  return (
    <div className="relative bg-gray-200 pb-6">
      <StoreCover 
        coverImage={storeData.coverImage}
        handleUploadCoverImage={handleUploadCoverImage}
      />
      
      <StoreLogo 
        logoImage={storeData.logoImage}
        handleUploadStoreLogo={handleUploadStoreLogo}
      />
      
      <div className="mt-24 pt-16">
        <StoreName 
          name={storeData.name}
          handleUpdateStoreName={handleUpdateStoreName}
        />
        
        <StoreAddress 
          address={storeData.address}
          handleAddAddress={handleAddAddress}
        />
        
        <StoreLink handleCopyStoreLink={handleCopyStoreLink} />
        
        <StoreStatus 
          isStoreActive={isStoreActive}
          handleToggleStoreStatus={handleToggleStoreStatus}
        />
      </div>
    </div>
  );
};

export default StoreInfo;
