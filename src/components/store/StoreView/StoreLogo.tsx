
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreLogoProps {
  logoImage: string;
  handleUploadStoreLogo: (image: string) => void;
}

const StoreLogo: React.FC<StoreLogoProps> = ({
  logoImage,
  handleUploadStoreLogo
}) => {
  const { toast } = useToast();
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          handleUploadStoreLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: "120px" }}>
      <div className="bg-white p-3 rounded-lg shadow-sm w-40 h-40 flex items-center justify-center relative">
        {logoImage ? (
          <img 
            src={logoImage} 
            alt="Store Logo" 
            className="w-full h-full object-contain"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
            <path d="M12 3v6"/>
          </svg>
        )}
        <Button 
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 bg-white rounded-full border border-gray-300 flex items-center justify-center p-0"
          onClick={() => logoInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <input 
          type="file" 
          ref={logoInputRef}
          className="hidden" 
          accept="image/*"
          onChange={handleLogoFileChange}
        />
      </div>
    </div>
  );
};

export default StoreLogo;
