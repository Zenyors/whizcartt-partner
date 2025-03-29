
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
                  <DropdownMenuItem onClick={() => onEdit(product.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleStatus(product.id)}>
                    {product.isActive ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          className="text-xs" 
          onClick={() => onToggleStatus(product.id)}
        >
          {product.isActive ? "Deactivate" : "Activate"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onEdit(product.id)}
        >
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
