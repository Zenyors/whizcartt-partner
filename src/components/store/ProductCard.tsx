
import React from 'react';
import { Star, Heart, ShoppingCart, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: number;
  name: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onEdit?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit(product.id);
    } else {
      navigate(`/edit-product/${product.id}`);
    }
  };

  return (
    <Card key={product.id} className="overflow-hidden">
      <div className="h-32 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-1 right-1 flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/70 hover:bg-white rounded-full h-6 w-6"
          >
            <Heart className="h-3 w-3" />
          </Button>
          {onEdit && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/70 hover:bg-white rounded-full h-6 w-6"
              onClick={handleEdit}
            >
              <Edit className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="text-sm font-medium truncate">{product.name}</h3>
        {product.rating && (
          <div className="flex items-center mt-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs ml-1">{product.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
          </div>
        )}
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
