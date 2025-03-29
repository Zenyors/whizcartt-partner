
import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card key={product.id} className="overflow-hidden">
      <div className="h-32 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover" 
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-1 right-1 bg-white/70 hover:bg-white rounded-full h-6 w-6"
        >
          <Heart className="h-3 w-3" />
        </Button>
      </div>
      <CardContent className="p-3">
        <h3 className="text-sm font-medium truncate">{product.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs ml-1">{product.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium">₹{product.price.toFixed(2)}</p>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
