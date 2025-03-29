
import React from 'react';
import { Upload, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useToast } from '@/hooks/use-toast';

interface ProductImageUploadProps {
  productImages: string[];
  setProductImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ 
  productImages, 
  setProductImages 
}) => {
  const { toast } = useToast();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      // Check if adding this image would exceed the limit
      if (productImages.length >= 5) {
        toast({
          title: "Maximum images reached",
          description: "You can only add up to 5 images",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProductImages([...productImages, reader.result]);
          toast({
            title: "Image added",
            description: "Product image uploaded successfully",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
    toast({
      title: "Image removed",
      description: "Product image removed successfully",
    });
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-3">Product Images</h2>
        
        {productImages.length > 0 && (
          <Carousel className="w-full mb-4">
            <CarouselContent>
              {productImages.map((img, index) => (
                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4">
                  <div className="aspect-square rounded-md overflow-hidden relative">
                    <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      className="absolute top-2 right-2 bg-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {/* Only show the upload container if there are fewer than 5 images */}
        {productImages.length < 5 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <label className="bg-gray-100 aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
              <div className="rounded-full border border-gray-400 p-2 mb-2">
                <Upload className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-sm text-gray-500">Add Product</span>
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductImageUpload;
