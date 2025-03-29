
import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProductsHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">My Products</h1>
      </div>
      <Button size="sm" onClick={() => navigate('/add-product')}>
        <Plus className="h-4 w-4 mr-1" />
        Add Product
      </Button>
    </div>
  );
};

export default ProductsHeader;
