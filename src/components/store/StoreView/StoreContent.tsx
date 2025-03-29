
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Product interface to match what we save from the product form
interface Product {
  id: number;
  name: string;
  price: string | number;
  stock: number;
  description?: string;
  categories?: string[];
  discount?: {
    enabled: boolean;
    type: 'percentage' | 'fixed';
    amount: string;
  };
  images?: string[];
  attributes?: Array<{ name: string; value: string }>;
}

interface StoreContentProps {
  products: Product[];
  handleEditProduct: (id: number) => void;
  handleDeleteProduct: (id: number) => void;
}

const StoreContent: React.FC<StoreContentProps> = ({ 
  products, 
  handleEditProduct,
  handleDeleteProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All Categories' }
  ]);
  const navigate = useNavigate();

  // Extract unique categories from products and add them to categories list
  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = new Set<string>();
      
      // Add 'all' category
      uniqueCategories.add('all');
      
      // Extract categories from products
      products.forEach(product => {
        if (product.categories && product.categories.length > 0) {
          product.categories.forEach(category => {
            uniqueCategories.add(category.toLowerCase());
          });
        }
      });
      
      // Convert to array and format for rendering
      const formattedCategories = Array.from(uniqueCategories).map(category => {
        if (category === 'all') {
          return { id: 'all', name: 'All Categories' };
        }
        return { 
          id: category, 
          name: category.charAt(0).toUpperCase() + category.slice(1) 
        };
      });
      
      setCategories(formattedCategories);
    }
  }, [products]);

  const handleAddProducts = () => {
    navigate('/add-product');
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-md p-3 mb-3 flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm">
                    {product.discount?.enabled ? (
                      <div className="flex items-center">
                        <span className="text-gray-500 line-through mr-2">₹{Number(product.price).toFixed(2)}</span>
                        <span>
                          ₹{product.discount.type === 'percentage' 
                            ? (Number(product.price) - (Number(product.price) * Number(product.discount.amount) / 100)).toFixed(2)
                            : (Number(product.price) - Number(product.discount.amount)).toFixed(2)
                          }
                        </span>
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 rounded">
                          {product.discount.amount}{product.discount.type === 'percentage' ? '%' : '₹'} OFF
                        </span>
                      </div>
                    ) : (
                      <span>₹{Number(product.price).toFixed(2)}</span>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center text-red-500"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
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
