
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import StoreViewHeader from '@/components/store/StoreView/StoreViewHeader';
import StoreInfo from '@/components/store/StoreView/StoreInfo';
import StoreContent from '@/components/store/StoreView/StoreContent';

interface StoreData {
  name: string;
  address: string;
  logoImage: string;
  coverImage: string;
}

const StoreView: React.FC = () => {
  const { toast } = useToast();
  const { userProfile } = useUser();
  const navigate = useNavigate();
  const [isStoreActive, setIsStoreActive] = useState(true);
  
  // Store related states
  const [storeData, setStoreData] = useState<StoreData>({
    name: "My Store",
    address: "",
    logoImage: "",
    coverImage: ""
  });
  
  // Products state
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('storeProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  
  // Save products to localStorage when they change
  useEffect(() => {
    localStorage.setItem('storeProducts', JSON.stringify(products));
  }, [products]);
  
  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://mystore.com/${storeData.name.replace(/\s+/g, '-').toLowerCase()}`);
    toast({
      title: "Link copied",
      description: "Store link copied to clipboard",
    });
  };
  
  const handleEditProduct = (id: number) => {
    // For now just show a toast, in the future could navigate to edit page
    toast({
      title: "Edit Product",
      description: `Editing product #${id}`,
    });
  };
  
  const handleAddAddress = (address: string) => {
    setStoreData({
      ...storeData,
      address
    });
    toast({
      title: "Address Added",
      description: "Your store address has been updated",
    });
  };
  
  const handleUpdateStoreName = (name: string) => {
    setStoreData({
      ...storeData,
      name
    });
    toast({
      title: "Store Name Updated",
      description: "Your store name has been updated",
    });
  };
  
  const handleToggleStoreStatus = () => {
    setIsStoreActive(!isStoreActive);
    toast({
      title: isStoreActive ? "Store Deactivated" : "Store Activated",
      description: isStoreActive ? "Your store is now offline" : "Your store is now online",
    });
  };
  
  const handleUploadStoreLogo = (image: string) => {
    setStoreData({
      ...storeData,
      logoImage: image
    });
    toast({
      title: "Logo Updated",
      description: "Your store logo has been updated",
    });
  };
  
  const handleUploadCoverImage = (image: string) => {
    setStoreData({
      ...storeData,
      coverImage: image
    });
    toast({
      title: "Cover Image Updated",
      description: "Your store cover image has been updated",
    });
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <StoreViewHeader />
      
      <StoreInfo 
        storeData={storeData}
        isStoreActive={isStoreActive}
        handleCopyStoreLink={handleCopyStoreLink}
        handleAddAddress={handleAddAddress}
        handleUpdateStoreName={handleUpdateStoreName}
        handleToggleStoreStatus={handleToggleStoreStatus}
        handleUploadStoreLogo={handleUploadStoreLogo}
        handleUploadCoverImage={handleUploadCoverImage}
      />
      
      <StoreContent 
        products={products} 
        handleEditProduct={handleEditProduct} 
      />
      
      <BottomNav />
    </div>
  );
};

export default StoreView;
