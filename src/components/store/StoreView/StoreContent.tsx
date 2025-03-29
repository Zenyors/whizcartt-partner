
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface StoreContentProps {
  handleAddProducts: () => void;
  handleEditProduct: (id: number) => void;
}

const StoreContent: React.FC<StoreContentProps> = ({ 
  handleAddProducts, 
  handleEditProduct 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const mockProducts: Product[] = [
    { id: 1, name: 'Product Name', price: 0, stock: 0 },
    { id: 2, name: 'Product Name', price: 0, stock: 0 },
  ];
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'chips', name: 'Chips' },
    { id: 'biscuits', name: 'Biscuits' },
    { id: 'masalas', name: 'Masalas' },
  ];

  return (
    <>
      {/* Categories */}
      <div className="p-2 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map(category => (
            <Badge 
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`rounded-full px-4 py-1 cursor-pointer whitespace-nowrap ${
                selectedCategory === category.id 
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                  : "bg-white"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Products */}
      <div className="p-2">
        {mockProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-gray-50 rounded-md p-3 mb-3 flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 bg-white rounded-md flex items-center justify-center mr-3">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">₹{product.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500">
                  {product.stock} On Stock
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleEditProduct(product.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </Button>
          </div>
        ))}
        
        {/* Add More Products */}
        <Button 
          variant="ghost" 
          className="w-full py-6 bg-gray-50 flex items-center justify-center"
          onClick={handleAddProducts}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add More Products
        </Button>
      </div>
    </>
  );
};

export default StoreContent;
