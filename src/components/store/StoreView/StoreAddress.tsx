
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreAddressProps {
  address: string;
  handleAddAddress: (address: string) => void;
}

const StoreAddress: React.FC<StoreAddressProps> = ({
  address,
  handleAddAddress
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
  
  const saveAddress = () => {
    if (tempAddress.trim() === '') {
      toast({
        title: "Invalid address",
        description: "Address cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    handleAddAddress(tempAddress);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 mr-2" />
        {isEditing ? (
          <div className="flex-1 flex items-center space-x-2">
            <Input 
              value={tempAddress} 
              onChange={(e) => setTempAddress(e.target.value)}
              placeholder="Enter store address"
              className="flex-1"
            />
            <Button size="sm" onClick={saveAddress}>Save</Button>
          </div>
        ) : (
          <div className="flex items-center">
            <span>{address || "Add address"}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2 h-6 w-6"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreAddress;
