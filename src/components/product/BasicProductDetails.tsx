
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus } from 'lucide-react';

interface ProductFormData {
  name: string;
  price: string;
  stock: number;
  description: string;
}

interface BasicProductDetailsProps {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  increaseStock: () => void;
  decreaseStock: () => void;
}

const BasicProductDetails: React.FC<BasicProductDetailsProps> = ({
  formData,
  handleInputChange,
  increaseStock,
  decreaseStock
}) => {
  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-semibold mb-1">Product Name</label>
        <Input 
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter product name"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold mb-1">Price</label>
        <Input 
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="₹0.00"
          type="number"
          min="0"
          step="0.01"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-semibold mb-1">Stock</label>
        <div className="flex items-center">
          <span className="mr-4">{formData.stock} in Stock</span>
          <div className="flex">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-r-none border-r-0" 
              onClick={decreaseStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-l-none" 
              onClick={increaseStock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-1">Product Description</label>
        <Textarea 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter product description"
          rows={3}
        />
        <Separator className="mt-1" />
      </div>
    </div>
  );
};

export default BasicProductDetails;
