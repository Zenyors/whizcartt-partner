
import React from 'react';

interface ProductHeaderProps {
  title: string;
  handleCancel: () => void;
  handleSubmit: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  title, 
  handleCancel, 
  handleSubmit 
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <button 
        className="text-red-500 font-medium"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <div className="font-bold text-base">{title}</div>
      <button 
        className="font-medium"
        onClick={handleSubmit}
      >
        ADD
      </button>
    </div>
  );
};

export default ProductHeader;
