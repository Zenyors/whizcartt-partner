
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/components/products/ProductCard';

const mockProducts: Product[] = [
  { id: 1, name: 'Organic Bananas', price: 3.99, stock: 25, category: 'Fruits', image: '/placeholder.svg', isActive: true },
  { id: 2, name: 'Whole Grain Bread', price: 2.49, stock: 15, category: 'Bakery', image: '/placeholder.svg', isActive: true },
  { id: 3, name: 'Fresh Milk 1L', price: 1.99, stock: 30, category: 'Dairy', image: '/placeholder.svg', isActive: false },
  { id: 4, name: 'Eggs (Dozen)', price: 4.49, stock: 20, category: 'Dairy', image: '/placeholder.svg', isActive: true },
  { id: 5, name: 'Chicken Breast', price: 7.99, stock: 10, category: 'Meat', image: '/placeholder.svg', isActive: true },
  { id: 6, name: 'Tomatoes 1kg', price: 2.29, stock: 40, category: 'Vegetables', image: '/placeholder.svg', isActive: false },
];

export function useProducts() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddProduct = () => {
    navigate('/add-product');
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

  return {
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    handleAddProduct,
    toggleProductStatus,
    handleEditProduct,
    handleDeleteProduct
  };
}
