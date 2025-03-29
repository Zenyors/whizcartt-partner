
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductsSearch from '@/components/products/ProductsSearch';
import ProductsList from '@/components/products/ProductsList';
import BottomNav from '@/components/BottomNav';

const Products: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    toggleProductStatus,
    handleEditProduct,
    handleDeleteProduct
  } = useProducts();

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <ProductsHeader />
      
      {/* Search & Products List */}
      <div className="p-4">
        <ProductsSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <ProductsList 
          products={products}
          onToggleStatus={toggleProductStatus}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default Products;
