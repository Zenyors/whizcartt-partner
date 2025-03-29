
import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { AlertCircle } from 'lucide-react';

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
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="font-medium text-lg mb-2">No Products Found</h3>
        <p className="text-gray-600 max-w-xs">
          You don't have any products yet or none match your current filter.
        </p>
      </div>
    );
  }

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
