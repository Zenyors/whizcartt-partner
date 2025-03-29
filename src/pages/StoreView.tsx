
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import BottomNav from '@/components/BottomNav';
import StoreViewHeader from '@/components/store/StoreView/StoreViewHeader';
import StoreInfo from '@/components/store/StoreView/StoreInfo';
import StoreContent from '@/components/store/StoreView/StoreContent';

const StoreView: React.FC = () => {
  const { toast } = useToast();
  const { userProfile } = useUser();
  const [isStoreActive, setIsStoreActive] = useState(true);
  
  const handleCopyStoreLink = () => {
    toast({
      title: "Link copied",
      description: "Store link copied to clipboard",
    });
  };
  
  const handleAddProducts = () => {
    toast({
      title: "Add Products",
      description: "This feature will be available soon",
    });
  };
  
  const handleEditProduct = (id: number) => {
    toast({
      title: "Edit Product",
      description: `Editing product #${id}`,
    });
  };
  
  const handleAddAddress = () => {
    toast({
      title: "Add Address",
      description: "Address functionality coming soon",
    });
  };
  
  const handleUploadStoreLogo = () => {
    toast({
      title: "Upload Logo",
      description: "Logo upload functionality coming soon",
    });
  };
  
  const handleUploadCoverImage = () => {
    toast({
      title: "Upload Cover Image",
      description: "Cover image upload functionality coming soon",
    });
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <StoreViewHeader />
      
      <StoreInfo 
        isStoreActive={isStoreActive}
        handleCopyStoreLink={handleCopyStoreLink}
        handleAddAddress={handleAddAddress}
        handleUploadStoreLogo={handleUploadStoreLogo}
        handleUploadCoverImage={handleUploadCoverImage}
      />
      
      <StoreContent 
        handleAddProducts={handleAddProducts}
        handleEditProduct={handleEditProduct}
      />
      
      <BottomNav />
    </div>
  );
};

export default StoreView;
