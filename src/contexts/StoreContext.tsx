
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Store Data interface
export interface StoreData {
  name: string;
  address: string;
  logoImage: string;
  coverImage: string;
}

// Product interface
export interface Product {
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

interface StoreContextType {
  storeData: StoreData;
  products: Product[];
  isStoreActive: boolean;
  setIsStoreActive: (active: boolean) => void;
  updateStoreName: (name: string) => void;
  updateStoreAddress: (address: string) => void;
  uploadStoreLogo: (image: string) => void;
  uploadCoverImage: (image: string) => void;
  deleteProduct: (id: number) => void;
}

const defaultStoreData: StoreData = {
  name: "My Store",
  address: "",
  logoImage: "",
  coverImage: ""
};

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Store state
  const [storeData, setStoreData] = useState<StoreData>(() => {
    const savedStore = localStorage.getItem('storeData');
    return savedStore 
      ? JSON.parse(savedStore) 
      : defaultStoreData;
  });
  
  // Store status
  const [isStoreActive, setIsStoreActive] = useState(true);
  
  // Products state
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

  // Store data update functions
  const updateStoreName = (name: string) => {
    setStoreData({
      ...storeData,
      name
    });
  };

  const updateStoreAddress = (address: string) => {
    setStoreData({
      ...storeData,
      address
    });
  };

  const uploadStoreLogo = (image: string) => {
    setStoreData({
      ...storeData,
      logoImage: image
    });
  };

  const uploadCoverImage = (image: string) => {
    setStoreData({
      ...storeData,
      coverImage: image
    });
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <StoreContext.Provider 
      value={{
        storeData,
        products,
        isStoreActive,
        setIsStoreActive,
        updateStoreName,
        updateStoreAddress,
        uploadStoreLogo,
        uploadCoverImage,
        deleteProduct
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
