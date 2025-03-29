
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Upload } from 'lucide-react';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: 0,
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const increaseStock = () => {
    setFormData({
      ...formData,
      stock: formData.stock + 1,
    });
  };

  const decreaseStock = () => {
    if (formData.stock > 0) {
      setFormData({
        ...formData,
        stock: formData.stock - 1,
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the product name and price",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally save the product to your backend
    toast({
      title: "Product added",
      description: "Your product has been added successfully",
    });
    navigate('/store-view');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button 
          className="text-red-500 font-medium"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <div className="font-bold text-base">Add Product</div>
        <button 
          className="font-medium"
          onClick={handleSubmit}
        >
          ADD
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {/* Product Images */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 aspect-square rounded-md flex flex-col items-center justify-center">
            <div className="rounded-full border border-gray-400 p-2 mb-2">
              <Upload className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-sm text-gray-500">Add Products</span>
          </div>
          <div className="bg-gray-100 aspect-square rounded-md flex flex-col items-center justify-center">
            <div className="rounded-full border border-gray-400 p-2 mb-2">
              <Upload className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-sm text-gray-500">Add Products</span>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <span className="text-sm text-gray-500">Drag to reorder</span>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
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
            <label className="block text-sm font-medium mb-1">Stock</label>
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
            <label className="block text-sm font-medium mb-1">Add Product Description</label>
            <Textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={3}
            />
            <Separator className="mt-1" />
          </div>

          {/* Additional Fields */}
          <div className="space-y-4">
            <AdditionalField 
              title="Manage Custom Attributes (0 Added)" 
              subtitle="Collect custom information such as measurement"
            />
            <AdditionalField 
              title="Add Discount" 
              subtitle="Add discount on your products like 20% off"
            />
            <AdditionalField 
              title="Add Categories" 
              subtitle="Add Categories to the product"
            />
            <AdditionalField 
              title="Add Variation" 
              subtitle="Add different variations of the products such as size, color, fabric option"
            />
            <AdditionalField 
              title="Expiry Date" 
              subtitle="Add expiry date of the product"
            />
            <AdditionalField 
              title="Schedule Publishing" 
              subtitle="Select the time when this product will be published"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface AdditionalFieldProps {
  title: string;
  subtitle: string;
}

const AdditionalField: React.FC<AdditionalFieldProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
      <Separator className="mt-2" />
    </div>
  );
};

export default AddProduct;
