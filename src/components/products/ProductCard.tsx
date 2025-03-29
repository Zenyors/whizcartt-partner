
import React from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  isActive: boolean;
}

interface ProductCardProps {
  product: Product;
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleStatus,
  onEdit,
  onDelete
}) => {
  return (
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => onEdit(product.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="font-medium mt-1">₹{product.price.toFixed(2)}</p>
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
          className="text-xs flex gap-1 items-center" 
          onClick={() => onToggleStatus(product.id)}
        >
          {product.isActive ? (
            <>
              <X className="h-3 w-3" />
              Deactivate
            </>
          ) : (
            <>
              <Check className="h-3 w-3" />
              Activate
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm" 
          className="text-xs flex gap-1 items-center text-red-600 border-red-200 hover:bg-red-50"
          onClick={() => onDelete(product.id)}
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
