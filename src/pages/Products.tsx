
import React, { useState } from 'react';
import { ArrowLeft, Filter, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  isActive: boolean;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Organic Bananas', price: 3.99, stock: 25, category: 'Fruits', image: '/placeholder.svg', isActive: true },
  { id: 2, name: 'Whole Grain Bread', price: 2.49, stock: 15, category: 'Bakery', image: '/placeholder.svg', isActive: true },
  { id: 3, name: 'Fresh Milk 1L', price: 1.99, stock: 30, category: 'Dairy', image: '/placeholder.svg', isActive: false },
  { id: 4, name: 'Eggs (Dozen)', price: 4.49, stock: 20, category: 'Dairy', image: '/placeholder.svg', isActive: true },
  { id: 5, name: 'Chicken Breast', price: 7.99, stock: 10, category: 'Meat', image: '/placeholder.svg', isActive: true },
  { id: 6, name: 'Tomatoes 1kg', price: 2.29, stock: 40, category: 'Vegetables', image: '/placeholder.svg', isActive: false },
];

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "This feature will be available soon",
    });
  };
  
  const toggleProductStatus = (id: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isActive: !product.isActive } : product
    ));
    toast({
      title: "Product Updated",
      description: "Product status has been updated successfully",
    });
  };
  
  const handleEditProduct = (id: number) => {
    toast({
      title: "Edit Product",
      description: "This feature will be available soon",
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been deleted successfully",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-medium text-lg ml-2">My Products</h1>
        </div>
        <Button size="sm" onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-1" />
          Add Product
        </Button>
      </div>
      
      {/* Search & Filter */}
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search products" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className={product.isActive ? "" : "opacity-70"}>
              <CardContent className="p-0">
                <div className="flex p-4 gap-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{product.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 2.5C3.32843 2.5 4 1.82843 4 1C4 0.171573 3.32843 -0.5 2.5 -0.5C1.67157 -0.5 1 0.171573 1 1C1 1.82843 1.67157 2.5 2.5 2.5Z" fill="black"/>
                              <path d="M7.5 2.5C8.32843 2.5 9 1.82843 9 1C9 0.171573 8.32843 -0.5 7.5 -0.5C6.67157 -0.5 6 0.171573 6 1C6 1.82843 6.67157 2.5 7.5 2.5Z" fill="black"/>
                              <path d="M12.5 2.5C13.3284 2.5 14 1.82843 14 1C14 0.171573 13.3284 -0.5 12.5 -0.5C11.6716 -0.5 11 0.171573 11 1C11 1.82843 11.6716 2.5 12.5 2.5Z" fill="black"/>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleProductStatus(product.id)}>
                            {product.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="font-medium mt-1">${product.price.toFixed(2)}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                      <Badge variant={product.isActive ? "default" : "secondary"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 bg-gray-50 border-t flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs" 
                  onClick={() => toggleProductStatus(product.id)}
                >
                  {product.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleEditProduct(product.id)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Products;
