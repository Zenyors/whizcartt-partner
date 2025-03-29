
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Filter products by both search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddProduct = () => {
    navigate('/add-product');
  };
  
  const toggleProductStatus = (id: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isActive: !product.isActive } : product
    ));
    
    const product = products.find(p => p.id === id);
    const newStatus = product ? !product.isActive : false;
    
    toast({
      title: `Product ${newStatus ? 'Activated' : 'Deactivated'}`,
      description: `${product?.name} has been ${newStatus ? 'activated' : 'deactivated'} successfully`,
    });
  };
  
  const handleEditProduct = (id: number) => {
    navigate(`/edit-product/${id}`);
    toast({
      title: "Edit Product",
      description: "Redirecting to edit product page",
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    const product = products.find(p => p.id === id);
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product Deleted",
      description: `${product?.name} has been deleted successfully`,
    });
  };

  return {
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    handleAddProduct,
    toggleProductStatus,
    handleEditProduct,
    handleDeleteProduct
  };
}
