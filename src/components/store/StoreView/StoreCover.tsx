
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreCoverProps {
  coverImage: string;
  handleUploadCoverImage: (image: string) => void;
}

const StoreCover: React.FC<StoreCoverProps> = ({
  coverImage,
  handleUploadCoverImage
}) => {
  const { toast } = useToast();
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleUploadCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-40 w-full flex items-center justify-center relative">
      {coverImage ? (
        <img 
          src={coverImage} 
          alt="Store Cover" 
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="bg-gray-300 h-full w-full flex items-center justify-center">
          <span className="text-gray-500">Add Cover Image</span>
        </div>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-4 top-4 h-10 w-10 bg-white rounded-full flex items-center justify-center p-0"
        onClick={() => coverInputRef.current?.click()}
      >
        <Camera className="h-5 w-5" />
      </Button>
      <input 
        type="file" 
        ref={coverInputRef}
        className="hidden" 
        accept="image/*"
        onChange={handleCoverFileChange}
      />
    </div>
  );
};

export default StoreCover;
