
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreNameProps {
  name: string;
  handleUpdateStoreName: (name: string) => void;
}

const StoreName: React.FC<StoreNameProps> = ({
  name,
  handleUpdateStoreName
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  
  const saveName = () => {
    if (tempName.trim() === '') {
      toast({
        title: "Invalid name",
        description: "Store name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    handleUpdateStoreName(tempName);
    setIsEditing(false);
  };

  return (
    <div className="text-center mb-6 px-4">
      {isEditing ? (
        <div className="flex items-center justify-center space-x-2">
          <Input 
            value={tempName} 
            onChange={(e) => setTempName(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" onClick={saveName}>Save</Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h2 className="font-medium text-xl">{name}</h2>
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
  );
};

export default StoreName;
