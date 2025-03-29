
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  categories?: string[];
  discount?: {
    enabled: boolean;
    type: 'percentage' | 'fixed';
    amount: string;
  };
}

interface StoreContentProps {
  handleEditProduct: (id: number) => void;
}

const StoreContent: React.FC<StoreContentProps> = ({ 
  handleEditProduct 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  const mockProducts: Product[] = [
    { 
      id: 1, 
      name: 'Organic Bananas', 
      price: 99, 
      stock: 50,
      description: 'Fresh organic bananas from sustainable farms',
      categories: ['Groceries', 'Fruits'],
      discount: {
        enabled: true,
        type: 'percentage',
        amount: '10'
      }
    },
    { 
      id: 2, 
      name: 'Whole Grain Bread', 
      price: 45, 
      stock: 20,
      description: 'Freshly baked whole grain bread',
      categories: ['Groceries', 'Bakery']
    },
  ];
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'groceries', name: 'Groceries' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'dairy', name: 'Dairy' },
  ];

  const handleAddProducts = () => {
    navigate('/add-product');
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => 
        product.categories?.some(cat => 
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );

  return (
    <>
      {/* Categories */}
      <div className="px-2 py-4 overflow-x-auto bg-white">
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
      <div className="p-2 bg-gray-100">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-md p-3 mb-3 flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm">
                  {product.discount?.enabled ? (
                    <div className="flex items-center">
                      <span className="text-gray-500 line-through mr-2">₹{product.price.toFixed(2)}</span>
                      <span>
                        ₹{product.discount.type === 'percentage' 
                          ? (product.price - (product.price * Number(product.discount.amount) / 100)).toFixed(2)
                          : (product.price - Number(product.discount.amount)).toFixed(2)
                        }
                      </span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 rounded">
                        {product.discount.amount}{product.discount.type === 'percentage' ? '%' : '₹'} OFF
                      </span>
                    </div>
                  ) : (
                    <span>₹{product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {product.stock} In Stock
                </div>
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.categories.map((category, idx) => (
                      <div key={idx} className="text-xs bg-gray-100 px-2 rounded-full">
                        {category}
                      </div>
                    ))}
                  </div>
                )}
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
        
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-md p-6 text-center">
            <p className="text-gray-500 mb-4">No products found in this category</p>
          </div>
        )}
        
        {/* Add More Products */}
        <Button 
          variant="ghost" 
          className="w-full py-6 bg-white flex items-center justify-center"
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
