
import React from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductsListProps {
  products: Product[];
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ 
  products,
  onToggleStatus,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductsList;
