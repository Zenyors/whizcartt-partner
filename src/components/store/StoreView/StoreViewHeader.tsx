
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from './Header/BackButton';
import { StoreBranding } from './Header/StoreBranding';
import { HeaderActions } from './Header/HeaderActions';

const StoreViewHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAddButtonClick = () => {
    navigate('/add-product');
  };
  
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
      <BackButton onBack={() => navigate('/')} />
      <StoreBranding />
      <HeaderActions 
        onAddProduct={handleAddButtonClick}
        onSettings={handleSettingsClick}
      />
    </div>
  );
};

export default StoreViewHeader;
