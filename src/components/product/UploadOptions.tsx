
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScanBarcode, Camera, Image, FileImage } from 'lucide-react';

interface UploadOptionsProps {
  handleScanBarcode: () => void;
  handleUseCamera: () => void;
  handleGallerySelect: () => void;
  handleFileSelect: () => void;
  galleryInputRef: React.RefObject<HTMLInputElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadOptions: React.FC<UploadOptionsProps> = ({
  handleScanBarcode,
  handleUseCamera,
  handleGallerySelect,
  handleFileSelect,
  galleryInputRef,
  fileInputRef,
  handleFileInputChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="outline" 
        className="flex flex-col items-center justify-center p-6 h-auto"
        onClick={handleScanBarcode}
      >
        <ScanBarcode className="h-8 w-8 mb-2" />
        <span className="text-sm">Scan Barcode</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col items-center justify-center p-6 h-auto"
        onClick={handleUseCamera}
      >
        <Camera className="h-8 w-8 mb-2" />
        <span className="text-sm">Use Camera</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col items-center justify-center p-6 h-auto"
        onClick={handleGallerySelect}
      >
        <Image className="h-8 w-8 mb-2" />
        <span className="text-sm">From Gallery</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex flex-col items-center justify-center p-6 h-auto"
        onClick={handleFileSelect}
      >
        <FileImage className="h-8 w-8 mb-2" />
        <span className="text-sm">Choose File</span>
      </Button>
      
      <input 
        type="file"
        ref={galleryInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInputChange}
        capture="environment"
      />
      
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default UploadOptions;
