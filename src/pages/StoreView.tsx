
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
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

// Product interface to match what we save from the product form
interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  description: string;
  categories: string[];
  discount: {
    enabled: boolean;
    type: 'percentage' | 'fixed';
    amount: string;
  };
  attributes: Array<{ name: string; value: string }>;
  variations: Array<{ name: string; options: string[] }>;
  expiryDate: string;
  scheduledTime: string;
  images?: string[];
  createdAt: string;
}

const StoreView: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isStoreActive, setIsStoreActive] = useState(true);
  
  // Store related states
  const [storeData, setStoreData] = useState<StoreData>(() => {
    const savedStore = localStorage.getItem('storeData');
    return savedStore 
      ? JSON.parse(savedStore) 
      : {
          name: "My Store",
          address: "",
          logoImage: "",
          coverImage: ""
        };
  });
  
  // Products state - load from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('storeProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Save store data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('storeData', JSON.stringify(storeData));
  }, [storeData]);
  
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
    // In a full implementation, navigate to the edit product page with this ID
    toast({
      title: "Edit Product",
      description: `Editing product #${id}`,
    });
    // navigate(`/edit-product/${id}`);
  };
  
  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    toast({
      title: "Product deleted",
      description: "Product has been removed from your store",
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
        handleDeleteProduct={handleDeleteProduct}
      />
      
      <BottomNav />
    </div>
  );
};

export default StoreView;
