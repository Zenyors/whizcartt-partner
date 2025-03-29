
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';
import StoreViewHeader from '@/components/store/StoreView/StoreViewHeader';
import StoreInfo from '@/components/store/StoreView/StoreInfo';
import StoreContent from '@/components/store/StoreView/StoreContent';
import { StoreProvider } from '@/contexts/StoreContext';
import { useNotificationService } from '@/services/notificationService';

const StoreView: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { 
    notifyStoreLinkCopied, 
    notifyProductAction 
  } = useNotificationService();
  
  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://mystore.com/store-name`);
    notifyStoreLinkCopied();
  };
  
  const handleEditProduct = (id: number) => {
    toast({
      title: "Edit Product",
      description: `Editing product #${id}`,
    });
    // In a full implementation: navigate(`/edit-product/${id}`);
  };

  return (
    <StoreProvider>
      <div className="min-h-screen bg-white pb-16">
        <StoreViewHeader />
        
        <StoreInfo handleCopyStoreLink={handleCopyStoreLink} />
        
        <StoreContent handleEditProduct={handleEditProduct} />
        
        <BottomNav />
      </div>
    </StoreProvider>
  );
};

export default StoreView;
