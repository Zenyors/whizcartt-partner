
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ProductCard, { Product } from './ProductCard';

interface ProductsTabProps {
  products: Product[];
}

const ProductsTab: React.FC<ProductsTabProps> = ({ products }) => {
  return (
    <TabsContent value="products" className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products available</p>
        </div>
      )}
    </TabsContent>
  );
};

export default ProductsTab;
