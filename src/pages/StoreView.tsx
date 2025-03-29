
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bell, User, Plus, MoreVertical, Camera, 
  MapPin, Link as LinkIcon, Package
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { useUser } from '@/contexts/UserContext';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const StoreView: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile } = useUser();
  const [isStoreActive, setIsStoreActive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const mockProducts: Product[] = [
    { id: 1, name: 'Product Name', price: 0, stock: 0 },
    { id: 2, name: 'Product Name', price: 0, stock: 0 },
  ];
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'chips', name: 'Chips' },
    { id: 'biscuits', name: 'Biscuits' },
    { id: 'masalas', name: 'Masalas' },
  ];
  
  const handleCopyStoreLink = () => {
    toast({
      title: "Link copied",
      description: "Store link copied to clipboard",
    });
  };
  
  const handleAddProducts = () => {
    toast({
      title: "Add Products",
      description: "This feature will be available soon",
    });
  };
  
  const handleChangeStoreStatus = (checked: boolean) => {
    setIsStoreActive(checked);
    toast({
      title: checked ? "Store Active" : "Store Inactive",
      description: `Your store is now ${checked ? 'visible' : 'hidden'} to customers`,
    });
  };
  
  const handleEditProduct = (id: number) => {
    toast({
      title: "Edit Product",
      description: `Editing product #${id}`,
    });
  };
  
  const handleAddAddress = () => {
    toast({
      title: "Add Address",
      description: "Address functionality coming soon",
    });
  };
  
  const handleUploadStoreLogo = () => {
    toast({
      title: "Upload Logo",
      description: "Logo upload functionality coming soon",
    });
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <User className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center">
          <span className="text-whiz-green font-bold text-xl">Whizcartt</span>
          <span className="text-gray-500 text-xs ml-1">Partner</span>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Store Info */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">Copy Store link</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={handleCopyStoreLink}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Store Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="h-24 w-24 bg-white rounded-md flex items-center justify-center">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <Button 
              variant="ghost"
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full"
              onClick={handleUploadStoreLogo}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Address */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">Address</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={handleAddAddress}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Store Name */}
        <div className="text-center font-medium text-lg mb-4">
          Store Name
        </div>
        
        {/* Store Status */}
        <div className="flex justify-end items-center">
          <span className="text-xs mr-2">Status</span>
          <Switch 
            checked={isStoreActive} 
            onCheckedChange={handleChangeStoreStatus}
            className={isStoreActive ? "bg-whiz-green" : "bg-gray-300"}
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="p-2 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map(category => (
            <Badge 
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`rounded-full px-4 py-1 cursor-pointer whitespace-nowrap ${
                selectedCategory === category.id 
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                  : "bg-white"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Products */}
      <div className="p-2">
        {mockProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-gray-50 rounded-md p-3 mb-3 flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 bg-white rounded-md flex items-center justify-center mr-3">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">₹{product.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500">
                  {product.stock} On Stock
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleEditProduct(product.id)}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        ))}
        
        {/* Add More Products */}
        <Button 
          variant="ghost" 
          className="w-full py-6 bg-gray-50 flex items-center justify-center"
          onClick={handleAddProducts}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add More Products
        </Button>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default StoreView;
