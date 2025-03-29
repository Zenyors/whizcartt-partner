
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdImageUploadProps {
  adImage: string | null;
  setAdImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const AdImageUpload: React.FC<AdImageUploadProps> = ({ adImage, setAdImage }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAdImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="image-upload" className="block text-sm font-semibold mb-1">Ad Image</label>
      <div className="mt-1 flex items-center">
        {adImage ? (
          <div className="relative">
            <img 
              src={adImage} 
              alt="Ad preview" 
              className="h-48 w-full object-cover rounded-md" 
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute bottom-2 right-2"
              onClick={() => setAdImage(null)}
            >
              Change
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                Recommended size: 1200 x 628 pixels
              </p>
            </div>
            <input 
              id="image-upload" 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload} 
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default AdImageUpload;
